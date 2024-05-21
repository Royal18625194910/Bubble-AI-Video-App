import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery = "" }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    console.log("query", query);
    if (!query) {
      return Alert.alert("请输入查询关键词");
    }
    if (pathname.startsWith("/search")) return router.setParams({ query });
    router.push(`/search/${query}`);
  };
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary-100">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        placeholder="请输入搜索视频标题"
        placeholderTextColor="#cdcde0"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
