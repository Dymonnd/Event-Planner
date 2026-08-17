Elevate Horizon Connect
Overview
Elevate Horizon Connect is a simple mobile app built with React Native and Expo for a local council to share community events and allow residents to register. It focuses on showing today’s events and all upcoming events with basic search, filters, and registration.

Features
Home screen with welcome message and quick view of today’s events.

Events screen showing all events with:

Keyword search.

Category filters (Fitness, Social, Community, Outdoors, Music).

Optional date picker.

Event details screen with full information and share options.

Event registration screen with basic validation (name, email, optional phone).

Settings screen with theme (light/dark) and other preferences.

Bottom tab navigation (Home, Events, Settings) with nested stacks for inner screens.

Remote data loading from a hosted JSON endpoint with loading and error states.

Tech Stack
React Native (Expo).

React Navigation (bottom tabs + stack navigators).

React Native Paper for UI components.

JavaScript and JSON for data handling.

Remote events JSON from a hosted endpoint.

Data Source
Events are loaded from a remote JSON file:
https://tafeshaun.github.io/elevate-data/events.json
The app maps each event to include title, date, time range, location, category tags, remaining spots, and description for details and registration.

Project Structure
App.js – navigation setup (tabs and stacks).

/Screens

HomeScreen.js

EventsScreen.js

DetailsScreen.js

RegisterEventScreen.js

SettingsScreen.js

EventNotFoundScreen.js

EventLoadScreen.js

ThemeContext.js – light/dark theme toggle and context.

Accessibility
Added accessibility labels and hints on key interactive controls to support screen readers.

Supports adjustable text size and dark/light theme preferences for improved readability.

Touch targets are sized for easier navigation.

Tested with common screen readers on iOS and Android.

Running the App
Clone the repository:

```bash
git clone https://github.com/Dymonnd/Event-Planner.git
cd Event-Planner
```
Install dependencies:

bash
npm install
# or
yarn
Start the Expo development server:

bash
npx expo start
Run on your device or emulator using the Expo Go app or an Android/iOS simulator.

Future Improvements
Implement keyboard navigation and focus management for improved accessibility.

Add localization support for multilingual users.

Enhance form validation and error handling.

Integrate push notifications for event updates.

Include automated testing for accessibility and usability.


