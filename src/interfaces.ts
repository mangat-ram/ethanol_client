export interface User {
  _id: string;
  userName: string;
  name: string;
  email: string;
  verifyCode: string;
  isVerified: boolean;
  verifyCodeExpiry: string;
  labs: any[]; // Replace `any` with the specific type if available
  compounds: any[]; // Replace `any` with the specific type if available
  molecules: any[]; // Replace `any` with the specific type if available
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LoginAuthResponse {
  statusCode: Number,
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}

export interface ErrorMsgs{
  error: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,
};

export interface ThunkInterface{
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ChildrenType{
  children: React.ReactNode
}

export interface LabType{
  "_id": string,
  "labName": string,
  "labMaker": string,
  "compounds": Array<any>[],
  "molecules": Array<any>[],
  "createdAt": Date,
  "updatedAt": Date,
  "__v": number
}