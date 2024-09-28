import Escena1 from "./scenes/Escena1.js"
import GameOver from "./scenes/GameOver.js";

const config={
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Escena1,GameOver],
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{y:0},
            debug: false
        }
    },
}
let game = new Phaser.Game(config);