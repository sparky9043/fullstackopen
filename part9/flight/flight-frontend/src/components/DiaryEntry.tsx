import type { Diary } from '../types';

interface DiaryEntryProps {
  diary: Diary,
}

const DiaryEntry = ({ diary }: DiaryEntryProps) => {
  return <li>
    <h3>{diary.date}</h3>
    <p>visibility: {diary.visibility}</p>
    <p>weather: {diary.weather}</p>
  </li>
}

export default DiaryEntry;