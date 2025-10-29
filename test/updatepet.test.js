import { test, expect } from '@playwright/test';

test('PUT update pet', async ({ request }) => {
  const response = await request.put('https://petstore.swagger.io/v2/pet', {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      id: 123,
      category: { id: 123, name: 'string' },
      name: 'doggie',
      photoUrls: ['string'],
      tags: [{ id: 0, name: 'string' }],
      status: 'available',
    },
  });

  // ✅ Validate status code
  expect(response.ok()).toBeTruthy();

  // ✅ Get and log the response
  const body = await response.json();
  console.log('Pet updated:', body);

  // ✅ Optional assertion
  expect(body.name).toBe('doggie');
});
