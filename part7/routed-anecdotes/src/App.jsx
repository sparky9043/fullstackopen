/* eslint-disable react/prop-types */
import { useState } from 'react'
import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Anecdote from './components/Anecdote'
import { useNotification } from './hooks'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const {notification, updateNotification} = useNotification(5)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: '5px'
  }

  const match = useMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdoteById(Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
        <Menu>
          <Link to='/' style={padding}>anecdotes</Link>
          <Link to='/create' style={padding}>create new</Link>
          <Link to='/about' style={padding}>about</Link>
          {notification
            ? <p>{notification}</p>
            : null
          }
        </Menu>

        <Routes>
          <Route
            path='/'
            element={<AnecdoteList anecdotes={anecdotes} />}
          />
          <Route
            path='/anecdotes/:id'
            element={<Anecdote anecdote={anecdote} />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/create'
            element={<CreateNew
                      addNew={addNew}
                      updateNotification={updateNotification}
                    />}
          />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
