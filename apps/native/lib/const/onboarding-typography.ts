export const ONBOARDING_FONT_FAMILY = {
  regular: "OpenSans_400Regular",
  medium: "OpenSans_500Medium",
  bold: "OpenSans_700Bold",
} as const;

export const ONBOARDING_TEXT_STYLE = {
  splashMessage: {
    fontFamily: ONBOARDING_FONT_FAMILY.medium,
    fontSize: 18,
    lineHeight: 28,
  },
  statusTime: {
    fontFamily: ONBOARDING_FONT_FAMILY.bold,
    letterSpacing: -0.3,
  },
} as const;
