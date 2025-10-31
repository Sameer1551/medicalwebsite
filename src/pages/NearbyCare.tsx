import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

type HospitalPlace = {
  id: number | string;
  name: string;
  lat: number;
  lon: number;
  address?: string;
  distanceMeters: number;
};

function toKm(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(2)} km`;
}

function haversineDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // meters
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const NearbyCare: React.FC = () => {
  const [userLat, setUserLat] = React.useState<number | null>(null);
  const [userLon, setUserLon] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [hospitals, setHospitals] = React.useState<HospitalPlace[]>([]);

  const fetchHospitals = React.useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const radiusMeters = 5000; // 5 km
      const query = `\n[out:json];\n(\n  node["amenity"="hospital"](around:${radiusMeters},${lat},${lon});\n  way["amenity"="hospital"](around:${radiusMeters},${lat},${lon});\n  relation["amenity"="hospital"](around:${radiusMeters},${lat},${lon});\n);\nout center;\n`;
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: new URLSearchParams({ data: query }).toString(),
      });
      if (!response.ok) throw new Error(`Overpass error ${response.status}`);
      const data = await response.json();
      const elements = Array.isArray(data?.elements) ? data.elements : [];

      const mapped: HospitalPlace[] = elements.map((el: any) => {
        const center = el.type === 'node' ? { lat: el.lat, lon: el.lon } : (el.center || {});
        const name = el.tags?.name || 'Unnamed Hospital';
        const addressParts = [
          el.tags?.['addr:housenumber'],
          el.tags?.['addr:street'],
          el.tags?.['addr:city'],
          el.tags?.['addr:state'],
          el.tags?.['addr:postcode'],
        ].filter(Boolean);
        const address = addressParts.join(', ');
        const distanceMeters = (center?.lat && center?.lon)
          ? haversineDistanceMeters(lat, lon, center.lat, center.lon)
          : Number.POSITIVE_INFINITY;
        return {
          id: el.id,
          name,
          lat: center?.lat,
          lon: center?.lon,
          address: address || undefined,
          distanceMeters,
        } as HospitalPlace;
      }).filter((p: HospitalPlace) => Number.isFinite(p.distanceMeters) && p.lat && p.lon);

      mapped.sort((a, b) => a.distanceMeters - b.distanceMeters);
      setHospitals(mapped);
    } catch (e: any) {
      setError(e?.message || 'Failed to load nearby hospitals.');
    } finally {
      setLoading(false);
    }
  }, []);

  const requestLocation = React.useCallback(() => {
    setError(null);
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLat(latitude);
        setUserLon(longitude);
        setLoading(false);
        fetchHospitals(latitude, longitude);
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location permission denied. Please enable it to see nearby hospitals.');
        } else {
          setError('Unable to get your location. Please try again.');
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }, [fetchHospitals]);

  React.useEffect(() => {
    // Attempt automatically on load
    requestLocation();
  }, [requestLocation]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        <MapPin className="inline-block mr-2 text-blue-600" />
        Nearby Hospitals
      </h1>

      <div className="mb-4">
        <button
          onClick={requestLocation}
          className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Refresh Location
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-md bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-gray-600">Loading nearby hospitals...</div>
      )}

      {!loading && hospitals.length === 0 && !error && (
        <div className="text-gray-600">No hospitals found nearby.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((h) => (
          <div key={h.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{h.name}</h3>
                {h.address && (
                  <p className="text-gray-600 text-sm mt-1">{h.address}</p>
                )}
                {Number.isFinite(h.distanceMeters) && (
                  <p className="text-gray-600 text-sm mt-1">{toKm(h.distanceMeters)} away</p>
                )}
              </div>
              <a
                className="ml-4 inline-flex items-center px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${h.name} @ ${h.lat},${h.lon}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Open Map
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyCare;