import { useEffect, useState } from 'react'
import type { Diary } from './types'
import Diaries from './components/Diaries'
import { getAllDiaries } from './services/diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[] | null>(null);

  useEffect(() => {
    getAllDiaries()
      .then(data => setDiaries(data));
  }, []);

  if (!diaries) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
