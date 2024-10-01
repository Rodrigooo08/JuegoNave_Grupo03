class Escena2 extends Phaser.Scene{
    constructor(){
        super("Escena2");
        this.textoBalas='';
        this.balasRecolectadas=0;
    }
    init(data){
        this.puntaje = data.puntaje;
    }
    generarBalas(){
        const x = Phaser.Math.Between(0, 800); // Posición aleatoria en el eje X
        const bala = this.balas.create(x, 0, 'bala'); // Crear una bala
        bala.setVelocityY(200); // Velocidad vertical hacia abajo
    }
    recolertarBala(jugador,bala){
        bala.disableBody(true, true);  // Eliminar la bala del mapa
        this.balasRecolectadas++;
        this.textoBalas.setText('Balas Recolectadas: ' + this.balasRecolectadas);     
    }
    preload(){
        this.load.image('cielo2','public/resource/image/gamenave.png'),
        this.load.image('nave','public/resource/image/nave1.png'),
        this.load.image('meteoro2','public/resource/image/asteroide_32x32.png')
        this.load.image('bala','public/resource/image/bala.png');
    }
    create(){
        //fondo escena
        this.add.image(400,300,'cielo2');
        //jugador
        this.jugador = this.physics.add.sprite(400,550,'nave');
        this.jugador.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        //meteoros
        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarMeteoros, callbackScope: this, loop: true });
        //puntaje
        //this.puntaje=0;
        this.textoPuntaje=this.add.text(16,16,'Puntaje: 0',{fontSize:'32px',fill:'#CB80AB'})
        //collider
        this.physics.add.collider(this.jugador,this.grupoMeteoros,this.gameOver,null,this);
        //balas
        this.balas = this.physics.add.group(); // Creando el grupo de meteoritos
        this.time.addEvent({ delay: 1000, callback: this.generarBalas, callbackScope: this, loop: true });
        this.balasRecolectadas=0; // resetea el contador de balas, cada vez que si inicia la escena
        this.textoBalas = this.add.text(16,50,'Balas Recoletadas: 0',{ fontSize: '32px', fill: '#F5EFFF' });
        //deteccion de colicion con balas
        this.physics.add.overlap(this.jugador, this.balas, this.recolertarBala, null, this);
    }
    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800); 
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro2');
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
        //condicion para pasar de escena
        if(this.puntaje >= 2000){
            this.scene.start('EscenaBonus',{puntaje:this.puntaje,balasRecolectadas: this.balasRecolectadas});
        }
    }

    gameOver(jugador,meteoro){
        this.scene.start('GameOver');
        this.scene.start('GameOver',{puntaje: this.puntaje});
    }
}
export default Escena2;