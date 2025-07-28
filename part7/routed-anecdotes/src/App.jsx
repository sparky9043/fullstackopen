/* eslint-disable react/prop-types */
import { useState } from 'react'
import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


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

  const [notification, setNotification] = useState('')

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

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu>
          <a href='#' style={padding}>anecdotes</a>
          <a href='#' style={padding}>create new</a>
          <a href='#' style={padding}>about</a>
        </Menu>

        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        </Routes>

      </Router>
      {/* <AnecdoteList anecdotes={anecdotes} /> */}
      {/* <About /> */}
      {/* <CreateNew addNew={addNew} /> */}
      <Footer />
    </div>
  )
}

export default App
