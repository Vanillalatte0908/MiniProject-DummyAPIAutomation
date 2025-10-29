import { test, expect } from '@playwright/test';

test('Create → Update → Get pet', async ({ request }) => {
  // Step 1: Create a pet
  const createRes = await request.post('https://petstore.swagger.io/v2/pet', {
    data: {
      id: 123,
      category: { id: 1, name: 'dog' },
      name: 'puppy',
      photoUrls: ['url1'],
      tags: [{ id: 1, name: 'cute' }],
      status: 'available',
    },
  });
  expect(createRes.ok()).toBeTruthy();


  // Step 2: Update the same pet
  const updateRes = await request.put('https://petstore.swagger.io/v2/pet', {
    data: {
      id: 123,
      category: { id: 1, name: 'dog' },
      name: 'puppy-renamed',
      photoUrls: ['url1'],
      tags: [{ id: 1, name: 'cute' }],
      status: 'sold',
    },
  });
  expect(updateRes.ok()).toBeTruthy();


  // Step 3: Get the updated pet
  const getRes = await request.get(`https://petstore.swagger.io/v2/pet/123`);
  const pet = await getRes.json();
});
