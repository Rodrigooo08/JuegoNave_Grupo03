class MenuStart extends Phaser.Scene {  
    constructor() {  
        super("MenuStart"); // Nombre clave de la escena
    }  

    preload() {  
        this.load.image('menu','public/resource/image/fondo.jpg');
        // Puedes cargar imágenes o sonidos aquí  
    }  

    create() {  
         //fondo menu
        this.add.image(400,300,'menu');
        // Título del juego  
        this.add.text(400, 100, 'Esquivando Meteoros', {  
            fontSize: '64px',  
            fill: '#ffffff' , 
            fontFamily: 'orbitron',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);  

        // Botones del menú  
        const playButton = this.add.text(400, 250, 'Jugar', {  
            fontSize: '42px',  
            fill: "#ffffff",
            fontFamily:"Times New Roman"
            
        }).setOrigin(0.5).setInteractive();  

        const exitButton = this.add.text(400, 350, 'Salir', {  
            fontSize: '42px',  
            fill: '#ffffff',  
            fontFamily:"times new roman"
        }).setOrigin(0.5).setInteractive();  

        // Eventos para los botones  
        playButton.on('pointerdown', () => this.startGame());  
        exitButton.on('pointerdown', () => this.exitGame());  

        // Cambiar color al pasar el mouse  
        playButton.on('pointerover', () => playButton.setStyle({ fill: '#ff0',fontSize :'50px',backgroundColor:'#68d7c9' }));  
        playButton.on('pointerout', () => playButton.setStyle({ fill: '#ffffff',fontSize :'42px' }));  
        
        exitButton.on('pointerover', () => exitButton.setStyle({ fill: '#ff0', fontSize :'50px',backgroundColor:'#68d7c9' }));  
        exitButton.on('pointerout', () => exitButton.setStyle({ fill: '#ffffff', fontSize :'42px' }));  
    }  

    startGame() {  
        console.log("Iniciando el juego...");  
        this.scene.start('Escena1'); // Cambia a la escena 1  
    }  

    exitGame() {  
        console.log("Saliendo del juego...");  
        this.game.destroy(true); // Destruir el juego  
    }  
}  
export default MenuStart;