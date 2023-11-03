<script lang="ts">
    import { browser } from '$app/environment';
    import { fly } from 'svelte/transition';
    import type { PageData } from './$types';
    export let data: PageData;
    let { userProfile } = data


    let showOptionsModal = false
    let playerPaddleColor = "#0091FF"
    let computerPaddleColor = "#F76808"
    let chosenBallColor = "#ffffff"
    let chosenBallSpeed = 14;
    let chosenBallSize = 10;
    let chosenPaddleSpeed = 4;
    let choosenDifficulty: "easy" | "hard" | "unfair" = "easy";
    let paused = false;
    let scoreDisplay = false
    let gameStarted = false
    let gameEnded = false
    let winner = ""
    let pointsToWin = 3
    let canvasWidth = 800

    function setDifficulty(type: 'easy' | 'hard'| 'unfair'){
        if(type === 'easy'){
                chosenBallSpeed = 14
                chosenBallSize = 10
                chosenPaddleSpeed = 4
            }else if(type === 'hard'){
                chosenBallSpeed = 20
                chosenBallSize = 8
                chosenPaddleSpeed = 10
            }else if(type === 'unfair'){
                chosenBallSpeed = 21
                chosenBallSize = 8
                chosenPaddleSpeed = 50
            }
        showOptionsModal = !showOptionsModal
    }

    let playerScore = 0;
    let computerScore = 0;

    function resetScore(){
        playerScore = 0;
        computerScore = 0;
    }

    let pauseGame = function (){}
    let resumeGame = function (){}
    let centerBall = function (){}
    

    function startGame(){
        let touchStartY: any
        if(browser){
            // Define canvas element and its context
            const canvas = document.getElementById("pingPongCanvas") as HTMLCanvasElement;
            // determine canvas size from screen size
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

            // Paddle properties
            const paddleWidth = 15;
            let paddleHeight = .3 * canvas.height;
            let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
            let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
            let paddleSpeed = chosenPaddleSpeed;

            // Ball properties
            let ballSize = chosenBallSize;
            let ballX = canvas.width / 2;
            let ballY = canvas.height / 2;
            let ballSpeedX = chosenBallSpeed;
            let ballSpeedY = chosenBallSpeed;

            // Scores
            playerScore = 0;
            computerScore = 0;

            // Game loop
            function gameLoop() {
                if(window.innerWidth < 820){
                    canvasWidth = window.innerWidth - 20
                    paddleHeight = .3 * canvas.height
                }
                movePaddles();
                moveBall();
                drawCanvas();
                requestAnimationFrame(gameLoop);
            }

            // Event listeners
            canvas.addEventListener("mousemove", (event) => {
                if(paused || gameEnded){
                    return
                }
                const mouseY = event.clientY - canvas.getBoundingClientRect().top;
                leftPaddleY = mouseY - paddleHeight / 2;
            });

            // Variable to store the initial touch position

            // Touchstart event
            canvas.addEventListener("touchstart", (event) => {
                if(paused || gameEnded){
                    return
                }
                touchStartY = event.touches[0].clientY;
            });

            // Touchmove event
            canvas.addEventListener("touchmove", (event) => {
                console.log('called');
                
                event.preventDefault(); // Prevent scrolling or other default touch behavior
                if(paused || gameEnded){
                    return
                }
                const touchY = event.touches[0].clientY;
                const deltaY = touchY - touchStartY;
                leftPaddleY += deltaY;
                // Ensure the paddle stays within the canvas boundaries
                leftPaddleY = Math.min(canvas.height - paddleHeight, Math.max(0, leftPaddleY));
                touchStartY = touchY; // Update the initial touch position   
            });

            // Touchend event
            canvas.addEventListener("touchend", () => {
                touchStartY = null; // Reset the initial touch position when the touch ends
            });


            // Update paddle positions
            function movePaddles() {
                // Ensure paddles stay within the canvas boundaries
                leftPaddleY = Math.min(canvas.height - paddleHeight, Math.max(0, leftPaddleY));
                rightPaddleY = Math.min(canvas.height - paddleHeight, Math.max(0, rightPaddleY));

                // Move the computer-controlled paddle
                const middleOfPaddle = rightPaddleY + paddleHeight / 2;
                if (middleOfPaddle < ballY - 35) {
                    rightPaddleY += paddleSpeed;
                } else if (middleOfPaddle > ballY + 35) {
                    rightPaddleY -= paddleSpeed;
                }
            }


            // Update ball position
            function moveBall() {
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                // Collision with paddles
                if (
                    ballX < paddleWidth &&
                    ballY > leftPaddleY &&
                    ballY < leftPaddleY + paddleHeight
                ) {
                    ballSpeedX = -ballSpeedX;
                }
                if (
                    ballX > canvas.width - paddleWidth &&
                    ballY > rightPaddleY &&
                    ballY < rightPaddleY + paddleHeight
                ) {
                    ballSpeedX = -ballSpeedX;
                }

                // Scoring
                if (ballX < 0) {
                    // Ball went past the left paddle
                    if(!gameEnded){
                        computerScore++;
                        if(computerScore >= pointsToWin){
                            gameEnded = true
                            hideBall()
                            pauseGame()
                            winner = "Computer"

                        }else{
                            resetBall();
                        }
                    }
                } else if (ballX > canvas.width) {
                    // Ball went past the right paddle
                    playerScore++;
                    if(playerScore == pointsToWin){
                        gameEnded = true
                        hideBall()
                        pauseGame()
                        winner = userProfile?.username as string
                    }else{                      
                        resetBall();
                    }
                }

                // Ball collisions with top and bottom walls
                if (ballY < 0 || ballY > canvas.height) {
                    ballSpeedY = -ballSpeedY;
                }
            }

            centerBall= () => {
                ballX = canvas.width / 2;
                ballY = canvas.height / 2;
            }

            function hideBall() {
                ballX = 0;
                ballY = -100;
            }

            // Reset the ball to the center
            function resetBall() {
                centerBall();
                pauseGame();
                scoreDisplay = true
                setTimeout(()=>{
                scoreDisplay = false
                },2000)
                setTimeout(() => {
                    resumeGame();
                }, 2500);
                
            }
            pauseGame = () => {
                ballSpeedX = 0;
                ballSpeedY = 0;
                paused = true
            }
            resumeGame = () => {
                ballSpeedX = chosenBallSpeed;
                ballSpeedY = chosenBallSpeed;
                paused = false
            }
            // Draw the canvas
            function drawCanvas() {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw paddles
                // ctx.fillStyle = colorChoice;
                // ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
                // ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

                ctx.fillStyle = playerPaddleColor; // Paddle color
                ctx.beginPath();
                ctx.moveTo(0, leftPaddleY);
                ctx.arcTo(0, leftPaddleY, paddleWidth / 2, leftPaddleY + paddleHeight, 0); // Adjust the radius as needed
                ctx.arcTo(0, leftPaddleY + paddleHeight, paddleWidth, leftPaddleY + paddleHeight, 0); // Adjust the radius as needed
                ctx.arcTo(paddleWidth / 1.75, leftPaddleY + paddleHeight, paddleWidth, leftPaddleY, 10); // Adjust the radius as needed
                ctx.arcTo(paddleWidth / 1.75, leftPaddleY, paddleWidth / 2, leftPaddleY, 10); // Adjust the radius as needed
                ctx.closePath();
                ctx.fill();

                // Draw the right paddle with rounded corners
                ctx.fillStyle = computerPaddleColor; // Paddle color
                ctx.beginPath();
                ctx.moveTo(canvas.width, rightPaddleY);
                ctx.arcTo(canvas.width - paddleWidth / 1.75, rightPaddleY, canvas.width - paddleWidth / 2, rightPaddleY + paddleHeight, 10); // Adjust the radius as needed
                ctx.arcTo(canvas.width - paddleWidth / 1.75, rightPaddleY + paddleHeight, canvas.width, rightPaddleY + paddleHeight, 10); // Adjust the radius as needed
                ctx.arcTo(canvas.width, rightPaddleY + paddleHeight, canvas.width, rightPaddleY, 10); // Adjust the radius as needed
                ctx.arcTo(canvas.width, rightPaddleY, canvas.width - paddleWidth / 2, rightPaddleY, 0); // Adjust the radius as needed
                ctx.closePath();
                ctx.fill();

                // Draw the ball
                ctx.fillStyle = chosenBallColor;
                ctx.beginPath();
                ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
                ctx.fill();

            }
            
            // Start the game loop
            gameLoop();
            }
    }
    
    
</script>

<svelte:head>
    <title>Ping Pong</title>
</svelte:head>

<section class="flex flex-col space-y-5 justify-center items-center pt-16 relative dusk-waves-inverse h-screen">
    <!-- <div class="text-lg mx-auto text-center p-3 flex flex-col justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-24 h-24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>          
        Ping pong game is under construction, come back later</div> -->
    <div class="w-full justify-between space-x-10 px-10 items-center h-20 rounded-xl bg-[#ffffff79] blur-bg text-black  mx-auto z-50 flex" style="max-width: 800px;">
        <p class="font-sans text-lg badge light info cornered w-full">{userProfile?.username} - {playerScore}</p>
        {#if !paused || gameEnded}
        <button class="btn light bw" on:click={()=>{pauseGame()}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>              
        </button>
        {:else if paused && !gameEnded}
        <button class="btn light bw" on:click={()=>{resumeGame()}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>                          
        </button>
        {/if}
        <p class="font-sans text-lg badge light warn cornered w-full">Computer - {computerScore}</p>
    </div>
    <canvas id="pingPongCanvas" class="rounded-xl canvas-aspect-ratio relative mt-36 flex" height="500" width="800" >
    </canvas>

    {#if scoreDisplay && !gameEnded}
    <div transition:fly={{delay:0,duration:500,y:300,opacity:0}} class="z-50 text-7xl text-center font-bold flex justify-center items-center absolute mx-auto my-auto">
        {playerScore} - {computerScore}
    </div>
    {/if}
    {#if !gameStarted}
    <div in:fly={{delay:0,duration:500,y:300,opacity:0}} class="z-50 text-center font-bold flex-col space-y-5 justify-center items-center absolute mx-auto my-auto flex">
        <h1 class="text-7xl text-center font-bold">
            PING PONG!
        </h1>
            <span class="text-center font-bold">Use your mouse or touch to move the paddle</span>
        <button class="btn lg bw solid w-40" on:click={()=>{
            startGame()
            gameStarted = true
        }}>Start Game</button>
        <button class="btn lg grapePurple solid w-40" disabled={!gameEnded && gameStarted}  on:click={()=>{showOptionsModal = !showOptionsModal}}>Options</button>
    </div>
    {/if}
    {#if gameEnded}
    <div in:fly={{delay:0,duration:500,y:300,opacity:0}} class="z-50 text-7xl text-center font-bold flex-col space-y-5 justify-center items-center absolute mx-auto my-auto flex">
        {winner} Wins! <br>
        {playerScore} - {computerScore}
        <button class="btn lg bw solid w-40" on:click={()=>{
        gameEnded = false
        paused = false
        resetScore()
        centerBall()
        startGame()
    }}>New Game</button>
    <button class="btn lg grapePurple solid w-40" disabled={!gameEnded && gameStarted}  on:click={()=>{showOptionsModal = !showOptionsModal}}>Options</button>
    </div>

    {/if}
</section>

    <div>
    <!-- remove `modal-overlay` element will make modal opened without overlay -->
    <label class="modal-overlay"></label>
    <!-- show class here will make modal visible -->
    <div class="modal bg-gray-900 text-gray-200 flex flex-col gap-3 w-full max-w-lg {showOptionsModal ? 'show' : ''}">
      <!-- <button class="absolute btn light bw right-4 top-3">✕</button> -->
      <h2 class="text-xl font-semibold text-center mb-5">Game Options</h2>
        
        <div class="flex w-full justify-between items-center">
            <label for="difficulty">Difficulty</label>
            <select bind:value={choosenDifficulty} name="difficulty" id="difficulty" class="input bw solid w-48">
                <option value="easy">Easy</option>
                <option value="hard">Hard</option>
                <option value="unfair">Unfair</option>
            </select>
        </div>
        <div class="flex w-full justify-between items-center">
            <label for="playerPaddleColor">Player paddle color</label>
            <input bind:value={playerPaddleColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
        </div>
        <div class="flex w-full justify-between items-center">
            <label for="computerPaddleColor">Computer paddle color</label>
            <input bind:value={computerPaddleColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
        </div>
        <div class="flex w-full justify-between items-center">
            <label for="chosenBallColor">Ball color</label>
            <input bind:value={chosenBallColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
        </div>
        <div class="flex justify-between items-center">
            <label for="pointsToWin">Points to win</label>
            <select bind:value={pointsToWin} name="pointsToWin" id="pointsToWin" class="input bw solid w-48">
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="10">10</option>
            </select>
        </div>
        
          <div class="flex gap-3 mt-5">
        <button class="btn solid bw flex-1" on:click={()=>{showOptionsModal = !showOptionsModal}}>Cancel</button>
        <button class="btn solid grapePurple flex-1" on:click={()=>{setDifficulty(choosenDifficulty)}}>Save</button>
      </div>
    </div>
  </div>


<style>
    canvas {
    background-color: #111;
}
.canvas-aspect-ratio {
    aspect-ratio: 8/5;
}

</style>
