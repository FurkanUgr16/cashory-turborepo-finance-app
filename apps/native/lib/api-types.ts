import { CashoryUser } from "@/types/auth";
import { Country } from "@/components/templates/onboarding-flow";

export type ApiError = {
  message: string;
  code?: string;
  details: string;
};

export type ApiResponse<T> = {
  data: T;
  error?: ApiError;
};

export type UpdateProfileData = {
  name?: string;
  phone?: string;
  country?: Country;
  image?: string;
};

export type UpdateProfileResponse = {
  user: CashoryUser;
};

export type OnboardingCompleteResponse = {
  success: boolean;
  user: CashoryUser;
};

export type AuthResponse = {
  user: CashoryUser;
  token?: string;
};

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
}
