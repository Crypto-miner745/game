const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    backgroundColor: "#2d2d2d",
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
    // Create a simple box using Phaser's built-in shape
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
  