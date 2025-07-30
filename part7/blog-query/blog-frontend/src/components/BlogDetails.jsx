import { useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const BlogDetails = ({ blog }) => {
  const [comments, setComments] = useState('')
  const clientQuery = useQueryClient()
  const newCommentMutation = useMutation({
    mutationFn: blogService.comment,
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  if (!blog) {
    return <p>invalid blog...</p>
  }

  const handleComment = (event) => {
    event.preventDefault()
    if (!comments) return
    newCommentMutation.mutate({ comments, id: blog.id })
    setComments('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.likes} likes</p>
      <p>added by {blog.author}</p>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleComment}>
        <label>
          add comments:
          <input
            value={comments}
            onChange={(event) => setComments(event.target.value)}
            type="text"
          />
        </label>
        <button type="submit">leave comment</button>
      </form>
    </div>
  )
}

export default BlogDetails
