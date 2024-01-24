import type PartySocket from "partysocket"

export type GameMode = "singleplayer" | "multiplayer-local" | "multiplayer-online"
export type PaddleAccessProperty = "leftPaddleY" | "rightPaddleY"


export type GameAction = {type: "propertyChange"; property: keyof Game, value: string | number} | {type: "pause" | "resume"}
export type GameUser = {id: string, name?: string}


export type WithUser<T> = T & {user: GameUser | null}

export type  ServerAction = GameAction | {type: "gameInstance", game: Game} | WithUser<{type: "userJoined"}> | WithUser< {type: "userLeft"}>


export default class Game {
    //using # to make private properties for intercepcting when a property is changed
    gameMode: GameMode
    #players: [player1: GameUser | null, player2: GameUser | null] = [null, null]
    socket: null | PartySocket = null
    showOptionsModal = false
    #playerPaddleColor = "#0091FF"
    #computerPaddleColor = "#F76808"
    #ballColor = "#ffffff"
    #ballSpeed = 10;
    #ballSize = 10;
    #paddleSpeed = 4;
    #difficulty: "easy" | "hard" | "unfair" = "easy";
    #paused = false;
    #scoreDisplay = false
    #gameStarted = false
    #gameEnded = false
    #winner = ""
    #pointsToWin = 3
    #canvasWidth = 800

    #player1Score = 0;
    #player2Score = 0;


    // Paddle properties
    readonly paddleWidth = 15;
    
    #paddleHeight = 0 //set in game loop

   
    #leftPaddleY = 0
    #rightPaddleY = 0



    // Ball properties
    #ballX = 0 //set in game loop
    #ballY = 0 //set in game loop

    #ballSpeedX = this.#ballSpeed //set in game loop
    #ballSpeedY = this.#ballSpeed //set in game loop

    constructor(gameMode: GameMode, socket: null | PartySocket = null) {
       
        this.gameMode = gameMode
        this.socket = socket

    }


    // create js setter for all these properties

    get leftPaddleY(): number {
        return this.#leftPaddleY;
    }

    set leftPaddleY(value: number) {
      
        this.#leftPaddleY = value;

        console.log("left paddle y changed");
        

        if(this.socket){
            console.log("sending message");
            
            this.socket.send(JSON.stringify({type:"propertyChange", property: "leftPaddleY", value} satisfies GameAction))
               
        }
    }

    get rightPaddleY(): number {
        return this.#rightPaddleY;
    }

    set rightPaddleY(value: number) {
        
        this.#rightPaddleY = value;
        console.log("right paddle y changed");
        
        
        if(this.socket){
            console.log("right paddle message");
            this.socket.send(JSON.stringify({type:"propertyChange", property: "rightPaddleY", value} satisfies GameAction))
               
        }
        
    }

    updatePaddleY = (property: PaddleAccessProperty, value: number) => {
        //bypass setter to avoid sending message to server
        if(property === "leftPaddleY"){
            this.#leftPaddleY = value
        }else if(property === "rightPaddleY"){
            this.#rightPaddleY = value
        }
    }

    get playerPaddleColor(): string {
        return this.#playerPaddleColor;
    }

    set playerPaddleColor(value: string) {
        this.#playerPaddleColor = value;
    }

    get computerPaddleColor(): string {
        return this.#computerPaddleColor;
    }

    set computerPaddleColor(value: string) {
        this.#computerPaddleColor = value;
    }

    get ballColor(): string {
        return this.#ballColor;
    }

    set ballColor(value: string) {
        this.#ballColor = value;
        if(this.socket){
            this.socket.send(JSON.stringify({type:"propertyChange", property: "ballColor", value} satisfies GameAction))
               
        }
    }

    get ballSpeed(): number {
        return this.#ballSpeed;
    }

    set ballSpeed(value: number) {
        this.#ballSpeed = value;

        if(this.socket){
            this.socket.send(JSON.stringify({type:"propertyChange", property: "ballSpeed", value} satisfies GameAction))
               
        }
    }

    get ballSize(): number {
        return this.#ballSize;
    }

    set ballSize(value: number) {
        this.#ballSize = value;
    }

    get paddleSpeed(): number {
        return this.#paddleSpeed;
    }

    set paddleSpeed(value: number) {
        this.#paddleSpeed = value;
    }

    get difficulty() {
        return this.#difficulty;
    }

    set difficulty(value: "easy" | "hard" | "unfair") {
        this.#difficulty = value;
    }

    get paused(): boolean {
        return this.#paused;
    }

    set paused(value: boolean) {
        this.#paused = value;
    }

    get scoreDisplay(): boolean {
        return this.#scoreDisplay;
    }

    set scoreDisplay(value: boolean) {
        this.#scoreDisplay = value;
    }

    get gameStarted(): boolean {
        return this.#gameStarted;
    }

    set gameStarted(value: boolean) {
        this.#gameStarted = value;
    }

    get gameEnded(): boolean {
        return this.#gameEnded;
    }

    set gameEnded(value: boolean) {
        this.#gameEnded = value;
    }

    get winner(): string {
        return this.#winner;
    }

    set winner(value: string) {
        this.#winner = value;
    }

    get pointsToWin(): number {
        return this.#pointsToWin;
    }

    set pointsToWin(value: number) {
        this.#pointsToWin = value;
    }

    get canvasWidth(): number {
        return this.#canvasWidth;
    }

    set canvasWidth(value: number) {
        this.#canvasWidth = value;
    }

    get player1Score(): number {
        return this.#player1Score;
    }

    set player1Score(value: number) {
        this.#player1Score = value;
    }

    get player2Score(): number {
        return this.#player2Score;
    }

    set player2Score(value: number) {        
        this.#player2Score = value;
    }

   

    get paddleHeight(): number {
        return this.#paddleHeight;
    }

    set paddleHeight(value: number) {
        this.#paddleHeight = value;
    }


    get ballX(): number {
        return this.#ballX;
    }

    set ballX(value: number) {
        this.#ballX = value;
        // if(this.socket){
        //     this.socket.send(JSON.stringify({type:"propertyChange", property: "ballX", value} satisfies GameAction))
               
        // }
    }

    get ballY(): number {
        return this.#ballY;
    }

    set ballY(value: number) {
        this.#ballY = value;
        // if(this.socket){
        //     this.socket.send(JSON.stringify({type:"propertyChange", property: "ballY", value} satisfies GameAction))
               
        // }
    }

    get ballSpeedX(): number {
        return this.#ballSpeedX;
    }

    set ballSpeedX(value: number) {
        this.#ballSpeedX = value;
        if(this.socket){
            this.socket.send(JSON.stringify({type:"propertyChange", property: "ballSpeedX", value} satisfies GameAction))
               
        }
    }

    get ballSpeedY(): number {
        return this.#ballSpeedY;
    }

    set ballSpeedY(value: number) {
        this.#ballSpeedY = value;
        if(this.socket){
            this.socket.send(JSON.stringify({type:"propertyChange", property: "ballSpeedY", value} satisfies GameAction))
               
        }
    }

    get players(): [player1: GameUser | null, player2: GameUser | null] {
        return this.#players;
    }

    set players(value: [player1: GameUser | null, player2: GameUser | null]) {
        this.#players = value;
    }


   updateProperty = (property: keyof Game, value: any) => {
    switch (property) {
        case "leftPaddleY":
            this.#leftPaddleY = value
            break;
        case "rightPaddleY":
            this.#rightPaddleY = value
            break;
        case "ballColor":
            this.#ballColor = value
            break;
        case "ballSpeed":
            this.#ballSpeed = value
            break;
        // case "ballX":
        //     this.#ballX = value
        //     break;
        // case "ballY":
        //     this.#ballY = value
        //     break;
        case "ballSpeedX":
            this.#ballSpeedX = value
            break;
        case "ballSpeedY":
            this.#ballSpeedY = value
            break;
        default:
            break;
    }
   }

    resetScore = () =>  {
        this.player1Score = 0;
        this.#player2Score = 0;
    }

    setDifficulty= (type: 'easy' | 'hard' | 'unfair', callback: () => void | undefined) => {
        if (type === 'easy') {
            this.#ballSpeed = 14
            this.#ballSize = 10
            this.#paddleSpeed = 4
        } else if (type === 'hard') {
            this.#ballSpeed = 20
            this.#ballSize = 8
            this.#paddleSpeed = 10
        } else if (type === 'unfair') {
            this.#ballSpeed = 21
            this.#ballSize = 8
            this.#paddleSpeed = 50
        }

        if (callback) {
            callback()
        }

    }

   

    pauseGame = () => {
        this.ballSpeedX = 0;
        this.ballSpeedY = 0;
        this.#paused = true

        //send message to server to pause game

    }
    resumeGame = () => {
        this.ballSpeedX = this.#ballSpeed;
        this.ballSpeedY = this.#ballSpeed;
        this.#paused = false

        //send message to server to resume game
    }
    centerBall = ( canvasWidth: number, canvasHeight: number) => { 
        this.#ballX = canvasWidth / 2;
        this.#ballY = canvasHeight / 2;
    }

    hideBall = () => {
        this.#ballX = 0;
        this.#ballY = -100;
    }

    // Reset the ball to the center
    resetBall = (canvasWidth: number, canvasHeight: number) => {
        this.centerBall(canvasWidth, canvasHeight);
        this.pauseGame();
        this.#scoreDisplay = true
        setTimeout(()=>{
        this.#scoreDisplay = false
        },2000)
        setTimeout(() => {
            this.resumeGame();
        }, 2500);
        
    }

    



}






