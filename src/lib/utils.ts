import axios from "axios";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const api = axios.create({
  baseURL: 'https://ethanol-09r4.onrender.com/api/v1',
  withCredentials: true, // include credentials for authenticated requests
});

export async function getCurrentUser() {
  try {
    const response = await axios.get('https://ethanol-09r4.onrender.com/api/v1/users/getUser');
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Failed to fetch user');
  }
}

