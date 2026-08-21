export interface Game {
  id: string;
  title: string;
  genre: string;
  rating: number;
  reviewsCount?: string;
  image?: string;
  description?: string;
}
export interface Game {
  id: string;
  title: string;
  genre: string;
  description: string;
  rating: number;
  imageUrl?: string;
  demoAvailable?: boolean;
}

export interface Hub {
  id: string;
  slug: string;
  name: string;
  category: string;
  members: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface UserProfile {
  id: string;
  username: string;
  handle: string;
  avatarUrl?: string;
  bio: string;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  rating: number;
  reviewsCount?: string;
  tags?: string[];
  image?: string;
  description?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

