class GameOver extends Phaser.Scene{
    constructor(){
        super("GameOver");
    }
    init(data){
        this.puntaje = data.puntaje;
    }
    create(){
        this.add.text(400,200,'Game Over',{fontSize:'80px',fill:'#ffff'}).setOrigin(0.5);
        this.add.text(400,300,'Puntaje: '+this.puntaje,{fontSize:'40px',fill:'#ffff'}).setOrigin(0.5);
        this.input.keyboard.once('keydown-SPACE',()=>{
            this.scene.start('Escena1');
        })
    }
}
export default GameOver;