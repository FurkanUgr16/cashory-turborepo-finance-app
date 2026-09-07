import { useRouter } from "expo-router/build";
import SelectCountry from "../containers/onboarding/select-country";
import { useState } from "react";
import ProfileSetup, {
  type ProfileData,
} from "../containers/onboarding/profile-setup";
import { useCompleteOnboarding, useUpdateProfile } from "@/hooks/use-auth";
import { useToast } from "heroui-native";
import { SuccessModal } from "../containers/onboarding/success-modal";

type OnboardingStep = "country" | "profile" | "success";

export type Country = {
  code: string;
  name: string;
  flag: string;
};

type OnboardingProps = {
  userData: {
    email: string;
    name: string;
  };
  onComplete: () => void;
};

export default function OnboardingFlow({
  onComplete,
  userData,
}: OnboardingProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("country");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const { toast } = useToast();

  const updateProfile = useUpdateProfile();
  const completeOnboarding = useCompleteOnboarding();

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setCurrentStep("profile");
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModel(false);
    onComplete();
  };

  const handleBack = () => {
    if (currentStep === "profile") setCurrentStep("country");
  };

  const handleProfileComplete = async (
    profile: ProfileData & { image?: string },
  ) => {
    try {
      setCurrentStep("success");
      await updateProfile.mutateAsync({
        country: profile.country,
        image: profile.image,
        name: profile.name,
        phone: profile.phone,
      });

      await completeOnboarding.mutateAsync();
      setShowSuccessModel(true);
    } catch (error) {
      toast.show({
        label: (error as Error).name,
        description: (error as Error).message || "Error completing onboarding",
        variant: "danger",
        onActionPress: ({ hide }) => {
          hide();
        },
        actionLabel: "X",
      });
    }
  };

  return (
    <>
      {currentStep === "country" && (
        <SelectCountry
          onNext={handleSelectCountry}
          onBack={() => router.back()}
        />
      )}

      {currentStep === "profile" && (
        <ProfileSetup
          userData={userData}
          country={selectedCountry as Country}
          onNext={handleProfileComplete}
          onBack={handleBack}
        />
      )}

      <SuccessModal
        onClose={handleSuccessModalClose}
        visible={showSuccessModel}
      />
    </>
  );
}
