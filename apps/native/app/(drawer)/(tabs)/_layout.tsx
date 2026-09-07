import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { useThemeColor } from "heroui-native";
import { BlurTargetView } from "expo-blur";
import { NativeTabs } from "expo-router/build/native-tabs";
import { GeneralEdit } from "@/components/ui/icons/general-edit";
import CashoryAddTransactionModal from "@/components/containers/cashory-add-transactional-modal";
import { useAuthTheme } from "@/hooks/use-auth-theme";

export default function TabLayout() {
  const backgroundColor = useThemeColor("background");
  const [isAddTransactionVisible, setAddTransactionVisible] =
    useState<boolean>(false);

  const { isDark } = useAuthTheme();

  return (
    <>
      <BlurTargetView style={{ flex: 1, backgroundColor: backgroundColor }}>
        <NativeTabs
          iconColor={{
            default: isDark ? "#A3A3A3" : "#163028",
            selected: isDark ? "#FFFFFF" : "#163028",
          }}
          labelStyle={{
            default: isDark
              ? { color: "#A3A3A3", fontWeight: "600" }
              : { color: "#163028", fontWeight: "600" },
            selected: isDark
              ? { color: "#FFFFFF", fontWeight: "600" }
              : { color: "#163028", fontWeight: "600" },
          }}
          blurEffect="systemMaterialDark"
        >
          <NativeTabs.Trigger name="index">
            <NativeTabs.Trigger.Icon
              sf={{ default: "house", selected: "house.fill" }}
              md="home"
            />
            <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="transactions">
            <NativeTabs.Trigger.Icon
              sf={{ default: "newspaper", selected: "newspaper.fill" }}
              md="article"
            />
            <NativeTabs.Trigger.Label>Transaction</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="reports">
            <NativeTabs.Trigger.Icon
              sf={{ default: "chart.pie", selected: "chart.pie.fill" }}
              md="pie_chart"
            />
            <NativeTabs.Trigger.Label>Reports</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="profile">
            <NativeTabs.Trigger.Icon
              sf={{ default: "person", selected: "person.fill" }}
              md="person"
            />
            <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        </NativeTabs>

        <View
          className="absolute right-6 bottom-32 z-10 w-15 h-15"
          pointerEvents="box-none"
        >
          <Pressable
            onPress={() => setAddTransactionVisible(true)}
            style={{
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
              shadowRadius: 15,
              elevation: 16,
            }}
            className="flex-1 rounded-[40px] bg-[#163028] items-center justify-center p-3.25 border-2 border-transparent"
          >
            <GeneralEdit width={22} height={22} color={"#fff"} />
          </Pressable>
        </View>
      </BlurTargetView>

      <CashoryAddTransactionModal
        visible={isAddTransactionVisible}
        onClose={() => setAddTransactionVisible(false)}
        onCreate={() => {
          setAddTransactionVisible(false);
        }}
      />
    </>
  );
}
