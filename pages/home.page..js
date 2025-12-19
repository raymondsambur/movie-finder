const { expect } = require('@playwright/test');

class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Header Selectors 
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.historyButton = page.getByRole('button', { name: 'History' });
    this.pageTitle = page.getByText("Welcome back, TESTING QA!");

    // Main Functionality Selectors
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.searchInputField = page.getByRole('textbox');

    // History Pop Up Selectors
    this.historyPopUpTitle = page.getByText('Search History');
    this.clearHistoryButton = page.getByRole('button', { name: 'Clear History' });
    this.closeHistoryPopUpButton = page.getByRole('button', { name: 'Close' });
  }

  async gotoHomePage() {
    await this.page.goto('https://movie-finder-d128b.web.app/');
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async clickHistoryButton() {
    await this.historyButton.click();
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async enterSearchInput(text) {
    await this.searchInputField.fill(text);
  }

  async searchInput(text) {
    await this.searchInputField.click();
    await this.enterSearchInput(text);
    await expect(this.searchButton).toHaveText('Search');
    await this.clickSearchButton();
    await expect(this.searchButton).toHaveText('Searching...', { timeout: 2000 });

    await Promise.race([
      expect(this.searchButton).toHaveText('Search', { timeout: 50000 }),
      this.page.waitForSelector('h3', { timeout: 50000 })
    ]);
    
    const resultsHeading = this.page.getByText('Match Recommendations');
    await expect(resultsHeading).toBeVisible();

    const movieCards = this.page.locator('h3');
    const count = await movieCards.count();
    expect(count).toBeGreaterThan(0);
  }

  async clickClearHistoryButton() {
    await this.clearHistoryButton.click();
  }

  async clickCloseHistoryPopUpButton() {
    await this.closeHistoryPopUpButton.click();
  }
}

module.exports = { HomePage };
