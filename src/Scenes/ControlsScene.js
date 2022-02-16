var musicEnabled = false;
const gameState = {}; 

export default class ControlsScene extends Phaser.Scene {
	constructor() {
		super({ key: 'ControlsScene' })
	}

	preload ()
    {

    } 

    init (data)
	{
    musicEnabled = data.musicEnabled;
	}

	create() {
		gameState.wasd = this.input.keyboard.addKeys('Q');
		this.add.text( 100, 70, 'Navigation:', {fill: '#ffffff', fontSize: '35px'});
		this.add.text( 130, 120, 'Q: Quit to main menu', {fill: '#ffffff', fontSize: '35px'});
		this.add.text( 130, 170, 'R: Retry level', {fill: '#ffffff', fontSize: '35px'});

		this.add.text( 100, 270, 'Left Leg:', {fill: '#ffffff', fontSize: '35px'});
		this.add.text( 130, 320, 'W: Bend knee', {fill: '#ffffff', fontSize: '35px'});
		this.add.text( 130, 370, 'A/D: Move left and right', {fill: '#ffffff', fontSize: '35px'});

		this.add.text( 100, 470, 'Right Leg:', {fill: '#ffffff', fontSize: '35px'});
		this.add.text( 130, 520, 'Up: Bend knee', {fill: '#ffffff', fontSize: '35px'});
		this.add.text( 130, 570, 'Left/Right: Move left and right', {fill: '#ffffff', fontSize: '35px'});
	}

	update() {
		if (gameState.wasd.Q.isDown) {
        this.scene.stop('ControlsScene');
        this.scene.start('StartScene', { musicEnabled: musicEnabled});
    }
	}
}
