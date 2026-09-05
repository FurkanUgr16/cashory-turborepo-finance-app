import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useAuthSession } from "@/hooks/use-auth";
import { useEffect } from "react";
import { usePathname } from "expo-router";
import OnboardingSplashContainer from "@/components/containers/onboarding-splash-container";
import { useThemeColor } from "heroui-native";
import OnboardingTemplate from "@/components/templates/onboarding-template";

const Page = () => {
  const { data: session, isPending } = useAuthSession();
  const pathname = usePathname();
  const router = useRouter();

  const backgroundColor = useThemeColor("background");

  useEffect(() => {
    if (pathname !== "/") return;

    if (!isPending && session?.data?.user) {
      const user = session.data.user;

      if (user.onBoardingCompleted) {
        router.replace("/(drawer)/(tabs)/index");
      } else {
        router.replace("/onboarding");
      }
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <>
        <StatusBar style="auto" />
        <OnboardingSplashContainer message="Cashory makes managing your money simple, secure and smart" />
      </>
    );
  }

  return <OnboardingTemplate />;
};

export default Page;
