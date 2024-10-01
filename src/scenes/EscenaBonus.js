class EscenaBonus extends Phaser.Scene{
    constructor(){
        super("EscenaBonus");
        this.jugador=null;
        this.cursors=null;
        this.puntaje = '';
        this.textoPuntaje='';
    }
    init(data){
        this.puntaje = data.puntaje;
        this.balasRecolectadas=data.balasRecolectadas;
    }
    generarHerramientas() {
        const x = Phaser.Math.Between(0, 800); 
        const herramienta3 = this.grupoHerramientas.create(x, 0, 'herramienta3');
        herramienta3.setVelocityY(150); 
        
    }
    generarHerramientasC() {
        const x = Phaser.Math.Between(0, 800); 
        const herramienta2 = this.grupoHerramientasC.create(x, 0,'herramienta2');
        herramienta2.setVelocityY(200); 
    }
    generarHerramientasA() {
        const x = Phaser.Math.Between(0, 800); 
        const herramienta = this.grupoHerramientasA.create(x, 0,'herramienta');
        herramienta.setVelocityY(300); 
    }
    recolectarHerramientaA(jugador,herramienta){
        herramienta.disableBody(true, true);
    }
    recolectarHerramientaC(jugador,herramienta2){
        herramienta2.disableBody(true, true);

    }
    recolectarHerramienta(jugador,herramienta3){
        herramienta3.disableBody(true, true);

    }
    


    preload(){
         this.load.image('bgBonus','public/resource/image/BG_bonus.png'),
         this.load.spritesheet('nave','public/resource/image/nave.png', {frameWidth:75,frameHeight:80}),
         this.load.image('herramienta2','public/resource/image/herramientas2_32x32.png'),
         this.load.image('herramienta','public/resource/image/herramientas_32x32.png'),
         this.load.image('herramienta3','public/resource/image/herramienta3_32x32.png')
    }

    actualizarContador() {
        this.tiempoTranscurrido += 1; 
        this.contadorTexto.setText('Tiempo: ' + this.tiempoTranscurrido); 
    }
    create(){
        //fondo escena
        this.add.image(400,300,'bgBonus');
        //jugador
        this.jugador = this.physics.add.sprite(400,550,'nave');
        this.jugador.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        //herramientas
        this.grupoHerramientas = this.physics.add.group();
        this.time.addEvent({ delay: 1500, callback: this.generarHerramientas, callbackScope: this, loop: true });
        
        this.grupoHerramientasC = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarHerramientasC, callbackScope: this, loop: true });
        
        this.grupoHerramientasA = this.physics.add.group();
        this.time.addEvent({ delay: 1800, callback: this.generarHerramientasA, callbackScope: this, loop: true });
       
        this.physics.add.overlap(this.jugador, this.grupoHerramientasA, this.recolectarHerramientaA, null, this);

        this.physics.add.overlap(this.jugador, this.grupoHerramientasC, this.recolectarHerramientaC, null, this);

        this.physics.add.overlap(this.jugador, this.grupoHerramientas, this.recolectarHerramienta, null, this);


        //puntaje
        // this.puntaje=0;
        this.textoPuntaje=this.add.text(16,16,'Puntaje: 0',{fontSize:'32px',fill:'#CB80AB'})
        //collider
        this.physics.add.collider(this.jugador,this.grupoHerramientas,this.gameOver,null,this);
        this.physics.add.collider(this.jugador,this.grupoHerramientasC,this.gameOver,null,this);
        this.physics.add.collider(this.jugador,this.grupoHerramientasA,this.gameOver,null,this);
    
        this.tiempoTranscurrido = 0;
        this.contadorTexto = this.add.text(580, 16, 'Tiempo: 0', { fontSize: '32px', fill: '#CB80AB' });

        // Temporizador 
        this.temporizador = this.time.addEvent({ delay: 1000, callback: this.actualizarContador,callbackScope: this, loop: true 
        });
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

        if (this.tiempoTranscurrido >= 20) {
            //this.scene.stop('EscenaBonus'); 
            this.scene.start('Escena3',{puntaje:this.puntaje,balasRecolectadas: this.balasRecolectadas})
            // this.scene.start('EscenaBonus', { puntaje: this.puntaje }); 
        }
    }
    // gameOver(jugador,meteoro){
    //     this.scene.start('GameOver');
    //     this.scene.start('GameOver',{puntaje: this.puntaje});
    // }
}
export default EscenaBonus;