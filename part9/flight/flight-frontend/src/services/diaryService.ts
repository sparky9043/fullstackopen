import axios from 'axios';
import type { Diary, NewDiary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = async () => {
  return axios.get<Diary[]>(baseUrl)
    .then(response => response.data);
}

export const createDiary = async (newDiary: NewDiary) => {
  return axios.post<Diary>(baseUrl, newDiary)
    .then(response => response.data);
}