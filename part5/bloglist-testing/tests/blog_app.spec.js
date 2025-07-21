const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'example',
        name: 'jonathan winters',
        password: 'password123',
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'example', 'password123')

      await expect(page.getByText('jonathan winters logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'invaliduser', 'badpassword')

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'example', 'password123')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'first blog',
        'jenna marbles',
        'http://someurl.co.uk',
      )

      await expect(page.getByText('first blog')).toBeVisible()
      await expect(page.getByText('jenna marbles')).toBeVisible()
    })
  })
})