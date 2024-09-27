class Escena1 extends Phaser.Scene{
    constructor(){
        super("Escena1");
        this.jugador=null;
        this.cursors=null;
    }
    preload(){
        this.load.image('cielo','public/resource/image/Espacio.jpg'),
        this.load.image('nave','public/resource/image/nave1.png')
    }
    create(){
        this.add.image(400,300,'cielo');
        this.jugador = this.physics.add.sprite(400,550,'nave');
        this.jugador.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        this.jugador.setVelocityX(0);
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
            } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
            }
    }
}
export default Escena1;