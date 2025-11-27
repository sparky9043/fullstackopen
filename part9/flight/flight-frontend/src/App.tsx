import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import type { Diary } from './types'
const baseUrl = 'http://localhost:3000/api/diaries'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[] | null>(null);

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => setDiaries(response.data));
  }, []);

  if (!diaries) {
    return <p>Loading...</p>
  }
  
  return (
    <div>
      {diaries.map(diary => <li key={diary.id}>{diary.weather}</li>)}
    </div>
  )
}

export default App
