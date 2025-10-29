import { test, expect } from '@playwright/test';

test('POST create pet', async ({ request }) => {
  const response = await request.post('https://petstore.swagger.io/v2/pet', {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      id: 123,
      category: { id: 123, name: 'string' },
      name: 'doggie',
      photoUrls: ['string'],
      tags: [{ id: 123, name: 'string' }],
      status: 'available',
    },
  });

  // ✅ Check status
  expect(response.ok()).toBeTruthy();
  

  // ✅ Get and log response body
  const body = await response.json();
  console.log('Pet created:', body);

  // ✅ Optional: verify field
  expect(body.name).toBe('doggie');
});
