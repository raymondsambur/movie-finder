// pages/login.page.js
class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Sign In' });
        this.loginErrorMessage = page.getByText('Invalid login credentials')
    }

    async gotoLoginPage() {
        await this.page.goto('https://movie-finder-d128b.web.app/login');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}

module.exports = { LoginPage };