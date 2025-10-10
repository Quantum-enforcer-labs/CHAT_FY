export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  profilePic?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  image: string | null;
}

export interface Contact {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageData {
  text: string;
  image: string | null;
}
