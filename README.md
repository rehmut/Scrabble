# Deutsche Scrabble Web-App

Ein leichtgewichtiger Scrabble-Client mit deutschem Regelwerk, Wortprüfung und lokalem Mehrspielermodus. Die Anwendung benötigt kein Build-Tooling und läuft direkt im Browser.

## Features
- 15×15-Brett mit offiziellen Bonusfeldern (DW/DL/TW/TL) und hervorgehobenen Neuzügen
- Vollständiger Steinsack nach deutschem Scrabble-Set (inkl. Ä/Ö/Ü und Blanko)
- Hot-Seat-Mehrspieler für 2–4 Personen mit Punktestand, Verlauf und Beutelanzeige
- Wortprüfung gegen ein eingebettetes Fallback-Wörterbuch plus optionale Ladeversuche großer Online-Listen
- Aktionen pro Zug: legen, Rückruf, mischen, austauschen (inkl. Auswahl-Dialog), passen
- Automatische Wertung inkl. Kreuzwörtern, Bingo-Bonus und Endabrechnung (Steine leer oder zu viele Pässe)
- Moderne UI mit Status-Badges, Verlaufslog und responsive Layouts

## Schnellstart
1. Öffne `index.html` in einem aktuellen Browser (Chrome, Edge, Firefox, Safari). Ein lokaler Webserver ist nicht nötig.
2. Trage im Overlay 2–4 Spielernamen ein und starte das Spiel.
3. Wähle Steine aus der Auslage, platziere sie per Klick auf das Brett und bestätige den Zug.
4. Nutze die Buttons unter dem Rack zum Zurückholen, Mischen, Tauschen oder Passen.

> **Hinweis:** Die App bringt eine eingebaute Fallback-Wortliste mit. Wenn eine Internetverbindung besteht, lädt sie zusätzlich große Wortlisten von GitHub. Damit funktioniert der Start auch bei `file://`-Aufruf ohne lokalen Webserver.

## Projektstruktur
```
Scrabble/
├── index.html               # App-Shell und Overlays
├── styles.css               # Layout & Styling
├── scripts/
│   └── app.js               # Spiellogik, UI-Events und Wörterbuch-Handling
├── data/
│   └── german_fallback_words.json  # Pflege-Datei für den eingebetteten Wortschatz
└── README.md
```

## Wörterbuch & Erweiterung
- Remote-Quellen: `hermitdave/FrequencyWords` (de_50k) und `enz/german-wordlist`. Bei Erfolg werden beide Sets kombiniert.
- Offline/Fallback: ca. 300 häufige deutsche Wörter – direkt in `app.js` eingebettet, die JSON-Datei dient nur als editierbare Quelle.
- Eigene Listen lassen sich ergänzen, indem du weitere `fetch`-Aufrufe in `scripts/app.js` hinzufügst oder die bestehende Wortliste erweiterst.

## Weiterentwicklung
- Backend/WebSocket für echtes Online-Multiplayer (Matchmaking, Chat, Replays)
- Persistenz (z. B. LocalStorage oder Datenbank) für Spielstände und Statistiken
- Automatisierte Tests für Wertungslogik und Brettvalidierung
- Touch-Drag & Drop und zusätzliche Sprachpakete

Viel Spaß beim Legen!