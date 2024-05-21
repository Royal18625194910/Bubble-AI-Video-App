import { videos } from "@/app/(tabs)/home";
import { Alert } from "react-native";
import { Client, Account, ID, Avatars, Databases,Query,Storage } from "react-native-appwrite";
import "react-native-url-polyfill";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1", // 开放接口
  platform: "com.android.bubble.aora", // 项目地址
  projectId: "664315660020bf0fa25b", // 项目id
  databaseId: "664317ba001350f46dab", // 数据库id
  userCollectionId: "664317da00281f280af0", // user数据集id
  videoCollectionId: "66431817000005e17c98", // video数据集id
  storageId: "66431a6b001569242d09", // storageId
};
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform);
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

/**
 * 创建用户
 * @param param0 
 * @returns 
 */
export const createUser = async ({ email, password, username }) => {
  const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    username
  );
  if (!newAccount) throw Error;
  const avatarUrl = avatars.getInitials(username);
  await signIn(email, password);

  // 将用户信息添加到数据库中
  const newUser = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    ID.unique(),
    {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl,
    }
  );
  return newUser;
};

/**
 * 登录
 * @param email
 * @param password
 * @returns
 */
export const signIn = async (email, password) => {
  const session = await account.createEmailPasswordSession(email, password);
  return session;
};

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}
/**
 * 获取当前登录的用户
 */
export async function getCurrentUser() {
  const currentAccount = await getAccount()
  try {
    if ( !currentAccount ) throw Error
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId',currentAccount.$id)]
    )
    if ( !currentUser ) throw Error
    return currentUser.documents[0]
  } catch (error) {
     console.log(error);
    return null;
  }
}

/**
 * 退出登录
 * @returns 
 */
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 获取所有视频
 * @returns 
 */
export async function getAllPosts() {
  try {
    const res = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId)
  return res.documents
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 获取最新视频
 * @returns 
 */
export async function getLatestPosts() {
  try {
    const res = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.orderDesc('$createdAt',Query.limit(7))]
  )
  return res.documents
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 获取搜索视频
 * @param query 
 */
export async function searchPosts(query) {
  try {
    const res = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.search('title',query)]
    )
  return res.documents
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 获取该用户所有文章
 * @param userId 
 * @returns 
 */
export async function getUserPosts(userId) {
  try {
    const res = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.equal('creator',userId)]
    )
  return res.documents
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 上传文件
 * @param file 
 * @param type 
 * @returns 
 */
export async function uploadFile(file, type) {
  if (!file) return;

  const asset = { 
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }
   
  try {
   const res = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(res.$id, type);
    console.log('fileUrl',fileUrl);

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 获取预览文件url
 * @param fileId 
 * @param type 
 * @returns 
 */
export async function getFilePreview(fileId, type) {
  let fileUrl;
  try {
    if ( type === 'video') {
      fileUrl = storage.getFileView(appwriteConfig.storageId,fileId)
    } else if ( type === 'image' ) {
      fileUrl = storage.getFilePreview(appwriteConfig.storageId,fileId,2000,2000,'top',100)
    } else {
      throw new Error('Invalid file type')
    }
    if ( !fileUrl ) throw Error
    return fileUrl
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * 创建视频文章
 * @param form 
 * @returns 
 */
export async function createVideoPost(form) {
  console.log('form',form);
  
  try {
    const thumbnailUrl = await uploadFile(form.thumbnail,'image')
    const videoUrl = await uploadFile(form.video,'video')
    console.log('{thumbnailUrl,videoUrl}',{thumbnailUrl,videoUrl});
    
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    )
    return newPost
  } catch (error) {
    throw new Error(error)
  }
}