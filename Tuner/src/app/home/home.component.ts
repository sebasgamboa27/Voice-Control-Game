import { Component, OnInit } from '@angular/core';
import * as ml5 from 'node_modules/ml5';
import { nodeI } from './interfaces/Node';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  classifier;
  options = { probabilityThreshold: 0.7 };
  label: string;
  confidence: string ;

  board: nodeI[][] = [];
  playerX = 3;
  playerY = 3;
  finishX = 35;
  finishY = 20;
  won: boolean = false;
  playing: boolean = false;


  constructor() {
    for (let i = 0; i < 25; i++) {
      let temp = []
      for (let j = 0; j < 40; j++) {
        const newNode : nodeI = {i:i,j:j,isWall:false,isPlayer:false,isFinish:false};
        newNode.i = i;
        newNode.j = j;
        if(i===this.playerY && j===this.playerX){
          newNode.isPlayer = true;
        }
        if(i>this.finishY && j>this.finishX){
          newNode.isFinish = true;
        }
        let random = Math.floor(Math.random() * (100 - 0)) + 0;
        if(random<25 && !newNode.isPlayer){
          newNode.isWall = true;
        }
        temp.push(newNode);
      }
      this.board.push(temp);
    }
  }

  async ngOnInit() {

    this.classifier = await ml5.soundClassifier('SpeechCommands18w', this.options);
  }

  gotResult = (error, results) =>{
    if (error) {
      console.error(error);
    }
    console.log(results);
    debugger;
    if(this.playing && results!=undefined && results[0].confidence>0.9 && (results[0].label === 'up' || results[0].label === 'down' ||
    results[0].label === 'right' || results[0].label === 'left')){
      this.label = 'Prediction: '+(results[0].label);
      this.confidence = 'Confidence: ' + (results[0].confidence);
      this.move(results[0].label);
    }
  }

  start(){
    if(this.classifier!= undefined){
      this.playing = true;
      this.classifier.classify(this.gotResult);
    }
  }

  move(direction: string){

    const pastX = this.playerX;
    const pastY = this.playerY;

    if(direction === 'up'){
      if(!this.board[pastY-1][pastX].isWall){
        this.board[pastY][pastX].isPlayer = false;
        this.playerY -=1;
        this.board[this.playerY][pastX].isPlayer = true;
        if(this.board[this.playerY][pastX].isFinish){
          this.won = true;
        }
      }
    }
    else if(direction === 'down'){
      if(!this.board[pastY+1][pastX].isWall){
        this.board[pastY][pastX].isPlayer = false;
        this.playerY +=1;
        this.board[this.playerY][pastX].isPlayer = true;
        if(this.board[this.playerY][pastX].isFinish){
          this.won = true;
        }
      }
    }
    else if(direction === 'right'){
      if(!this.board[pastY][pastX+1].isWall){
        this.board[pastY][pastX].isPlayer = false;
        this.playerX +=1;
        this.board[pastY][this.playerX].isPlayer = true;
        if(this.board[pastY][this.playerX].isFinish){
          debugger;
          this.won = true;
        }
      }
    }
    else if(direction === 'left'){
      if(!this.board[pastY][pastX-1].isWall){
        this.board[pastY][pastX].isPlayer = false;
        this.playerX -=1;
        this.board[pastY][this.playerX].isPlayer = true;
        if(this.board[pastY][this.playerX].isFinish){
          this.won = true;
        }
      }
    }
  }

  clear(){
    this.board = [];
    this.playerX = 3;
    this.playerY = 3;
    this.finishX = 35;
    this.finishY = 20;
    this.won = false;
    this.playing = false;
    this.label = '';

    for (let i = 0; i < 25; i++) {
      let temp = []
      for (let j = 0; j < 40; j++) {
        const newNode : nodeI = {i:i,j:j,isWall:false,isPlayer:false,isFinish:false};
        newNode.i = i;
        newNode.j = j;
        if(i===this.playerY && j===this.playerX){
          newNode.isPlayer = true;
        }
        if(i>this.finishY && j>this.finishX){
          newNode.isFinish = true;
        }
        let random = Math.floor(Math.random() * (100 - 0)) + 0;
        if(random<25 && !newNode.isPlayer){
          newNode.isWall = true;
        }
        temp.push(newNode);
      }
      this.board.push(temp);
    }
  }
  

}
