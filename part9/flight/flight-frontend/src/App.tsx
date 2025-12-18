import { useEffect, useState } from 'react';
import type { Diary } from './types';
import Diaries from './components/Diaries';
import { getAllDiaries } from './services/diaryService';
import NewEntryForm from './components/NewEntryForm';
import './App.css';
import Error from './components/Error';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries()
      .then(data => setDiaries(data));
  }, [diaries]);

  if (!diaries) {
    return <p>Loading...</p>
  }

  const updateDiaries = (diaryEntry: Diary) => {
    setDiaries(diaries.concat(diaryEntry));
  }

  const updateErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  }

  return (
    <div>
      {errorMessage && <Error errorMessage={errorMessage} />}
      <NewEntryForm
        onUpdateDiary={updateDiaries}
        onUpdateErrorMessage={updateErrorMessage}
      />
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
