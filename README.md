# Solution

This React Native app, developed with Expo for easy setup and universal app deployment, serves as a comprehensive platform for movie enthusiasts. It utilizes TypeScript for type safety and better developer experience.

## Key Features

### Authentication

A dedicated login screen facilitates user authentication. It stores authenticated user data globally using a React Context, enhancing security by encapsulating sensitive data.

### Home Dashboard

After login, users land on a home page displaying trending movies. Movies are categorized into two segments: "Today" and "This Week," making it easier for users to navigate through the latest movies with "Load More" button.

### Search Functionality

An intuitive search feature activates when the query length surpasses 3 characters, displaying results in real-time with the same movie card component used across the app, ensuring UI consistency, maintainability.

### Global State Management

Utilizing React Context, the app maintains global state, including user data and common utility functions, facilitating easy access across different components without prop drilling.

### Modular Design

Each movie is represented by a reusable movie card module, employed across the home dashboard, search results, and watchlist, promoting code reusability and maintainability.

### Detail and Interaction

Clicking on a movie card navigates to a detailed view where users can add the movie to a watchlist, rate it, or retract their rating, enhancing user engagement, and review list with "Load More" button.

### Profile Management

A profile page allows users to log out and view their data, reinforcing the app's security and personalization features.

### Documenting API Interactions

Incorporating documentation comments for API is used for maintaining code clarity and facilitating future API documentation.

## Performance and Security Enhancements

### Error Handling

Strategic use of try-catch blocks ensures robust error handling, particularly in API interactions, safeguarding the app against unexpected failures.

### Load More Functionality

A "Load More" button at the end of movie lists prevents excessive data loading, improving initial load times and enhancing user experience by fetching additional data on demand.

### Null Checks

Rigorous null checks in views prevent rendering errors, ensuring the app's resilience and stability.

### Global Theme and Reusability

A globally implemented color theme and separated reusable functions underscore the app's cohesive design philosophy and code efficiency.

## Security Measures

### Data Validation

Client-side validation of user inputs using Formik ensures data integrity and security.

### Contextual Data Handling

Using React Context for sensitive data ensures that it is encapsulated within the app and not exposed to global scope.

### Incorporating .env files

The app securely manages sensitive information like API keys, segregating them from the codebase to prevent exposure and facilitate easy maintenance. This practice ensures a higher level of security and operational flexibility, essential for robust app development.

---

# RegoVista

![](./assets/logo.png 'Company Logo')

RegoVista is an innovative app for movie lovers, enhancing film discovery and engagement. It features a user-friendly interface, focused on movie exploration, providing detailed insights, and personalized watchlists for a unique viewing experience.

## Key Features of RegoVista

- **User Authentication:** Secure login for a personalized experience with safe data storage.
- **Dashboard:** Showcases trending movies and curated lists of popular films.
- **Search Functionality:** Facilitates finding movies by title, genre, or actor.
- **Movie Details and Ratings:** Offers comprehensive insights, including descriptions, cast, reviews, and ratings.
- **Watchlist Management:** Enables creating and managing a list of movies to watch.
- **Profile Customization:** Allows for profile updates and app experience customization.

RegoVista is designed for movie lovers, providing a platform to explore, discover, and enjoy movies tailored to user preferences.

## Getting Started

This setup assumes you have Node.js and either Android Studio for Android or Xcode for iOS installed for simulators.

# Setup and Run Instructions

To set up and run a React Native app with Expo from this GitHub repo, follow these steps:

1. Clone the repo: `git clone`.
2. Install Expo CLI if not already installed: `npm install -g expo-cli`.
3. Navigate to the project directory: `cd [project-directory]`.
4. Create a .env.local file from .env.sample file and add an API Key of themoviedb (TMDB).
5. Install dependencies: `npm install`. (node version used v20.11.0)
6. Start the project: `expo start` or `npm start`.

## Running on Simulators

**iOS Simulator (MacOS Only):**

- Ensure Xcode is installed.
- From the terminal within your project directory, run `expo start` or `npm start`.
- Press `i` to launch the iOS Simulator.

**Android Emulator:**

- Ensure Android Studio is installed with AVD Manager configured.
- Start the emulator from Android Studio.
- From the project terminal, run `expo start` or `npm start`.
- Press `a` to launch the app in the Android Emulator.

## Running on Devices

**Expo Go App:**

- Install the Expo Go app on your device from the App Store or Google Play.
- Run `expo start` or `npm start` in your project directory.
- Scan the QR code with Expo Go.

**Directly on a Device (iOS):**

- Connect your device via USB.
- Open the terminal, run `expo start` or `npm start`.
- Press `i` to build and run on the connected device.

**Directly on a Device (Android):**

- Connect your device via USB with USB Debugging enabled.
- Open the terminal, run `expo start` or `npm start`.
- Press `a` to build and run on the connected device.

For detailed setup and troubleshooting, refer to Expo's official documentation.

(Cmd+Shift+V/Clt+Shift+V - To view .md file VS Code)
