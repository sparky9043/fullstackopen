import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'this is the way',
    author: 'the mandalorian',
    url: 'http://themandalorian.com',
    likes: 341,
  }

  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} />      
    )
  })

  test('render contents', async () => {
    await screen.findAllByText('this is the way')
    screen.debug()
  })

})