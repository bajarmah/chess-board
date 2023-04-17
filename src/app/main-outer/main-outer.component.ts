import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';

@Component({
  selector: 'app-main-outer',
  templateUrl: './main-outer.component.html',
  styleUrls: ['./main-outer.component.scss'],
})
export class MainOuterComponent implements OnInit, AfterViewInit {

  @ViewChild('board1', {static: false})
  board1!: NgxChessBoardView;

  @ViewChild('board2', {static: false})
  board2!: NgxChessBoardView;

  isPlayerOnesTurn = true;
  isPlayerTwosTurn = false;

  isGameFinished = false;
  endgameMessage = '';

  constructor(private ngxChessBoardService: NgxChessBoardService) {}

  ngOnInit(): void {
    // listen for before unload event to store game state
    window.addEventListener('beforeunload', () => {
      this.storeGameState();
    });

    setTimeout(() => {
      // Check if there's a saved game state in local storage
      const gameState = window.localStorage.getItem('gameState');
      if (gameState) {
        // Parse the game state from JSON
        const state = JSON.parse(gameState);

        // Set the board FENs and player turns
        this.board1?.setFEN(state.board1FEN);
        this.board2?.setFEN(state.board2FEN);
        this.isPlayerOnesTurn = state.isPlayerOnesTurn;
        this.isPlayerTwosTurn = state.isPlayerTwosTurn;
        this.isGameFinished = state.isGameFinished;
        this.endgameMessage = state.endgameMessage;
        this.board2?.reverse();
        console.log('ssss', this.isGameFinished, 'gammmme ', this.isPlayerOnesTurn);
      }
    });
  }
  
  ngAfterViewInit() {
    this.board2?.reverse();
  }

  storeGameState() {
    // Save game state to local storage
    const gameState = {
      board1FEN: this.board1?.getFEN(),
      board2FEN: this.board2?.getFEN(),
      isPlayerOnesTurn: this.isPlayerOnesTurn,
      isPlayerTwosTurn: this.isPlayerTwosTurn,
      isGameFinished: this.isGameFinished,
      endgameMessage: this.endgameMessage
    };
    window.localStorage.setItem('gameState', JSON.stringify(gameState));
  }

  switchPlayerTurn() {
    this.isPlayerOnesTurn = !this.isPlayerOnesTurn;
    this.isPlayerTwosTurn = !this.isPlayerTwosTurn;
  }

  playerOneMoveCompleted(event: any) {
    // copy board1 to board2 and reverse
    this.board2?.setFEN(this.board1?.getFEN());
    this.board2.reverse();

    if (event.checkmate) {
      this.endgameMessage = 'Player One Won!';
      this.isGameFinished = true;
      this.isPlayerOnesTurn = false;
      this.isPlayerTwosTurn = false;
      return;
    }

    if (event.stalement) {
      this.endgameMessage = 'Stalemate!';
      this.isGameFinished = true;
      this.isPlayerOnesTurn = false;
      this.isPlayerTwosTurn = false;
      return;
    }

    // switch turn to player two
    this.switchPlayerTurn();
  }

  playerTwoMoveCompleted(event: any) {
    // console.log('player two move completed:', event);

    // copy board2 to board1
    this.board1.setFEN(this.board2.getFEN());

    if (event.checkmate) {
      this.endgameMessage = 'Player Two Won!';
      this.isGameFinished = true;
      this.isPlayerOnesTurn = false;
      this.isPlayerTwosTurn = false;
      return;
    }

    if (event.stalement) {
      this.endgameMessage = 'Stalemate!';
      this.isGameFinished = true;
      this.isPlayerOnesTurn = false;
      this.isPlayerTwosTurn = false;
      return;
    }

    // switch turn to player one
    this.switchPlayerTurn();
  }

  onResetGame() {
    // reset boards
    this.board1.reset();
    this.board2.reset();

    // assign first turn to player one
    this.isPlayerOnesTurn = true;
    this.isPlayerTwosTurn = false;

    // clear endgame message and flag
    this.endgameMessage = '';
    this.isGameFinished = false;

    window.localStorage.removeItem('gameState');
  }
}
