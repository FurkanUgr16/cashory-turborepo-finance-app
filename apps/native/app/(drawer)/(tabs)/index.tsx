import { View, Text, ScrollView, Image, Pressable } from "react-native";
import Container from "@/components/containers/container";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthSession } from "@/hooks/use-auth";
import { ONBOARDING_FONT_FAMILY } from "@/lib/const/onboarding-typography";
import { Link } from "expo-router";
import { useAuthTheme } from "@/hooks/use-auth-theme";
import { GeneralSearch } from "@/components/ui/icons/general.search";
import { GeneralAlarm } from "@/components/ui/icons/general-alarm";
import CashoryCardBalance from "@/components/containers/cashory-card-balance";
import CashoryIncomeExpense from "@/components/containers/cashory-income-expense";
import { useState } from "react";
import CashoryBudgetPlanCard from "@/components/containers/cashory-plan-budget-card";
import CashoryInvoiceCard from "@/components/containers/cashory-invoice-card";

const MONTH_ABBRS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type MonthAbbr = (typeof MONTH_ABBRS)[number];

export default function HomePage() {
  const currentMonthAbbr = MONTH_ABBRS[new Date().getMonth()];
  const [budgetMonth, setBudgetMonth] = useState(currentMonthAbbr);
  const { data: session } = useAuthSession();

  const { isDark } = useAuthTheme();
  const iconColor = isDark ? "#fff" : "#000";

  const user = session?.data?.user;

  const insets = useSafeAreaInsets();

  return (
    <Container className="p-4 md:p-6" isScrollable={false}>
      <ScrollView
        className="flex-1 w-full"
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom + 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between mb-8 w-full pt-1">
          <View className="flex-row items-center gap-2.5">
            {user?.image ? (
              <Image
                source={{ uri: user.image }}
                className="w-12.5 h-12.5 rounded-[40px]"
                resizeMode="cover"
              />
            ) : (
              <View className="w-12.5 h-12.5 rounded-[40px] bg-brand-green-500 items-center justify-center">
                <Text
                  className="text-[22px] text-brand-white"
                  style={{ fontFamily: ONBOARDING_FONT_FAMILY.bold }}
                >
                  {user?.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View className="flex-col justify-center gap-y-1">
              <Text
                className="text-[14px] leading-3.5 text-brand-black dark:text-brand-white"
                style={{ fontFamily: "PlusJakartaSans_400Regular" }}
              >
                Welcome,
              </Text>
              <Text
                className="text-h4 leading-5 text-brand-black dark:text-brand-white"
                style={{ fontFamily: "PlusJakartaSans_700Bold" }}
              >
                {user?.name.toUpperCase()}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-x-2.5">
            <Pressable className="w-12.5 h-12.5 rounded-[40px] bg-brand-flashwhite dark:bg-brand-green-800 items-center justify-center">
              <GeneralSearch color={iconColor} width={23} height={23} />
            </Pressable>
            <Link href="/notifications" asChild>
              <Pressable className="w-12.5 h-12.5 rounded-[40px] bg-brand-flashwhite dark:bg-brand-green-800 items-center justify-center">
                <GeneralAlarm color={iconColor} width={23} height={23} />
              </Pressable>
            </Link>
          </View>
        </View>

        <View className="flex-col w-full gap-y-2.5 mb-7">
          <CashoryCardBalance
            totalBalance={5000}
            earned={5000}
            spent={2000}
            available={3000}
            savings={5000 - 2000}
          />
          <Pressable
            className="w-full bg-brand-green-500 items-center justify-center p-4 min-h-14.25"
            style={{ borderRadius: 50 }}
          >
            <Text
              className="text-[16px] leading-4.75 text-brand-white"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
            >
              Scan here
            </Text>
          </Pressable>
        </View>
        <View className="flex-col w-full gap-y-2.5 mb-7">
          <CashoryIncomeExpense
            incomeAmount={1000}
            expenseAmount={1500}
            dateLabel="This Month"
          />
          <CashoryBudgetPlanCard
            month="Oct"
            onMonthChange={setBudgetMonth}
            availableCash={1500}
          />
        </View>
        {/*
        <View className="flex-col w-full gap.y-2.5 mb-7">
          <View className="flex-row items-end justify-between w-full mb-1">
            <Text
              className="text-xl leading-6.25 text-brand-black dark:text-brand-white"
              style={{
                fontFamily: "OpenSans_700Bold",
              }}
            >
              Invoice
            </Text>
            <Link href={"/invoices"} asChild>
              <Pressable>
                <Text
                  className="text-[14px] leading-3.75 text-brand-black dark:text-brand-white"
                  style={{ fontFamily: "OpenSans_400Regular" }}
                >
                  See all
                </Text>
              </Pressable>
            </Link>
          </View>
          {isLoadingInvoices ? (
            <View className="items-center py-6">
              <ActivityIndicator size="small" />
            </View>
          ) : recentInvoices.length === 0 ? (
            <View className="items-center py-6">
              <Text
                className="text-[13px] text-brand-grey dark:text-gray-400"
                style={{ fontFamily: "PlusJakartaSans_400Regular" }}
              >
                No invoices yet
              </Text>
            </View>
          ) : (
            recentInvoices.map((inv: any) => (
              <CashoryInvoiceCard
                key={inv.id}
                title={inv.clientName || inv.invoiceNumber}
                datetime={format(new Date(inv.createdAt), "yyyy-MM-dd HH:mm")}
                amount={inv.total}
                status={mapStatus(inv.status)}
                onPress={() => router.push(`/invoice/${inv.id}`)}
              />
            ))
          )}
        </View>*/}
      </ScrollView>
    </Container>
  );
}
