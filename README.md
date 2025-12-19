# 🎬 Movie Match - Automated Testing Suite

A comprehensive testing suite for the Movie Match application, featuring both UI and API automation using Playwright. This project demonstrates end-to-end testing capabilities for a movie search application with user authentication and search history features.

## 📖 About the Project

Movie Match is a movie search application that allows users to discover movies through various search methods including direct movie names, descriptive queries, genres, and release years. This repository contains automated tests covering both the user interface and API functionality to ensure reliability and performance.

## 🚀 Features Tested

- **Authentication System** - Login/logout functionality with credential validation
- **Movie Search** - Multiple search methods including name, genre, description, and year
- **Search History** - History tracking and clearing capabilities
- **Session Management** - User session persistence and validation

## 🛠️ Prerequisites

Before running the tests, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn package manager

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone [your-repository-url]
cd movie-match-testing
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## ▶️ Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### Run Specific Test File

```bash
npx playwright test [test-file-name]
```

### Run Tests in UI Mode

```bash
npx playwright test --ui
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

## 📊 View Test Reports

After running tests, generate and view the HTML report:

```bash
npx playwright show-report
```

## 🧪 Test Coverage

### UI Tests

- User authentication flows
- Search functionality across different methods
- History management
- Session validation

### API Tests

- Direct movie name queries
- Descriptive movie searches
- Genre-based filtering
- Release year searches

## 📁 Project Structure

```bash
movie-match-testing/
├── tests/
│   ├── ui/
│   │   └── [UI test files]
│   └── api/
│       └── [API test files]
├── playwright.config.js
├── package.json
└── README.md
```