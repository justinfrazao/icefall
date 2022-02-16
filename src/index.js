  
import Phaser from "phaser";
import GameScene from './Scenes/GameScene';
import StartScene from './Scenes/StartScene';
import ControlsScene from './Scenes/ControlsScene'
import decomp from 'poly-decomp'
window.decomp = decomp
import pathseg from 'pathseg'

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 702,
    backgroundColor: '#0c9fc7',
    parent: 'icefall-game',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 1.6
            },
            debug: false,
            debugBodyColor: 0xffffff
        }
    },
    scene: [StartScene, GameScene, ControlsScene]
};

if (window.localStorage.getItem('progress1') === null) {
  window.localStorage.setItem('progress1', JSON.stringify([false, false, false, false, false, false, false, false, false, false]));
}

var game = new Phaser.Game(config);