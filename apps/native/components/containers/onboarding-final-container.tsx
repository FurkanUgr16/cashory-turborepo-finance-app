import {
  View,
  Text,
  useWindowDimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
} from "react-native";
import { useThemeColor, useToast } from "heroui-native";
import { ONBOARDING_FONT_FAMILY } from "@/lib/const/onboarding-typography";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  imageSource: ImageSourcePropType;
  bottomInsets: number;
};

export default function OnboardingFinalContainer({
  bottomInsets,
  imageSource,
}: Props) {
  const { width } = useWindowDimensions();
  const { toast } = useToast();
  const dangerColor = useThemeColor("danger");
  const accentColor = useThemeColor("accent");
  const surfaceColor = useThemeColor("surface");
  const textColor = useThemeColor("foreground");
  const mutedTextColor = useThemeColor("muted");
  const rowBackgroundColor = useThemeColor("surface-secondary");
  const rowTextColor = useThemeColor("surface-foreground");
  const separatorColor = useThemeColor("separator");
  const actionIconBackgroundColor = useThemeColor("foreground");
  const actionIconColor = useThemeColor("background");
  const heroWidth = Math.min(350, width - 36);
  const heroHeight = Math.round(heroWidth * 0.62);
  const socialProviders = [
    {
      label: "Register with Google",
      provider: "Google",
      iconName: "logo-google" as const,
      iconSize: 30,
      iconColor: dangerColor,
    },
    {
      label: "Register with Apple",
      provider: "Apple",
      iconName: "logo-apple" as const,
      iconSize: 32,
      iconColor: textColor,
    },
    {
      label: "Register with Facebook",
      provider: "Facebook",
      iconName: "logo-facebook" as const,
      iconSize: 30,
      iconColor: accentColor,
    },
  ];

  const handleSocialPress = (provider: string) => {
    toast.show({
      label: `${provider} auth coming soon`,
      variant: "default",
    });
  };

  return (
    <View className="flex-1 bg-brand-green-500">
      <View className="px-4.5 pt-13.5">
        <Image
          source={imageSource}
          resizeMode="cover"
          style={{
            width: heroWidth,
            height: heroHeight,
            alignSelf: "center",
            borderRadius: 30,
          }}
        />
      </View>
      <View
        className="mt-4 flex-1 rounded-t-[30px]"
        style={{ backgroundColor: surfaceColor }}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 42,
            paddingBottom: bottomInsets + 20,
            gap: 14,
          }}
        >
          <View className="items-center gap-2.5 px-2">
            <Text
              className="text-h2 leading-8.75 text-center"
              style={{
                fontFamily: ONBOARDING_FONT_FAMILY.bold,
                color: textColor,
              }}
            >
              Welcome to Cashory!
            </Text>
            <Text
              className="text-body-sm leading-3.75 text-center"
              style={{
                fontFamily: ONBOARDING_FONT_FAMILY.regular,
                color: mutedTextColor,
              }}
            >
              Create new entries, log income, and track expenses all in one
              place
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
