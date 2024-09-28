class GameOver extends Phaser.Scene{
    constructor(){
        super("GameOver");
    }
    create(){
        this.add.text(400,200,'Game Over',{fontZise:'60px',fill:'#ffff'}).setOrigin(0.5);
        this.input.keyboard.once('keydown-SPACE',()=>{
            this.scene.start('Escena1');
        })
    }
}
export default GameOver;