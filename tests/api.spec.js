import { test, expect } from '@playwright/test';

test.describe('API Test', () => {
  let authToken;

  test.beforeAll(async ({ request }) => {
    const response = await request.post('https://hkdsccnebxofjdtgbabs.supabase.co/functions/v1/auth/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        email: 'test@mail.com',
        password: '8f4&nVO">^82'
      }
    });
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    if (!contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON response from /api/login but got '${contentType}'. Response body:\n${text.slice(0, 1000)}`);
    }
    const body = await response.json();
    
    authToken = body.result.token || body.accessToken || body.authToken || body.access_token;
    
    expect(authToken).toBeDefined();
  });

  test('GET /movies returns status 200 and valid data', async ({ request }) => {
    const response = await request.post('https://hkdsccnebxofjdtgbabs.supabase.co/functions/v1/movie-finder', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      data: { 
        message: 'Inception' 
      }, 
      timeout: 60000
    });
    expect(response.status()).toBe(200);
    const moviesContentType = response.headers()['content-type'] || '';    
    if (!moviesContentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON response from /api/movies but got '${moviesContentType}'. Response body:\n${text.slice(0, 1000)}`);
    }
    const data = await response.json();
    console.log(data);
    
    expect(data).toHaveProperty('result');
    expect(Array.isArray(data.result)).toBe(true);
    expect(data.result.length).toBeGreaterThan(0);
  });

  test('Login returned an auth token', async () => {
    expect(authToken).toBeTruthy();
  });
});