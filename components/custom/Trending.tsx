import { icons } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { ResizeMode, Video } from "expo-av";
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    console.log(play);
    if (play) {
      videoRef.current.playAsync();
    }
  }, [play]);

  return (
    <Animatable.View
      className="mr-5"
      animation={(activeItem.title === item.title ? zoomIn : zoomOut) as any}
      duration={500}
    >
      {play ? (
        <Video
          ref={videoRef}
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-2xl mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          onPlaybackStatusUpdate={(status: any) => {
            console.log(status);
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-2xl my-5 overflow-hidden shadow-lg shadow-black-100/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const onViewableItemsChanged = ({ changed }) => {
    if (changed.length) {
      setActiveItem(changed[0].item);
    }
  };
  return (
    <FlatList
      horizontal
      data={posts}
      keyExtractor={(item) => item.title}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 150 }}
      contentOffset={{ x: 0, y: 0 }}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
    />
  );
};

export default Trending;
