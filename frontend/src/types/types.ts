export interface User {
  id?: string;
  fullName: string;
  email: string;
  password: string;
}

export interface credentials {
  email: string;
  password: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}
