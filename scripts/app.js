const BOARD_SIZE = 15;
const RACK_SIZE = 7;
const BINGO_BONUS = 50;
const REMOTE_DICTIONARY_SOURCES = [
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
  "aber", "abend", "abfahrt", "abgabe", "abitur", "ablauf", "abschied", "absicht", "acht", "achtung", "adresse", "\u00c3\u00a4hnlich",
  "aktion", "alltag", "als", "alt", "am", "amerika", "amt", "analyse", "anfang", "angebot", "angst", "ankunft",
  "anlage", "antwort", "anwalt", "arbeit", "archiv", "arena", "arzt", "aspekt", "atem", "augenblick", "augenlid", "au\u00c3\u0178er",
  "ausbildung", "ausdruck", "ausflug", "ausgabe", "ausgleich", "auskunft", "ausland", "auslauf", "auswahl", "auto", "bahnhof", "ball",
  "baum", "becher", "bedarf", "befehl", "begriff", "beispiel", "beitrag", "bekannt", "beleg", "bereich", "berg", "bericht",
  "berlin", "beruf", "bescheid", "besitz", "bestellung", "bewegung", "bewohner", "bewusstsein", "bezirk", "bibliothek", "blick", "boden",
  "bote", "brief", "brille", "br\u00c3\u00bccke", "bruder", "b\u00c3\u00bccher", "b\u00c3\u00bcro", "b\u00c3\u00bcrger", "chef", "chor", "computer", "container",
  "couch", "dach", "dame", "dank", "datenbank", "dauer", "deckung", "dekan", "denken", "deutsche", "dialog", "dienst",
  "dinner", "disziplin", "dokument", "dorf", "dosis", "druck", "duft", "durchgang", "durst", "eben", "ebene", "ecke",
  "effekt", "ehe", "ehrgeiz", "ei", "eifer", "eimer", "einblick", "eindruck", "einheit", "einsatz", "eintrag", "element",
  "empfang", "ende", "energie", "engel", "entwurf", "erfahrung", "erfolg", "ergebnis", "erhebung", "erinnerung", "erlebnis", "ermittlung",
  "ernte", "erz\u00c3\u00a4hlung", "essen", "etage", "etappe", "ethik", "etikett", "farbe", "faktor", "familie", "fang", "farm",
  "fasching", "fassung", "faust", "fehler", "feier", "feld", "fenster", "ferien", "ferse", "fest", "fieber", "figur",
  "film", "filter", "firma", "flamme", "flasche", "fleck", "fliege", "flotte", "fluss", "folge", "form", "fortschritt",
  "foto", "frage", "freiheit", "freitag", "fremde", "freund", "friedhof", "friseur", "frucht", "fr\u00c3\u00bchst\u00c3\u00bcck", "fund", "funktion",
  "gabel", "gabe", "gala", "garten", "gas", "geb\u00c3\u00a4ck", "gebirge", "gebot", "gebrauch", "geburt", "gedanke", "gefahr",
  "gegend", "gegner", "geh\u00c3\u00b6r", "geist", "gel\u00c3\u00a4nde", "geld", "geldbeutel", "gelenk", "gelingen", "gel\u00c3\u00bcbde", "gem\u00c3\u00a4lde", "gemeinschaft",
  "gem\u00c3\u00bcse", "genau", "genuss", "ger\u00c3\u00a4t", "gericht", "gesetz", "gesicht", "gespr\u00c3\u00a4ch", "gestalt", "gestern", "gesundheit", "getr\u00c3\u00a4nk",
  "gewicht", "gewohnheit", "gipfel", "glanz", "glaube", "gleich", "gl\u00c3\u00bcck", "gott", "graben", "grafik", "grau", "grenze",
  "griff", "grill", "grund", "gruppe", "g\u00c3\u00bcnstig", "gutachten", "haar", "haben", "hafen", "halbzeit", "halle", "hals",
  "handlung", "handwerk", "hang", "hauch", "hauptstadt", "haus", "haushalt", "haut", "heft", "heim", "heilung", "heimat",
  "heizung", "held", "hell", "hilfe", "himmel", "hinweis", "hof", "holz", "hochhaus", "hochzeit", "hocker", "hobby",
  "hofladen", "holung", "horizont", "hotel", "hunger", "idee", "idylle", "illusion", "impuls", "index", "info", "ingenieur",
  "inhalt", "initiative", "insel", "institut", "internet", "investor", "ironie", "jagd", "jahr", "jahreszeit", "jazz", "jetzt",
  "job", "journal", "jubel", "junge", "jury", "kaffee", "kamin", "kanal", "kandidat", "kantine", "karte", "kasten",
  "katalog", "katze", "kauf", "keller", "kenner", "kenntnis", "kerze", "kette", "kilometer", "kino", "kiosk", "kiste",
  "kittel", "klinge", "klinik", "klima", "klingel", "kloster", "knapp", "knochen", "knopf", "koch", "kollege", "kolumne",
  "komitee", "komfort", "kommune", "konferenz", "konflikt", "konto", "konzept", "kopf", "kopie", "korn", "k\u00c3\u00b6rper", "kost",
  "kraft", "kragen", "krankheit", "krimi", "krise", "krone", "k\u00c3\u00bcche", "kunde", "kunst", "kurve", "kurs", "kurz",
  "k\u00c3\u00bcste", "labor", "lage", "lampe", "land", "lassen", "laune", "lauf", "laut", "leben", "lehrer", "leistung",
  "leiter", "lektor", "lenkung", "lexikon", "licht", "liebe", "lied", "liga", "linie", "liste", "liter", "lob",
  "logik", "l\u00c3\u00b6sung", "luft", "lust", "luxus", "magazin", "maler", "mangel", "markt", "maschine", "ma\u00c3\u0178", "material",
  "maurer", "medizin", "meer", "meister", "meldung", "menge", "mensch", "menschen", "messer", "metall", "miete", "milch",
  "minute", "mission", "mittag", "mittel", "monat", "moment", "montag", "monitor", "motor", "musik", "mutation", "muster",
  "mythos", "nachbar", "nachricht", "nachschub", "nacht", "nadel", "nahe", "name", "nation", "natur", "nebel", "neben",
  "neigung", "nein", "netz", "neugier", "niveau", "notiz", "nummer", "nutzen", "oase", "oberteil", "objekt", "obst",
  "ofen", "offerte", "offizier", "ohne", "\u00c3\u00b6konomie", "olympia", "oper", "opfer", "option", "ordnung", "ort", "paket",
  "palast", "panorama", "papier", "parade", "park", "partner", "pass", "pause", "pension", "person", "pfeil", "pflanze",
  "phase", "piano", "pilz", "plan", "plakat", "pl\u00c3\u00a4ne", "plastik", "platz", "plenum", "poesie", "polizei", "portion",
  "position", "post", "praxis", "preis", "prinzip", "prozess", "puls", "pult", "punkt", "quecksilber", "quote", "rad",
  "radio", "rahmen", "rand", "rasen", "ration", "raum", "raupe", "reform", "regel", "regen", "reich", "reise",
  "reiter", "reiz", "rekord", "reparatur", "residenz", "restaurant", "resultat", "rhythmus", "richter", "riff", "ring", "risiko",
  "ritter", "rolle", "roman", "rosen", "route", "rucksack", "ruhe", "runde", "saal", "saft", "sage", "saison",
  "salat", "salz", "samt", "satz", "szene", "schalter", "schatten", "schatz", "schiff", "schlauch", "schloss", "schluss",
  "schmerz", "schnee", "schnur", "schrank", "schritt", "schuh", "sch\u00c3\u00bcler", "schutz", "schwester", "see", "seele", "segel",
  "segen", "sektor", "seite", "sekunde", "selbst", "semester", "sendung", "sensor", "serie", "service", "sessel", "sicherheit",
  "sicht", "signal", "silbe", "silber", "sinn", "sirene", "sitte", "skala", "skizze", "sofa", "sohn", "solide",
  "sommer", "sonne", "sound", "spa\u00c3\u0178", "spalte", "spannung", "sparplan", "spiegel", "spiel", "spitze", "sport", "sprache",
  "sprecher", "sprung", "stadt", "stall", "stand", "start", "statistik", "staub", "stein", "stern", "steuerrad", "stimme",
  "stoff", "stolz", "st\u00c3\u00b6rfall", "stra\u00c3\u0178e", "strick", "strom", "stube", "stufe", "sturm", "stute", "studium", "studio",
  "stunde", "st\u00c3\u00bcck", "system", "tabelle", "takt", "talent", "tanz", "tasche", "taste", "technik", "teich", "teil",
  "telefon", "theater", "thema", "therme", "ticket", "tisch", "titel", "ton", "tonne", "tor", "tradition", "trainer",
  "traum", "treffer", "trend", "treppe", "trick", "truppe", "tuch", "turm", "ufer", "uhr", "umsatz", "umwelt",
  "umfang", "unfall", "unfug", "uniform", "urlaub", "ursprung", "urteil", "vater", "verband", "verbrauch", "verein", "verfassung",
  "verhalten", "verkauf", "verlauf", "verh\u00c3\u00a4ltnis", "verlag", "verlust", "vermerk", "verrat", "vertrag", "verwaltung", "versorgung", "versuch",
  "verkehr", "version", "viertel", "villa", "vision", "vogel", "vorbild", "vorgang", "vorhaben", "vorlage", "vormittag", "vorrat",
  "vorteil", "vortrag", "wahl", "wandel", "wanne", "ware", "warnung", "wartung", "wasser", "weg", "wehr", "weide",
  "weil", "welt", "wert", "wetter", "wiese", "wille", "wind", "winkel", "winter", "wirkung", "wissen", "wohnung",
  "wolf", "worte", "wortlaut", "wunsch", "zahl", "zahnarzt", "zeit", "zeitung", "zentrum", "zeugen", "ziel", "zimmer",
  "zitat", "zivil", "zone", "zug", "zukunft", "zunge", "zustand", "zutat", "zuwachs", "zwang", "zweck"
];

const MULTIPLIER_MATRIX = buildMultiplierMatrix();

const state = {
  board: [],
  bag: [],
  players: [],
  currentPlayerIndex: 0,
  placements: new Map(),
  selectedRackIndex: null,
  dictionary: new Set(),
  dictionarySource: 'fallback',
  history: [],
  passes: 0,
  turn: 1,
  nextTileId: 1,
  gameOver: false,
  pendingBlank: null,
  exchangeSelection: new Set()
};

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
  startOverlay: document.getElementById('startOverlay'),
  playerForm: document.getElementById('playerForm'),
  playerInputList: document.getElementById('playerInputList'),
  addPlayerField: document.getElementById('addPlayerField'),
  blankModal: document.getElementById('blankModal'),
  blankChoices: document.getElementById('blankChoices'),
  exchangeModal: document.getElementById('exchangeModal'),
  exchangeChoices: document.getElementById('exchangeChoices'),
  confirmExchangeBtn: document.getElementById('confirmExchangeBtn'),
  cancelExchangeBtn: document.getElementById('cancelExchangeBtn'),
  dictionaryChip: document.getElementById('dictionaryChip')
};

// Initialize dictionary
const localDictionary = new Set();

if (window.GERMAN_DICTIONARY && Array.isArray(window.GERMAN_DICTIONARY)) {
  // Use the full local dictionary if available
  window.GERMAN_DICTIONARY.forEach(word => localDictionary.add(word));
  state.dictionary = localDictionary;
  state.dictionarySource = 'local-full';
  elements.dictionaryChip.textContent = `Wörterbuch: ${state.dictionary.size.toLocaleString('de-DE')} Einträge`;
  // Clear the global array to free up some memory if possible (though V8 might keep it)
  window.GERMAN_DICTIONARY = null; 
} else {
  // Use fallback words
  FALLBACK_WORDS.forEach(word => {
    const normalized = normalizeWord(word);
    if (normalized) localDictionary.add(normalized);
  });
  state.dictionary = localDictionary;
  state.dictionarySource = 'fallback';
  elements.dictionaryChip.textContent = `Fallback-Wörterbuch: ${state.dictionary.size.toLocaleString('de-DE')} Einträge`;

  // Only load remote if we don't have the full local one
  loadRemoteDictionary().then(result => {
    if (result.source === 'remote') {
      state.dictionary = result.set;
      state.dictionarySource = result.source;
      elements.dictionaryChip.textContent = `Vollständiges Wörterbuch: ${result.set.size.toLocaleString('de-DE')} Einträge`;
    }
  }).catch(() => {
    console.log('Remote dictionary load failed, staying with fallback.');
  });
}

setupPlayerForm();
buildBlankChoices();
bindEvents();
state.board = createBoard();
renderBoard();
renderHistory();
updateControls();
setStatus('Bereit für ein neues Spiel.', 'info');

function bindEvents() {
  elements.rack.addEventListener('click', handleRackClick);
  elements.board.addEventListener('click', handleBoardClick);
  elements.submitBtn.addEventListener('click', handleSubmitMove);
  elements.recallBtn.addEventListener('click', handleRecall);
  elements.shuffleBtn.addEventListener('click', handleShuffleRack);
  elements.exchangeBtn.addEventListener('click', openExchangeModal);
  elements.passBtn.addEventListener('click', handlePass);
  elements.playerForm.addEventListener('submit', handlePlayerFormSubmit);
  elements.addPlayerField.addEventListener('click', () => addPlayerInput(''));
  elements.blankModal.querySelector('[data-close-blank]').addEventListener('click', closeBlankModal);
  elements.exchangeModal.querySelector('[data-close-exchange]').addEventListener('click', closeExchangeModal);
  elements.cancelExchangeBtn.addEventListener('click', closeExchangeModal);
  elements.confirmExchangeBtn.addEventListener('click', handleConfirmExchange);
}

function handlePlayerFormSubmit(event) {
  event.preventDefault();
  const inputs = Array.from(elements.playerInputList.querySelectorAll('input'));
  const names = inputs
    .map((input, idx) => input.value.trim() || `Spieler ${idx + 1}`)
    .filter(Boolean);
  if (names.length < 2) {
    setStatus('Bitte mindestens zwei Spieler eintragen.', 'error');
    return;
  }
  if (names.length > 4) {
    setStatus('Maximal vier Spieler sind erlaubt.', 'error');
    return;
  }
  startGame(names, state.dictionary, state.dictionarySource);
}

function startGame(names, dictionary, source) {
  if (!dictionary || !dictionary.size) {
    setStatus('Wörterbuch noch nicht bereit. Bitte versuche es erneut.', 'error');
    return;
  }
  state.dictionary = dictionary;
  state.dictionarySource = source || state.dictionarySource;
  state.players = names.map((name, idx) => ({ id: `P${idx + 1}`, name, score: 0, rack: [] }));
  state.currentPlayerIndex = 0;
  state.board = createBoard();
  state.bag = buildBag();
  state.placements.clear();
  state.selectedRackIndex = null;
  state.history = [];
  state.passes = 0;
  state.turn = 1;
  state.gameOver = false;
  state.pendingBlank = null;
  state.exchangeSelection.clear();
  state.players.forEach(player => drawTiles(player));
  elements.startOverlay.classList.remove('is-visible');
  recordHistory({ message: 'Neues Spiel gestartet.' });
  renderEverything('Viel Erfolg! Das Spiel beginnt.');
}

function renderEverything(message) {
  renderBoard();
  renderRack();
  renderPlayers();
  renderHistory();
  updateControls();
  updateTurnInfo();
  if (message) {
    setStatus(message, 'info');
  }
}

function drawTiles(player) {
  while (player.rack.length < RACK_SIZE && state.bag.length) {
    player.rack.push(state.bag.pop());
  }
}

function buildBag() {
  const bag = [];
  GERMAN_TILES.forEach(tileType => {
    for (let i = 0; i < tileType.count; i += 1) {
      bag.push({
        id: `T${state.nextTileId++}`,
        letter: tileType.letter,
        value: tileType.value,
        isBlank: Boolean(tileType.isBlank || tileType.letter === '?'),
        assignedLetter: null
      });
    }
  });
  shuffle(bag);
  return bag;
}

function createBoard() {
  return Array.from({ length: BOARD_SIZE }, (_, row) => (
    Array.from({ length: BOARD_SIZE }, (_, col) => ({
      row,
      col,
      letter: '',
      value: 0,
      tileId: null,
      isBlank: false,
      locked: false,
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

function renderBoard() {
  const fragment = document.createDocumentFragment();
  state.board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellEl = document.createElement('div');
      cellEl.className = 'board-cell';
      cellEl.dataset.row = rowIndex;
      cellEl.dataset.col = colIndex;
      cellEl.dataset.label = getCellLabel(cell);
      const { word, letter, isCenter } = cell.multiplier;
      if (word === 2) cellEl.classList.add('cell-word2');
      if (word === 3) cellEl.classList.add('cell-word3');
      if (letter === 2) cellEl.classList.add('cell-letter2');
      if (letter === 3) cellEl.classList.add('cell-letter3');
      if (isCenter) cellEl.classList.add('cell-center');
      if (cell.letter) {
        cellEl.classList.add('has-letter');
        if (!cell.locked) cellEl.classList.add('new-letter');
        if (cell.locked) cellEl.classList.add('locked-letter');
        const letterEl = document.createElement('span');
        letterEl.className = 'board-cell-letter';
        letterEl.textContent = cell.letter;
        const scoreEl = document.createElement('span');
        scoreEl.className = 'board-cell-score';
        scoreEl.textContent = cell.value;
        cellEl.append(letterEl, scoreEl);
      }
      fragment.appendChild(cellEl);
    });
  });
  elements.board.innerHTML = '';
  elements.board.appendChild(fragment);
}

function getCellLabel(cell) {
  if (cell.letter) return '';
  if (cell.multiplier.word === 3) return '3W';
  if (cell.multiplier.word === 2) return '2W';
  if (cell.multiplier.letter === 3) return '3B';
  if (cell.multiplier.letter === 2) return '2B';
  return '';
}

function renderRack() {
  const player = getCurrentPlayer();
  elements.rack.innerHTML = '';
  if (!player) return;
  const fragment = document.createDocumentFragment();
  player.rack.forEach((tile, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tile-btn';
    if (tile.isBlank) button.classList.add('blank');
    if (state.selectedRackIndex === index) button.classList.add('selected');
    button.dataset.index = index;
    button.innerHTML = `${tile.assignedLetter || tile.letter}<span>${tile.value}</span>`;
    fragment.appendChild(button);
  });
  elements.rack.appendChild(fragment);
}

function renderPlayers() {
  elements.playerList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  state.players.forEach((player, index) => {
    const li = document.createElement('li');
    if (index === state.currentPlayerIndex && !state.gameOver) li.classList.add('active');
    const name = document.createElement('span');
    name.className = 'player-name';
    name.textContent = player.name;
    const score = document.createElement('span');
    score.className = 'player-score';
    score.textContent = player.score;
    li.append(name, score);
    fragment.appendChild(li);
  });
  elements.playerList.appendChild(fragment);
  const player = getCurrentPlayer();
  elements.currentPlayerLabel.textContent = player ? player.name : '—';
  elements.bagCount.textContent = state.bag.length.toString();
}

function renderHistory() {
  elements.historyList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  state.history.slice(0, 14).forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry.message;
    fragment.appendChild(li);
  });
  elements.historyList.appendChild(fragment);
}

function updateTurnInfo() {
  elements.turnCounter.textContent = state.gameOver ? 'Spielende' : `Zug ${state.turn}`;
}

function setStatus(message, tone = 'info') {
  elements.statusMessage.textContent = message;
  elements.statusMessage.classList.remove('status-info', 'status-success', 'status-error');
  const toneClass = tone === 'success' ? 'status-success' : tone === 'error' ? 'status-error' : 'status-info';
  elements.statusMessage.classList.add(toneClass);
}

function updateControls() {
  const hasPlayers = state.players.length > 0;
  const hasPlacements = state.placements.size > 0;
  elements.submitBtn.disabled = !hasPlacements || state.gameOver;
  elements.recallBtn.disabled = !hasPlacements || state.gameOver;
  elements.shuffleBtn.disabled = !hasPlayers || hasPlacements || state.gameOver;
  elements.exchangeBtn.disabled = !hasPlayers || hasPlacements || state.gameOver || state.bag.length < 7;
  elements.passBtn.disabled = !hasPlayers || hasPlacements || state.gameOver;
}

function getCurrentPlayer() {
  return state.players[state.currentPlayerIndex];
}

function handleRackClick(event) {
  if (state.gameOver) return;
  const button = event.target.closest('.tile-btn');
  if (!button) return;
  const index = Number(button.dataset.index);
  state.selectedRackIndex = state.selectedRackIndex === index ? null : index;
  renderRack();
  updateControls();
}

function handleBoardClick(event) {
  if (state.gameOver) return;
  const cellEl = event.target.closest('.board-cell');
  if (!cellEl) return;
  const row = Number(cellEl.dataset.row);
  const col = Number(cellEl.dataset.col);
  const cell = state.board[row][col];
  if (cell.letter && !cell.locked) {
    removeTileFromBoard(cell);
    return;
  }
  if (state.selectedRackIndex === null) {
    setStatus('Wähle zuerst einen Stein aus deinem Rack.', 'info');
    return;
  }
  placeSelectedTile(row, col);
}

function placeSelectedTile(row, col) {
  const player = getCurrentPlayer();
  const cell = state.board[row][col];
  if (!player || cell.letter) {
    setStatus('Dieses Feld ist bereits belegt.', 'error');
    return;
  }
  const tile = player.rack.splice(state.selectedRackIndex, 1)[0];
  if (!tile) return;
  cell.letter = tile.isBlank ? (tile.assignedLetter || '?') : tile.letter;
  cell.value = tile.value;
  cell.tileId = tile.id;
  cell.isBlank = tile.isBlank;
  cell.locked = false;
  state.placements.set(tile.id, { row, col, tile });
  state.selectedRackIndex = null;
  renderRack();
  renderBoard();
  updateControls();
  if (tile.isBlank && !tile.assignedLetter) {
    openBlankModal(tile, row, col);
  }
}

function removeTileFromBoard(cell) {
  const placement = state.placements.get(cell.tileId);
  if (!placement) return;
  const player = getCurrentPlayer();
  if (!player) return;
  if (placement.tile.isBlank) {
    placement.tile.assignedLetter = null;
  }
  player.rack.push(placement.tile);
  state.placements.delete(cell.tileId);
  cell.letter = '';
  cell.value = 0;
  cell.tileId = null;
  cell.isBlank = false;
  renderRack();
  renderBoard();
  updateControls();
}

function openBlankModal(tile, row, col) {
  state.pendingBlank = { tile, row, col };
  elements.blankModal.classList.remove('hidden');
  elements.blankModal.classList.add('show');
}

function closeBlankModal() {
  elements.blankModal.classList.remove('show');
  state.pendingBlank = null;
  setTimeout(() => elements.blankModal.classList.add('hidden'), 180);
}

function buildBlankChoices() {
  elements.blankChoices.innerHTML = '';
  BLANK_CHOICES.forEach(letter => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = letter;
    button.addEventListener('click', () => applyBlankLetter(letter));
    elements.blankChoices.appendChild(button);
  });
}

function applyBlankLetter(letter) {
  if (!state.pendingBlank) return;
  const { tile, row, col } = state.pendingBlank;
  tile.assignedLetter = letter;
  const cell = state.board[row][col];
  cell.letter = letter;
  closeBlankModal();
  renderBoard();
}

function handleRecall() {
  if (!state.placements.size) return;
  const player = getCurrentPlayer();
  state.placements.forEach(({ row, col, tile }) => {
    const cell = state.board[row][col];
    cell.letter = '';
    cell.value = 0;
    cell.tileId = null;
    cell.isBlank = false;
    if (tile.isBlank) tile.assignedLetter = null;
    player.rack.push(tile);
  });
  state.placements.clear();
  renderRack();
  renderBoard();
  updateControls();
}

function handleShuffleRack() {
  if (state.placements.size) {
    setStatus('Bringe zuerst alle gelegten Steine zurück.', 'error');
    return;
  }
  const player = getCurrentPlayer();
  shuffle(player.rack);
  renderRack();
}

function handleSubmitMove() {
  const validation = validateMove();
  if (!validation.valid) {
    setStatus(validation.message, 'error');
    return;
  }
  finalizeMove(validation);
}

function validateMove() {
  if (!state.dictionary.size) {
    return { valid: false, message: 'Wörterbuch lädt noch …' };
  }
  if (!state.placements.size) {
    return { valid: false, message: 'Platziere mindestens einen Stein.' };
  }
  const placements = Array.from(state.placements.values()).map(entry => ({
    row: entry.row,
    col: entry.col,
    tile: entry.tile
  }));
  const rows = placements.map(p => p.row);
  const cols = placements.map(p => p.col);
  const sameRow = rows.every(row => row === rows[0]);
  const sameCol = cols.every(col => col === cols[0]);
  if (!sameRow && !sameCol) {
    return { valid: false, message: 'Alle Steine müssen in einer Reihe oder Spalte liegen.' };
  }
  const orientation = sameRow ? 'row' : 'col';
  const boardHasTiles = state.board.some(row => row.some(cell => cell.locked));
  const { contiguous, touchesConnection } = ensureContiguity(placements, orientation, boardHasTiles);
  if (!contiguous) {
    return { valid: false, message: 'Die Steine müssen lückenlos verbunden sein.' };
  }
  if (!boardHasTiles) {
    if (!placements.some(p => p.row === 7 && p.col === 7)) {
      return { valid: false, message: 'Der erste Zug muss das Mittelfeld nutzen.' };
    }
  } else if (!touchesConnection) {
    return { valid: false, message: 'Der Zug muss an bestehende Wörter anschließen.' };
  }
  if (placements.some(p => p.tile.isBlank && !p.tile.assignedLetter)) {
    return { valid: false, message: 'Weise allen Blanko-Steinen einen Buchstaben zu.' };
  }

  const mainWord = collectWord(placements[0].row, placements[0].col, orientation);
  if (!mainWord || !mainWord.word) {
    return { valid: false, message: 'Das gelegte Wort konnte nicht erkannt werden.' };
  }
  if (!state.dictionary.has(mainWord.word)) {
    return { valid: false, message: `"${mainWord.word}" ist nicht im Wörterbuch.` };
  }

  const crossWords = [];
  placements.forEach(placement => {
    const perpendicular = collectWord(placement.row, placement.col, orientation === 'row' ? 'col' : 'row');
    if (perpendicular && perpendicular.letters.length > 1) {
      if (!state.dictionary.has(perpendicular.word)) {
        crossWords.push({ ...perpendicular, invalid: true });
      } else {
        crossWords.push(perpendicular);
      }
    }
  });
  const invalidCross = crossWords.find(word => word.invalid);
  if (invalidCross) {
    return { valid: false, message: `"${invalidCross.word}" ist nicht erlaubt.` };
  }

  const mainScore = calculateWordScore(mainWord);
  const crossScores = crossWords.map(word => calculateWordScore(word));
  let totalScore = mainScore.score + crossScores.reduce((sum, word) => sum + word.score, 0);
  const usedAllLetters = placements.length === RACK_SIZE;
  if (usedAllLetters && getCurrentPlayer().rack.length === 0) {
    totalScore += BINGO_BONUS;
  }
  return {
    valid: true,
    score: totalScore,
    words: [mainScore, ...crossScores],
    placements,
    usedAllLetters
  };
}

function ensureContiguity(placements, orientation, boardHasTiles) {
  if (!placements.length) return { contiguous: false, touchesConnection: false };
  let touchesConnection = false;
  if (orientation === 'row') {
    const row = placements[0].row;
    const cols = placements.map(p => p.col);
    const min = Math.min(...cols);
    const max = Math.max(...cols);
    for (let col = min; col <= max; col += 1) {
      if (!state.board[row][col].letter) {
        return { contiguous: false, touchesConnection: false };
      }
      if (state.board[row][col].locked) touchesConnection = true;
    }
  } else {
    const col = placements[0].col;
    const rows = placements.map(p => p.row);
    const min = Math.min(...rows);
    const max = Math.max(...rows);
    for (let row = min; row <= max; row += 1) {
      if (!state.board[row][col].letter) {
        return { contiguous: false, touchesConnection: false };
      }
      if (state.board[row][col].locked) touchesConnection = true;
    }
  }
  if (!touchesConnection && boardHasTiles) {
    touchesConnection = placements.some(p => hasLockedNeighbor(p.row, p.col));
  }
  return { contiguous: true, touchesConnection: boardHasTiles ? touchesConnection : true };
}

function hasLockedNeighbor(row, col) {
  const neighbors = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1]
  ];
  return neighbors.some(([r, c]) => r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && state.board[r][c].locked);
}

function collectWord(row, col, orientation) {
  const delta = orientation === 'row' ? { dr: 0, dc: 1 } : { dr: 1, dc: 0 };
  let startRow = row;
  let startCol = col;
  while (isLetterCell(startRow - delta.dr, startCol - delta.dc)) {
    startRow -= delta.dr;
    startCol -= delta.dc;
  }
  const letters = [];
  const positions = [];
  let currentRow = startRow;
  let currentCol = startCol;
  while (isLetterCell(currentRow, currentCol)) {
    letters.push(state.board[currentRow][currentCol].letter);
    positions.push({ row: currentRow, col: currentCol });
    currentRow += delta.dr;
    currentCol += delta.dc;
  }
  return {
    word: normalizeWord(letters.join('')),
    letters,
    positions
  };
}

function isLetterCell(row, col) {
  if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return false;
  return Boolean(state.board[row][col].letter);
}

function calculateWordScore(wordInfo) {
  let wordMultiplier = 1;
  let total = 0;
  wordInfo.positions.forEach(({ row, col }) => {
    const cell = state.board[row][col];
    const base = cell.value;
    if (cell.locked) {
      total += base;
    } else {
      total += base * cell.multiplier.letter;
      wordMultiplier *= cell.multiplier.word;
    }
  });
  return { word: wordInfo.word, score: total * wordMultiplier };
}

function finalizeMove(validation) {
  const player = getCurrentPlayer();
  validation.placements.forEach(({ row, col }) => {
    state.board[row][col].locked = true;
  });
  const rackEmptyBeforeDraw = player.rack.length === 0;
  const wordSummary = validation.words.map(word => `${word.word} (+${word.score})`).join(', ');
  recordHistory({ message: `${player.name} legt ${wordSummary} · ${validation.score} Punkte` });
  player.score += validation.score;
  state.placements.clear();
  drawTiles(player);
  state.passes = 0;
  renderEverything(`${player.name} erhält ${validation.score} Punkte.`);
  if (validation.usedAllLetters) {
    setStatus(`${player.name} erzielt einen Scrabble! +${BINGO_BONUS} Punkte`, 'success');
  }
  const finisherIndex = rackEmptyBeforeDraw && state.bag.length === 0 ? state.currentPlayerIndex : null;
  if (finisherIndex !== null) {
    finalizeGame('out-of-tiles', finisherIndex);
    return;
  }
  advancePlayer();
  checkGameOver();
}

function advancePlayer() {
  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
  state.turn += 1;
  state.selectedRackIndex = null;
  renderPlayers();
  renderRack();
  updateControls();
}

function handlePass() {
  if (state.placements.size) {
    setStatus('Entferne zuerst alle gelegten Steine, bevor du passt.', 'error');
    return;
  }
  const player = getCurrentPlayer();
  state.passes += 1;
  recordHistory({ message: `${player.name} passt.` });
  setStatus(`${player.name} setzt eine Runde aus.`, 'info');
  advancePlayer();
  checkGameOver();
}

function openExchangeModal() {
  if (state.gameOver) return;
  if (state.placements.size) {
    setStatus('Ziehe zunächst deine gelegten Steine zurück.', 'error');
    return;
  }
  if (state.bag.length < 7) {
    setStatus('Ein Tausch ist nur möglich, wenn mindestens 7 Steine im Beutel sind.', 'error');
    return;
  }
  state.exchangeSelection.clear();
  buildExchangeChoices();
  elements.exchangeModal.classList.remove('hidden');
  elements.exchangeModal.classList.add('show');
  updateExchangeControls();
}

function buildExchangeChoices() {
  const player = getCurrentPlayer();
  elements.exchangeChoices.innerHTML = '';
  player.rack.forEach(tile => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tile-btn selectable';
    if (tile.isBlank) button.classList.add('blank');
    button.dataset.tileId = tile.id;
    button.innerHTML = `${tile.assignedLetter || tile.letter}<span>${tile.value}</span>`;
    button.addEventListener('click', () => toggleExchangeSelection(tile.id, button));
    elements.exchangeChoices.appendChild(button);
  });
}

function toggleExchangeSelection(tileId, button) {
  if (state.exchangeSelection.has(tileId)) {
    state.exchangeSelection.delete(tileId);
    button.classList.remove('selected');
  } else {
    state.exchangeSelection.add(tileId);
    button.classList.add('selected');
  }
  updateExchangeControls();
}

function updateExchangeControls() {
  elements.confirmExchangeBtn.disabled = state.exchangeSelection.size === 0;
}

function closeExchangeModal() {
  elements.exchangeModal.classList.remove('show');
  state.exchangeSelection.clear();
  setTimeout(() => elements.exchangeModal.classList.add('hidden'), 180);
}

function handleConfirmExchange() {
  if (!state.exchangeSelection.size) return;
  const player = getCurrentPlayer();
  const selectedIds = new Set(state.exchangeSelection);
  const returning = [];
  player.rack = player.rack.filter(tile => {
    if (selectedIds.has(tile.id)) {
      if (tile.isBlank) tile.assignedLetter = null;
      returning.push(tile);
      return false;
    }
    return true;
  });
  returning.forEach(tile => state.bag.push(tile));
  shuffle(state.bag);
  drawTiles(player);
  recordHistory({ message: `${player.name} tauscht ${selectedIds.size} Stein(e).` });
  setStatus(`${player.name} hat Steine getauscht.`, 'info');
  state.passes = 0;
  closeExchangeModal();
  renderRack();
  renderPlayers();
  advancePlayer();
  checkGameOver();
}

function recordHistory(entry) {
  state.history.unshift(entry);
  renderHistory();
}

function checkGameOver() {
  if (state.gameOver) return;
  const emptyPlayerIndex = state.players.findIndex(player => player.rack.length === 0);
  if (emptyPlayerIndex !== -1 && state.bag.length === 0) {
    finalizeGame('out-of-tiles', emptyPlayerIndex);
    return;
  }
  if (state.passes >= state.players.length * 2) {
    finalizeGame('passes');
  }
}

function finalizeGame(reason, finisherIndex = null) {
  state.gameOver = true;
  let totalLeftovers = 0;
  state.players.forEach(player => {
    const leftover = player.rack.reduce((sum, tile) => sum + tile.value, 0);
    player.score -= leftover;
    totalLeftovers += leftover;
  });
  if (finisherIndex !== null) {
    state.players[finisherIndex].score += totalLeftovers;
  }
  renderPlayers();
  const ranking = [...state.players].sort((a, b) => b.score - a.score);
  const winner = ranking[0];
  const reasonText = reason === 'passes'
    ? 'Alle Spieler haben mehrfach ausgesetzt.'
    : 'Es sind keine Steine mehr vorhanden.';
  const summary = `Spielende: ${reasonText} Sieger: ${winner ? `${winner.name} (${winner.score} Punkte)` : '—'}`;
  setStatus(summary, 'success');
  recordHistory({ message: summary });
  updateControls();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function normalizeWord(word = '') {
  return word
    .trim()
    .toUpperCase()
    .replace(/\u1E9E/g, 'SS')
    .replace(/\u00DF/g, 'SS');
}


async function loadRemoteDictionary() {
  const dictionary = new Set();
  FALLBACK_WORDS.forEach(word => {
    const normalized = normalizeWord(word);
    if (normalized) {
      dictionary.add(normalized);
    }
  });
  let source = 'fallback';
  for (const url of REMOTE_DICTIONARY_SOURCES) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const textContent = await response.text();
      textContent.split(/\r?\n/).forEach(line => {
        const normalized = normalizeWord(line);
        if (normalized) {
          dictionary.add(normalized);
        }
      });
      source = 'remote';
      break;
    } catch (error) {
      // ignore network errors and continue with fallback
    }
  }
  return { set: dictionary, source };
}


function addPlayerInput(defaultValue = '') {
  const currentInputs = elements.playerInputList.querySelectorAll('input');
  if (currentInputs.length >= 4) {
    setStatus('Es können maximal vier Spieler teilnehmen.', 'error');
    return;
  }
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = `Spieler ${currentInputs.length + 1}`;
  input.value = defaultValue;
  elements.playerInputList.appendChild(input);
}

function setupPlayerForm() {
  elements.playerInputList.innerHTML = '';
  addPlayerInput('');
  addPlayerInput('');
}

