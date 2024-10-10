class Escena4 extends Phaser.Scene {
    constructor() {
        super("Escena4");
        this.vidasRestantes = 0;
        this.textoVidas = '';
    }
    init(data) {
        this.puntaje = data.puntaje;
        this.musicaFondo = data.musicaFondo;
    }
    dispararBala() {
        let bala = this.balas.get(this.jugador.x, this.jugador.y, 'bala');
        if (bala) {
            bala.setActive(true);
            bala.setVisible(true);
            bala.body.reset(this.jugador.x, this.jugador.y);
            bala.body.enable = true;
            bala.setVelocityX(400);
        }
    }
    generarMeteoros() {
        const y = Phaser.Math.Between(0, 600);
        const meteoro = this.grupoMeteoros.create(800, y, 'meteoro');
        meteoro.setVelocityX(-300);
    }
    destruirAsteroide(bala, meteoro) {
        meteoro.disableBody(true, true);
        bala.disableBody(true, true);
    }
    reducirVida(jugador, meteoro) {
        meteoro.disableBody(true, true);
        this.vidasRestantes--;
        if (this.vidasRestantes >= 0) {
            this.textoVidas.setText(': ' + this.vidasRestantes);
        }
        if (this.vidasRestantes <= 0) {
            this.gameOver(jugador);
        }
    }
    reducirVidaJefe(jefeFinal,bala){
        bala.disableBody(true, true); // Desactiva la bala
        this.vidaJefe--; // Reduce la vida del jefe
        jefeFinal.setTint(0xff0000);
        this.time.delayedCall(1000, () => {
            jefeFinal.clearTint();
        });
        if (this.vidaJefe <= 0) {
            jefeFinal.disableBody(true,true);
            this.Victoria();
        }
 }
    Victoria() {

    if (this.audioEscena4 != null) {
        this.audioEscena4.stop();
    }
 
    this.scene.start('Victoria', { puntaje: this.puntaje });
}
    gameOver(jugador, meteoro) {
        // this.scene.start('GameOver');
        if (this.audioEscena4 != null) {
            this.audioEscena4.stop();
        }
        this.scene.start('GameOver', { puntaje: this.puntaje });
    }
    preload() {
        this.load.image('cielo4', 'public/resource/image/EspacioHorizontal.png'),
        this.load.spritesheet('naveVer', 'public/resource/image/naveVer.png', { frameWidth: 82, frameHeight: 77 }),
        this.load.image('bala', 'public/resource/image/bala.png'),
        this.load.image('meteoro', 'public/resource/image/asteroide.png')
        this.load.spritesheet('jefeFinal', 'public/resource/image/Jefe Final.png', { frameWidth: 304, frameHeight: 235 }),
        this.load.spritesheet('vida', 'public/resource/image/spritesheet_cascotime_32x32.png', { frameWidth: 32, frameHeight: 32 });
        this.load.audio('audioEscena4','public/resource/sound/MusicaMenu.mp3');

    }
    create() {
        //this.add.image(400,300,'cielo').setDisplaySize(this.scale.width, this.scale.height);
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'cielo4'); //(x,y,width,height) para marcar la posicion de la imagen y tamaño a ocupar
        //audioo
        this.audioEscena4 = this.sound.add('audioEscena4');
        const soundConfig={volume:1,loop:true};
        if(!this.sound.locked){
            this.audioEscena4.play(soundConfig);
        }
        //jugador
        this.jugador = this.physics.add.sprite(10, 300, 'naveVer');
        this.jugador.setCollideWorldBounds(true);
        // Jefe Final
        //Vidas Jefe
        this.vidaJefe =50;
        this.anims.create({
            key: 'jefeAnimado',
            frames: this.anims.generateFrameNumbers('jefeFinal', { start: 1, end: 46 }), // Cambia el rango según la cantidad de fotogramas que tenga tu GIF
            frameRate: 10, // Ajusta la velocidad de la animación
            repeat: -1 // Hace que la animación se repitra indefinidamente
        });
        //Crea el sprite del jefe final
        this.jefeFinal = this.physics.add.sprite(800, 400, 'jefeFinal').play('jefeAnimado');
       // this.jefeFinal.setCollideWorldBounds(true);
        // Agrega lógica para que el Jefe final se mueva
        this.jefeFinal.setVelocityX(-100); // Mover hacia la derecha
        this.jefeFinal.setVelocityY(-100) // mover hacia arriba 
        //meteoros
        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({ delay: 500, callback: this.generarMeteoros, callbackScope: this, loop: true });
        //balas
        this.balas = this.physics.add.group();
        this.physics.add.overlap(this.balas, this.grupoMeteoros, this.destruirAsteroide, null, this);
        this.physics.add.overlap(this.balas, this.jefeFinal, this.reducirVidaJefe,null, this);
        //vidas
        this.vidasRestantes = 3;
        this.textoVidas = this.add.text(39, 20, ': ' + this.vidasRestantes, { fontSize: '32px', fill: '#F5EFFF' });
        //collider
        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.reducirVida, null, this);
        //controles
        this.cursors = this.input.keyboard.createCursorKeys();
        this.barraEspaciadora = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //puntaje
        this.textoPuntaje = this.add.text(500, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#CB80AB' });
        //manejo sprite de jugador
        this.anims.create({
            key: 'izquierda',
            frames: [{ key: 'naveVer', frame: 0 }],
            frameRate: 20,

        });
        this.anims.create({
            key: 'normal',
            frames: [{ key: 'naveVer', frame: 1 }],
            frameRate: 20,

        });
        this.anims.create({
            key: 'derecha',
            frames: [{ key: 'naveVer', frame: 2 }],
            frameRate: 20,

        });

        
        //animacion del sprite de la vida
        this.anims.create({
        key: 'v',
        frames: this.anims.generateFrameNumbers('vida', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1,
        });
        //
        this.cascoVida = this.physics.add.sprite(38, 30, 'vida');
        this.cascoVida.anims.play('v');
        this.cascoVida.setScale(2);
    }
    update() {
        //desplazamiento del fondo
        const backgroundSpeed = 2;//velocidad de desplazamiento
        this.fondo.tilePositionX += backgroundSpeed;

        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
        } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
        } else if (this.cursors.up.isDown) { //mover hacia adelante
            this.jugador.setVelocityY(-300);
            this.jugador.anims.play('izquierda', true)
        } else if (this.cursors.down.isDown) { //mover hacia atras
            this.jugador.setVelocityY(300);
            this.jugador.anims.play('derecha', true)
        } else {
            this.jugador.anims.play('normal', true);
        }
        if (Phaser.Input.Keyboard.JustDown(this.barraEspaciadora)) {
            this.dispararBala();
        }
        this.puntaje += 1;
        this.textoPuntaje.setText('Puntaje: ' + this.puntaje);
        //Direccion del jefe Final en X
        if (this.jefeFinal.x < 500) {
            this.jefeFinal.setVelocityX(100);
        } else if (this.jefeFinal.x >= 680) {
            this.jefeFinal.setVelocityX(-100)
        }
        //Direccion del jefe Final en Y 
        if (this.jefeFinal.y >= 500) {
            this.jefeFinal.setVelocityY(-100);
        } else if (this.jefeFinal.y <= 90) {
            this.jefeFinal.setVelocityY(100);
        }
    }
}
export default Escena4;