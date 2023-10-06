<script lang="ts">
    import { browser } from '$app/environment';
    import { fly } from 'svelte/transition';
    import type { PageData } from './$types';
    //ball speed 20 and ball size 8 and paddle speed 10 is hard mode
    //ball speed 10 and ball size 10 and paddle speed 5 is easy mode
    export let data: PageData;
    let { userProfile } = data

    let ballColor = "#fff" 
    let paused = false;
    let scoreDisplay = false
    let gameStarted = false
    let gameEnded = false
    let winner = ""



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
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

            // Paddle properties
            const paddleWidth = 10;
            const paddleHeight = 100;
            let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
            let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
            const paddleSpeed = 10;

            // Ball properties
            const ballSize = 8;
            let ballX = canvas.width / 2;
            let ballY = canvas.height / 2;
            let ballSpeedX = 20;
            let ballSpeedY = 20;

            // Scores
            playerScore = 0;
            computerScore = 0;

            // Game loop
            function gameLoop() {
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
                        if(computerScore >= 3){
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
                    if(playerScore == 3){
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
                ballSpeedX = 20;
                ballSpeedY = 20;
                paused = false
            }
            // Draw the canvas
            function drawCanvas() {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw paddles
                ctx.fillStyle = ballColor;
                ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
                ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

                // Draw the ball
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

<section class="flex flex-col space-y-5 justify-center items-center relative" style="height: calc(100vh - 5rem);">
    <!-- <button class="btn" on:click={()=>{ballColor = "#fff"}}>chanege cocl</button> -->
    <p class="text-lg mx-auto text-center p-3 ping-pong-breakpoint:tall:hidden">Ping pong game is not avaliable on screens widths smaller than 820px and screen heights smaller than 768px ... sorry.</p>
    <div class="w-full justify-between px-10 items-center h-20 rounded-xl bg-[#ffffff79] blur-bg text-black hidden ping-pong-breakpoint:tall:flex">
        <p class="font-sans text-lg badge light info cornered">{userProfile?.username} - {playerScore}</p>
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
        <p class="font-sans text-lg badge light warn cornered">Computer - {computerScore}</p>
    </div>
    <canvas id="pingPongCanvas" class="rounded-xl relative hidden ping-pong-breakpoint:tall:flex" height="500" width="800">
    </canvas>

    {#if scoreDisplay && !gameEnded}
    <div transition:fly={{delay:0,duration:500,y:300,opacity:0}} class="z-50 text-7xl text-center font-bold flex justify-center items-center absolute mx-auto my-auto">
        {playerScore} - {computerScore}
    </div>
    {/if}
    {#if !gameStarted}
    <button class="btn lg bw solid absolute mx-auto my-auto hidden ping-pong-breakpoint:tall:flex" on:click={()=>{
        startGame()
        gameStarted = true
    }}>Start Game</button>
    {/if}
    {#if gameEnded}
    <div in:fly={{delay:0,duration:500,y:300,opacity:0}} class="z-50 text-7xl text-center font-bold flex flex-col space-y-5 justify-center items-center absolute mx-auto my-auto ping-pong-breakpoint:tall:flex">
        {winner} Wins! <br>
        {playerScore} - {computerScore}
        <button class="btn lg bw solid" on:click={()=>{
        gameEnded = false
        paused = false
        resetScore()
        centerBall()
        startGame()
    }}>Restart Game</button>
    </div>

    {/if}
</section>
<style>
    canvas {
    background-color: #111;
}
</style>
