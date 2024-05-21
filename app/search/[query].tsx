import EmptyState from "@/components/custom/EmptyState";
import SearchInput from "@/components/custom/SearchInput";
import Trending from "@/components/custom/Trending";
import VideoCard from "@/components/custom/VideoCard";
import { images } from "@/constants";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { videos } from "../(tabs)/home";
import { useLocalSearchParams } from "expo-router";
import useAppwrite from "@/hooks/useAppwrite";
import { searchPosts } from "@/lib/appwrite";

const SearchQuery = () => {
  const { query } = useLocalSearchParams();
  const { data, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            // creator={item.creator.username}
            // avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4 py-3">
              <Text className="font-pmedium text-gray-100 text-sm">
                🔍搜索结果
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>
              <View className="my-4">
                <SearchInput initialQuery={query as string} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="没有视频" subTitle="没有搜索到相关视频" />
        )}
      />
    </SafeAreaView>
  );
};

export default SearchQuery;
