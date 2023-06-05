window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame()
  }

  function startGame() {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    const road = new Image()
    road.src = "/lab-canvas-race-car/images/road.png"
    road.onload = () => {
      ctx.drawImage(road, 0, 0, 500, 700)

      const car = new Image()
      car.src = "/lab-canvas-race-car/images/car.png"
      car.onload = () => {
        let x = 225
        const y = 500
        let score = 0
        let gameOver = false

        ctx.drawImage(car, x, y, 50, 100)

        let obstacles = []

        function createObstacle() {
          const minWidth = 150;
          const maxWidth = 250;

          const obstacle = {
            x: Math.floor(Math.random() * (canvas.width - maxWidth)),
            y: 0,
            width: Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth,
            height: 30,
            speed: 3,
          }
          obstacles.push(obstacle)
        }

        function drawObstacle(obstacle) {
          ctx.fillStyle = "red"
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        }

        function updateObstacles() {
          if (gameOver) {
            return
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(road, 0, 0, 500, 700)
          ctx.drawImage(car, x, y, 50, 100)

          let collision = false

          obstacles.forEach((obstacle) => {
            if (
              y + 100 > obstacle.y &&
              y < obstacle.y + obstacle.height &&
              x + 50 > obstacle.x &&
              x < obstacle.x + obstacle.width
            ) {
              collision = true
            } 
            else if (obstacle.y + obstacle.height === canvas.height) {
              score++
            }

            obstacle.y += obstacle.speed
            drawObstacle(obstacle)
          })

          
          ctx.fillStyle = "white"
          ctx.font = "24px Arial"
          ctx.fillText("Score: " + score, 10, 30)

          if (collision) {
          
            gameOver = true
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "black"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "white"
            ctx.font = "36px Arial"
            ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2)
            return
          }

          
          requestAnimationFrame(updateObstacles)
        }

        function handleKeyDown(event) {
          if (gameOver) {
            return
          }

          if (event.key === "ArrowLeft") {
            x -= 10
          } else if (event.key === "ArrowRight") {
            x += 10
          }
          ctx.clearRect(0, 0, 500, 700)
          ctx.drawImage(road, 0, 0, 500, 700)
          ctx.drawImage(car, x, y, 50, 100)
        }

        document.addEventListener("keydown", handleKeyDown)
        setInterval(() => {
          if (!gameOver) {
            score++
          }
        }, 1000); 
        setInterval(createObstacle, 1500); 
        updateObstacles()
      }
    }
  }
}
