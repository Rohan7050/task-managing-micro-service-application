export interface LoginUser {
    email: string,
    password: string
}

export interface LoginResponse {
    message: string;
  data: {
    id: string;
    email: string;
  };
}