class Escena4 extends Phaser.Scene{
constructor(){
    super("Escena4");
    this.vidasRestantes=0;
    this.textoVidas='';
}
init(data){
    this.puntaje=data.puntaje;
    this.musicaFondo=data.musicaFondo;
}
dispararBala(){
        let bala = this.balas.get(this.jugador.x,this.jugador.y,'bala');
        if(bala){
            bala.setActive(true);
            bala.setVisible(true);
            bala.body.reset(this.jugador.x,this.jugador.y);
            bala.body.enable=true;
            bala.setVelocityX(400);
        }
}
generarMeteoros() {
    const y = Phaser.Math.Between(0, 600); 
    const meteoro = this.grupoMeteoros.create(800, y, 'meteoro');
    meteoro.setVelocityX(-300); 
}
destruirAsteroide(bala,meteoro){
    meteoro.disableBody(true,true);
    bala.disableBody(true,true);
}
reducirVida(jugador, meteoro) {
    meteoro.disableBody(true, true);
    this.vidasRestantes--;
    if (this.vidasRestantes >= 0) {
        this.textoVidas.setText('Vidas: '+this.vidasRestantes);
        }
        if (this.vidasRestantes <= 0) {
            this.gameOver(jugador);
        }
}

gameOver(jugador,meteoro){
    // this.scene.start('GameOver');
    if(this.musicaFondo != null){
        this.musicaFondo.stop();}
    this.scene.start('GameOver',{puntaje: this.puntaje});
}
preload(){
    this.load.image('cielo4','public/resource/image/EspacioHorizontal.png'),
    this.load.spritesheet('nave','public/resource/image/nave.png', {frameWidth:75,frameHeight:80}),
    this.load.image('bala','public/resource/image/bala.png'),
    this.load.image('meteoro','public/resource/image/asteroide.png')
    this.load.spritesheet('jefeFinal','public/resource/image/Jefe Final.png', { frameWidth: 304, frameHeight: 235 })
}
create(){
    //this.add.image(400,300,'cielo').setDisplaySize(this.scale.width, this.scale.height);
    this.fondo = this.add.tileSprite(400, 300, 800, 600, 'cielo4'); //(x,y,width,height) para marcar la posicion de la imagen y tamaño a ocupar
    //jugador
    this.jugador = this.physics.add.sprite(10,300,'nave');
    this.jugador.setCollideWorldBounds(true);
    // Jefe Final
    this.anims.create({
        key: 'jefeAnimado',
        frames: this.anims.generateFrameNumbers('jefeFinal', { start: 1, end: 46 }), // Cambia el rango según la cantidad de fotogramas que tenga tu GIF
        frameRate: 10, // Ajusta la velocidad de la animación
        repeat: -1 // Hace que la animación se repitra indefinidamente
    });
    //Crea el sprite del jefe final
    this.jefeFinal = this.physics.add.sprite(400, 300, 'jefeFinal').play('jefeAnimado');
    //meteoros
    this.grupoMeteoros = this.physics.add.group();
    this.time.addEvent({ delay: 500, callback: this.generarMeteoros, callbackScope: this, loop: true });
    //balas
    this.balas = this.physics.add.group();
    this.physics.add.overlap(this.balas,this.grupoMeteoros,this.destruirAsteroide, null, this);
    //vidas
    this.vidasRestantes = 3; 
    this.textoVidas = this.add.text(16,16,'Vidas: '+this.vidasRestantes,{ fontSize: '32px', fill: '#F5EFFF' });
    //collider
    this.physics.add.collider(this.jugador,this.grupoMeteoros,this.reducirVida,null,this);
    //controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.barraEspaciadora = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //puntaje
    this.textoPuntaje=this.add.text(16,50,'Puntaje: 0',{fontSize:'32px',fill:'#CB80AB'});
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
    if(Phaser.Input.Keyboard.JustDown(this.barraEspaciadora)){
        this.dispararBala();
    }
        this.puntaje +=1;
        this.textoPuntaje.setText('Puntaje: '+this.puntaje);
 }
}
export default Escena4;