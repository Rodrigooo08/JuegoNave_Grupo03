class MenuStart extends Phaser.Scene {  
    constructor() {  
        super("MenuStart"); // Nombre clave de la escena
    }  

    preload() {  
        this.load.image('Inicio','public/resource/image/Espacio.jpg');
        // Puedes cargar imágenes o sonidos aquí  
    }  

    create() {  
        // Título del juego  
        this.add.text(400, 100, 'Esquivando Meteoros', {  
            fontSize: '64px',  
            fill: '#ffffff'  
        }).setOrigin(0.5);  

        // Botones del menú  
        const playButton = this.add.text(400, 250, 'Jugar', {  
            fontSize: '32px',  
            fill: '#ffffff'  
        }).setOrigin(0.5).setInteractive();  

        const exitButton = this.add.text(400, 350, 'Salir', {  
            fontSize: '32px',  
            fill: '#ffffff'  
        }).setOrigin(0.5).setInteractive();  

        // Eventos para los botones  
        playButton.on('pointerdown', () => this.startGame());  
        exitButton.on('pointerdown', () => this.exitGame());  

        // Cambiar color al pasar el mouse  
        playButton.on('pointerover', () => playButton.setStyle({ fill: '#ff0' }));  
        playButton.on('pointerout', () => playButton.setStyle({ fill: '#ffffff' }));  
        
        exitButton.on('pointerover', () => exitButton.setStyle({ fill: '#ff0' }));  
        exitButton.on('pointerout', () => exitButton.setStyle({ fill: '#ffffff' }));  
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