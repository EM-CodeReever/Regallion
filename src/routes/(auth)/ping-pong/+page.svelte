<script lang="ts">
    import { browser } from '$app/environment';
    import { fly } from 'svelte/transition';
    import type { PageData } from './$types';
    import LabelledInput from '$components/LabelledInput.svelte';
    import Game,  {type GameAction, type ServerAction, type GameUser}  from './Game';
    import { onDestroy, onMount } from 'svelte';
    import { boolean } from 'zod';
    import { goto, invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { redirect } from '@sveltejs/kit';
    export let data: PageData;
    $: ({ userProfile, roomId, ws } = data)

    let random5LetterString = Math.random().toString(36).substring(2, 7)

    
    
    
    
    let BALLSPEEDX = 6
    let BALLSPEEDY = 6


    let game = new Game("singleplayer")  //once online, socket will be responsible for game state

    
    // game.players = [userProfile?.username as string, "Computer"]

    let frameId: number
    
    let isPlayerOne = true // if multiplayer, this will be determined by socket , made who created the game, even have the option to choose
    
    
    $: userPaddleControl = isPlayerOne ? "leftPaddleY" : "rightPaddleY" as "leftPaddleY" | "rightPaddleY"

    //what determines multiplayer : socket connected? 
    // difficulty only matters in singleplayer
    // if multiplayer, need a dynamic way to determine who is player one and who is player two
    // if multiplayer, need a dynamic way to determine way to make the game interesting i.e ball speed increacing every round or something
    // being player one or two determines which side paddle user controls

    let showOptionsModal = false
    let showMultiplayerOptionsModal = $page.url.searchParams.get("showMultiplayerModal") === "true" ? true : false
    let showJoinGameModal = false
    // let game.player1 = ""
    // let game.player2 = ""
    let MultiplayerP1Name = ""
    let MultiplayerP2Name = ""
    let p1PaddleColor = "#0039a6"
    let p2PaddleColor = "#D2122E"
    let position: "left" | "right" = "left"
    let joinCode = ""

    function setDifficulty(type: 'easy' | 'hard'| 'unfair'){
        // CHANGE THIS FUNCTION TO AN INIITIALIZE FUNCTION THAT SETS ALL GAME PROPERTIES
        if(type === 'easy'){
                game.ballSpeed = 5
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
        BALLSPEEDX = 6, BALLSPEEDY = 6



        console.log('called start game');
       
        
        


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
            // let ballSpeedX = 4;
            // let ballSpeedY = 4;


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


                if(ws && game.gameMode === "multiplayer-online"){
                    //only adjust paddle user controls

                    game[userPaddleControl] = Math.min(canvas.height - game.paddleHeight, Math.max(0, game[userPaddleControl]));

                }else {
                    
                    game.leftPaddleY = Math.min(canvas.height - game.paddleHeight, Math.max(0, game.leftPaddleY));
                    game.rightPaddleY = Math.min(canvas.height - game.paddleHeight, Math.max(0, game.rightPaddleY));
                }

                
            


                // Move the computer-controlled paddle

                if(game.gameMode === "singleplayer"){
                    
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
                console.log("BALLSPEED X: " + BALLSPEEDX);
                console.log("BALLSPEED Y: " + BALLSPEEDY);
                
                game.ballX += BALLSPEEDX;
                game.ballY += BALLSPEEDY;

                // Collision with paddles
                if (
                    game.ballX < game.paddleWidth &&
                    game.ballY > game.leftPaddleY &&
                    game.ballY < game.leftPaddleY + game.paddleHeight
                ) {
                    BALLSPEEDX = -BALLSPEEDX;
                }
                if (
                    game.ballX > canvas.width - game.paddleWidth &&
                    game.ballY > game.rightPaddleY &&
                    game.ballY < game.rightPaddleY + game.paddleHeight
                ) {
                    BALLSPEEDX = -BALLSPEEDX;
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
                            game.winner = game.player2?.name as string

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
                        game.winner = game.player1?.name as string
                    }else{                      
                        resetBall();
                    }
                }

                // Ball collisions with top and bottom walls
                if (game.ballY <= 0 || game.ballY >= canvas.height) {
                    BALLSPEEDY = -BALLSPEEDY
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
                    
                BALLSPEEDX = 0
                BALLSPEEDY = 0
                game.paused = true
                
                cancelAnimationFrame(frameId)
            

                return () => {
                                
                    BALLSPEEDX = 6
                    BALLSPEEDY = 6
                    game.paused = false
            
                }
            }
         
            // Draw the canvas
            function drawCanvas() {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                

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
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(game.ballX, game.ballY, 10, 0, Math.PI * 2);
                ctx.fill();
                

            }
            
            // Start the game loop
            gameLoop();
        }
    }

    onMount(()=>{
        if(ws){

           
            ws.addEventListener("message", (event: any)=>{
                let message = JSON.parse(event.data) as ServerAction
                
                switch(message.type){
                    case "gameInstance":
                        // game = message.game
                        game.gameStarted = message.game.gameStarted
                        game.gameMode = message.game.gameMode
                        game.difficulty = message.game.difficulty
                        game.pointsToWin = message.game.pointsToWin
                        game.ballColor = message.game.ballColor
                        game.ballSpeed = message.game.ballSpeed
                        game.ballSpeedX = message.game.ballSpeedX
                        game.ballSpeedY = message.game.ballSpeedY
                        game.ballSize = message.game.ballSize
                        game.paddleSpeed = message.game.paddleSpeed
                        game.paddleHeight = message.game.paddleHeight
                        game.leftPaddleY = message.game.leftPaddleY
                        game.rightPaddleY = message.game.rightPaddleY
                        game.player1Score = message.game.player1Score
                        game.player2Score = message.game.player2Score
                        game.gameEnded = message.game.gameEnded
                        game.winner = message.game.winner
                        game.scoreDisplay = message.game.scoreDisplay
                        game.paused = message.game.paused
                        game.canvasWidth = message.game.canvasWidth
                        game.ballX = message.game.ballX
                        game.ballY = message.game.ballY
                        game.pointsToWin = message.game.pointsToWin
                        game.player1 = message.game.player1
                        game.player2 = message.game.player2
                        

                        game.socket = ws!

                        
                        console.log("player1", game.player1);
                        console.log("player2", game.player2);
                        
                        
                        if(game.player1 != null && game.player2 == null && ws){
                            game.player2 = {id: ws.id, name: userProfile?.username as string}
                            isPlayerOne = false
                            
                        }else if(game.player1 == null && game.player2 != null && ws){
                            game.player1 = {id: ws.id, name: userProfile?.username as string}
                            isPlayerOne = true
                        } else if(game.player1 == null && game.player2 == null && ws){
                            game.player1 = {id: ws.id, name: userProfile?.username as string}
                            isPlayerOne = true
                        }
                        
                        console.log("gameInstance", game);

                        break;

                    case "pause":
                        resumeGame = pauseGame()
                        break;
                    case "resume":
                        resumeGame()
                        break;
                    case "propertyChange":
                        

                      game.updateProperty(message.property, message.value)

                      
                        break;
                    case "userJoined":
                        console.log("user joined");
                        console.log(message.user)
                        // message.user.name = message.user.name === userProfile?.username ? "You" : message.user.name
                        break;
                }
            })
        }
    })

    onDestroy(()=>{
        if(ws){
            ws.close()

        }

        if(frameId){
            cancelAnimationFrame(frameId)
        }
    })
    
    
    
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
        <!-- {#if game.gameMode === "singleplayer"}
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
        </p> -->
        <!-- {:else if game.gameMode === "multiplayer-online"} -->
        <p class="font-sans text-lg badge light info cornered w-full">{game.player1?.name ?? "Waiting for player..."} 
            {#if game.gameStarted}
            <span class="ml-5">{game.player1Score}</span>
            {/if}
        </p>
        <!-- {/if} -->
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
        <!-- {#if game.gameMode === "singleplayer"}
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
        </p> -->
        
        <p class="font-sans text-lg badge light danger cornered w-full">{game.player2?.name ?? "Waiting for player..."} 
            {#if game.gameStarted}
            <span class="ml-5">{game.player2Score}</span>
            {/if}
        </p>
        <!-- {/if} -->
    </div>
    <canvas bind:this={canvas} id="pingPongCanvas" class="rounded-xl canvas-aspect-ratio relative mt-10 hidden ping-pong-breakpoint:tall:flex" height="500" width="800" >
    </canvas>
    <p class="font-sans text-lg badge light danger cornered w-full">{game.player2?.name} 
        {#if game.gameStarted}
        <span class="ml-5">{game.player2Score}</span>
        {/if}
    </p>
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
            {#if !roomId}
        <button class="btn lg success light w-40" on:click={()=>{
            showOptionsModal = !showOptionsModal

        }}>Singleplayer</button>
        <button class="btn lg indigo light w-40" on:click={()=>{
            $page.url.searchParams.set("roomId", random5LetterString)
            $page.url.searchParams.set("showMultiplayerModal", "true")
            window.location.href = $page.url.toString()
            // goto(`/ping-pong?roomId=${random5LetterString}`)
            // showMultiplayerOptionsModal = !showMultiplayerOptionsModal
            }}>
            Create Game
        </button>
        <button class="btn lg indigo light w-40" on:click={()=>{
            // goto(`/ping-pong?roomId=${random5LetterString}`)
            showJoinGameModal = !showJoinGameModal
            }}>
            Join Game
        </button>
        {/if}
        {#if roomId}
        <button class="btn lg success light w-40" on:click={()=>{
            game.gameStarted = true
            setTimeout(() => {
                startGame()
            }, 1000);
            
        }}>Start!</button>
        {/if}

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
        BALLSPEEDX = 6
        BALLSPEEDY = 6
    }}>Replay</button>
    <button class="btn lg info light w-40" on:click={()=>{
        resetScore()
        game.gameEnded = false
        game.gameStarted = false
        
        }}>Menu</button>
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
        <div class="flex w-full">
            <button class="{isPlayerOne ? 'bg-blue-800' : 'bg-gray-900'} rounded-l-lg space-x-3 flex justify-center items-center p-3 w-full" on:click={()=>{
                isPlayerOne = true
                if(ws && userProfile){
                     game.player1 = {id: ws.id, name: userProfile.username}
                     game.player2 = null
                }
            }}>
                <span>Player One</span>
            </button>
            <button class="{!isPlayerOne ? 'bg-red-800' : 'bg-gray-900'} rounded-r-lg space-x-3 flex justify-center items-center p-3 w-full" on:click={()=>{
                isPlayerOne = false
                if(ws && userProfile){
                     game.player2 = {id: ws.id, name: userProfile.username}
                     game.player1 = null
                }
            }}>
                <span>Player Two</span>
            </button>
        </div>
    </div>
    <div class="flex w-full justify-between items-center">
        <label for="p1PaddleColor">Player paddle color</label>
        <input bind:value={game.playerPaddleColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
    </div>
    <div class="flex w-full justify-between items-center">
        <label for="chosenBallColor">Ball color</label>
        <input bind:value={game.ballColor} type="color" name="ballColor" class="input h-10 bw solid w-48" >
    </div>
    <div class="flex justify-between items-center">
        <label for="pointsToWin">Points to win</label>
        <input type="number" bind:value={game.pointsToWin} name="pointsToWin" id="pointsToWin" class="input bw solid w-48">
    </div>
    <div class="flex w-full justify-between items-center">
        <label for="p1PaddleColor">Game Code</label>
        <input value={roomId} type="text" disabled name="txtGameCodeDisabaled" class="input h-10 bw solid w-48" >
        <!-- <p class="">{roomId}</p> -->
    </div>
    <div class="flex gap-3">
      <button class="btn solid danger flex-1" on:click={()=>{
            goto(`/ping-pong`)
            showMultiplayerOptionsModal = !showMultiplayerOptionsModal}}>Cancel</button>
      <button class="btn solid indigo flex-1" on:click={()=>{
        // setDifficulty(game.difficulty)
        $page.url.searchParams.delete("showMultiplayerModal")
        showMultiplayerOptionsModal = !showMultiplayerOptionsModal
        goto(`/ping-pong?roomId=${roomId}`)
        }}>Play!</button>
    </div>
  </div>

  <label class="modal-overlay"></label>
  <!-- show class here will make modal visible -->
  <div class="modal flex flex-col gap-5 max-w-2xl w-full bg-gray-800 text-gray-200 {showJoinGameModal ? 'show' : 'hidden'} ">
    <h2 class="text-xl font-semibold text-center mb-5">Join Multiplayer Game</h2>
    <div class="flex w-full justify-between items-center">
        <label for="p1PaddleColor">Enter Game Code</label>
        <input bind:value={joinCode} type="text" name="txtGameCode" class="input h-10 bw solid w-48" >
    </div>
    <div class="flex gap-3">
      <button class="btn solid danger flex-1" on:click={()=>{
            goto(`/ping-pong`)
            showJoinGameModal = !showJoinGameModal}}>Cancel</button>
      <button class="btn solid indigo flex-1" on:click={()=>{
        // setDifficulty(game.difficulty)
        $page.url.searchParams.set("roomId", joinCode)
        window.location.href = $page.url.toString()
        }}>Join Game Room</button>
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
