import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({
  title,
  thumbnail,
  video,
  creator = "bubble",
  avatar = "",
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          {/* 头像 */}
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary-100 flex justify-center items-center p-0.5">
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          {/* 标题和作者 */}
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>
        {/* 菜单按钮 */}
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {/* 视频 */}
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 flex justify-center items-center relative"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          {/* 封面 */}
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          {/* 播放按钮 */}
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
