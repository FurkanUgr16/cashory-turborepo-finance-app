import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router/build";
import { useAuthSession } from "@/hooks/use-auth";
import OnboardingFlow from "@/components/templates/onboarding-flow";

export default function Onboarding() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { data: session } = useAuthSession();

  useEffect(() => {
    if (!session?.data?.user) throw router.replace("/sign-up");
  }, [session, router]);

  if (!session?.data?.user) return null;

  const userData = {
    name: (params.name as string) || session.data.user.name,
    email: (params.email as string) || session.data.user.email,
  };

  return (
    <OnboardingFlow userData={userData} onComplete={() => router.back()} />
  );
}
