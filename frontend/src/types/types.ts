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
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  image?: string;
}
