import {
  View,
  Text,
  Platform,
  ScrollView,
  useWindowDimensions,
  Pressable,
  TextInput,
} from "react-native";
import { useRef, useMemo, useState } from "react";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ONBOARDING_FONT_FAMILY } from "@/lib/const/onboarding-typography";
import {
  FieldError,
  Input,
  InputGroup,
  TextField,
  useThemeColor,
  useToast,
} from "heroui-native";
import { useAuthTheme } from "@/hooks/use-auth-theme";
import { StatusBar } from "expo-status-bar";
import { type SignUpType, signupSchema } from "@cashory/schema";
import AuthPrimaryButton from "../base/auth-primary-button";
import AuthSeparator from "../base/auth-seperator";
import AuthSocialButtons from "../base/auth-social-button";
import { AuthFooterLink } from "../base/auth-footer-link";
import { useSignUp } from "@/hooks/use-auth";

const getAuthErrorMessage = (error: Error, fallback: string) => {
  if (error) return error.message || fallback;

  return fallback;
};

export default function SignUpTemplate() {
  const [authError, setAuthError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { colors } = useAuthTheme();
  const { toast } = useToast();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const containerWidth = useMemo(() => Math.min(346, width - 48), [width]);
  const ctaWidth = useMemo(() => Math.min(345, width - 48), [width]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm<SignUpType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const emailError = errors.email?.message
    ? String(errors.email.message)
    : authError;

  const signUp = useSignUp();

  const handleSignup = (values: SignUpType) => {
    setFormError(null);
    setAuthError(null);

    const parsed = signupSchema.safeParse(values);

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        setError(issue.path[0] as keyof SignUpType, {
          type: "manual",
          message: issue.message,
        });
      });
      return;
    }

    try {
      signUp.mutateAsync({
        email: parsed.data.email,
        name: parsed.data.name,
        password: parsed.data.password,
      });

      reset();
      router.replace({
        pathname: "/onboarding",
        params: {
          name: parsed.data.name,
          email: parsed.data.email,
        },
      });
    } catch (error) {
      setAuthError(
        getAuthErrorMessage(
          error as Error,
          "Failed to create account. Please try again.",
        ),
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.screenBackground }}
    >
      <StatusBar style="auto" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingTop: insets.top + 18,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ width: containerWidth }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            className="w-14 h-14 rounded-full items-center justify-center"
            style={({ pressed }) => ({
              opacity: pressed ? 0.85 : 1,
              backgroundColor: colors.inputBackground,
            })}
          >
            <Ionicons name="arrow-back" size={28} color={colors.icon} />
          </Pressable>
          <View className="mt-5.5 gap-2.5">
            <Text
              className="text-h2 leading-8.75"
              style={{
                fontFamily: ONBOARDING_FONT_FAMILY.bold,
                color: colors.textPrimary,
              }}
            >
              Welcome aboard! 🚀
            </Text>
            <Text
              className="text-body-sm leading.3.75"
              style={{
                fontFamily: ONBOARDING_FONT_FAMILY.regular,
                color: colors.textSecondary,
              }}
            >
              Create your Cashory account to start tracking income, expenses,
              and everything in between
            </Text>
          </View>
        </View>

        <View className="mt-8.5 gap-3.5" style={{ width: containerWidth }}>
          {/* Name */}
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onBlur, onChange } }) => (
              <TextField isInvalid={!!errors.name}>
                <Input
                  value={value}
                  onChangeText={(text) => {
                    setFormError(null);
                    setAuthError(null);
                    clearErrors("name");
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  placeholder="Your full name"
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="name"
                  returnKeyType="next"
                  submitBehavior="submit"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75"
                  style={{
                    fontFamily: ONBOARDING_FONT_FAMILY.medium,
                    color: colors.textPrimary,
                  }}
                />
                {errors.name?.message && (
                  <FieldError>{String(errors.name.message)}</FieldError>
                )}
              </TextField>
            )}
          />

          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField isInvalid={!!emailError}>
                <Input
                  ref={emailInputRef}
                  value={value}
                  onChangeText={(text) => {
                    setFormError(null);
                    setAuthError(null);
                    clearErrors("email");
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  placeholder="Email"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  returnKeyType="next"
                  submitBehavior="submit"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75"
                  style={{
                    fontFamily: ONBOARDING_FONT_FAMILY.medium,
                    color: colors.textPrimary,
                  }}
                />
                {emailError ? (
                  <FieldError>{String(emailError)}</FieldError>
                ) : null}
              </TextField>
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField isInvalid={!!errors.password}>
                <InputGroup>
                  <InputGroup.Input
                    ref={passwordInputRef}
                    value={value}
                    onChangeText={(text) => {
                      setFormError(null);
                      clearErrors("password");
                      onChange(text);
                    }}
                    onBlur={onBlur}
                    placeholder="Password"
                    secureTextEntry={!isPasswordVisible}
                    autoComplete="off"
                    textContentType="none"
                    autoCorrect={false}
                    spellCheck={false}
                    returnKeyType="go"
                    onSubmitEditing={handleSubmit(handleSignup)}
                    className="h-17.5 rounded-[15px] px-5 text-body-sm leading-3.75"
                    style={{
                      fontFamily: ONBOARDING_FONT_FAMILY.medium,
                      color: colors.textPrimary,
                    }}
                  />
                  <InputGroup.Suffix>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={
                        isPasswordVisible ? "Hide password" : "Show password"
                      }
                      onPress={() =>
                        setIsPasswordVisible((current) => !current)
                      }
                    >
                      <Ionicons
                        name={
                          isPasswordVisible ? "eye-outline" : "eye-off-outline"
                        }
                        size={24}
                        color={colors.textSecondary}
                      />
                    </Pressable>
                  </InputGroup.Suffix>
                </InputGroup>
                {errors.password?.message && (
                  <FieldError>{String(errors.password.message)}</FieldError>
                )}
              </TextField>
            )}
          />
        </View>

        <View className="mt-auto  gap-5.25" style={{ width: ctaWidth }}>
          <AuthPrimaryButton
            label={isSubmitting ? "Joining..." : "Join Today"}
            disabled={isSubmitting}
            onPress={handleSubmit(handleSignup)}
          />

          <AuthSeparator />

          <AuthSocialButtons
            onGooglePress={() =>
              toast.show({
                variant: "default",
                label: "Google registration coming soon",
              })
            }
            onApplePress={() =>
              toast.show({
                variant: "default",
                label: "Apple registration coming soon",
              })
            }
            onFacebookPress={() =>
              toast.show({
                variant: "default",
                label: "Facebook registration coming soon",
              })
            }
          />
          <AuthFooterLink
            prefix="You have an account?"
            actionLabel="Let's login here"
            onActionPress={() => router.replace("/sign-in")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
