export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  image: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

 