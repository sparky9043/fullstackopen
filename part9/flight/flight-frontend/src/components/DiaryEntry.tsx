import type { Diary } from '../types';

interface DiaryEntryProps {
  diary: Diary,
}

const DiaryEntry = ({ diary }: DiaryEntryProps) => {
  return <li>
    <div>{diary.date}</div>
    <div>{diary.visibility}</div>
    <div>{diary.weather}</div>
  </li>
}

export default DiaryEntry;