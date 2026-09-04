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
  useToast,
} from "heroui-native";

export default function SignInTemplate() {
  return (
    <View>
      <Text>SignInTemplate</Text>
    </View>
  );
}
