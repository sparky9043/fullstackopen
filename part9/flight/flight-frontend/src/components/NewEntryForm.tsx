import { useState, type SyntheticEvent } from 'react';
import { createDiary } from '../services/diaryService';
import type { Diary } from '../types';
import axios from 'axios';

interface NewEntryFormProps {
  onUpdateDiary: (diaryEntry: Diary) => void;
  onUpdateErrorMessage: (message: string) => void;
}

const NewEntryForm = (props: NewEntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const updateWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value);
  }

  const updateVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value);
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!date || !visibility || !weather || !comment) {
      props.onUpdateErrorMessage('Make sure to completed all the fields');
      throw new Error('Make sure to completed all the fields');
    }

    try {
      const diary = await createDiary({ date, visibility, weather, comment });
      props.onUpdateDiary(diary);

      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        props.onUpdateErrorMessage(error.response?.data ?? 'Failed to create diary');
      } else if (error instanceof Error) {
        props.onUpdateErrorMessage(error.message);
      } else {
        props.onUpdateErrorMessage('Unexpected error occurred');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new entry</h2>
      <ul>
        <li>
          <label htmlFor="date">Date</label>
          <input
            id='date'
            value={date}
            type="date"
            onChange={(event) => setDate(event.target.value)}
          />
        </li>
        <li>
          <fieldset>
            <legend>Visibility</legend>
            <div>
              <input
                type="radio"
                name="visibility"
                value="great"
                id="great"
                onChange={updateVisibility}
              />
              <label htmlFor="great">great</label>
            </div>
            <div>
              <input
                type="radio"
                name="visibility"
                value="good"
                id="good"
                onChange={updateVisibility}
              />
              <label htmlFor="good">good</label>
            </div>
            <div>
              <input
                type="radio"
                name="visibility"
                value="ok"
                id="ok"
                onChange={updateVisibility}
              />
              <label htmlFor="ok">ok</label>
            </div>
            <div>
              <input
                type="radio"
                name="visibility"
                value="poor"
                id="poor"
                onChange={updateVisibility}
              />
              <label htmlFor="poor">poor</label>
            </div>
          </fieldset>
        </li>
        <li>
          <fieldset>
            <legend>Weather</legend>
            <div>
              <input
                type="radio"
                name="weather"
                value="rainy"
                id="rainy"
                onChange={updateWeather}
              />
              <label htmlFor="rainy">rainy</label>
            </div>
            <div>
              <input
                type="radio"
                name="weather"
                value="sunny"
                id="sunny"
                onChange={updateWeather}
              />
              <label htmlFor="sunny">sunny</label>
            </div>
            <div>
              <input
                type="radio"
                name="weather"
                value="windy"
                id="windy"
                onChange={updateWeather}
              />
              <label htmlFor="windy">windy</label>
            </div>
            <div>
              <input
                type="radio"
                name="weather"
                value="cloudy"
                id="cloudy"
                onChange={updateWeather}
              />
              <label htmlFor="cloudy">cloudy</label>
            </div>
          </fieldset>
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