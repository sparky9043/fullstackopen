import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { NotificationContext } from '../contexts/NotificationContext'
import Toggleable from './Toggleable'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import { useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Blog from './Blog'

const HomePage = () => {
  const [user, userDispatch] = useContext(CurrentUserContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const blogFormRef = useRef()

  const queryClient = useQueryClient()

  const createNewBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteOne,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    }
  })

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    }
  })

  const handleDeleteBlog = (id) => {
    deleteBlogMutation.mutate(id)
    notificationDispatch({
      type: 'updateNotification',
      payload: 'post successfully deleted!',
    })
    setTimeout(() => {
      notificationDispatch({ type: 'removeNotification' })
    }, 5000)
  }

  const handleLike = async (newObject) => {
    try {
      likeBlogMutation.mutate(newObject)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleCreateBlog = (blogObject) => {
    createNewBlogMutation.mutate(blogObject)
    blogFormRef.current.setVisibility()
  }

  const handleLogout = () => {
    console.log('logged out successfully')
    window.localStorage.removeItem('userLoginBlogApp')
    userDispatch({ type: 'removeUser' })
    notificationDispatch({ type: 'updateNotification', payload: 'logged out successfully' })
    setTimeout(() => {
      notificationDispatch({ type: 'removeNotification' })
    }, 5000)
  }


  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if (result.isLoading) {
    return <div>Waiting to load...</div>
  }

  const blogs = result.data

  if (!blogs) {
    return (
      <div>Waiting to load...</div>
    )
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <p>This is the homepage!</p>
      <div>
        {user.name} logged in
        <span>
          <button onClick={handleLogout}>logout</button>
        </span>
      </div>

      <Toggleable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Toggleable>

      {sortedBlogs.map((blog, index) =>
        <Blog
          key={blog.id}
          blog={blog} 
          likePost={handleLike}
          deletePost={handleDeleteBlog}
          user={user}
        />
      )}
    </div>

  )
}

export default HomePage