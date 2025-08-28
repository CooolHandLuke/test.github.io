$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    toggleGrid();

    // TODO 2 - Create Platforms
    createPlatform(120, 0, 30, 600, "black");
    createPlatform(300, 625, 150, 15, "rgb(229, 102, 6)");
    createPlatform(150, 505, 150, 15, "rgb(229, 102, 6)");
    createPlatform(300, 375, 150, 15, "rgb(229, 102, 6)");
    createPlatform(150, 245, 150, 15, "rgb(229, 102, 6)");
    createPlatform(580, 200, 925, 45, "rgb(7, 98, 60)");
    createPlatform(610, 490, 895, 45, "rgb(7, 98, 60)");

    // TODO 3 - Create Collectables
    var collectableCount = 0;
    while (collectableCount < 100) {
      var x = Math.floor(Math.random() * (canvas.width - 50)) + 25;
      var y = Math.floor(Math.random() * (canvas.height - 50)) + 25;
      var overlapsPlatform = false;
      for (var j = 0; j < platforms.length; j++) {
        var p = platforms[j];
        if (
          x + collectableWidth > p.x &&
          x < p.x + p.width &&
          y + collectableHeight > p.y &&
          y < p.y + p.height
        ) {
          overlapsPlatform = true;
          break;
        }
      }
      if (!overlapsPlatform) {
        createCollectable("max", x, y);
        collectableCount++;
      }
    }

    // TODO 4 - Create Cannons
    for (var i = 0; i < 6; i++) {
      var x = Math.floor(Math.random() * (canvas.width - 50)) + 25;
      var y = Math.floor(Math.random() * (canvas.height - 50)) + 25;
      var sides = ["top", "bottom", "left", "right"];
      var side = sides[Math.floor(Math.random() * sides.length)];
      if (side === "top") createCannon("top", x, 1000);
      else if (side === "bottom") createCannon("bottom", x, 1000);
      else if (side === "left") createCannon("left", x, 1000);
      else if (side === "right") createCannon(side, x, 1000);
    }

    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
