import { useState, type SyntheticEvent } from 'react';
import { createDiary } from '../services/diaryService';
import type { Diary } from '../types';

interface NewEntryFormProps {
  onUpdateDiary: (diaryEntry: Diary) => void;
}

const NewEntryForm = (props: NewEntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const savedDiary = await createDiary({ date, visibility, weather, comment });

    if (savedDiary) {
      props.onUpdateDiary(savedDiary);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label htmlFor="date">Date</label>
          <input
            id='date'
            value={date}
            type="text"
            onChange={(event) => setDate(event.target.value)}
          />
        </li>
        <li>
          <label htmlFor="visibility">Visibility</label>
          <input 
            id='visibility'
            type="text"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </li>
        <li>
          <label htmlFor="weather">Weather</label>
          <input 
            id='weather'
            type="text"
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </li>
        <li>
          <label htmlFor="comment">Comment</label>
          <input 
            id='comment'
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </li>
        <li>
          <button type="submit">add</button>
        </li>
      </ul>
    </form>
  )
}

export default NewEntryForm;