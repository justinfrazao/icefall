var musicEnabled = false;

export default class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

	preload ()
    {
        this.load.spritesheet('levelcompletion', 'src/assets/levelcompletion.png', {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('music', 'src/assets/music.png', {frameWidth: 60, frameHeight: 73});
        this.load.audio('gameAudio', 'src/assets/justins-game.wav');
    } 

    init (data)
	{
    musicEnabled = data.musicEnabled;
	}

	create() {
		let gameAudio = this.sound.add('gameAudio', { loop: true });

		let first = this.add.text( 100, 70, 'Level 1', {fill: '#ffffff', fontSize: '35px'});
		let second = this.add.text( 100, 130, 'Level 2', {fill: '#ffffff', fontSize: '35px'});
		let third = this.add.text( 100, 190, 'Level 3', {fill: '#ffffff', fontSize: '35px'});
		let fourth = this.add.text( 100, 250, 'Level 4', {fill: '#ffffff', fontSize: '35px'});
		let fifth = this.add.text( 100, 310, 'Level 5', {fill: '#ffffff', fontSize: '35px'});
		let sixth = this.add.text( 100, 370, 'Level 6', {fill: '#ffffff', fontSize: '35px'});
		let seventh = this.add.text( 100, 430, 'Level 7', {fill: '#ffffff', fontSize: '35px'});
		let eigth = this.add.text( 100, 490, 'Level 8', {fill: '#ffffff', fontSize: '35px'});
		let ninth = this.add.text( 100, 550, 'Level 9', {fill: '#ffffff', fontSize: '35px'});
		let tenth = this.add.text( 100, 610, 'Level 10', {fill: '#ffffff', fontSize: '35px'});

		this.add.text(450, 175, 'Icefall', {fill: '#ffffff', fontSize: '150px'});
		this.add.text(435, 325, 'By Justin Frazao', {fill: '#ffffff', fontSize: '70px'});

		let controls = this.add.text(450, 568, 'Controls', {fill: '#ffffff', fontSize: '35px'});
		let restart = this.add.text(690, 568, 'Reset Levels', {fill: '#ffffff', fontSize: '35px'});
		let music = this.add.image(1050, 580, 'music');
		if (musicEnabled){
      		music.setFrame(1);
		} else {
      		music.setFrame(0);
      	}
      	this.add.text(930, 660, 'Music By Ashly LaRosa', {fill: '#ffffff', fontSize: '20px'});

      	var firstSignal = this.add.image(300, 87, 'levelcompletion');
		var secondSignal = this.add.image(300, 147, 'levelcompletion');
		var thirdSignal = this.add.image(300, 207, 'levelcompletion');
		var fourthSignal = this.add.image(300, 267, 'levelcompletion');
		var fifthSignal = this.add.image(300, 327, 'levelcompletion');
		var sixthSignal = this.add.image(300, 387, 'levelcompletion');
		var seventhSignal = this.add.image(300, 447, 'levelcompletion');
		var eigthSignal = this.add.image(300, 507, 'levelcompletion');
		var ninthSignal = this.add.image(300, 567, 'levelcompletion');
		var tenthSignal = this.add.image(300, 627, 'levelcompletion');

		var symbols = [
			firstSignal,
			secondSignal,
			thirdSignal,
			fourthSignal,
			fifthSignal,
			sixthSignal,
			seventhSignal,
			eigthSignal,
			ninthSignal,
			tenthSignal
		];
		var current = JSON.parse(window.localStorage.getItem('progress1'));
		symbols.forEach(function (item, index){
			if (current[index] == true) {
				item.setFrame(1);
			}
		});
			

		first.setInteractive();
		second.setInteractive();
		third.setInteractive();
		fourth.setInteractive();
		fifth.setInteractive();
		sixth.setInteractive();
		seventh.setInteractive();
		eigth.setInteractive();
		ninth.setInteractive();
		tenth.setInteractive();
		firstSignal.setInteractive();
		secondSignal.setInteractive();
		thirdSignal.setInteractive();
		fourthSignal.setInteractive();
		fifthSignal.setInteractive();
		sixthSignal.setInteractive();
		seventhSignal.setInteractive();
		eigthSignal.setInteractive();
		ninthSignal.setInteractive();
		tenthSignal.setInteractive();
		restart.setInteractive();
		music.setInteractive();
		controls.setInteractive();

    	first.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 1, musicEnabled: musicEnabled});
    	});
    	second.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 2, musicEnabled: musicEnabled});
    	});
    	third.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 3, musicEnabled: musicEnabled});
    	});
    	fourth.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 4, musicEnabled: musicEnabled});
    	});
    	fifth.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 5, musicEnabled: musicEnabled});
    	});
    	sixth.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 6, musicEnabled: musicEnabled});
    	});
    	seventh.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 7, musicEnabled: musicEnabled});
    	});
    	eigth.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 8, musicEnabled: musicEnabled});
    	});
    	ninth.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 9, musicEnabled: musicEnabled});
    	});
    	tenth.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 10, musicEnabled: musicEnabled});
    	});
		firstSignal.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 1, musicEnabled: musicEnabled});
    	});
    	secondSignal.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 2, musicEnabled: musicEnabled});
    	});
    	thirdSignal.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 3, musicEnabled: musicEnabled});
    	});
    	fourthSignal.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 4, musicEnabled: musicEnabled});
    	});
    	fifthSignal.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 5, musicEnabled: musicEnabled});
    	});
    	sixthSignal.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 6, musicEnabled: musicEnabled});
    	});
    	seventhSignal.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 7, musicEnabled: musicEnabled});
    	});
    	eigthSignal.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 8, musicEnabled: musicEnabled});
    	});
    	ninthSignal.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 9, musicEnabled: musicEnabled});
    	});
    	tenthSignal.on('pointerup', function() {
      		this.scene.scene.stop('StartScene');
			this.scene.scene.start('GameScene', { level: 10, musicEnabled: musicEnabled});
    	});
    	restart.on('pointerup', function() {
      		window.localStorage.setItem('progress1', JSON.stringify([false, false, false, false, false, false, false, false, false, false]));
      		this.scene.scene.stop('StartScene');
      		this.scene.scene.start('StartScene', { musicEnabled: musicEnabled});
    	});
    	music.on('pointerup', function() {
      		if (musicEnabled){
      			music.setFrame(0);
      			musicEnabled = false;
      			this.scene.sound.stopAll();
      		} else {
      			music.setFrame(1);
      			musicEnabled = true;
      			gameAudio.play();
      		}
    	});
    	controls.on('pointerup', function() {
    		this.scene.scene.stop('StartScene');
      		this.scene.scene.start('ControlsScene', { musicEnabled: musicEnabled});
    	});
	}
}
