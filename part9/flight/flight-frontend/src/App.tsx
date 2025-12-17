import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Diary } from './types'
import Diaries from './components/Diaries'
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
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
