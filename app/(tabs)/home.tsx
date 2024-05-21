import EmptyState from "@/components/custom/EmptyState";
import SearchInput from "@/components/custom/SearchInput";
import Trending from "@/components/custom/Trending";
import VideoCard from "@/components/custom/VideoCard";
import { images } from "@/constants";
import useAppwrite from "@/hooks/useAppwrite";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export const videos = [
  {
    title: "Get inspired to code",
    thumbnail: "http:///p0.qhimg.com/t01a3d15d1c3eb047aa.jpg",
    video:
      "https://txmov2.a.kwimgs.com/upic/2023/12/09/20/BMjAyMzEyMDkyMDAzNTlfMTcxODU5OTY2NV8xMTkyNDA5NDYwNDBfMl8z_b_Bd995aef8919e6a9339d1a277d19f16ed.mp4?clientCacheKey=3xa95vrfdsf5wt9_b.mp4&tt=b&di=78e498d6&bp=14214",
    prompt:
      "Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language",
  },
  {
    title: "How AI Shapes Coding Future",
    thumbnail: "http:///p8.qhimg.com/t01941321a72d8d5bd3.jpg",
    video:
      "https://alimov2.a.kwimgs.com/upic/2023/05/31/08/BMjAyMzA1MzEwODE5MjRfMTk1NTgzODk4MF8xMDQzNzg1MjYyMjdfMV8z_b_B30746b6f0b6a53290c0e66327243a954.mp4?clientCacheKey=3xhw4yusdv66dis_b.mp4&tt=b&di=78e498d6&bp=14214",
    prompt: "Picture the future of coding with AI. Show AR VR",
  },
  {
    title: "Dalmatian's journey through Italy",
    thumbnail: "http:///p8.qhimg.com/t013759cbbb72642670.jpg",
    video:
      "https://alimov2.a.kwimgs.com/upic/2023/03/04/18/BMjAyMzAzMDQxODQ2MTdfMTMwMTUxNjg3M185NzQ4ODg4NDkzMl8yXzM=_b_B7c2444e4e7e2f71d82282d57d9daff89.mp4?clientCacheKey=3xh3x5ug7va4wby_b.mp4&tt=b&di=78e498d6&bp=14214",
    prompt:
      "Create a heartwarming video following the travels of dalmatian dog exploring beautiful Italy",
  },
  {
    title: "Meet small AI friends",
    thumbnail: "http:///p6.qhimg.com/t017b95ee854e7da6d2.jpg",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660f0b7855304dd4f802/view?project=660d0e00da0472f3ad52",
    prompt:
      "Make a video about a small blue AI robot blinking its eyes and looking at the screen",
  },
  {
    title: "Find inspiration in Every Line",
    thumbnail: "http:///p1.qhimg.com/t012a5b7f84fb82b8a6.jpg",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd2cec9eb0298c9ac/view?project=660d0e00da0472f3ad52",
    prompt:
      "A buy working on his laptop that sparks excitement for coding, emphasizing the endless possibilities and personal growth it offers",
  },
  {
    title: "Japan's Blossoming temple",
    thumbnail: "http:///p0.qhimg.com/t0165804b6ac1cadd67.jpg",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd543cc4792ba0611/view?project=660d0e00da0472f3ad52",
    prompt: "Create a captivating video journey through Japan's Sakura Temple",
  },
  {
    title: "A Glimpse into Tomorrow's VR World",
    thumbnail: "http:///p9.qhimg.com/t0128c8f01dfe06cdfd.jpg",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd6b103374105e099/view?project=660d0e00da0472f3ad52",
    prompt: "An imaginative video envisioning the future of Virtual Reality",
  },
  {
    title: "A World where Ideas Grow Big",
    thumbnail: "http:///p0.qhimg.com/t0195cf573d0053ce4e.jpg",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd84ce8c5ff020f71/view?project=660d0e00da0472f3ad52",
    prompt:
      "Make a fun video about hackers and all the cool stuff they do with computers",
  },
];

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
            // creator={item.creator.username}
            // avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            {/* 第一行 */}
            <View className="flex justify-between items-start flex-row mb-6">
              {/* 欢迎语 */}
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="text-2xl font-pmedium text-white">Bubble</Text>
              </View>
              {/* logo */}
              <View className="">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            {/* 第二行 */}
            <SearchInput />
            {/* 第三行 */}
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>
              <Trending posts={posts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="没有视频" subTitle="还没有创建过任何视频" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
