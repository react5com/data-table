import { test, expect } from '@playwright/test';

test('find checkbox and press', async ({ page }) => {
  await page.goto('/');

  // Locate the "select all" checkbox
  const selectAllCheckbox = page.locator('#select-all');
  (
    await page.waitForSelector('#select-all', { state: 'visible', timeout: 40000 })).click;
  
    await selectAllCheckbox.waitFor({ state: 'visible', timeout: 40000 });
  
  // Find all other checkboxes
  const checkboxes = page.getByRole('checkbox').filter({ hasNot: page.locator('#select-all') });
  await checkboxes.first().waitFor({ state: 'visible', timeout: 40000 });
  const checkboxCount = await checkboxes.count();
  if (checkboxCount === 0) throw new Error('No checkboxes found to test');

  // Wait for at least one checkbox to be visible
  await checkboxes.first().waitFor({ state: 'visible', timeout: 40000 });

  // Ensure a known starting state: uncheck all first
  if (await selectAllCheckbox.isChecked()) {
    await selectAllCheckbox.uncheck({ force: true, timeout: 40000 }); // Use uncheck() instead of click()
  }
  
  // Test 1: Check all
  await selectAllCheckbox.check({ force: true, timeout: 40000 }); // Use check() instead of click()
  for (let i = 0; i < checkboxCount; i++) {
    await expect(checkboxes.nth(i)).toBeChecked();
  }
  // Test 2: Uncheck all
  await selectAllCheckbox.uncheck({ force: true, timeout: 40000 }); // Use uncheck() instead of click()
  for (let i = 0; i < checkboxCount; i++) {
    await expect(checkboxes.nth(i)).not.toBeChecked();
  }
  console.log('Verified toggle behavior for', checkboxCount, 'checkboxes');
 
});


test('click element "Name" and sort', async ({ page }) => {
  await page.goto('/');

  await page.locator('th', { hasText: 'Name' }).first().click();

  
  // Get the lines after sorting
  const rows = await page.locator('table tbody tr td:nth-child(1)').allTextContents();

  // Sort the strings and check that they are sorted
  const sortedRows = [...rows].sort((a, b) => a.localeCompare(b));

  // Checking that the lines are sorted
  expect(rows).toEqual(sortedRows);
});

test('click element "Age" and sort', async ({ page }) => {
  await page.goto('/');

  // Click "Age"
  await page.locator('th', { hasText: 'Age' }).first().click();

  // Get the lines after sortin
  const rows = await page.locator('table tbody tr td:nth-child(1)').allTextContents();

  // Sort rows like numbers
  const sortedRows = [...rows].sort((a, b) => {
    return parseFloat(a) - parseFloat(b); // transform in number
  });

  // Chech, that the lines are sorted in ascending order
  expect(rows).toEqual(sortedRows);
});
  