export type SignInWayTypes = "company" | "credential" | "google" | null;
export interface SignInProps {
  loading?: SignInWayTypes;
  callbackUrl: string;
  setLoading: (value: SignInWayTypes) => void;
}
