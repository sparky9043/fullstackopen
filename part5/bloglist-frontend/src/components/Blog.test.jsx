import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('render contents', () => {
  const blog = {
    title: 'this is the way',
    author: 'the mandalorian',
    url: 'http://themandalorian.com',
    likes: 341,
  }

  render(<Blog blog={blog} />)

  screen.debug()
})