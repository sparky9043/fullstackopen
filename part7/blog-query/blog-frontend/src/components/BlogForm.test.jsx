import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import BlogForm from './BlogForm'

test.only('<BlogForm /> takes in blog properly', async () => {
  const createBlog = vi.fn()

  const { container } = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')

  const user = userEvent.setup()
  const createButton = screen.getByText('create')
  await user.type(titleInput, 'title rendered properly')
  await user.type(authorInput, 'author good')
  await user.type(urlInput, 'http://url.com')
  await user.click(createButton)

  // const result = createBlog.mock.calls[0][0]

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title rendered properly')
  expect(createBlog.mock.calls[0][0].author).toBe('author good')
  expect(createBlog.mock.calls[0][0].url).toBe('http://url.com')
})