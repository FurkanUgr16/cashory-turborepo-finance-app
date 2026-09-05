import { View, Text, Pressable } from "react-native";
import { ONBOARDING_FONT_FAMILY } from "@/lib/const/onboarding-typography";

type AuthRowProps = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

export default function AuthRow({
  label,
  icon,
  onPress,
  backgroundColor,
  textColor,
}: AuthRowProps) {
  return (
    <Pressable
      className="h-22 rounded-2xl px-8 flex-row items-center"
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        backgroundColor,
      })}
    >
      <View className="w-8 items-center">{icon}</View>
      <Text
        className="ml-8 leading-5 text-base"
        style={{ fontFamily: ONBOARDING_FONT_FAMILY.regular, color: textColor }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
