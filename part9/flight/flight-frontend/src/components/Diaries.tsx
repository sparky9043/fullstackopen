import type { Diary } from '../types';

interface DiariesProps {
  diaries: Diary[],
}

const Diaries = (props: DiariesProps) => {
  
  return (
    <div>
      {props.diaries.map(diary => <li key={diary.id}>{diary.weather}</li>)}
    </div>
  )
}

export default Diaries;