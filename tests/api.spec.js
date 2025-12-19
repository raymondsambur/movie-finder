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

  test('Validate result with direct movie name', async ({ request }) => {
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

    expect(data).toHaveProperty('result');
    expect(Array.isArray(data.result)).toBe(true);
    expect(data.result.length).toBeGreaterThan(0);
    let foundMatch = false
    for (const movie of data.result) {
      if (movie.title.toLowerCase().includes('inception')) {
        foundMatch = true;
        break;
      }
    }
    expect(foundMatch).toBe(true);
  });

  test('Validate result with descriptive movie query', async ({ request }) => {
    const response = await request.post('https://hkdsccnebxofjdtgbabs.supabase.co/functions/v1/movie-finder', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      data: {
        message: 'A mind-bending thriller where dream invasion is possible'
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

    expect(data).toHaveProperty('result');
    expect(Array.isArray(data.result)).toBe(true);
    expect(data.result.length).toBeGreaterThan(0);
    let foundMatch = false
    for (const movie of data.result) {
      if (movie.title.toLowerCase().includes('inception')) {
        foundMatch = true;
        break;
      }
      expect(foundMatch).toBe(true);
    }
  });

  test('Validate result with genre-based query', async ({ request }) => {
    const response = await request.post('https://hkdsccnebxofjdtgbabs.supabase.co/functions/v1/movie-finder', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      data: {
        message: 'science fiction movies with complex plots'
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
    
    expect(data).toHaveProperty('result');
    expect(Array.isArray(data.result)).toBe(true);
    expect(data.result.length).toBeGreaterThan(0);
    let foundMatch = false
    for (const movie of data.result) {
      for (const genres of movie.genre){
        if (genres.toLowerCase() === 'science fiction') {
          foundMatch = true;
          break;
        }
      }
    expect(foundMatch).toBe(true);}
  });

  test('Validate result with release year query', async ({ request }) => {
    const response = await request.post('https://hkdsccnebxofjdtgbabs.supabase.co/functions/v1/movie-finder', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      data: {
        message: 'popular movies released in 2010'
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

    expect(data).toHaveProperty('result');
    expect(Array.isArray(data.result)).toBe(true);
    expect(data.result.length).toBeGreaterThan(0);
    let foundMatch = false
    for (const movie of data.result) {
      if (movie.release_date.startsWith('2010')) {
        foundMatch = true;
        break;
      }
    expect(foundMatch).toBe(true);}
  });
  
});