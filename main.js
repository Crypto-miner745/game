const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  backgroundColor: 0x87ceeb, // Light blue background (sky)
  scene: {
    create: create,
    update: update
  }
};

const tileSize = 50;
let box;
let cursors;

const game = new Phaser.Game(config);

function create() {
  const graphics = this.add.graphics();

  // Draw the terrain manually for structured features
  for (let row = 0; row < config.height / tileSize; row++) {
    for (let col = 0; col < config.width / tileSize; col++) {
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

  // Create the red box (player)
  box = this.add.rectangle(tileSize / 2, tileSize / 2, tileSize, tileSize, 0xff0000);

  // Enable keyboard input for movement
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Handle movement in a grid-based fashion
  if (Phaser.Input.Keyboard.JustDown(cursors.left) && box.x > tileSize / 2) {
    box.x -= tileSize;
  }
  if (Phaser.Input.Keyboard.JustDown(cursors.right) && box.x < config.width - tileSize / 2) {
    box.x += tileSize;
  }
  if (Phaser.Input.Keyboard.JustDown(cursors.up) && box.y > tileSize / 2) {
    box.y -= tileSize;
  }
  if (Phaser.Input.Keyboard.JustDown(cursors.down) && box.y < config.height - tileSize / 2) {
    box.y += tileSize;
  }
}
