import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { images } from "@/constants";

const EmptyState = ({ title, subTitle }) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[216px]"
        resizeMode="contain"
      />
      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-pmedium text-white mt-2">
        {subTitle}
      </Text>
      <CustomButton
        title="返回"
        handlePress={() => router.push("/home")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
