class Escena1 extends Phaser.Scene{
    constructor(){
        super("Escena1");
        this.jugador=null;
        this.cursors=null;
    }
    preload(){
        this.load.image('cielo','public/resource/image/Espacio.jpg'),
        this.load.image('nave','public/resource/image/nave1.png'),
        this.load.image('meteoro','public/resource/image/asteroide.png')
    }
    create(){
        this.add.image(400,300,'cielo');
        this.jugador = this.physics.add.sprite(400,550,'nave');
        this.jugador.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarMeteoros, callbackScope: this, loop: true });
    }
    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800); 
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro');
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
    }
}
export default Escena1;