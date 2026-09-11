import "@/global.css";
import { Stack } from "expo-router/build";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/open-sans";
import { AppThemeProvider } from "@/contexts/app-theme-context";
import { ReactQueryProvider } from "@/components/provider/query-provider";

export const unstable_settings = {
  initialRouteName: "index",
};

function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="invoices" />
      <Stack.Screen name="category" />
      <Stack.Screen name="wallet" />
      <Stack.Screen name="budget" />
      <Stack.Screen name="transaction/add" />
      <Stack.Screen name="transaction/[id]" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="invoice/add" />
      <Stack.Screen name="invoice/[id]" />

      <Stack.Screen name="onboarding" options={{ headerShown: false }} />

      <Stack.Screen
        name="modal"
        options={{ title: "Modal", presentation: "modal" }}
      />
    </Stack>
  );
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });

  if (!fontsLoaded) return null;

  return (
    <ReactQueryProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <AppThemeProvider>
            <HeroUINativeProvider>
              <StackLayout />
            </HeroUINativeProvider>
          </AppThemeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ReactQueryProvider>
  );
}
