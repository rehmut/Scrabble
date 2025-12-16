# Online Scrabble Clone

A multiplayer Scrabble-like game built with Vanilla JS and Firebase. Playable on desktop and mobile.

## Features
- **Online Multiplayer:** Play with friends across different devices.
- **Real-time Sync:** Moves update instantly for all players.
- **German Dictionary:** Integrated German dictionary support.
- **Responsive Design:** Works on desktop and mobile.

## Setup & Deployment

### 1. Firebase Setup
To enable multiplayer, you need a free Firebase project:
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Enable **Realtime Database** (start in **Test Mode** for simplicity).
4. Go to Project Settings -> General -> Your apps -> Add app -> Web.
5. Copy the `firebaseConfig` object.

### 2. Configuration
1. Open `scripts/app.js`.
2. Replace the `firebaseConfig` placeholder at the top of the file with your copied configuration.

### 3. Deploy to Vercel
1. Push this code to a GitHub/GitLab repository.
2. Import the project into Vercel.
3. Deploy! (No build command needed, it's a static site).

## How to Play
1. Open the deployed URL.
2. Enter your **Name** and a **Game ID** (e.g., "ROOM1").
3. Share the **Game ID** with your friends.
4. Once everyone has joined, the first player starts.

## Local Development
Simply open `index.html` in a web browser (or use a local server like `live-server` or `python -m http.server`).

## License
MIT
