const red = 0xff0000;
const blue = 0x1e90ff;
const brown = 0xa0522d;
const green = 0x32a852;

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x87ceeb,
  scene: { create, update }
};

const tileSize = 50;
let box;
let cursors;

const game = new Phaser.Game(config);

// Full control over terrain map colors
const terrainMap = [
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
  [green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green, green], 
];

function create() {
  drawTerrain(this);

  // Create the red box (player)
  box = this.add.rectangle(tileSize / 2, tileSize / 2, tileSize, tileSize, red);

  // Enable keyboard input for movement
  cursors = this.input.keyboard.createCursorKeys();
}

function drawTerrain(scene) {
  const rows = terrainMap.length;
  const cols = terrainMap[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      const color = terrainMap[row][col]; // Get color from the map

      const terrainTile = scene.add.rectangle(
        x + tileSize / 2,
        y + tileSize / 2,
        tileSize,
        tileSize,
        color
      );
    }
  }
}

function update() {
  // Handle movement in a grid-based fashion
  if (Phaser.Input.Keyboard.JustDown(cursors.left) && box.x > tileSize / 2) {
    box.x -= tileSize;
  }
  if (Phaser.Input.Keyboard.JustDown(cursors.right) && box.x < game.config.width - tileSize / 2) {
    box.x += tileSize;
  }
  if (Phaser.Input.Keyboard.JustDown(cursors.up) && box.y > tileSize / 2) {
    box.y -= tileSize;
  }
  if (Phaser.Input.Keyboard.JustDown(cursors.down) && box.y < game.config.height - tileSize / 2) {
    box.y += tileSize;
  }
}

// Remove any body margin to make the game fullscreen
document.body.style.margin = 0;
