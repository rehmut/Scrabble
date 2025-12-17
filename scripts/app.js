// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyB8PbZxNZY7v-NO76b2gVHcOQMcN69FLsQ",
  authDomain: "scrabble-421be.firebaseapp.com",
  projectId: "scrabble-421be",
  storageBucket: "scrabble-421be.firebasestorage.app",
  messagingSenderId: "229843683462",
  appId: "1:229843683462:web:d57bef461181d44fe26907",
  measurementId: "G-Z2KFXMMZM6",
  databaseURL: "https://scrabble-421be-default-rtdb.europe-west1.firebasedatabase.app/"
};

// --- GAME CONSTANTS ---
const BOARD_SIZE = 15;
const RACK_SIZE = 7;
const BINGO_BONUS = 50;
const REMOTE_DICTIONARY_SOURCES = [
  'https://raw.githubusercontent.com/kamilmielnik/scrabble-dictionaries/master/german/german.txt', // Better source
  'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/de/de_50k.txt',
  'https://raw.githubusercontent.com/enz/german-wordlist/master/german.dic'
];

const GERMAN_TILES = [
  { letter: 'A', count: 5, value: 1 },
  { letter: 'Ä', count: 1, value: 6 },
  { letter: 'B', count: 2, value: 3 },
  { letter: 'C', count: 2, value: 4 },
  { letter: 'D', count: 4, value: 1 },
  { letter: 'E', count: 15, value: 1 },
  { letter: 'F', count: 2, value: 4 },
  { letter: 'G', count: 3, value: 2 },
  { letter: 'H', count: 4, value: 2 },
  { letter: 'I', count: 6, value: 1 },
  { letter: 'J', count: 1, value: 6 },
  { letter: 'K', count: 2, value: 4 },
  { letter: 'L', count: 3, value: 2 },
  { letter: 'M', count: 4, value: 3 },
  { letter: 'N', count: 9, value: 1 },
  { letter: 'O', count: 3, value: 2 },
  { letter: 'Ö', count: 1, value: 8 },
  { letter: 'P', count: 1, value: 4 },
  { letter: 'Q', count: 1, value: 10 },
  { letter: 'R', count: 6, value: 1 },
  { letter: 'S', count: 7, value: 1 },
  { letter: 'T', count: 6, value: 1 },
  { letter: 'U', count: 6, value: 1 },
  { letter: 'Ü', count: 1, value: 6 },
  { letter: 'V', count: 1, value: 6 },
  { letter: 'W', count: 1, value: 3 },
  { letter: 'X', count: 1, value: 8 },
  { letter: 'Y', count: 1, value: 10 },
  { letter: 'Z', count: 1, value: 3 },
  { letter: '?', count: 2, value: 0, isBlank: true }
];

const BLANK_CHOICES = ['A','Ä','B','C','D','E','F','G','H','I','J','K','L','M','N','O','Ö','P','Q','R','S','T','U','Ü','V','W','X','Y','Z'];

const FALLBACK_WORDS = [
  "aber", "abend", "abfahrt", "abgabe", "abitur", "ablauf", "abschied", "absicht", "acht", "achtung", "adresse",
  "aktion", "alltag", "als", "alt", "am", "amerika", "amt", "analyse", "anfang", "angebot", "angst", "ankunft",
  "anlage", "antwort", "anwalt", "arbeit", "archiv", "arena", "arzt", "aspekt", "atem", "augenblick", "augenlid", "außer",
  "ausbildung", "ausdruck", "ausflug", "ausgabe", "ausgleich", "auskunft", "ausland", "auslauf", "auswahl", "auto", "bahnhof", "ball",
  "baum", "becher", "bedarf", "befehl", "begriff", "beispiel", "beitrag", "bekannt", "beleg", "bereich", "berg", "bericht",
  "berlin", "beruf", "bescheid", "besitz", "bestellung", "bewegung", "bewohner", "bewusstsein", "bezirk", "bibliothek", "blick", "boden",
  "bote", "brief", "brille", "brücke", "bruder", "bücher", "büro", "bürger", "chef", "chor", "computer", "container",
  "couch", "dach", "dame", "dank", "datenbank", "dauer", "deckung", "dekan", "denken", "deutsche", "dialog", "dienst",
  "dinner", "disziplin", "dokument", "dorf", "dosis", "druck", "duft", "durchgang", "durst", "eben", "ebene", "ecke",
  "effekt", "ehe", "ehrgeiz", "ei", "eifer", "eimer", "einblick", "eindruck", "einheit", "einsatz", "eintrag", "element",
  "empfang", "ende", "energie", "engel", "entwurf", "erfahrung", "erfolg", "ergebnis", "erhebung", "erinnerung", "erlebnis", "ermittlung",
  "ernte", "erzählung", "essen", "etage", "etappe", "ethik", "etikett", "farbe", "faktor", "familie", "fang", "farm",
  "fasching", "fassung", "faust", "fehler", "feier", "feld", "fenster", "ferien", "ferse", "fest", "fieber", "figur",
  "film", "filter", "firma", "flamme", "flasche", "fleck", "fliege", "flotte", "fluss", "folge", "form", "fortschritt",
  "foto", "frage", "freiheit", "freitag", "fremde", "freund", "friedhof", "friseur", "frucht", "frühstück", "fund", "funktion",
  "gabel", "gabe", "gala", "garten", "gas", "gebäck", "gebirge", "gebot", "gebrauch", "geburt", "gedanke", "gefahr",
  "gegend", "gegner", "gehör", "geist", "gelände", "geld", "geldbeutel", "gelenk", "gelingen", "gelübde", "gemälde", "gemeinschaft",
  "gemüse", "genau", "genuss", "gerät", "gericht", "gesetz", "gesicht", "gespräch", "gestalt", "gestern", "gesundheit", "getränk",
  "gewicht", "gewohnheit", "gipfel", "glanz", "glaube", "gleich", "glück", "gott", "graben", "grafik", "grau", "grenze",
  "griff", "grill", "grund", "gruppe", "günstig", "gutachten", "haar", "haben", "hafen", "halbzeit", "halle", "hals",
  "handlung", "handwerk", "hang", "hauch", "hauptstadt", "haus", "haushalt", "haut", "heft", "heim", "heilung", "heimat",
  "heizung", "held", "hell", "hilfe", "himmel", "hinweis", "hof", "holz", "hochhaus", "hochzeit", "hocker", "hobby",
  "hofladen", "holung", "horizont", "hotel", "hunger", "idee", "idylle", "illusion", "impuls", "index", "info", "ingenieur",
  "inhalt", "initiative", "insel", "institut", "internet", "investor", "ironie", "jagd", "jahr", "jahreszeit", "jazz", "jetzt",
  "job", "journal", "jubel", "junge", "jury", "kaffee", "kamin", "kanal", "kandidat", "kantine", "karte", "kasten",
  "katalog", "katze", "kauf", "keller", "kenner", "kenntnis", "kerze", "kette", "kilometer", "kino", "kiosk", "kiste",
  "kittel", "klinge", "klinik", "klima", "klingel", "kloster", "knapp", "knochen", "knopf", "koch", "kollege", "kolumne",
  "komitee", "komfort", "kommune", "konferenz", "konflikt", "konto", "konzept", "kopf", "kopie", "korn", "körper", "kost",
  "kraft", "kragen", "krankheit", "krimi", "krise", "krone", "küche", "kunde", "kunst", "kurve", "kurs", "kurz",
  "küste", "labor", "lage", "lampe", "land", "lassen", "laune", "lauf", "laut", "leben", "lehrer", "leistung",
  "leiter", "lektor", "lenkung", "lexikon", "licht", "liebe", "lied", "liga", "linie", "liste", "liter", "lob",
  "logik", "lösung", "luft", "lust", "luxus", "magazin", "maler", "mangel", "markt", "maschine", "maß", "material",
  "maurer", "medizin", "meer", "meister", "meldung", "menge", "mensch", "menschen", "messer", "metall", "miete", "milch",
  "minute", "mission", "mittag", "mittel", "monat", "moment", "montag", "monitor", "motor", "musik", "mutation", "muster",
  "mythos", "nachbar", "nachricht", "nachschub", "nacht", "nadel", "nahe", "name", "nation", "natur", "nebel", "neben",
  "neigung", "nein", "netz", "neugier", "niveau", "notiz", "nummer", "nutzen", "oase", "oberteil", "objekt", "obst",
  "ofen", "offerte", "offizier", "ohne", "ökonomie", "olympia", "oper", "opfer", "option", "ordnung", "ort", "paket",
  "palast", "panorama", "papier", "parade", "park", "partner", "pass", "pause", "pension", "person", "pfeil", "pflanze",
  "phase", "piano", "pilz", "plan", "plakat", "pläne", "plastik", "platz", "plenum", "poesie", "polizei", "portion",
  "position", "post", "praxis", "preis", "prinzip", "prozess", "puls", "pult", "punkt", "quecksilber", "quote", "rad",
  "radio", "rahmen", "rand", "rasen", "ration", "raum", "raupe", "reform", "regel", "regen", "reich", "reise",
  "reiter", "reiz", "rekord", "reparatur", "residenz", "restaurant", "resultat", "rhythmus", "richter", "riff", "ring", "risiko",
  "ritter", "rolle", "roman", "rosen", "route", "rucksack", "ruhe", "runde", "saal", "saft", "sage", "saison",
  "salat", "salz", "samt", "satz", "szene", "schalter", "schatten", "schatz", "schiff", "schlauch", "schloss", "schluss",
  "schmerz", "schnee", "schnur", "schrank", "schritt", "schuh", "schüler", "schutz", "schwester", "see", "seele", "segel",
  "segen", "sektor", "seite", "sekunde", "selbst", "semester", "sendung", "sensor", "serie", "service", "sessel", "sicherheit",
  "sicht", "signal", "silbe", "silber", "sinn", "sirene", "sitte", "skala", "skizze", "sofa", "sohn", "solide",
  "sommer", "sonne", "sound", "spaß", "spalte", "spannung", "sparplan", "spiegel", "spiel", "spitze", "sport", "sprache",
  "sprecher", "sprung", "stadt", "stall", "stand", "start", "statistik", "staub", "stein", "stern", "steuerrad", "stimme",
  "stoff", "stolz", "störfall", "straße", "strick", "strom", "stube", "stufe", "sturm", "stute", "studium", "studio",
  "stunde", "stück", "system", "tabelle", "takt", "talent", "tanz", "tasche", "taste", "technik", "teich", "teil",
  "telefon", "theater", "thema", "therme", "ticket", "tisch", "titel", "ton", "tonne", "tor", "tradition", "trainer",
  "traum", "treffer", "trend", "treppe", "trick", "truppe", "tuch", "turm", "ufer", "uhr", "umsatz", "umwelt",
  "umfang", "unfall", "unfug", "uniform", "urlaub", "ursprung", "urteil", "vater", "verband", "verbrauch", "verein", "verfassung",
  "verhalten", "verkauf", "verlauf", "verhältnis", "verlag", "verlust", "vermerk", "verrat", "vertrag", "verwaltung", "versorgung", "versuch",
  "verkehr", "version", "viertel", "villa", "vision", "vogel", "vorbild", "vorgang", "vorhaben", "vorlage", "vormittag", "vorrat",
  "vorteil", "vortrag", "wahl", "wandel", "wanne", "ware", "warnung", "wartung", "wasser", "weg", "wehr", "weide",
  "weil", "welt", "wert", "wetter", "wiese", "wille", "wind", "winkel", "winter", "wirkung", "wissen", "wohnung",
  "wolf", "worte", "wortlaut", "wunsch", "zahl", "zahnarzt", "zeit", "zeitung", "zentrum", "zeugen", "ziel", "zimmer",
  "zitat", "zivil", "zone", "zug", "zukunft", "zunge", "zustand", "zutat", "zuwachs", "zwang", "zweck"
];

const MULTIPLIER_MATRIX = buildMultiplierMatrix();

// --- STATE MANAGEMENT ---
const localState = {
  placements: new Map(),
  selectedRackIndex: null,
  exchangeSelection: new Set(),
  dictionary: new Set(),
  pendingBlank: null,
  myPlayerId: localStorage.getItem('scrabble_player_id') || `P_${Math.random().toString(36).substr(2, 9)}`,
  gameId: null,
  isMyTurn: false
};
localStorage.setItem('scrabble_player_id', localState.myPlayerId);

let gameState = {
  board: [],
  bag: [],
  players: [],
  currentPlayerIndex: 0,
  history: [],
  passes: 0,
  turn: 1,
  nextTileId: 1,
  gameOver: false,
  winner: null
};

// --- DOM ELEMENTS ---
const elements = {
  board: document.getElementById('board'),
  rack: document.getElementById('rack'),
  playerList: document.getElementById('playerList'),
  statusMessage: document.getElementById('statusMessage'),
  currentPlayerLabel: document.getElementById('currentPlayerLabel'),
  turnCounter: document.getElementById('turnCounter'),
  submitBtn: document.getElementById('submitMoveBtn'),
  recallBtn: document.getElementById('recallBtn'),
  shuffleBtn: document.getElementById('shuffleBtn'),
  exchangeBtn: document.getElementById('exchangeBtn'),
  passBtn: document.getElementById('passBtn'),
  bagCount: document.getElementById('bagCount'),
  historyList: document.getElementById('historyList'),
  lobbyOverlay: document.getElementById('lobbyOverlay'),
  joinGameBtn: document.getElementById('joinGameBtn'),
  lobbyPlayerName: document.getElementById('lobbyPlayerName'),
  lobbyGameId: document.getElementById('lobbyGameId'),
  lobbyStatus: document.getElementById('lobbyStatus'),
  blankModal: document.getElementById('blankModal'),
  blankChoices: document.getElementById('blankChoices'),
  exchangeModal: document.getElementById('exchangeModal'),
  exchangeChoices: document.getElementById('exchangeChoices'),
  confirmExchangeBtn: document.getElementById('confirmExchangeBtn'),
  cancelExchangeBtn: document.getElementById('cancelExchangeBtn'),
  dictionaryChip: document.getElementById('dictionaryChip')
};

// --- FIREBASE REFERENCES ---
let db, gameRef;

// --- INITIALIZATION ---
initDictionary();
bindEvents();
buildBlankChoices(); // Ensure blank choices are built

function bindEvents() {
  elements.joinGameBtn.addEventListener('click', handleJoinGame);
  elements.rack.addEventListener('click', handleRackClick);
  elements.board.addEventListener('click', handleBoardClick);
  elements.submitBtn.addEventListener('click', handleSubmitMove);
  elements.recallBtn.addEventListener('click', handleRecall);
  elements.shuffleBtn.addEventListener('click', handleShuffleRack);
  elements.exchangeBtn.addEventListener('click', openExchangeModal);
  elements.passBtn.addEventListener('click', handlePass);
  elements.blankModal.querySelector('[data-close-blank]').addEventListener('click', closeBlankModal);
  elements.exchangeModal.querySelector('[data-close-exchange]').addEventListener('click', closeExchangeModal);
  elements.cancelExchangeBtn.addEventListener('click', closeExchangeModal);
  elements.confirmExchangeBtn.addEventListener('click', handleConfirmExchange);
}

function buildBlankChoices() {
  elements.blankChoices.innerHTML = '';
  BLANK_CHOICES.forEach(l => {
    const btn = document.createElement('button');
    btn.textContent = l;
    btn.onclick = () => applyBlankLetter(l);
    elements.blankChoices.appendChild(btn);
  });
}

// --- LOBBY & FIREBASE CONNECT ---
function handleJoinGame() {
  const name = elements.lobbyPlayerName.value.trim();
  const gameId = elements.lobbyGameId.value.trim().toUpperCase();

  if (!name || !gameId) {
    elements.lobbyStatus.textContent = 'Bitte Name und Spiel-ID eingeben.';
    return;
  }
  if (typeof firebase === 'undefined') {
    elements.lobbyStatus.textContent = 'Fehler: Firebase nicht geladen.';
    return;
  }

  elements.lobbyStatus.textContent = 'Verbinde …';
  localState.gameId = gameId;

  try {
    if (!firebase.apps.length) {
       firebase.initializeApp(firebaseConfig);
    }
    db = firebase.database();
    gameRef = db.ref(`games/${gameId}`);

    gameRef.once('value').then((snapshot) => {
      if (snapshot.exists()) {
        joinExistingGame(snapshot.val(), name);
      } else {
        createNewGame(name);
      }
    }).catch(err => {
      console.error(err);
      elements.lobbyStatus.textContent = 'Verbindungsfehler. Check Console.';
    });
  } catch (e) {
    console.error(e);
    elements.lobbyStatus.textContent = 'Init Error: ' + e.message;
  }
}

function joinExistingGame(data, playerName) {
  // Check for expiration (20 hours)
  const EXPIRATION_MS = 20 * 60 * 60 * 1000;
  if (data.lastActive && (Date.now() - data.lastActive > EXPIRATION_MS)) {
    if (confirm('Dieses Spiel ist seit über 20 Stunden inaktiv. Möchtest du ein neues Spiel unter dieser ID starten?')) {
      createNewGame(playerName);
    } else {
      elements.lobbyStatus.textContent = 'Spiel ist abgelaufen.';
    }
    return;
  }

  const players = data.players || [];
  const existingPlayer = players.find(p => p.id === localState.myPlayerId);

  if (existingPlayer) {
    startGameListener();
  } else {
    if (players.length >= 4) { elements.lobbyStatus.textContent = 'Spiel voll.'; return; }
    if (data.gameOver) { elements.lobbyStatus.textContent = 'Spiel beendet.'; return; }
    
    const newPlayer = { id: localState.myPlayerId, name: playerName, score: 0, rack: [] };
    const bag = [...(data.bag || [])];
    drawTilesForPlayer(newPlayer, bag);
    
    players.push(newPlayer);
    gameRef.update({ players, bag, lastActive: Date.now() }).then(startGameListener);
  }
}

function createNewGame(playerName) {
  const idRef = { value: 1 };
  const bag = buildBagWithIds(idRef);
  const initialPlayer = { id: localState.myPlayerId, name: playerName, score: 0, rack: [] };
  drawTilesForPlayer(initialPlayer, bag);

  const newGameData = {
    board: createBoard(),
    bag: bag,
    players: [initialPlayer],
    currentPlayerIndex: 0,
    history: [{ message: `Spiel gestartet von ${playerName}.` }],
    passes: 0,
    turn: 1,
    nextTileId: idRef.value,
    gameOver: false,
    lastActive: Date.now()
  };

  gameRef.set(newGameData).then(startGameListener);
}

function startGameListener() {
  elements.lobbyOverlay.classList.remove('is-visible');
  gameRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      gameState = data;
      // Safety checks
      if (!gameState.players) gameState.players = [];
      if (!gameState.bag) gameState.bag = [];
      if (!gameState.history) gameState.history = [];
      
      syncLocalState();
      renderEverything();
    }
  });
}

function syncLocalState() {
  const myPlayerIndex = gameState.players.findIndex(p => p.id === localState.myPlayerId);
  localState.isMyTurn = (myPlayerIndex === gameState.currentPlayerIndex) && !gameState.gameOver;
  if (!localState.isMyTurn && localState.placements.size > 0) handleRecall();
}

// --- GAME LOGIC ---
function drawTilesForPlayer(player, bag) {
  if (!player.rack) player.rack = [];
  while (player.rack.length < RACK_SIZE && bag.length > 0) {
    const index = Math.floor(Math.random() * bag.length);
    player.rack.push(bag.splice(index, 1)[0]);
  }
}

function buildBagWithIds(idCounterRef) {
  const bag = [];
  GERMAN_TILES.forEach(tileType => {
    for (let i = 0; i < tileType.count; i++) {
      bag.push({
        id: `T${idCounterRef.value++}`,
        letter: tileType.letter,
        value: tileType.value,
        isBlank: Boolean(tileType.isBlank || tileType.letter === '?'),
        assignedLetter: null
      });
    }
  });
  return bag;
}

function createBoard() {
  return Array.from({ length: BOARD_SIZE }, (_, row) => (
    Array.from({ length: BOARD_SIZE }, (_, col) => ({
      row, col, letter: '', value: 0, tileId: null, isBlank: false, locked: false,
      multiplier: MULTIPLIER_MATRIX[row][col]
    }))
  ));
}

function buildMultiplierMatrix() {
  const matrix = Array.from({ length: BOARD_SIZE }, () => (
    Array.from({ length: BOARD_SIZE }, () => ({ word: 1, letter: 1, isCenter: false }))
  ));
  const tripleWord = [[0,0],[0,7],[0,14],[7,0],[7,14],[14,0],[14,7],[14,14]];
  const doubleWord = [[1,1],[2,2],[3,3],[4,4],[1,13],[2,12],[3,11],[4,10],[10,4],[11,3],[12,2],[13,1],[10,10],[11,11],[12,12],[13,13],[7,7]];
  const tripleLetter = [[1,5],[1,9],[5,1],[5,5],[5,9],[5,13],[9,1],[9,5],[9,9],[9,13],[13,5],[13,9]];
  const doubleLetter = [[0,3],[0,11],[2,6],[2,8],[3,0],[3,7],[3,14],[6,2],[6,6],[6,8],[6,12],[7,3],[7,11],[8,2],[8,6],[8,8],[8,12],[11,0],[11,7],[11,14],[12,6],[12,8],[14,3],[14,11]];

  tripleWord.forEach(([r, c]) => { matrix[r][c].word = 3; });
  doubleWord.forEach(([r, c]) => {
    matrix[r][c].word = 2;
    if (r === 7 && c === 7) matrix[r][c].isCenter = true;
  });
  tripleLetter.forEach(([r, c]) => { matrix[r][c].letter = 3; });
  doubleLetter.forEach(([r, c]) => { matrix[r][c].letter = 2; });
  matrix[7][7].isCenter = true;
  return matrix;
}

function renderEverything() {
  renderBoard();
  renderRack();
  renderPlayers();
  renderHistory();
  updateControls();
  updateTurnInfo();
  
  if (gameState.gameOver) {
    const winnerName = gameState.winner ? gameState.winner.name : 'Niemand';
    setStatus(`Spiel vorbei! Sieger: ${winnerName}`, 'success');
  } else if (localState.isMyTurn) {
    setStatus('Du bist am Zug!', 'info');
  } else {
    const cur = gameState.players[gameState.currentPlayerIndex];
    setStatus(`Warte auf ${cur ? cur.name : '...'}`, 'info');
  }
}

function renderBoard() {
  const fragment = document.createDocumentFragment();
  // Safe copy for display
  const displayBoard = gameState.board.map(row => row.map(cell => ({ ...cell })))
  
  localState.placements.forEach(({ row, col, tile }) => {
    displayBoard[row][col] = {
      ...displayBoard[row][col],
      letter: tile.isBlank ? (tile.assignedLetter || '?') : tile.letter,
      value: tile.value,
      tileId: tile.id,
      isBlank: tile.isBlank,
      locked: false
    };
  });

  displayBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellEl = document.createElement('div');
      cellEl.className = 'board-cell';
      cellEl.dataset.row = rowIndex;
      cellEl.dataset.col = colIndex;
      cellEl.dataset.label = getCellLabel(cell);
      
      const m = cell.multiplier || gameState.board[rowIndex][colIndex].multiplier;
      if (m.word === 2) cellEl.classList.add('cell-word2');
      if (m.word === 3) cellEl.classList.add('cell-word3');
      if (m.letter === 2) cellEl.classList.add('cell-letter2');
      if (m.letter === 3) cellEl.classList.add('cell-letter3');
      if (m.isCenter) cellEl.classList.add('cell-center');
      
      if (cell.letter) {
        cellEl.classList.add('has-letter');
        if (cell.locked) cellEl.classList.add('locked-letter');
        else cellEl.classList.add('new-letter');
        
        cellEl.innerHTML = `<span class="board-cell-letter">${cell.letter}</span><span class="board-cell-score">${cell.value}</span>`;
      }
      fragment.appendChild(cellEl);
    });
  });
  elements.board.innerHTML = '';
  elements.board.appendChild(fragment);
}

function getCellLabel(cell) {
  if (cell.letter) return '';
  const m = cell.multiplier || gameState.board[cell.row][cell.col].multiplier;
  if (m.word === 3) return '3W';
  if (m.word === 2) return '2W';
  if (m.letter === 3) return '3B';
  if (m.letter === 2) return '2B';
  return '';
}

function getCurrentPlayerObj() {
  return gameState.players.find(p => p.id === localState.myPlayerId);
}

function renderRack() {
  const player = getCurrentPlayerObj();
  elements.rack.innerHTML = '';
  if (!player || !player.rack) return;
  
  const placedIds = new Set(localState.placements.keys());
  const rackTiles = player.rack.filter(t => !placedIds.has(t.id));

  const fragment = document.createDocumentFragment();
  rackTiles.forEach((tile, index) => {
    const btn = document.createElement('button');
    btn.className = 'tile-btn' + (tile.isBlank ? ' blank' : '') + (localState.selectedRackIndex === index ? ' selected' : '');
    btn.dataset.index = index; 
    btn.innerHTML = `${tile.assignedLetter || tile.letter}<span>${tile.value}</span>`;
    fragment.appendChild(btn);
  });
  elements.rack.appendChild(fragment);
}

function renderPlayers() {
  elements.playerList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  (gameState.players || []).forEach((player, index) => {
    const li = document.createElement('li');
    if (index === gameState.currentPlayerIndex && !gameState.gameOver) li.classList.add('active');
    const name = document.createElement('span');
    name.className = 'player-name';
    name.textContent = player.name + (player.id === localState.myPlayerId ? ' (Du)' : '');
    const score = document.createElement('span');
    score.className = 'player-score';
    score.textContent = player.score;
    li.append(name, score);
    fragment.appendChild(li);
  });
  elements.playerList.appendChild(fragment);
  const cur = gameState.players[gameState.currentPlayerIndex];
  elements.currentPlayerLabel.textContent = cur ? cur.name : '—';
  elements.bagCount.textContent = (gameState.bag || []).length.toString();
}

function renderHistory() {
  elements.historyList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  (gameState.history || []).slice(0, 14).forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry.message;
    fragment.appendChild(li);
  });
  elements.historyList.appendChild(fragment);
}

function updateTurnInfo() {
  elements.turnCounter.textContent = gameState.gameOver ? 'Ende' : `Zug ${gameState.turn}`;
}

function updateControls() {
  const myTurn = localState.isMyTurn;
  const placed = localState.placements.size > 0;
  elements.submitBtn.disabled = !myTurn || !placed || gameState.gameOver;
  elements.recallBtn.disabled = !placed || gameState.gameOver;
  elements.exchangeBtn.disabled = !myTurn || placed || gameState.gameOver || (gameState.bag || []).length < 7;
  elements.passBtn.disabled = !myTurn || placed || gameState.gameOver;
}

function setStatus(msg, tone = 'info') {
  elements.statusMessage.textContent = msg;
  elements.statusMessage.className = 'status-message ' + (tone === 'success' ? 'status-success' : tone === 'error' ? 'status-error' : 'status-info');
}

function handleRackClick(e) {
  if (gameState.gameOver) return;
  const btn = e.target.closest('.tile-btn');
  if (!btn) return;
  const idx = Number(btn.dataset.index);
  localState.selectedRackIndex = localState.selectedRackIndex === idx ? null : idx;
  renderRack();
}

function handleBoardClick(e) {
  if (gameState.gameOver || !localState.isMyTurn) return;
  const cellEl = e.target.closest('.board-cell');
  if (!cellEl) return;
  const row = Number(cellEl.dataset.row);
  const col = Number(cellEl.dataset.col);
  
  const existingLocal = Array.from(localState.placements.values()).find(p => p.row === row && p.col === col);
  if (existingLocal) {
    localState.placements.delete(existingLocal.tile.id);
    renderRack(); renderBoard(); updateControls();
    return;
  }
  if (gameState.board[row][col].locked) return;
  if (localState.selectedRackIndex === null) { setStatus('Stein wählen.', 'info'); return; }
  
  const player = getCurrentPlayerObj();
  const placedIds = new Set(localState.placements.keys());
  const visibleRack = player.rack.filter(t => !placedIds.has(t.id));
  const tile = visibleRack[localState.selectedRackIndex];
  
  if (!tile) return;
  if (Array.from(localState.placements.values()).some(p => p.row === row && p.col === col)) {
    setStatus('Feld belegt.', 'error'); return;
  }
  
      localState.placements.set(tile.id, { row, col, tile });
      localState.selectedRackIndex = null;
      
        // Explicitly check for blank tile to open modal
      
        if (tile.isBlank) {
      
          // Debugging: Alert to confirm logic entry
      
          // alert('Joker placed! Opening selection...'); 
      
          
      
          // Reset assigned letter if it was set previously (e.g. recalled)
      
          tile.assignedLetter = null;
      
          openBlankModal(tile, row, col);
      
        } else {
      
          renderRack();
      
          renderBoard();
      
          updateControls();
      
        }
      
      }
      
      
      
      function openBlankModal(tile, row, col) {
      
        localState.pendingBlank = { tileId: tile.id, row, col };
      
        elements.blankModal.classList.add('show');
      
        // Force visibility styles in case class fails
      
        elements.blankModal.style.display = 'flex';
      
        elements.blankModal.style.opacity = '1';
      
        elements.blankModal.style.pointerEvents = 'all';
      
      }
      
      
      
      function closeBlankModal() {
      
        elements.blankModal.classList.remove('show');
      
        // Reset forced styles
      
        elements.blankModal.style.display = '';
      
        elements.blankModal.style.opacity = '';
      
        elements.blankModal.style.pointerEvents = '';
      
        
      
        localState.pendingBlank = null;
      
      }
function applyBlankLetter(l) {
  if (!localState.pendingBlank) return;
  const { tileId } = localState.pendingBlank;
  const p = localState.placements.get(tileId);
  if (p) p.tile.assignedLetter = l;
  closeBlankModal(); renderBoard(); renderRack();
}
function handleRecall() {
  localState.placements.clear();
  localState.selectedRackIndex = null;
  renderRack(); renderBoard(); updateControls();
}
function handleShuffleRack() {
  const p = getCurrentPlayerObj();
  if (p && p.rack) {
    shuffle(p.rack);
    const idx = gameState.players.findIndex(pl => pl.id === p.id);
    gameRef.child(`players/${idx}/rack`).set(p.rack);
  }
}
function handlePass() {
  if (!localState.isMyTurn) return;
  const updates = {};
  updates['passes'] = (gameState.passes || 0) + 1;
  updates['currentPlayerIndex'] = (gameState.currentPlayerIndex + 1) % gameState.players.length;
  updates['turn'] = gameState.turn + 1;
  const hist = [...(gameState.history || [])];
  hist.unshift({ message: `${getCurrentPlayerObj().name} passt.` });
  updates['history'] = hist;
  updates['lastActive'] = Date.now();
  gameRef.update(updates);
  if (updates.passes >= gameState.players.length * 2) finishGameRemote('passes');
}

// --- EXCHANGE ---
function openExchangeModal() {
  if (!localState.isMyTurn) return;
  localState.exchangeSelection.clear();
  buildExchangeChoices();
  elements.exchangeModal.classList.add('show');
}

function buildExchangeChoices() {
  const player = getCurrentPlayerObj();
  elements.exchangeChoices.innerHTML = '';
  player.rack.forEach(tile => {
    const btn = document.createElement('button');
    btn.className = 'tile-btn selectable';
    if (tile.isBlank) btn.classList.add('blank');
    btn.innerHTML = `${tile.assignedLetter || tile.letter}<span>${tile.value}</span>`;
    btn.onclick = () => {
      if (localState.exchangeSelection.has(tile.id)) {
        localState.exchangeSelection.delete(tile.id);
        btn.classList.remove('selected');
      } else {
        localState.exchangeSelection.add(tile.id);
        btn.classList.add('selected');
      }
      elements.confirmExchangeBtn.disabled = localState.exchangeSelection.size === 0;
    };
    elements.exchangeChoices.appendChild(btn);
  });
}

function handleConfirmExchange() {
  const player = getCurrentPlayerObj();
  const playerIndex = gameState.players.findIndex(p => p.id === player.id);
  const selectedIds = localState.exchangeSelection;
  
  const tilesToTrade = player.rack.filter(t => selectedIds.has(t.id));
  const keepTiles = player.rack.filter(t => !selectedIds.has(t.id));
  
  const bag = [...(gameState.bag || []), ...tilesToTrade];
  shuffle(bag);
  
  while (keepTiles.length < RACK_SIZE && bag.length > 0) {
    const idx = Math.floor(Math.random() * bag.length);
    keepTiles.push(bag.splice(idx, 1)[0]);
  }
  
  const updates = {};
  updates[`players/${playerIndex}/rack`] = keepTiles;
  updates['bag'] = bag;
  updates['passes'] = 0;
  updates['currentPlayerIndex'] = (gameState.currentPlayerIndex + 1) % gameState.players.length;
  updates['turn'] = gameState.turn + 1;
  
  const hist = [...(gameState.history || [])];
  hist.unshift({ message: `${player.name} tauscht ${selectedIds.size} Steine.` });
  updates['history'] = hist;
  updates['lastActive'] = Date.now();
  
  gameRef.update(updates).then(() => {
    closeExchangeModal();
  });
}

function closeExchangeModal() {
  elements.exchangeModal.classList.remove('show');
  localState.exchangeSelection.clear();
}

function handleSubmitMove() {
  const val = validateMove();
  if (!val.valid) { setStatus(val.message, 'error'); return; }
  
  const player = getCurrentPlayerObj();
  const pIdx = gameState.players.findIndex(p => p.id === player.id);
  const updates = {};
  
  val.placements.forEach(p => {
    updates[`board/${p.row}/${p.col}/letter`] = p.tile.isBlank ? (p.tile.assignedLetter || '?') : p.tile.letter;
    updates[`board/${p.row}/${p.col}/value`] = p.tile.value;
    updates[`board/${p.row}/${p.col}/locked`] = true;
    updates[`board/${p.row}/${p.col}/tileId`] = p.tile.id;
  });
  
  const usedIds = new Set(val.placements.map(p => p.tile.id));
  const newRack = player.rack.filter(t => !usedIds.has(t.id));
  const bag = [...(gameState.bag || [])];
  while (newRack.length < RACK_SIZE && bag.length > 0) {
    const idx = Math.floor(Math.random() * bag.length);
    newRack.push(bag.splice(idx, 1)[0]);
  }
  
  updates[`players/${pIdx}/rack`] = newRack;
  updates[`players/${pIdx}/score`] = player.score + val.score;
  updates['bag'] = bag;
  
  const words = val.words.map(w => `${w.word} (+${w.score})`).join(', ');
  const hist = [...(gameState.history || [])];
  hist.unshift({ message: `${player.name} legt ${words} · ${val.score} Punkte` });
  updates['history'] = hist;
  updates['passes'] = 0;
  updates['currentPlayerIndex'] = (gameState.currentPlayerIndex + 1) % gameState.players.length;
  updates['turn'] = gameState.turn + 1;
  updates['lastActive'] = Date.now();
  
  gameRef.update(updates).then(() => {
    localState.placements.clear();
    if (newRack.length === 0 && bag.length === 0) finishGameRemote('out', pIdx);
  });
}

function validateMove() {
  if (!localState.dictionary.size) return { valid: false, message: 'Wörterbuch lädt...' };
  const placements = Array.from(localState.placements.values());
  const tempBoard = gameState.board.map(r => r.map(c => ({...c})))
  placements.forEach(p => {
    tempBoard[p.row][p.col].letter = p.tile.isBlank ? (p.tile.assignedLetter || '?') : p.tile.letter;
    tempBoard[p.row][p.col].value = p.tile.value;
  });
  
  const rows = placements.map(p => p.row);
  const cols = placements.map(p => p.col);
  const sameRow = rows.every(r => r === rows[0]);
  const sameCol = cols.every(c => c === cols[0]);
  if (!sameRow && !sameCol) return { valid: false, message: 'Nicht in einer Linie.' };
  
  const orient = sameRow ? 'row' : 'col';
  const boardHasTiles = gameState.board.some(r => r.some(c => c.locked));
  
  const { contiguous, touchesConnection } = checkContiguity(tempBoard, placements, orient, boardHasTiles);
  if (!contiguous) return { valid: false, message: 'Lücken im Wort.' };
  if (!boardHasTiles && !placements.some(p => p.row === 7 && p.col === 7)) return { valid: false, message: 'Mitte muss belegt werden.' };
  if (boardHasTiles && !touchesConnection) return { valid: false, message: 'Muss anschließen.' };
  
  const mainWord = collectWord(tempBoard, placements[0].row, placements[0].col, orient);
  if (!localState.dictionary.has(mainWord.word)) return { valid: false, message: `"${mainWord.word}" unbekannt.` };
  
  const crossWords = [];
  for (const p of placements) {
    const perp = orient === 'row' ? 'col' : 'row';
    const w = collectWord(tempBoard, p.row, p.col, perp);
    if (w.letters.length > 1) {
      if (!localState.dictionary.has(w.word)) return { valid: false, message: `"${w.word}" unbekannt.` };
      crossWords.push(w);
    }
  }
  
  const mainScore = calculateScore(tempBoard, mainWord, placements);
  const crossScores = crossWords.map(w => calculateScore(tempBoard, w, placements));
  let total = mainScore.score + crossScores.reduce((s, w) => s + w.score, 0);
  if (placements.length === 7) total += BINGO_BONUS;
  
  return { valid: true, score: total, words: [mainScore, ...crossScores], placements };
}

function checkContiguity(board, placements, orient, boardHasTiles) {
  let touches = false;
  if (orient === 'row') {
    const row = placements[0].row;
    const cols = placements.map(p => p.col);
    const min = Math.min(...cols), max = Math.max(...cols);
    for (let c = min; c <= max; c++) {
      if (!board[row][c].letter) return { contiguous: false };
      if (gameState.board[row][c].locked) touches = true;
    }
  } else {
    const col = placements[0].col;
    const rows = placements.map(p => p.row);
    const min = Math.min(...rows), max = Math.max(...rows);
    for (let r = min; r <= max; r++) {
      if (!board[r][col].letter) return { contiguous: false };
      if (gameState.board[r][col].locked) touches = true;
    }
  }
  if (!touches && boardHasTiles) {
    touches = placements.some(p => {
       const n = [[p.row-1, p.col], [p.row+1, p.col], [p.row, p.col-1], [p.row, p.col+1]];
       return n.some(([r,c]) => r>=0 && r<15 && c>=0 && c<15 && gameState.board[r][c].locked);
    });
  }
  return { contiguous: true, touchesConnection: boardHasTiles ? touches : true };
}

function collectWord(board, row, col, orient) {
  const dr = orient === 'row' ? 0 : 1;
  const dc = orient === 'row' ? 1 : 0;
  let r = row, c = col;
  while (r-dr >= 0 && c-dc >= 0 && board[r-dr][c-dc].letter) { r -= dr; c -= dc; }
  const letters = [], positions = [];
  while (r < 15 && c < 15 && board[r][c].letter) {
    letters.push(board[r][c].letter);
    positions.push({ row: r, col: c });
    r += dr; c += dc;
  }
  return { word: letters.join(''), letters, positions };
}

function calculateScore(board, wordInfo, placements) {
  let wordMult = 1, score = 0;
  const placementSet = new Set(placements.map(p => `${p.row},${p.col}`));
  wordInfo.positions.forEach(({ row, col }) => {
    const cell = board[row][col];
    const isNew = placementSet.has(`${row},${col}`);
    const m = MULTIPLIER_MATRIX[row][col];
    let val = cell.value;
    if (isNew) { val *= m.letter; wordMult *= m.word; }
    score += val;
  });
  return { word: wordInfo.word, score: score * wordMult };
}

function finishGameRemote(reason, pIdx) {
  const players = [...gameState.players];
  let deduction = 0;
  players.forEach(p => { const s = p.rack.reduce((a,b)=>a+b.value,0); p.score -= s; deduction += s; });
  if (pIdx !== undefined) players[pIdx].score += deduction;
  players.sort((a,b) => b.score - a.score);
  const w = players[0];
  const hist = [...(gameState.history || [])];
  hist.unshift({ message: `Spielende! Sieger: ${w.name}` });
  gameRef.update({ gameOver: true, players, winner: w, history: hist });
}

async function initDictionary() {
  if (window.GERMAN_DICTIONARY && Array.isArray(window.GERMAN_DICTIONARY)) {
     window.GERMAN_DICTIONARY.forEach(w => localState.dictionary.add(normalizeWord(w)));
  }
  FALLBACK_WORDS.forEach(w => localState.dictionary.add(normalizeWord(w)));
  for (const url of REMOTE_DICTIONARY_SOURCES) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const txt = await res.text();
        txt.split(/\r?\n/).forEach(l => localState.dictionary.add(normalizeWord(l)));
        elements.dictionaryChip.textContent = `Wörterbuch: ${localState.dictionary.size}`;
        break;
      }
    } catch (e) {}
  }
  elements.dictionaryChip.textContent = `Wörterbuch: ${localState.dictionary.size}`;
}
function normalizeWord(w) { return w.trim().toUpperCase(); }
function shuffle(a) { for (let i = a.length-1; i>0; i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } }