const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY ?? '';

type InitialCoordinatesProps = {
  latitude: number;
  longitude: number;
};

const INITIAL_COORDINATES: InitialCoordinatesProps = {
  latitude: 37.78825,
  longitude: -122.4324,
};

export { GOOGLE_API_KEY, INITIAL_COORDINATES };
