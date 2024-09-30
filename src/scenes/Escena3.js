class Escena3 extends Phaser.Scene{
    constructor(){
        super("Escena3");
        this.jugador=null;
        this.cursors=null;
        this.puntaje = 0;
        this.textoPuntaje='';
    }
    preload(){
        this.load.image('cielo3','public/resource/image/Espacio.png'),
        this.load.image('nave','public/resource/image/nave1.png'),
        this.load.image('meteoro3','public/resource/image/basura_espacial2d_1_300x250.png')
        this.load.image("meteoro4",'public/resource/image/basura_espacial2d_2_400x250.png')
    }
    create(){
        //fondo escena
        this.add.image(400,300,'cielo3');
        //jugador
        this.jugador = this.physics.add.sprite(400,550,'nave');
        this.jugador.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        //meteoros
        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarMeteoros, callbackScope: this, loop: true });
        //puntaje
        this.puntaje=0;
        this.textoPuntaje=this.add.text(16,16,'Puntaje: 0',{fontSize:'32px',fill:'#CB80AB'})
        //collider
        this.physics.add.collider(this.jugador,this.grupoMeteoros,this.gameOver,null,this);
    }
    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800); 
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro3');
        this.grupoMeteoros.create(x, 0, 'meteoro4');
        meteoro.setVelocityY(200); 
    }
    update(){
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
            } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
            } else if (this.cursors.up.isDown){ //mover hacia adelante
                this.jugador.setVelocityY(-300);
            } else if (this.cursors.down.isDown){ //mover hacia atras
                this.jugador.setVelocityY(300);
            }
            
        this.puntaje +=1;
        this.textoPuntaje.setText('Puntaje: '+this.puntaje);
    }
    gameOver(jugador,meteoro){
        this.scene.start('GameOver');
        this.scene.start('GameOver',{puntaje: this.puntaje});
    }
}
export default Escena3;