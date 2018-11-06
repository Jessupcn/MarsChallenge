/** Constants */

const GRID_ROWS = 20;
const GRID_COLS = 20;
const NODES_URL = 'https://headlight-tournament-3.herokuapp.com/nodes';
const BOTS_URL = 'https://headlight-tournament-3.herokuapp.com/bots';

/** State functions */

/**
 * Holds all known state of mineral nodes and bots
 */
var state = {
  nodes: {},
  bots: {}
};

/**
 * Fetches all known information about mineral nodes, and updates
 * the state object with that node information
 */
async function refreshNodes() {
  let result = await axios.get(NODES_URL);
  let payload = result.data['Nodes'];

  let newState = {};
  for (var i = 0; i < payload.length; i++) {
    let node = payload[i];
    if (!newState[node.Location.X]) {
      newState[node.Location.X] = {};
    }
    newState[node.Location.X][node.Location.Y] = node;
  }
  state.nodes = newState;
}

/**
 * Fetches all known information about bots, and updates
 * the state object with that bot information
 */
async function refreshBots() {
  let result = await axios.get(BOTS_URL);
  let payload = result.data['Bots'];
  console.log(`PAYLOAD: `, payload);
  let newState = {};
  for (var i = 0; i < payload.length; i++) {
    let bot = payload[i];
    if (!newState[bot.Location.X]) {
      newState[bot.Location.X] = {};
    }
    newState[bot.Location.X][bot.Location.Y] = bot;
  }
  state.bots = newState;
}

/** Display functions */

/**
 * Determines the appropriate color for this grid cell,
 * based on whether a node, bot, both, or neither is located
 * within this grid cell
 */
function colorClass(x, y) {
  let nodes = state.nodes;
  let bots = state.bots;

  let nodePresent = nodes[x] && nodes[x][y];
  let botPresent = bots[x] && bots[x][y];

  if (!nodePresent) {
    // Only Bot present
    if (botPresent) {
      return 'red';
    }
    // Empty
    return 'white';
  }

  if (nodePresent) {
    // Node and Bot present
    if (botPresent) {
      return 'purple';
    }
    // Only Node present
    return 'blue';
  }
}

/** App functions */

/**
 * Draws all the cells to the DOM. Adds an appropriate color class depending on whether this grid cell
 * contains a mineral node, a bot, or both.
 */
function paint() {
  var grid = document.getElementById('grid');
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  for (var i = 0; i < GRID_ROWS; i++) {
    for (var j = 0; j < GRID_COLS; j++) {
      var template = document.getElementsByTagName('template')[0];
      var cell = template.content.cloneNode(true);
      cell.firstElementChild.classList.add(colorClass(i, j));
      grid.appendChild(cell);
    }
  }
}

// updating scoreboard function
function updateScoreboard() {}

/**
 * Main run loop. Every 1s, fetch nodes and bots and re-paint everything.
 */
function start() {
  setInterval(() => {
    refreshNodes();
    refreshBots();
    paint();
    updateScoreboard();
    console.log(`STATE: `, this.state);
  }, 1000);
}

/**
 * Kicks off the run loop once the DOM loads.
 */
document.addEventListener('DOMContentLoaded', () => {
  paint();
  start();
});
