const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, clickButton } = require('./helper')

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
      await createBlog(page, 'first blog', 'john', 'http://someurl.co.uk')

      await expect(page.getByText('first blog')).toBeVisible()
      await expect(page.getByText('john')).toBeVisible()
    })

    test('clicking view displays like button in task and blog can be liked', async ({ page }) => {
      await createBlog(page, 'first blog', 'john', 'http://someurl.co.uk')

      await clickButton(page, 'first blog', 'view')
      await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
      await expect(page.getByText('0')).toBeVisible()
      await clickButton(page, 'first blog', 'like')
      await expect(page.getByText('1')).toBeVisible()
    })

    describe('when there are pre-defined blogs', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog', 'john', 'http://one.co.uk')
        await createBlog(page, 'second blog', 'mary', 'http://two.co.uk')
        await createBlog(page, 'third blog', 'jane', 'http://three.co.uk')
      })

      test('test reached', async({ page }) => {
        page.on('dialog', async (dialog) => {
          console.log(`Dialog type: ${dialog.type()}`)
          console.log(`Dialog message: ${dialog.message()}`)

          await dialog.accept()
        })

        const secondBlog = await page.getByText('second blog').locator('..')
        await secondBlog.getByRole('button', { name: 'view' }).click()
        await secondBlog.getByRole('button', { name: 'remove'}).click()

        await expect(secondBlog).not.toBeVisible()
        await page.pause()
      })
    })
  })
})