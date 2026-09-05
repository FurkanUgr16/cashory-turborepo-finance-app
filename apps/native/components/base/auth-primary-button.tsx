import { Text, Pressable } from "react-native";
import { useAuthTheme } from "@/hooks/use-auth-theme";
import { ONBOARDING_FONT_FAMILY } from "@/lib/const/onboarding-typography";

type AuthPrimaryButtonProps = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
};

export default function AuthPrimaryButton({
  onPress,
  label,
  disabled,
}: AuthPrimaryButtonProps) {
  const { colors } = useAuthTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="h-16.25 rounded-full items-center justify-center"
      style={({ pressed }) => ({
        opacity: pressed || disabled ? 0.85 : 1,
        backgroundColor: colors.buttonBackground,
      })}
    >
      <Text
        className="text-h5 text-center leading-5"
        style={{
          fontFamily: ONBOARDING_FONT_FAMILY.bold,
          color: colors.textInverse,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
