// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page..js');
const { HomePage } = require('../pages/home.page..js');

test.describe('Login Tests', () => {
  /** @type {LoginPage} */
  let loginPage;
  /** @type {HomePage} */
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('test@mail.com', '8f4&nVO">^82');
    await expect(page).toHaveURL('https://movie-finder-d128b.web.app/');
  });

  test('valid login redirects to home page', async ({ page }) => {
    await homePage.clickLogoutButton();
    await expect(page).toHaveURL('https://movie-finder-d128b.web.app/login');
    await loginPage.login('test@mail.com', '8f4&nVO">^82');
    await expect(page).toHaveURL('https://movie-finder-d128b.web.app/');
  });

  test('invalid login shows error message', async ({ page }) => {
    await homePage.clickLogoutButton();
    await expect(page).toHaveURL('https://movie-finder-d128b.web.app/login');
    await loginPage.login('test@mail.com', '8f4&nVO">^82_invalid');
    await expect(loginPage.loginErrorMessage).toBeVisible();
  });

  test('logout', async ({ page }) => {
    await homePage.clickLogoutButton();
    await expect(page).toHaveURL('https://movie-finder-d128b.web.app/login');
  });

  test('search functionality', async ({ page }) => {
    await homePage.searchInput('Inception');
  });
  
});
