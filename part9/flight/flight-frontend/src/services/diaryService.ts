import axios from 'axios';
import type { Diary, NewDiary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = async () => {
  return axios.get<Diary[]>(baseUrl)
    .then(response => response.data);
}

export const createDiary = async (newDiary: NewDiary) => {
  try {
    const response = await axios.post<Diary>(baseUrl, newDiary)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error;
    }
  }
}