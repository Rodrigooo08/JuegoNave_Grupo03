class Escena4 extends Phaser.Scene{
constructor(){
    super("Escena4");
}
init(data){
    this.puntaje=data.puntaje;
    this.musicaFondo=data.musicaFondo;
}
preload(){
    this.load.image('cielo4','public/resource/image/EspacioHorizontal.png'),
    this.load.spritesheet('nave','public/resource/image/nave.png', {frameWidth:75,frameHeight:80})
}
create(){
    //this.add.image(400,300,'cielo').setDisplaySize(this.scale.width, this.scale.height);
    this.fondo = this.add.tileSprite(400, 300, 800, 600, 'cielo4'); //(x,y,hight,width) para marcar la posicion de la imagen y tamaño a ocupar
    //jugador
    this.jugador = this.physics.add.sprite(10,300,'nave');
    this.jugador.setCollideWorldBounds(true);
     //controles
     this.cursors = this.input.keyboard.createCursorKeys();
     this.barraEspaciadora = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //puntaje
    this.textoPuntaje=this.add.text(16,16,'Puntaje: 0',{fontSize:'32px',fill:'#CB80AB'});
    //manejo sprite de jugador
    this.anims.create({
        key: 'izquierda',
        frames: [{key:'nave',frame:2}], 
        frameRate: 20,

    });
    this.anims.create({
        key: 'normal',
        frames: [{key:'nave',frame:1}], 
        frameRate: 20,

    });
    this.anims.create({
        key: 'derecha',
        frames: [{key:'nave',frame:0}], 
        frameRate: 20,

    });
}
update(){
    //desplazamiento del fondo
    const backgroundSpeed = 2;//velocidad de desplazamiento
    this.fondo.tilePositionX += backgroundSpeed;

    this.jugador.setVelocityX(0);
    this.jugador.setVelocityY(0);
    if (this.cursors.left.isDown) {
        this.jugador.setVelocityX(-300); // Mover a la izquierda
        this.jugador.anims.play('izquierda',true)
        } else if (this.cursors.right.isDown) {
        this.jugador.setVelocityX(300); // Mover a la derecha
        this.jugador.anims.play('derecha',true)
        } else if (this.cursors.up.isDown){ //mover hacia adelante
            this.jugador.setVelocityY(-300);
        } else if (this.cursors.down.isDown){ //mover hacia atras
            this.jugador.setVelocityY(300);
        } else{
            this.jugador.anims.play('normal', true);
        }
        this.puntaje +=1;
        this.textoPuntaje.setText('Puntaje: '+this.puntaje);
}
}
export default Escena4;