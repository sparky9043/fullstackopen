import { useEffect, useState } from 'react';
import type { Diary } from './types';
import Diaries from './components/Diaries';
import { getAllDiaries } from './services/diaryService';
import NewEntryForm from './components/NewEntryForm';
import './App.css';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[] | null>(null);

  useEffect(() => {
    getAllDiaries()
      .then(data => setDiaries(data));
  }, [diaries]);

  if (!diaries) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <NewEntryForm />
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
