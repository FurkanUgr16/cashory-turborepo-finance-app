import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

const Page = () => {
  const { data: session, isPending } = useAuth();

  useEffect(() => {
    if (isPending) {
    }
  }, []);

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
