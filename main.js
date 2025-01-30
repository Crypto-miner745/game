const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x87ceeb, // Light blue background (sky)
  scene: {
    create: create,
    update: update
  },
  physics: {
    default: 'arcade'
  }
};

const tileSize = 50;
let box;
let cursors;
let graphics;

const game = new Phaser.Game(config);

function create() {
  graphics = this.add.graphics();

  const rows = 50; // Large number for an expansive map
  const cols = 50;

  // Draw the terrain manually for structured features
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * tileSize;
      const y = row * tileSize;

      // Set structured terrain logic
      if (row === 10) {
        graphics.fillStyle(0x1e90ff); // River (blue)
      } else if (col === 5) {
        graphics.fillStyle(0xa0522d); // Dirt path (brown)
      } else {
        graphics.fillStyle(0x32a852); // Grass (green)
      }
      graphics.fillRect(x, y, tileSize, tileSize);
    }
  }

  // Create the red box (player) as a physics object
  box = this.physics.add.rectangle(tileSize / 2, tileSize / 2, tileSize, tileSize, 0xff0000);
  box.body.setCollideWorldBounds(false);

  // Enable keyboard input for movement
  cursors = this.input.keyboard.createCursorKeys();

  // Set up the camera to follow the player
  this.cameras.main.startFollow(box, true);
  this.cameras.main.setBounds(0, 0, cols * tileSize, rows * tileSize);
}

function update() {
  const speed = 200;

  // Reset velocity
  box.body.setVelocity(0);

  if (cursors.left.isDown) {
    box.body.setVelocityX(-speed);
  }
  if (cursors.right.isDown) {
    box.body.setVelocityX(speed);
  }
  if (cursors.up.isDown) {
    box.body.setVelocityY(-speed);
  }
  if (cursors.down.isDown) {
    box.body.setVelocityY(speed);
  }
}
