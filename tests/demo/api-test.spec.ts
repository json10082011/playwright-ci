import { test, expect } from '@playwright/test';

test('API Test - GET Request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('userId');
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('body');
});

test('API Test - POST Request', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('title', 'foo');
    expect(responseBody).toHaveProperty('body', 'bar');
    expect(responseBody).toHaveProperty('userId', 1);
});

test('API Test - PUT Request', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            id: 1,
            title: 'updated title',
            body: 'updated body',
            userId: 1
        }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('title', 'updated title');
    expect(responseBody).toHaveProperty('body', 'updated body');
    expect(responseBody).toHaveProperty('userId', 1);
});

test('API Test - DELETE Request', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
});

test('API Test - Login', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/login', {
        headers: { 'Content-Type': 'application/json' },
        data: {
            email: 'eve.holt@reqres.in', // Test email provided by reqres.in
            password: 'cityslicka' // Test password
        }
    });

    expect(response.status()).toBe(200); // Expect successful login
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token'); // Validate token exists
});
