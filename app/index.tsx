import { Text, ScrollView, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/custom/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Welcome() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          {/* logo */}
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          {/* card */}
          <Image
            source={images.cards}
            className="max-w-[380px] h-[298px] w-full"
            resizeMode="contain"
          />
          {/* 文字描述 */}
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless {"\n"}
              Possibilities with {"\n"}
              <Text className="text-secondary-200">Bubble Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-2"
              resizeMode="contain"
            />
          </View>
          {/* 宣传语 */}
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            创意与创新相遇：与奥拉一起踏上无限探索之旅
          </Text>
          {/* 继续按钮 */}
          <CustomButton
            title="继续"
            handlePress={() => router.push("sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="transparent" />
    </SafeAreaView>
  );
}
