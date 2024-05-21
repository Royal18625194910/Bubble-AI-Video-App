import EmptyState from "@/components/custom/EmptyState";
import SearchInput from "@/components/custom/SearchInput";
import Trending from "@/components/custom/Trending";
import VideoCard from "@/components/custom/VideoCard";
import { icons, images, user } from "@/constants";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { videos } from "../(tabs)/home";
import { router, useLocalSearchParams } from "expo-router";
import useAppwrite from "@/hooks/useAppwrite";
import { getUserPosts, searchPosts, signOut } from "@/lib/appwrite";
import InfoBox from "@/components/custom/InfoBox";
import { useGlobalContext } from "@/context/GlobalProvider";

const Profile = () => {
  // const { query } = useLocalSearchParams();
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  console.log("posts", user.$id, posts);
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full pt-4">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            {/* 退出按钮 */}
            <TouchableOpacity
              className="flex w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            {/* 头像 */}
            <View className="w-16 h-16 border border-secondary-100 rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            {/* 用户名 */}
            <InfoBox
              title={user.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            {/* 文章和粉丝数 */}
            <View className="mt-5 flex flex-row">
              <InfoBox
                title={"0"}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title={"1.2k"}
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="没有视频" subTitle="没有搜索到相关视频" />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
