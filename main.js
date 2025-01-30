const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x87ceeb,
  scene: { create, update, resize }
};

const tileSize = 50;
let box;
let cursors;
let graphics;

const game = new Phaser.Game(config);

function create() {
  graphics = this.add.graphics();
  drawTerrain(this);

  // Create the red box (player)
  box = this.add.rectangle(tileSize / 2, tileSize / 2, tileSize, tileSize, 0xff0000);

  // Enable keyboard input for movement
  cursors = this.input.keyboard.createCursorKeys();
}

function drawTerrain(scene) {
  graphics.clear(); // Clear previous graphics

  for (let row = 0; row < scene.game.config.height / tileSize; row++) {
    for (let col = 0; col < scene.game.config.width / tileSize; col++) {
      const x = col * tileSize;
      const y = row * tileSize;

      // Set structured terrain logic
      if (row === 4) {
        graphics.fillStyle(0x1e90ff); // River (blue)
      } else if (col === 2) {
        graphics.fillStyle(0xa0522d); // Dirt path (brown)
      } else {
        graphics.fillStyle(0x32a852); // Grass (green)
      }

      graphics.fillRect(x, y, tileSize, tileSize);
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

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
  graphics.clear(); // Clear the previous map
  drawTerrain(game.scene.scenes[0]); // Redraw the map
});

// Remove any body margin to make the game fullscreen
document.body.style.margin = 0;
