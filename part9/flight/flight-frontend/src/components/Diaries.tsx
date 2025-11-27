import type { Diary } from '../types';
import DiaryEntry from './DiaryEntry';

interface DiariesProps {
  diaries: Diary[],
}

const Diaries = (props: DiariesProps) => {
  
  return (
    <ul>
      {props.diaries.map(diary => <DiaryEntry key={diary.id} diary={diary} />)}
    </ul>
  )
}

export default Diaries;