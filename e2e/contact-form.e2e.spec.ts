/**
 * E2E tests for the Contact Form
 *
 * Tests user flows in the browser
 */

import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  // Before each test: navigate to the contact page
  test.beforeEach(async ({ page }) => {
    await page.goto('/connect')
  })

  // TEST 1: Form is displayed
  test('displays the form', async ({ page }) => {
    // Check: all fields are visible
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  // TEST 2: Form can be filled out and submitted
  test('can submit the form', async ({ page }) => {
    // Step 1: fill out the form
    await page.locator('input[name="name"]').fill('Max Mustermann')
    await page
      .locator('input[name="email"]')
      .fill('max.mustermann@test-example.com')
    // Topic is a required field (select) — form won't submit without it
    await page.locator('select[name="topic"]').selectOption('other')
    await page
      .locator('textarea[name="message"]')
      .fill('Hey hey! This is a test message.')

    // Step 2: submit
    await page.locator('button[type="submit"]').click()

    // Step 3: check - success message appears
    await expect(page.getByText('Message sent successfully')).toBeVisible()
  })

  // TEST 3: Empty form is not accepted
  test('validates empty form', async ({ page }) => {
    // Submit without filling anything
    await page.locator('button[type="submit"]').click()

    // Check: browser shows validation error
    const nameInput = page.locator('input[name="name"]')
    const isInvalid = await nameInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid,
    )

    expect(isInvalid).toBe(true)
  })
})
