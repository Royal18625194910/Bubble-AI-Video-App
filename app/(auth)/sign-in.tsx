import { View, Text, ScrollView, Image, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/custom/FormField";
import CustomButton from "@/components/custom/CustomButton";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";

const SignIn = () => {
  //  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.password || !form.email)
      return Alert.alert("Error", "请输入完整信息");
    try {
      setSubmitting(true);
      const res = await signIn(form.email, form.password);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full px-2">
      <ScrollView>
        <View>
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>
          {/* 邮箱 */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          {/* 密码 */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          {/* 提交按钮 */}
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          {/* 注册提示 */}
          <View className="flex justify-center pt-5 flex-row gap-3">
            <Text className="text-lg text-gray-100 font-pregular">
              你有账号吗?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary-100"
            >
              SignUp
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
