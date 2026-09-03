import { View, Text } from "react-native";
import { useThemeColor } from "heroui-native";
import { type PropsWithChildren } from "react";
import { ONBOARDING_FONT_FAMILY } from "@/lib/const/onboarding-typography";

type Props = PropsWithChildren & {
  title: string;
  description: string;
  headingTop: number;
  headingWidth: number;
  bottomInset: number;
};

const CARD_BOTTOM_PADDING = 20;

export default function OnboardingContentCard({
  bottomInset,
  description,
  headingTop,
  headingWidth,
  title,
  children,
}: Props) {
  const titleColor = useThemeColor("foreground");
  const descriptionColor = useThemeColor("muted");
  const surfaceColor = useThemeColor("surface");

  return (
    <View
      className="w-full h-full rounded-t-[30px] items-center"
      style={{
        paddingTop: headingTop,
        paddingBottom: bottomInset + CARD_BOTTOM_PADDING,
        backgroundColor: surfaceColor,
      }}
    >
      <View className="items-center gap-2.5" style={{ width: headingWidth }}>
        <Text
          className="text-h2 leading-8.75 text-center"
          style={{
            fontFamily: ONBOARDING_FONT_FAMILY.bold,
            color: titleColor,
          }}
        >
          {title}
        </Text>

        <Text
          className="text-body-sm leading-3.75 text-center"
          style={{
            fontFamily: ONBOARDING_FONT_FAMILY.regular,
            color: descriptionColor,
          }}
        >
          {description}
        </Text>
      </View>

      {children}
    </View>
  );
}
