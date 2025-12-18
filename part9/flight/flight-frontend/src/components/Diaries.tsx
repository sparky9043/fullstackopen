import type { Diary } from '../types';
import DiaryEntry from './DiaryEntry';

interface DiariesProps {
  diaries: Diary[],
}

const Diaries = (props: DiariesProps) => {
  
  return (
    <div>
      <h2>Diary entries</h2>
      <ul>
        {props.diaries.map(diary => <DiaryEntry key={diary.id} diary={diary} />)}
      </ul>
    </div>
  )
}

export default Diaries;