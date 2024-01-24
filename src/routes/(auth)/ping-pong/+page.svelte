<script lang="ts">
    import { browser } from '$app/environment';
    import { fly } from 'svelte/transition';
    import type { PageData } from './$types';
    import LabelledInput from '$components/LabelledInput.svelte';
    import Game  from './Game';
    export let data: PageData;
    let { userProfile } = data


    let game = new Game("singleplayer")

    let frameId: number
    
    let gameMode: "singleplayer" | "multiplayer-local" | "multiplayer-online" = "singleplayer" 
    let isPlayerOne = true // if multiplayer, this will be determined by socket , made who created the game, even have the option to choose
    
    $: userPaddleControl = isPlayerOne ? "leftPaddleY" : "rightPaddleY" as "leftPaddleY" | "rightPaddleY"

    //what determines multiplayer : socket connected? 
    // difficulty only matters in singleplayer
    // if multiplayer, need a dynamic way to determine who is player one and who is player two
    // if multiplayer, need a dynamic way to determine way to make the game interesting i.e ball speed increacing every round or something
    // being player one or two determines which side paddle user controls

    let showOptionsModal = false
    let showMultiplayerOptionsModal = false
    let P1Name = ""
    let P2Name = ""
    let MultiplayerP1Name = ""
    let MultiplayerP2Name = ""
    let p1PaddleColor = "#0039a6"
    let p2PaddleColor = "#D2122E"
    let position: "left" | "right" = "left"

    function setDifficulty(type: 'easy' | 'hard'| 'unfair'){
        if(type === 'easy'){
                game.ballSpeed = 14
                game.ballSize = 10
                game.paddleSpeed = 4
            }else if(type === 'hard'){
                game.ballSpeed = 20
                game.ballSize = 8
                game.paddleSpeed = 10
            }else if(type === 'unfair'){
                game.ballSpeed = 21
                game.ballSize = 8
                game.paddleSpeed = 50
            }
        showOptionsModal = !showOptionsModal
    }



    function resetScore(){
        game.player1Score = 0;
        game.player2Score = 0;
    }

    let pauseGame : () => () => void = function (){return ()=>{}}
    let resumeGame: () => void = function (){return}
    let centerBall : () => void = function (){return}

    let canvas: HTMLCanvasElement
    

    function startGame(){



        console.log('called start game');
       
        
        
        if(position === "left"){
               isPlayerOne = true
               P1Name = userProfile?.username as string
               P2Name = "Computer"
              }else if(position === "right"){
                isPlayerOne = false
                P2Name = userProfile?.username as string
                P1Name = "Computer"
              }

        let touchStartY: any
        if(browser){
            // Define canvas element and its context
            // determine canvas size from screen size
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

            // Paddle properties
            game.paddleHeight = .3 * canvas.height;

   
            

           


            // Ball properties
            let ballSize = game.ballSize;
            game.ballX = canvas.width / 2;
            game.ballY = canvas.height / 2;
            let ballSpeedX = game.ballSpeed;
            let ballSpeedY = game.ballSpeed;

            // Scores
            game.player1Score = 0;
            game.player2Score = 0;

            // Game loop
            function gameLoop() {
                if(window.innerWidth < 820){
                    game.canvasWidth = window.innerWidth - 20
                    game.paddleHeight = .3 * canvas.height
                }
                movePaddles();
                moveBall();
                drawCanvas();
                // cancelAnimationFrame(frameId)
                frameId = requestAnimationFrame(()=>gameLoop());
            }

            // Event listeners
            canvas.addEventListener("mousemove", (event) => {
                if(game.paused || game.gameEnded){
                    return
                }
                const mouseY = event.clientY - canvas.getBoundingClientRect().top;
                //move paddle respective to user
                // leftPaddleY = mouseY - paddleHeight / 2;
                game[userPaddleControl] = mouseY - game.paddleHeight / 2;
            });

            // Variable to store the initial touch position

            // Touchstart event
            canvas.addEventListener("touchstart", (event) => {
                if(game.paused || game.gameEnded){
                    return
                }
                touchStartY = event.touches[0].clientY;
            });

            // Touchmove event
            canvas.addEventListener("touchmove", (event) => {
                console.log('called');
                
                event.preventDefault(); // Prevent scrolling or other default touch behavior
                if(game.paused || game.gameEnded){
                    return
                }
                const touchY = event.touches[0].clientY;
                const deltaY = touchY - touchStartY;
                game[userPaddleControl] += deltaY;
                // Ensure the paddle stays within the canvas boundaries
                game[userPaddleControl] = Math.min(canvas.height - game.paddleHeight, Math.max(0, game[userPaddleControl]));
                touchStartY = touchY; // Update the initial touch position   
            });

            // Touchend event
            canvas.addEventListener("touchend", () => {
                touchStartY = null; // Reset the initial touch position when the touch ends
            });


            // Update paddle positions
            //Todo: Handle multiplayer paddle
            function movePaddles() {
                // Ensure paddles stay within the canvas boundaries

                // paddleControl[userPaddleControl] = Math.min(canvas.height - paddleHeight, Math.max(0, paddleControl[userPaddleControl]));
                
                game.leftPaddleY = Math.min(canvas.height - game.paddleHeight, Math.max(0, game.leftPaddleY));
                game.rightPaddleY = Math.min(canvas.height - game.paddleHeight, Math.max(0, game.rightPaddleY));


                // Move the computer-controlled paddle
                //Todo: Handle real player paddle

                if(gameMode === "singleplayer"){
                    
                    let computerPaddleControl: keyof typeof game = isPlayerOne ? "rightPaddleY": "leftPaddleY" 

                    const middleOfPaddle = game[computerPaddleControl] + game.paddleHeight / 2;

                    
                    
                    if (middleOfPaddle < game.ballY - 35) {

                        game[computerPaddleControl] += game.paddleSpeed;
                        
                    } else if (middleOfPaddle > game.ballY + 35) {
                        game[computerPaddleControl] -= game.paddleSpeed;
                    }
                } 
            }


            // Update ball position
            function moveBall() {
                game.ballX += ballSpeedX;
                game.ballY += ballSpeedY;

                // Collision with paddles
                if (
                    game.ballX < game.paddleWidth &&
                    game.ballY > game.leftPaddleY &&
                    game.ballY < game.leftPaddleY + game.paddleHeight
                ) {
                    ballSpeedX = -ballSpeedX;
                }
                if (
                    game.ballX > canvas.width - game.paddleWidth &&
                    game.ballY > game.rightPaddleY &&
                    game.ballY < game.rightPaddleY + game.paddleHeight
                ) {
                    ballSpeedX = -ballSpeedX;
                }

                // Scoring
                if (game.ballX < 0) {
                    // Ball went past the left paddle
                    if(!game.gameEnded){
                        game.player2Score++;
                        if(game.player2Score >= game.pointsToWin){
                            game.gameEnded = true
                            hideBall()
                            resumeGame = pauseGame()
                            game.winner = P2Name

                        }else{
                            resetBall();
                        }
                    }
                } else if (game.ballX > canvas.width) {
                    // Ball went past the right paddle
                    game.player1Score++;
                    if(game.player1Score == game.pointsToWin){
                        game.gameEnded = true
                        hideBall()
                        resumeGame = pauseGame()
                        game.winner = P1Name
                    }else{                      
                        resetBall();
                    }
                }

                // Ball collisions with top and bottom walls
                if (game.ballY < 0 || game.ballY > canvas.height) {
                    ballSpeedY = -ballSpeedY;
                }
            }

            centerBall= () => {
                game.ballX = canvas.width / 2;
                game.ballY = canvas.height / 2;
            }

            function hideBall() {
                game.ballX = 0;
                game.ballY = -100;
            }

            // Reset the ball to the center
            function resetBall() {
                centerBall();
                resumeGame = pauseGame();
                game.scoreDisplay = true
                setTimeout(()=>{
                game.scoreDisplay = false
                },2000)
                setTimeout(() => {
                    resumeGame();
                }, 2500);
                
            }
            pauseGame = () => {
                    
                ballSpeedX = 0;
                ballSpeedY = 0;
                game.paused = true
                
                cancelAnimationFrame(frameId)
            

                return () => {
                                
                    ballSpeedX = game.ballSpeed;
                    ballSpeedY = game.ballSpeed;
                    game.paused = false
            
                }
            }
         
            // Draw the canvas
            function drawCanvas() {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw paddles
                // ctx.fillStyle = colorChoice;
                // ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
                // ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

                ctx.fillStyle = p1PaddleColor; // Paddle color
                ctx.beginPath();
                ctx.moveTo(0, game.leftPaddleY);
                ctx.arcTo(0, game.leftPaddleY, game.paddleWidth / 2, game.leftPaddleY + game.paddleHeight, 0); // Adjust the radius as needed
                ctx.arcTo(0, game.leftPaddleY + game.paddleHeight, game.paddleWidth, game.leftPaddleY + game.paddleHeight, 0); // Adjust the radius as needed
                ctx.arcTo(game.paddleWidth / 1.75, game.leftPaddleY + game.paddleHeight, game.paddleWidth, game.leftPaddleY, 10); // Adjust the radius as needed
                ctx.arcTo(game.paddleWidth / 1.75, game.leftPaddleY, game.paddleWidth / 2, game.leftPaddleY, 10); // Adjust the radius as needed
                ctx.closePath();
                ctx.fill();

                // Draw the right paddle with rounded corners
                ctx.fillStyle = p2PaddleColor; // Paddle color
                ctx.beginPath();
                ctx.moveTo(canvas.width, game.rightPaddleY);
                ctx.arcTo(canvas.width - game.paddleWidth / 1.75, game.rightPaddleY, canvas.width - game.paddleWidth / 2, game.rightPaddleY + game.paddleHeight, 10); // Adjust the radius as needed
                ctx.arcTo(canvas.width - game.paddleWidth / 1.75, game.rightPaddleY + game.paddleHeight, canvas.width, game.rightPaddleY + game.paddleHeight, 10); // Adjust the radius as needed
                ctx.arcTo(canvas.width, game.rightPaddleY + game.paddleHeight, canvas.width, game.rightPaddleY, 10); // Adjust the radius as needed
                ctx.arcTo(canvas.width, game.rightPaddleY, canvas.width - game.paddleWidth / 2, game.rightPaddleY, 0); // Adjust the radius as needed
                ctx.closePath();
                ctx.fill();

                // Draw the ball
                ctx.fillStyle = game.ballColor;
                ctx.beginPath();
                ctx.arc(game.ballX, game.ballY, ballSize, 0, Math.PI * 2);
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

<section class="flex flex-col space-y-5 justify-center items-center relative">
    <div class="text-lg mx-auto text-center p-3 flex flex-col justify-center items-center ping-pong-breakpoint:tall:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-24 h-24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>          
        Ping pong game is unvailaible on this screen size</div>
    <div class="w-full justify-between space-x-10 px-10 items-center h-20 rounded-xl bg-[#ffffff79] blur-bg text-black  mx-auto z-50 hidden  ping-pong-breakpoint:tall:flex" style="max-width: 800px;">
        {#if gameMode === "singleplayer" || gameMode === "multiplayer-online"}
        <p class="font-sans text-lg badge light info cornered w-full">
            {#if position === "left"}
            <span>
                {userProfile?.username}
            </span>
            {:else if position === "right"}
            Computer
            {/if}
            
            {#if game.gameStarted}
            <span class="ml-5">{game.player1Score}</span>
            {/if}
        </p>
        {:else if gameMode === "multiplayer-local"}
        <p class="font-sans text-lg badge light info cornered w-full">{MultiplayerP1Name} 
            {#if game.gameStarted}
            <span class="ml-5">{game.player1Score}</span>
            {/if}
        </p>
        {/if}
        {#if !game.paused || game.gameEnded}
        <button class="btn light bw" on:click={()=>{resumeGame = pauseGame()}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>              
        </button>
        {:else if game.paused && !game.gameEnded}
        <button class="btn light bw" on:click={()=>{resumeGame()}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>                          
        </button>
        {/if}
        {#if gameMode === "singleplayer"}
        <p class="font-sans text-lg badge light danger cornered w-full">
            {#if position === "right"}
            <span>
                {userProfile?.username}
            </span>
            {:else if position === "left"}
            Computer
            {/if}
            {#if game.gameStarted}
            <span class="ml-5">{game.player2Score}</span>
            {/if}
        </p>
        {:else if gameMode === "multiplayer-local" || gameMode === "multiplayer-online" }
        <p class="font-sans text-lg badge light danger cornered w-full">{MultiplayerP2Name} 
            {#if game.gameStarted}
            <span class="ml-5">{game.player2Score}</span>
            {/if}
        </p>
        {/if}
    </div>
    <canvas bind:this={canvas} id="pingPongCanvas" class="rounded-xl canvas-aspect-ratio relative mt-10 hidden ping-pong-breakpoint:tall:flex" height="500" width="800" >
    </canvas>

    {#if game.scoreDisplay && !game.gameEnded}
    <div transition:fly={{delay:0,duration:500,y:300,opacity:0}} class="z-50 text-7xl text-center font-bold justify-center items-center absolute mx-auto my-auto hidden ping-pong-breakpoint:tall:flex">
        {game.player1Score} - {game.player2Score}
    </div>
    {/if}
    {#if !game.gameStarted}
    <div in:fly={{delay:0,duration:500,y:300,opacity:0}} class="z-50 text-center font-bold flex-col space-y-5 justify-center items-center absolute mx-auto my-auto hidden ping-pong-breakpoint:tall:flex">
        <h1 class="text-7xl text-center font-bold">
            PING PONG!
        </h1>
            <span class="text-center font-bold">Use your mouse or touch to move the paddle</span>
        <button class="btn lg success light w-40" on:click={()=>{
            showOptionsModal = !showOptionsModal

        }}>Singleplayer</button>
        <!-- <button class="btn lg indigo light w-40" on:click={()=>{
            gameMode = "multiplayer"
            showMultiplayerOptionsModal = !showMultiplayerOptionsModal}}>
            Multiplayer
        </button> -->
        <div class="dropdown success">
            <label class="btn lg indigo light w-40" tabindex="0">Multiplayer</label>
            <div class="menu right w-52">
              <button class="item text-sm w-48"
              on:click={()=>{
                gameMode = "multiplayer-local"
                showMultiplayerOptionsModal = !showMultiplayerOptionsModal}}>Local Versus
                <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.75 6V3.75H11.25V6L9 6C6.10051 6 3.75 8.3505 3.75 11.25V17.909C3.75 19.2019 4.7981 20.25 6.09099 20.25C6.71186 20.25 7.3073 20.0034 7.74632 19.5643L10.8107 16.5H13.1893L16.2537 19.5643C16.6927 20.0034 17.2881 20.25 17.909 20.25C19.2019 20.25 20.25 19.2019 20.25 17.909V11.25C20.25 8.3505 17.8995 6 15 6L12.75 6ZM18.75 11.25C18.75 9.17893 17.0711 7.5 15 7.5L9 7.5C6.92893 7.5 5.25 9.17893 5.25 11.25V17.909C5.25 18.3735 5.62652 18.75 6.09099 18.75C6.31403 18.75 6.52794 18.6614 6.68566 18.5037L10.1893 15H13.8107L17.3143 18.5037C17.4721 18.6614 17.686 18.75 17.909 18.75C18.3735 18.75 18.75 18.3735 18.75 17.909V11.25ZM6.75 12.75V11.25H8.25V9.75H9.75V11.25H11.25V12.75H9.75V14.25H8.25V12.75H6.75ZM15 10.875C15 11.4963 14.4963 12 13.875 12C13.2537 12 12.75 11.4963 12.75 10.875C12.75 10.2537 13.2537 9.75 13.875 9.75C14.4963 9.75 15 10.2537 15 10.875ZM16.125 14.25C16.7463 14.25 17.25 13.7463 17.25 13.125C17.25 12.5037 16.7463 12 16.125 12C15.5037 12 15 12.5037 15 13.125C15 13.7463 15.5037 14.25 16.125 14.25Z" fill="currentColor"></path> </g></svg>
              </button>
              <button class="item text-sm"on:click={()=>{
                gameMode = "multiplayer-online"
                }}>Online H-2-H
                <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1.5 6.5C1.5 3.46243 3.96243 1 7 1C10.0376 1 12.5 3.46243 12.5 6.5C12.5 9.53757 10.0376 12 7 12C3.96243 12 1.5 9.53757 1.5 6.5Z" fill="#0039a6"></path> <path d="M14.4999 6.5C14.4999 8.00034 14.0593 9.39779 13.3005 10.57C14.2774 11.4585 15.5754 12 16.9999 12C20.0375 12 22.4999 9.53757 22.4999 6.5C22.4999 3.46243 20.0375 1 16.9999 1C15.5754 1 14.2774 1.54153 13.3005 2.42996C14.0593 3.60221 14.4999 4.99966 14.4999 6.5Z" fill="#FF033E"></path> <path d="M0 18C0 15.7909 1.79086 14 4 14H10C12.2091 14 14 15.7909 14 18V22C14 22.5523 13.5523 23 13 23H1C0.447716 23 0 22.5523 0 22V18Z" fill="#0039a6"></path> <path d="M16 18V23H23C23.5522 23 24 22.5523 24 22V18C24 15.7909 22.2091 14 20 14H14.4722C15.4222 15.0615 16 16.4633 16 18Z" fill="#FF033E"></path> </g></svg>
              </button>
            </div>
          </div>
    </div>
    {/if}
    {#if game.gameEnded}
    <div in:fly={{delay:0,duration:500,y:300,opacity:0}} class="z-50 text-7xl text-center font-bold flex-col space-y-5 justify-center items-center absolute mx-auto my-auto hidden ping-pong-breakpoint:tall:flex">
        {game.winner} Wins! <br>
        {game.player1Score} - {game.player2Score}
        <button class="btn lg success light w-40" on:click={()=>{
        game.gameEnded = false
        game.paused = false
        resetScore()
        centerBall()
        startGame()
    }}>Replay</button>
    <button class="btn lg info light w-40" on:click={()=>{game.gameEnded = false, game.gameStarted = false}}>Menu</button>
    </div>

    {/if}
</section>

    <div>
    <!-- remove `modal-overlay` element will make modal opened without overlay -->
    <label class="modal-overlay show"></label>
    <!-- show class here will make modal visible -->
    <div class="modal bg-gray-800 text-gray-200 flex-col gap-3 w-full max-w-lg flex {showOptionsModal ? 'show' : 'hidden'}">
      <!-- <button class="absolute btn light bw right-4 top-3">✕</button> -->
      <h2 class="text-xl font-semibold text-center mb-5">Game Options</h2>
      
        <div class="flex w-full justify-between items-center">
            <label for="difficulty">Difficulty</label>
            <select bind:value={game.difficulty} name="difficulty" id="difficulty" class="input bw solid w-48">
                <option value="easy">Easy</option>
                <option value="hard">Hard</option>
                <option value="unfair">Unfair</option>
            </select>
        </div>

        <div class="flex w-full justify-between items-center">
            <label for="difficulty">Player paddle positon</label>
            <select bind:value={position} name="position" id="position" class="input bw solid w-48">
                <option value="left">Player 1</option>
                <option value="right">Player 2</option>
            </select>
            </div>

        <div class="flex w-full justify-between items-center">
            <label for="p1PaddleColor">Player paddle color</label>
            <input bind:value={p1PaddleColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
        </div>
        <div class="flex w-full justify-between items-center">
            <label for="p2PaddleColor">Computer paddle color</label>
            <input bind:value={p2PaddleColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
        </div>
        <div class="flex w-full justify-between items-center">
            <label for="chosenBallColor">Ball color</label>
            <input bind:value={game.ballColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
        </div>
        <div class="flex justify-between items-center">
            <label for="pointsToWin">Points to win</label>
            <input type="number" bind:value={game.pointsToWin} name="pointsToWin" id="pointsToWin" class="input bw solid w-48">
        </div>
        
          <div class="flex gap-3 mt-5">
        <button class="btn solid danger flex-1" on:click={()=>{showOptionsModal = !showOptionsModal}}>Cancel</button>
        <button class="btn solid indigo flex-1" on:click={()=>{
            setDifficulty(game.difficulty)
            game.gameStarted = true
            setTimeout(() => {
                startGame()
            }, 1000);
            }}>Play</button>
      </div>
    </div>
  </div>

  <label class="modal-overlay"></label>
  <!-- show class here will make modal visible -->
  <div class="modal flex flex-col gap-5 max-w-2xl w-full bg-gray-800 text-gray-200 {showMultiplayerOptionsModal ? 'show' : 'hidden'} ">
    <h2 class="text-xl font-semibold text-center mb-5">Multiplayer Options</h2>
    <div class="flex space-x-5">
        <LabelledInput label="P1" bind:data={MultiplayerP1Name} placeholder="Enter name"  name="player_one_name"/>
        <LabelledInput label="P2" bind:data={MultiplayerP2Name} placeholder="Enter name"  name="player_two_name"/>
    </div>
    <div class="flex space-x-5">
        <div class="flex flex-col space-y-3 w-full justify-between items-center">
            <svg width="100px" height="100px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#e5e5e5" d="M438.144 256c-68.352 0-92.736 4.672-117.76 18.112-20.096 10.752-35.52 26.176-46.272 46.272C260.672 345.408 256 369.792 256 438.144v275.712c0 68.352 4.672 92.736 18.112 117.76 10.752 20.096 26.176 35.52 46.272 46.272C345.408 891.328 369.792 896 438.144 896h147.712c68.352 0 92.736-4.672 117.76-18.112 20.096-10.752 35.52-26.176 46.272-46.272C763.328 806.592 768 782.208 768 713.856V438.144c0-68.352-4.672-92.736-18.112-117.76a110.464 110.464 0 0 0-46.272-46.272C678.592 260.672 654.208 256 585.856 256H438.144zm0-64h147.712c85.568 0 116.608 8.96 147.904 25.6 31.36 16.768 55.872 41.344 72.576 72.64C823.104 321.536 832 352.576 832 438.08v275.84c0 85.504-8.96 116.544-25.6 147.84a174.464 174.464 0 0 1-72.64 72.576C702.464 951.104 671.424 960 585.92 960H438.08c-85.504 0-116.544-8.96-147.84-25.6a174.464 174.464 0 0 1-72.64-72.704c-16.768-31.296-25.664-62.336-25.664-147.84v-275.84c0-85.504 8.96-116.544 25.6-147.84a174.464 174.464 0 0 1 72.768-72.576c31.232-16.704 62.272-25.6 147.776-25.6z"></path><path fill="#fff" d="M512 320q32 0 32 32v128q0 32-32 32t-32-32V352q0-32 32-32zm32-96a32 32 0 0 1-64 0v-64a32 32 0 0 0-32-32h-96a32 32 0 0 1 0-64h96a96 96 0 0 1 96 96v64z"></path></g></svg>
            <label for="p1PaddleColor">P1 Paddle Color</label>
            <input bind:value={p1PaddleColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
        </div>
        <div class="flex flex-col space-y-3 w-full justify-between items-center">
            <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 13H6.01M6 17H6.01M10 13H10.01M14 13H14.01M18 17H18.01M18 13H18.01M16 3V5H8V9M10 17H14M5.2 21H18.8C19.9201 21 20.4802 21 20.908 20.782C21.2843 20.5903 21.5903 20.2843 21.782 19.908C22 19.4802 22 18.9201 22 17.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H5.2C4.07989 9 3.51984 9 3.09202 9.21799C2.71569 9.40973 2.40973 9.71569 2.21799 10.092C2 10.5198 2 11.0799 2 12.2V17.8C2 18.9201 2 19.4802 2.21799 19.908C2.40973 20.2843 2.71569 20.5903 3.09202 20.782C3.51984 21 4.0799 21 5.2 21Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <label for="p2PaddleColor">P2 Paddle Color</label>
            <input bind:value={p2PaddleColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
        </div>   
    </div>
    <div class="flex w-full justify-between items-center">
        <label for="chosenBallColor">Ball color</label>
        <input bind:value={game.ballColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
    </div>
    <div class="flex justify-between items-center">
        <label for="pointsToWin">Points to win</label>
        <input type="number" bind:value={game.pointsToWin} name="pointsToWin" id="pointsToWin" class="input bw solid w-48">
    </div>
    <div class="flex gap-3">
      <button class="btn solid danger flex-1" on:click={()=>{
            gameMode = "singleplayer"
            showMultiplayerOptionsModal = !showMultiplayerOptionsModal}}>Cancel</button>
      <button class="btn solid indigo flex-1">Play!</button>
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
