import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    ).container
  })

  test('render contents', async () => {
    await screen.findAllByText('this is the way')
  })

  test('blog title and author rendered', () => {
    const titleEl = container.querySelector('#blog-title')
    const authorEl = container.querySelector('#blog-author')

    expect(titleEl).toHaveTextContent(blog.title)
    expect(authorEl).toHaveTextContent(blog.author)
  })

  test('blog url and likes not rendered without click', () => {
    const urlEl = screen.queryByText(blog.url)
    const likesEl = screen.queryByText(blog.likes)

    expect(urlEl).toBeNull()
    expect(likesEl).toBeNull()
  })

  test.only('pressing view button renders blog url and likes', async () => {
    const user = userEvent.setup()
    const viewButton = container.querySelector('#view-button')
    await user.click(viewButton)

    const urlEl = container.querySelector('#blog-url')
    const likesEl = container.querySelector('#blog-likes')

    expect(urlEl).toHaveTextContent(blog.url)
    expect(likesEl).toHaveTextContent(blog.likes)
  })
})