import { LoginProps } from '@/pages/Login';
import { SignupProps } from '../pages/Signup'; // SignupProps를 올바르게 가져옵니다.
import { httpClient } from './http';

export const signup = async (userData: SignupProps) => {
  try {
    const response = await httpClient.post('/users/signup', userData); // 회원가입 데이터를 서버에 전달합니다.
    return response.data;
  } catch (error) {
    console.error('회원가입 오류:', error);
    throw error;
  }
};

export const resetRequest = async (data: SignupProps) => {
  const response = await httpClient.post('/users/reset', data);
  return response.data;
};

export const resetPassword = async (data: SignupProps) => {
  const response = await httpClient.put('/users/reset', data);
  return response.data;
};

interface LoginResponse {
  token: string;
}
export const signin = async (data: LoginProps) => {
  const response = await httpClient.post<LoginResponse>('/users/signin', data);

  return response.data;
};
