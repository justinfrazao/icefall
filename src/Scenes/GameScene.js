import decomp from 'poly-decomp'
window.decomp = decomp
import pathseg from 'pathseg'

const gameState = {}; 

var bodyAngle = 0;

var rightHipAngle = 0;
var rightHipClockLimit = 0;
var rightHipClockEnd = 0;
var rightHipCounterLimit = 0;
var rightHipCounterEnd = 0;

var leftHipAngle = 0;
var leftHipClockLimit = 0;
var leftHipClockEnd = 0;
var leftHipCounterLimit = 0;
var leftHipCounterEnd = 0;

var rightKneeAngle = 0;
var rightKneeClockLimit = 0;
var rightKneeClockEnd = 0;
var rightKneeCounterLimit = 0;
var rightKneeCounterEnd = 0;

var leftKneeAngle = 0;
var leftKneeClockLimit = 0;
var leftKneeClockEnd = 0;
var leftKneeCounterLimit = 0;
var leftKneeCounterEnd = 0;

var bentKneeAngle = 0;

var previousBodyAngle = 6;
var leftBodyThreshold = 0;
var rightBodyThreshold = 0;

var rightKneeFullForce = 0;
var rightKneeHalfForce = 0;
var leftKneeFullForce = 0;
var leftKneeHalfForce = 0;
var fullForce = 0;
var halfForce = 0;

var level = 0;

var demo;
var sceneCount = 0;
var handle = '';
var musicEnabled;


export default class GameScene extends Phaser.Scene {
    
    constructor(){
		super({ key: 'GameScene' });

        this.completed = 0;
        this.audioOn = 0;
	}

    preload ()
    {
        this.load.image('win', 'src/assets/win.png');
        this.load.image('window', 'src/assets/window.png');
    }   

init (data)
{
    level = data.level;
    musicEnabled = data.musicEnabled;
}

create ()
{
 bodyAngle = 0;

 rightHipAngle = 0;
 rightHipClockLimit = 0;
 rightHipClockEnd = 0;
 rightHipCounterLimit = 0;
 rightHipCounterEnd = 0;

 leftHipAngle = 0;
 leftHipClockLimit = 0;
 leftHipClockEnd = 0;
 leftHipCounterLimit = 0;
 leftHipCounterEnd = 0;

 rightKneeAngle = 0;
 rightKneeClockLimit = 0;
 rightKneeClockEnd = 0;
 rightKneeCounterLimit = 0;
 rightKneeCounterEnd = 0;

 leftKneeAngle = 0;
 leftKneeClockLimit = 0;
 leftKneeClockEnd = 0;
 leftKneeCounterLimit = 0;
 leftKneeCounterEnd = 0;

 bentKneeAngle = 0;

 previousBodyAngle = 6;
 leftBodyThreshold = 0;
 rightBodyThreshold = 0;

 rightKneeFullForce = 0;
 rightKneeHalfForce = 0;
 leftKneeFullForce = 0;
 leftKneeHalfForce = 0;
 fullForce = 0;
 halfForce = 0;
    
    var defaultCategory = 0x0001,
        redCategory = 0x0002;
    

    gameState.leftLeg = this.matter.add.rectangle(390, 210, 40, 80, { collisionFilter: {category: redCategory, mask: defaultCategory}, frictionAir: 0, friction: 0 });
    gameState.rightLeg = this.matter.add.rectangle(410, 210, 40, 80, { collisionFilter: {category: redCategory, mask: defaultCategory}, frictionAir: 0, friction: 0});

    gameState.leftHip = this.matter.add.circle(390, 150, 30, { collisionFilter: {category: redCategory, mask: defaultCategory}, frictionAir: 0, friction: 0, mass: 0, restitution: 0.15 });
    gameState.rightHip = this.matter.add.circle(410, 150, 30, { collisionFilter: {category: redCategory, mask: defaultCategory}, frictionAir: 0, friction: 0, mass: 0, restitution: 0.15 });

    gameState.leftShin = this.matter.add.rectangle(385, 320, 40, 100, { collisionFilter: {category: redCategory, mask: defaultCategory}, frictionAir: 0, friction: 0, chamfer: 2 });
    gameState.rightShin = this.matter.add.rectangle(415, 320, 40, 100, { collisionFilter: {category: redCategory, mask: defaultCategory}, frictionAir: 0, friction: 0, chamfer: 2 });

    gameState.leftKnee = this.matter.add.circle(390, 250, 30, { collisionFilter: {category: redCategory, mask: defaultCategory}, frictionAir: 0, friction: 0, mass: 0 });
    gameState.rightKnee = this.matter.add.circle(410, 250, 30, { collisionFilter: {category: redCategory, mask: defaultCategory}, frictionAir: 0, friction: 0, mass: 0 });

    gameState.leftFoot = this.matter.add.rectangle(385, 360, 42, 42, { collisionFilter: {category: redCategory, mask: defaultCategory}, frictionAir: 0, friction: 0, chamfer: 2 });
    gameState.rightFoot = this.matter.add.rectangle(415, 360, 42, 42, { collisionFilter: {category: redCategory, mask: defaultCategory}, frictionAir: 0, friction: 0, chamfer: 2 });

    gameState.leftLegGameObject = this.matter.add.gameObject(this.add.rectangle(390, 210, 40, 80, 0x0027b3), gameState.leftLeg, true);
    gameState.leftLegGameObject.setDepth(2);
    gameState.rightLegGameObject = this.matter.add.gameObject(this.add.rectangle(410, 210, 40, 80, 0xb30000), gameState.rightLeg, true);
    gameState.rightLegGameObject.setDepth(4);
    
    gameState.leftLegShadow = this.add.rectangle(390, 210, 40, 80, 0x000000);
    gameState.leftLegShadow.setAlpha(0.5);
    gameState.leftLegShadow.setDepth(1);
    gameState.rightLegShadow = this.add.rectangle(410, 210, 40, 80, 0x000000);
    gameState.rightLegShadow.setAlpha(0.5);
    gameState.rightLegShadow.setDepth(3);

    gameState.leftHipGameObject = this.matter.add.gameObject(this.add.circle(390, 150, 30, 0x09961c), gameState.leftHip, true);
    gameState.leftHipGameObject.setDepth(2);
    gameState.rightHipGameObject = this.matter.add.gameObject(this.add.circle(410, 150, 30, 0x09961c), gameState.rightHip, true);
    gameState.rightHipGameObject.setDepth(4);

    gameState.rightHipShadow = this.add.circle(410, 150, 30, 0x000000);
    gameState.rightHipShadow.setAlpha(0.5);
    gameState.rightHipShadow.setDepth(3);

    var lS = this.add.graphics();
    lS.fillStyle(0x0027b3, 1);
    lS.fillRoundedRect(-20, -50, 40, 100, 5);
    gameState.leftShinGameObject = this.matter.add.gameObject(lS, gameState.leftShin, true);
    gameState.leftShinGameObject.setDepth(2);
    var rS = this.add.graphics();
    rS.fillStyle(0xb30000, 1);
    rS.fillRoundedRect(-20, -50, 40, 100, 5);
    gameState.rightShinGameObject = this.matter.add.gameObject(rS, gameState.rightShin, true);
    gameState.rightShinGameObject.setDepth(4);

    gameState.leftShinShadow = this.add.graphics();
    gameState.leftShinShadow.fillStyle(0x000000);
    gameState.leftShinShadow.fillRoundedRect(-20, -50, 40, 100, 5);
    gameState.leftShinShadow.setAlpha(0.5);
    gameState.leftShinShadow.setDepth(1);
    gameState.rightShinShadow = this.add.graphics();
    gameState.rightShinShadow.fillStyle(0x000000);
    gameState.rightShinShadow.fillRoundedRect(-20, -50, 40, 100, 5);
    gameState.rightShinShadow.setAlpha(0.5);
    gameState.rightShinShadow.setDepth(3);

    gameState.leftKneeGameObject = this.matter.add.gameObject(this.add.circle(390, 250, 30, 0x09961c), gameState.leftKnee, true);
    gameState.leftKneeGameObject.setDepth(2);
    gameState.rightKneeGameObject = this.matter.add.gameObject(this.add.circle(410, 250, 30, 0x09961c), gameState.rightKnee, true);
    gameState.rightKneeGameObject.setDepth(4);

    gameState.leftKneeShadow = this.add.circle(390, 250, 30, 0x000000);
    gameState.leftKneeShadow.setAlpha(0.5);
    gameState.leftKneeShadow.setDepth(1);
    gameState.rightKneeShadow = this.add.circle(410, 250, 30, 0x000000);
    gameState.rightKneeShadow.setAlpha(0.5);
    gameState.rightKneeShadow.setDepth(3);

    var lF = this.add.graphics();
    lF.fillStyle(0x09961c, 1);
    lF.fillRoundedRect(-20, -20, 40, 40, 5);
    gameState.leftFootGameObject = this.matter.add.gameObject(lF, gameState.leftFoot, true);
    gameState.leftFootGameObject.setDepth(2);
    var rF = this.add.graphics();
    rF.fillStyle(0x09961c, 1);
    rF.fillRoundedRect(-20, -20, 40, 40, 5);
    gameState.rightFootGameObject = this.matter.add.gameObject(rF, gameState.rightFoot, true);
    gameState.rightFootGameObject.setDepth(4);

    this.matter.add.constraint(gameState.leftHip, gameState.rightHip, 0, 1);

    this.matter.add.constraint(gameState.leftHip, gameState.leftLeg, 0, 1, { pointA: { x: -20, y: 20 }, pointB: { x: -20, y: -40 } });
    this.matter.add.constraint(gameState.leftHip, gameState.leftLeg, 0, 1, { pointA: { x: 20, y: 20 }, pointB: { x: 20, y: -40 } });

    this.matter.add.constraint(gameState.rightHip, gameState.rightLeg, 0, 1, { pointA: { x: -20, y: 20 }, pointB: { x: -20, y: -40 } });
    this.matter.add.constraint(gameState.rightHip, gameState.rightLeg, 0, 1, { pointA: { x: 20, y: 20 }, pointB: { x: 20, y: -40 } });

    this.matter.add.constraint(gameState.leftLeg, gameState.leftKnee, 0, 1, { pointA: { x: 0, y: 40 } });
    this.matter.add.constraint(gameState.rightLeg, gameState.rightKnee, 0, 1, { pointA: { x: 0, y: 40 } });

    this.matter.add.constraint(gameState.leftKnee, gameState.leftShin, 0, 1, { pointA: { x: -20, y: 20 }, pointB: { x: -20, y: -50 } });
    this.matter.add.constraint(gameState.leftKnee, gameState.leftShin, 0, 1, { pointA: { x: 20, y: 20 }, pointB: { x: 20, y: -50 } });

    this.matter.add.constraint(gameState.rightKnee, gameState.rightShin, 0, 1, { pointA: { x: -20, y: 20 }, pointB: { x: -20, y: -50 } });
    this.matter.add.constraint(gameState.rightKnee, gameState.rightShin, 0, 1, { pointA: { x: 20, y: 20 }, pointB: { x: 20, y: -50 } });


    this.matter.add.constraint(gameState.leftShin, gameState.leftFoot, 0, 1, { pointA: { x: 0, y: 40 } });
    this.matter.add.constraint(gameState.rightShin, gameState.rightFoot, 0, 1, { pointA: { x: 0, y: 40 } });

    this.matter.add.constraint(gameState.leftShin, gameState.leftFoot, 45.177428, 0.1, { pointB: { x: -21, y: 0 } });
    this.matter.add.constraint(gameState.leftShin, gameState.leftFoot, 45.177428, 0.1, { pointB: { x: 21, y: 0 } });
    this.matter.add.constraint(gameState.rightShin, gameState.rightFoot, 45.177428, 0.1, { pointB: { x: -21, y: 0 } });
    this.matter.add.constraint(gameState.rightShin, gameState.rightFoot, 45.177428, 0.1, { pointB: { x: 21, y: 0 } });


    if (level == 1) {
    gameState.ground = this.matter.add.rectangle(1000, 600, 2000, 100);

    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground, 0.15);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground, true);
    this.matter.add.gameObject(this.add.rectangle(1000, 600, 2000, 100, 0xA5F2F3), gameState.ground, true);

    gameState.ground2 = this.matter.add.rectangle(4490, 750, 5000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground2, true);
    this.matter.add.gameObject(this.add.rectangle(4490, 750, 5000, 100, 0xA5F2F3), gameState.ground2, true);

    gameState.ground3 = this.matter.add.rectangle(2000, 700, 50, 50);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground3, true);
    this.matter.add.gameObject(this.add.rectangle(2000, 700, 50, 50, 0xA5F2F3), gameState.ground3, true);

    gameState.ground4 = this.matter.add.rectangle(3000, 500, 50, 50);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(3000, 500, 50, 50, 0xA5F2F3), gameState.ground4, true);

    gameState.ground5 = this.matter.add.rectangle(3500, 660, 50, 80);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground5, true);
    this.matter.add.gameObject(this.add.rectangle(3500, 660, 50, 80, 0xA5F2F3), gameState.ground5, true);

    gameState.ground6 = this.matter.add.rectangle(4450, 500, 50, 50);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground6, true);
    this.matter.add.gameObject(this.add.rectangle(4450, 500, 50, 50, 0xA5F2F3), gameState.ground6, true);

    gameState.ground7 = this.matter.add.rectangle(4700, 700, 50, 50);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground7, true);
    this.matter.add.gameObject(this.add.rectangle(4700, 700, 50, 50, 0xA5F2F3), gameState.ground7, true);

    gameState.ground8 = this.matter.add.rectangle(4900, 700, 50, 50);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground8, true);
    this.matter.add.gameObject(this.add.rectangle(4900, 700, 50, 50, 0xA5F2F3), gameState.ground8, true);

    gameState.ground9 = this.matter.add.rectangle(5400, 700, 50, 50);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground9, true);
    this.matter.add.gameObject(this.add.rectangle(5400, 700, 50, 50, 0xA5F2F3), gameState.ground9, true);

    

    gameState.win = this.matter.add.rectangle(7000, 600, 200, 200, {collisionFilter: 0});
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.win, true);
    this.matter.add.gameObject(this.add.image(7000, 600, 'win'), gameState.win, true);

    } else if (level == 2) {
    gameState.ground = this.matter.add.rectangle(2000, 600, 4000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground, true);
    this.matter.add.gameObject(this.add.rectangle(2000, 600, 4000, 100, 0xA5F2F3), gameState.ground, true);

    gameState.ground2 = this.matter.add.rectangle(200, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground2, true);
    this.matter.add.gameObject(this.add.rectangle(200, 540, 50, 100, 0xA5F2F3), gameState.ground2, true);

    gameState.ground3 = this.matter.add.rectangle(400, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground3, true);
    this.matter.add.gameObject(this.add.rectangle(400, 540, 50, 100, 0xA5F2F3), gameState.ground3, true);

    gameState.ground4 = this.matter.add.rectangle(600, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(600, 540, 50, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground5 = this.matter.add.rectangle(800, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground5, true);
    this.matter.add.gameObject(this.add.rectangle(800, 540, 50, 100, 0xA5F2F3), gameState.ground5, true);

    gameState.ground6 = this.matter.add.rectangle(1000, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground6, true);
    this.matter.add.gameObject(this.add.rectangle(1000, 540, 50, 100, 0xA5F2F3), gameState.ground6, true);

    gameState.ground7 = this.matter.add.rectangle(1200, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground7, true);
    this.matter.add.gameObject(this.add.rectangle(1200, 540, 50, 100, 0xA5F2F3), gameState.ground7, true);

    gameState.ground8 = this.matter.add.rectangle(1400, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground8, true);
    this.matter.add.gameObject(this.add.rectangle(1400, 540, 50, 100, 0xA5F2F3), gameState.ground8, true);

    gameState.ground9 = this.matter.add.rectangle(1600, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground9, true);
    this.matter.add.gameObject(this.add.rectangle(1600, 540, 50, 100, 0xA5F2F3), gameState.ground9, true);

    gameState.ground10 = this.matter.add.rectangle(1800, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground10, true);
    this.matter.add.gameObject(this.add.rectangle(1800, 540, 50, 100, 0xA5F2F3), gameState.ground10, true);

    gameState.ground11 = this.matter.add.rectangle(2000, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground11, true);
    this.matter.add.gameObject(this.add.rectangle(2000, 540, 50, 100, 0xA5F2F3), gameState.ground11, true);

    gameState.ground12 = this.matter.add.rectangle(2200, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground12, true);
    this.matter.add.gameObject(this.add.rectangle(2200, 540, 50, 100, 0xA5F2F3), gameState.ground12, true);

    gameState.ground13 = this.matter.add.rectangle(2400, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground13, true);
    this.matter.add.gameObject(this.add.rectangle(2400, 540, 50, 100, 0xA5F2F3), gameState.ground13, true);

    gameState.ground14 = this.matter.add.rectangle(2600, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground14, true);
    this.matter.add.gameObject(this.add.rectangle(2600, 540, 50, 100, 0xA5F2F3), gameState.ground14, true);

    gameState.ground15 = this.matter.add.rectangle(2800, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground15, true);
    this.matter.add.gameObject(this.add.rectangle(2800, 540, 50, 100, 0xA5F2F3), gameState.ground15, true);

    gameState.ground16 = this.matter.add.rectangle(3000, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground16, true);
    this.matter.add.gameObject(this.add.rectangle(3000, 540, 50, 100, 0xA5F2F3), gameState.ground16, true);

    gameState.ground17 = this.matter.add.rectangle(3200, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground17, true);
    this.matter.add.gameObject(this.add.rectangle(3200, 540, 50, 100, 0xA5F2F3), gameState.ground17, true);

    gameState.ground18 = this.matter.add.rectangle(3400, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground18, true);
    this.matter.add.gameObject(this.add.rectangle(3400, 540, 50, 100, 0xA5F2F3), gameState.ground18, true);

    gameState.ground19 = this.matter.add.rectangle(3600, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground19, true);
    this.matter.add.gameObject(this.add.rectangle(3600, 540, 50, 100, 0xA5F2F3), gameState.ground19, true);

    gameState.ground20 = this.matter.add.rectangle(3800, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground20, true);
    this.matter.add.gameObject(this.add.rectangle(3800, 540, 50, 100, 0xA5F2F3), gameState.ground20, true);

    gameState.ground21 = this.matter.add.rectangle(4000, 540, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground21, true);
    this.matter.add.gameObject(this.add.rectangle(4000, 540, 50, 100, 0xA5F2F3), gameState.ground21, true);

    gameState.win = this.matter.add.rectangle(4400, 700, 200, 200, {collisionFilter: 0});
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.win, true);
    this.matter.add.gameObject(this.add.image(4000, 540, 'win'), gameState.win, true);
    
    } else if (level == 3) {
    var chamferedPolygon = [{x: 404.0012596830011, y: 114.50636513906313}
,{x: 405.28026853890293, y: 112.77785179646732}
,{x: 407.38709567782723, y: 113.20785346588184}
,{x: 572.0906877424846, y: 361.2652444117526}
,{x: 572.0948898840769, y: 361.27151344491705}
,{x: 572.0990683392718, y: 361.2777982904174}
,{x: 741.648627572761, y: 608.7644703523911}
,{x: 741.6543286310706, y: 608.7728373851974}
,{x: 741.6599872596669, y: 608.7812331714167}
,{x: 913.9352787571459, y: 854.3761878502147}
,{x: 913.9432704890326, y: 854.3876660297823}
,{x: 913.9511817574058, y: 854.3991998156941}
,{x: 1089.9567321945515, y: 1097.3309275241556}
,{x: 1089.9682813176537, y: 1097.3470357106182}
,{x: 1089.9796702386675, y: 1097.3632575598867}
,{x: 1271.2007068446385, y: 1336.423183754724}
,{x: 1271.218316525399, y: 1336.4467726969206}
,{x: 1271.2355771138639, y: 1336.4706182654038}
,{x: 1460.0432143957908, y: 1569.5708404264035}
,{x: 1460.0715757819478, y: 1569.606686031976}
,{x: 1460.0991105886144, y: 1569.6431704133665}
,{x: 1660.290295135372, y: 1793.004381833731}
,{x: 1660.3385856667003, y: 1793.0603105498337}
,{x: 1660.3847772558731, y: 1793.117984927078}
,{x: 1877.8814310893113, y: 1999.5384037225163}
,{x: 1877.9643258054589, y: 1999.6218607946516}
,{x: 1878.0421707794512, y: 1999.7100468302738}
,{x: 2120.0362952369937, y: 2176.3919321113394}
,{x: 2120.1573262322986, y: 2176.4877129863858}
,{x: 2120.2706106602095, y: 2176.592541972081}
,{x: 2388.3259039535574, y: 2310.0344155072194}
,{x: 2388.4365227580724, y: 2310.093936631481}
,{x: 2388.5431868292767, y: 2310.1602846537553}
,{x: 2672.507993516556, y: 2405.775409780498}
,{x: 2672.551922854717, y: 2405.790783159361}
,{x: 2672.5954825711237, y: 2405.807174578929}
,{x: 2961.2587629253844, y: 2486.983306986585}
,{x: 2961.2681544725615, y: 2486.985973062797}
,{x: 2961.27753289392, y: 2486.9886849502523}
,{x: 3249.1217148832775, y: 2571.2653361361668}
,{x: 3249.1519066289843, y: 2571.274434906141}
,{x: 3249.1819511708945, y: 2571.284008548355}
,{x: 3533.9112552437173, y: 2665.409481666839}
,{x: 3533.944842128117, y: 2665.420916251244}
,{x: 3533.978220886105, y: 2665.432944843822}
,{x: 3814.8450653825275, y: 2770.5191644745496}
,{x: 3814.876136822206, y: 2770.531085467117}
,{x: 3814.9070056030596, y: 2770.543521816906}
,{x: 4091.7807821549623, y: 2885.772930886689}
,{x: 4091.8078357610366, y: 2885.7844240112236}
,{x: 4091.8347175371987, y: 2885.7963134865513}
,{x: 4364.879846702052, y: 3009.860231800587}
,{x: 4364.903001059622, y: 3009.870931125041}
,{x: 4364.926017083862, y: 3009.8819248708273}
,{x: 4634.420809915203, y: 3141.5097462803183}
,{x: 4634.440596487325, y: 3141.5195461671406}
,{x: 4634.460273662286, y: 3141.5295639015935}
,{x: 4900.712437384026, y: 3279.6234584365584}
,{x: 4900.72944087632, y: 3279.6323812810665}
,{x: 4900.746357915428, y: 3279.6414669671794}
,{x: 5164.052674392162, y: 3423.2940437206025}
,{x: 5164.067394475683, y: 3423.302155029868}
,{x: 5164.082045876789, y: 3423.310389751629}
,{x: 5424.712680423107, y: 3571.7755526614715}
,{x: 5424.725536149162, y: 3571.7829390206502}
,{x: 5424.73833676505, y: 3571.7904204795464}
,{x: 5682.936616701268, y: 3724.460445838116}
,{x: 5682.947453456821, y: 3724.4668997050044}
,{x: 5682.958249295778, y: 3724.473421785189}
,{x: 5917.0073024160565, y: 3867.252191759207}
,{x: 5917.011036114259, y: 3867.2544750643533}
,{x: 5917.0147648070515, y: 3867.2567665343427}
,{x: 5938.999538515351, y: 3880.8128424568768}
,{x: 5939.011664266475, y: 3880.8203792597747}
,{x: 5939.02373590692, y: 3880.828002430718}
,{x: 6196.800257101579, y: 4034.279843034035}
,{x: 6196.823694496969, y: 4034.2940134457194}
,{x: 6196.846935648475, y: 4034.308503474936}
,{x: 6459.070280489604, y: 4179.963217944404}
,{x: 6459.095293506227, y: 4179.977348071744}
,{x: 6459.120100980833, y: 4179.991836022009}
,{x: 6725.781289050052, y: 4317.345793051946}
,{x: 6725.807940415266, y: 4317.35977598985}
,{x: 6725.83437834788, y: 4317.374158393655}
,{x: 6996.86406300946, y: 4445.887684016507}
,{x: 6996.892455123203, y: 4445.901422362764}
,{x: 6996.920627050206, y: 4445.915606748884}
,{x: 7272.2136739988455, y: 4565.015510318666}
,{x: 7272.243885178101, y: 4565.028878390008}
,{x: 7272.273871425057, y: 4565.042743658732}
,{x: 7551.681772953917, y: 4674.131480592427}
,{x: 7551.713895334976, y: 4674.144344008133}
,{x: 7551.745790365306, y: 4674.1577612309775}
,{x: 7835.073087605563, y: 4772.608959570288}
,{x: 7835.107188848642, y: 4772.621156972678}
,{x: 7835.141063632883, y: 4772.633969872318}
,{x: 8122.137753196501, y: 4859.801307900193}
,{x: 8122.17395232928, y: 4859.812679311748}
,{x: 8122.209929223485, y: 4859.824735401413}
,{x: 8412.567525975579, y: 4935.024189683584}
,{x: 8412.605789013292, y: 4935.034505835404}
,{x: 8412.643840138564, y: 4935.045578093939}
,{x: 8705.981017716349, y: 4997.608539927728}
,{x: 8706.021623891073, y: 4997.617644072274}
,{x: 8706.062031854965, y: 4997.6275910983495}
,{x: 9001.934476674638, y: 5046.795216595765}
,{x: 9001.977297147178, y: 5046.802812867338}
,{x: 9002.019942328943, y: 5046.811338398552}
,{x: 9299.889364104425, y: 5081.8726044241685}
,{x: 9299.934691237513, y: 5081.8784668542285}
,{x: 9299.979872573545, y: 5081.885363516786}
,{x: 9599.22280055585, y: 5102.037124702828}
,{x: 9599.270874831367, y: 5102.040946384707}
,{x: 9599.318842985444, y: 5102.045926084848}
,{x: 9899.201979729845, y: 5106.412368828186}
,{x: 9899.25329884297, y: 5106.413776801275}
,{x: 9899.304564910215, y: 5106.416501523188}
,{x: 10198.954975624041, y: 5093.9668995219645}
,{x: 10199.010495645149, y: 5093.965366869093}
,{x: 10199.06603681615, y: 5093.965376482092}
,{x: 10497.399984991673, y: 5063.369277199169}
,{x: 10497.462198738423, y: 5063.363879701958}
,{x: 10497.52455066785, y: 5063.360427143803}
,{x: 10793.069412712322, y: 5012.498319878724}
,{x: 10793.147253514195, y: 5012.4865010825315}
,{x: 10793.225499174492, y: 5012.477755167812}
,{x: 11083.188424241624, y: 4936.439310869964}
,{x: 11083.259847123312, y: 4936.421984083324}
,{x: 11083.331858386167, y: 4936.407293147809}
,{x: 11133.009998566436, y: 4918.5842361959985}
,{x: 11133.970532204417, y: 4918.494576178977}
,{x: 11134.861295396335, y: 4918.864987739637}
,{x: 13158.576700119673, y: 6718.978677520376}
,{x: 13159.146206520265, y: 6721.097853523183}
,{x: 13157.428909535462, y: 6722.463919237994}
,{x: 59.95030149689869, y: 5101.2600933503045}
,{x: 58.73682660940526, y: 5100.64319756688}
,{x: 58.19925603507234, y: 5099.392557895434}];

    gameState.chamferPolygon = this.matter.add.fromVertices(5500, 4500, chamferedPolygon, { isStatic: true, friction: 0 }, true);

    gameState.chamferPolygonGameObject = this.matter.add.gameObject(this.add.polygon(5500, 4500, chamferedPolygon, 0xA5F2F3), gameState.chamferPolygon, true);

    gameState.ground = this.matter.add.rectangle(9580, 5520, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground, true);
    this.matter.add.gameObject(this.add.rectangle(9580, 5520, 1000, 100, 0xA5F2F3), gameState.ground, true);

    gameState.ground1 = this.matter.add.rectangle(8520, 5413, 1200, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground1, 0.18);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground1, true);
    this.matter.add.gameObject(this.add.rectangle(8520, 5413, 1200, 100, 0xA5F2F3), gameState.ground1, true);

    gameState.ground2 = this.matter.add.rectangle(15350, 4150, 100, 1000);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground2, true);
    this.matter.add.gameObject(this.add.rectangle(15350, 4150, 100, 1000, 0xA5F2F3), gameState.ground2, true);

    gameState.ground3 = this.matter.add.rectangle(15350, 5890, 100, 1920);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground3, true);
    this.matter.add.gameObject(this.add.rectangle(15350, 5890, 100, 1920, 0xA5F2F3), gameState.ground3, true);

    gameState.ground4 = this.matter.add.rectangle(15750, 5430, 100, 3000);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(15750, 5430, 100, 3000, 0xA5F2F3), gameState.ground4, true);

    gameState.ground5 = this.matter.add.rectangle(15560, 6840, 450, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground5, true);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground5, 0.18);
    this.matter.add.gameObject(this.add.rectangle(15560, 6840, 450, 100, 0xA5F2F3), gameState.ground5, true);


    gameState.win = this.matter.add.rectangle(15585, 6660, 200, 200, {collisionFilter: 0});
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.win, true);
    this.matter.add.gameObject(this.add.image(15585, 6660, 'win'), gameState.win, true);
    } else if (level == 4) {
    gameState.ground = this.matter.add.rectangle(1450, 1310, 3000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground, 0.6);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground, true);
    this.matter.add.gameObject(this.add.rectangle(1450, 1310, 3000, 100, 0xA5F2F3), gameState.ground, true);

    gameState.ground2 = this.matter.add.rectangle(3608, 2490, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground2, 0.35);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground2, true);
    this.matter.add.gameObject(this.add.rectangle(3608, 2490, 2000, 100, 0xA5F2F3), gameState.ground2, true);

    gameState.ground3 = this.matter.add.rectangle(5200, 2960, 1400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground3, 0.2);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground3, true);
    this.matter.add.gameObject(this.add.rectangle(5200, 2960, 1400, 100, 0xA5F2F3), gameState.ground3, true);

    gameState.ground4 = this.matter.add.rectangle(7800, 3360, 100, 1000);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(7800, 3360, 100, 1000, 0xA5F2F3), gameState.ground4, true);

    gameState.ground4 = this.matter.add.rectangle(9200, 4940, 1600, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground4, 0.2);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(9200, 4940, 1600, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground4 = this.matter.add.rectangle(11800, 5250, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(11800, 5250, 2000, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground4 = this.matter.add.rectangle(13250, 5150, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground4, -0.2);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(13250, 5150, 1000, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground4 = this.matter.add.rectangle(13705, 5000, 50, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(13705, 5000, 50, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground5 = this.matter.add.rectangle(14700, 4800, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground5, true);
    this.matter.add.gameObject(this.add.rectangle(14700, 4800, 1000, 100, 0xA5F2F3), gameState.ground5, true);

    gameState.ground6 = this.matter.add.rectangle(14700, 4600, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground6, true);
    this.matter.add.gameObject(this.add.rectangle(14700, 4600, 1000, 100, 0xA5F2F3), gameState.ground6, true);

    gameState.ground7 = this.matter.add.rectangle(15800, 5000, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground7, 0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground7, true);
    this.matter.add.gameObject(this.add.rectangle(15800, 5000, 1000, 100, 0xA5F2F3), gameState.ground7, true);

    gameState.ground8 = this.matter.add.rectangle(15800, 4800, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground8, 0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground8, true);
    this.matter.add.gameObject(this.add.rectangle(15800, 4800, 1000, 100, 0xA5F2F3), gameState.ground8, true);

    gameState.ground9 = this.matter.add.rectangle(21110, 6355, 10000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground9, 0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground9, true);
    this.matter.add.gameObject(this.add.rectangle(21110, 6355, 10000, 100, 0xA5F2F3), gameState.ground9, true);

    gameState.ground10 = this.matter.add.rectangle(21110, 6155, 10000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground10, 0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground10, true);
    this.matter.add.gameObject(this.add.rectangle(21110, 6155, 10000, 100, 0xA5F2F3), gameState.ground10, true);

    gameState.ground11 = this.matter.add.rectangle(25980, 7500, 300, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground11, 1.81);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground11, true);
    this.matter.add.gameObject(this.add.rectangle(25980, 7000, 300, 100, 0xA5F2F3), gameState.ground11, true);

    gameState.win = this.matter.add.rectangle(15200, 6000, 200, 200, {collisionFilter: 0});
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.win, true);
    this.matter.add.gameObject(this.add.image(15200, 6000, 'win'), gameState.win, true);
    } else if (level == 5) {
    gameState.ground = this.matter.add.rectangle(750, 700, 1400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground, 0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground, true);
    this.matter.add.gameObject(this.add.rectangle(750, 700, 1400, 100, 0xA5F2F3), gameState.ground, true);

    gameState.ground2 = this.matter.add.rectangle(1850, 1300, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground2, 0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground2, true);
    this.matter.add.gameObject(this.add.rectangle(1850, 1300, 1000, 100, 0xA5F2F3), gameState.ground2, true);

    gameState.ground3 = this.matter.add.rectangle(2900, 1500, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground3, true);
    this.matter.add.gameObject(this.add.rectangle(2900, 1500, 1000, 100, 0xA5F2F3), gameState.ground3, true);

    gameState.ground4 = this.matter.add.rectangle(3600, 1500, 1100, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground4, 5.9);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(3600, 1500, 1100, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground5 = this.matter.add.rectangle(4800, 1200, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground5, true);
    this.matter.add.gameObject(this.add.rectangle(4800, 1200, 1000, 100, 0xA5F2F3), gameState.ground5, true);

    gameState.ground6 = this.matter.add.rectangle(6000, 1200, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground6, true);
    this.matter.add.gameObject(this.add.rectangle(6000, 1200, 1000, 100, 0xA5F2F3), gameState.ground6, true);

    gameState.ground7 = this.matter.add.rectangle(6300, 1100, 800, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground7, 6);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground7, true);
    this.matter.add.gameObject(this.add.rectangle(6300, 1100, 800, 100, 0xA5F2F3), gameState.ground7, true);

    gameState.ground8 = this.matter.add.rectangle(6950, 1700, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground8, 1.4);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground8, true);
    this.matter.add.gameObject(this.add.rectangle(6950, 1700, 1000, 100, 0xA5F2F3), gameState.ground8, true);

    gameState.ground9 = this.matter.add.rectangle(7150, 2800, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground9, 1.3);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground9, true);
    this.matter.add.gameObject(this.add.rectangle(7150, 2800, 1000, 100, 0xA5F2F3), gameState.ground9, true);

    gameState.ground10 = this.matter.add.rectangle(7400, 3900, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground10, 1.3);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground10, true);
    this.matter.add.gameObject(this.add.rectangle(7400, 3900, 1000, 100, 0xA5F2F3), gameState.ground10, true);

    gameState.ground11 = this.matter.add.rectangle(7650, 5000, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground11, 1.3);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground11, true);
    this.matter.add.gameObject(this.add.rectangle(7650, 5000, 1000, 100, 0xA5F2F3), gameState.ground11, true);

    gameState.ground12 = this.matter.add.rectangle(7900, 6100, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground12, 1.3);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground12, true);
    this.matter.add.gameObject(this.add.rectangle(7900, 6100, 1000, 100, 0xA5F2F3), gameState.ground12, true);

    gameState.ground13 = this.matter.add.rectangle(8200, 7100, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground13, 1.2);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground13, true);
    this.matter.add.gameObject(this.add.rectangle(8200, 7100, 1000, 100, 0xA5F2F3), gameState.ground13, true);

    gameState.ground14 = this.matter.add.rectangle(8700, 8100, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground14, 1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground14, true);
    this.matter.add.gameObject(this.add.rectangle(8700, 8100, 1000, 100, 0xA5F2F3), gameState.ground14, true);

    gameState.ground15 = this.matter.add.rectangle(9300, 8900, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground15, 0.7);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground15, true);
    this.matter.add.gameObject(this.add.rectangle(9300, 8900, 1000, 100, 0xA5F2F3), gameState.ground15, true);

    gameState.ground16 = this.matter.add.rectangle(10200, 9600, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground16, 0.4);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground16, true);
    this.matter.add.gameObject(this.add.rectangle(10200, 9600, 1000, 100, 0xA5F2F3), gameState.ground16, true);

    gameState.ground17 = this.matter.add.rectangle(11800, 10050, 1800, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground17, true);
    this.matter.add.gameObject(this.add.rectangle(11800, 10050, 1800, 100, 0xA5F2F3), gameState.ground17, true);

    gameState.ground18 = this.matter.add.rectangle(13000, 9950, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground18, 6);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground18, true);
    this.matter.add.gameObject(this.add.rectangle(13000, 9950, 1000, 100, 0xA5F2F3), gameState.ground18, true);

    gameState.ground19 = this.matter.add.rectangle(13900, 9600, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground19, 5.8);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground19, true);
    this.matter.add.gameObject(this.add.rectangle(13900, 9600, 1000, 100, 0xA5F2F3), gameState.ground19, true);

    gameState.ground20 = this.matter.add.rectangle(14700, 9100, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground20, 5.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground20, true);
    this.matter.add.gameObject(this.add.rectangle(14700, 9100, 1000, 100, 0xA5F2F3), gameState.ground20, true);

    gameState.ground21 = this.matter.add.rectangle(15450, 8400, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground21, 5.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground21, true);
    this.matter.add.gameObject(this.add.rectangle(15450, 8400, 1000, 100, 0xA5F2F3), gameState.ground21, true);

    gameState.ground22 = this.matter.add.rectangle(16200, 7700, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground22, 5.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground22, true);
    this.matter.add.gameObject(this.add.rectangle(16200, 7700, 1000, 100, 0xA5F2F3), gameState.ground22, true);

    gameState.ground23 = this.matter.add.rectangle(16950, 7000, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground23, 5.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground23, true);
    this.matter.add.gameObject(this.add.rectangle(16950, 7000, 1000, 100, 0xA5F2F3), gameState.ground23, true);

    gameState.ground24 = this.matter.add.rectangle(17700, 6300, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground24, 5.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground24, true);
    this.matter.add.gameObject(this.add.rectangle(17700, 6300, 1000, 100, 0xA5F2F3), gameState.ground24, true);

    gameState.ground25 = this.matter.add.rectangle(19450, 5450, 1500, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground25, true);
    this.matter.add.gameObject(this.add.rectangle(19450, 5450, 1500, 100, 0xA5F2F3), gameState.ground25, true);

    gameState.win = this.matter.add.rectangle(19450, 5300, 200, 200, {collisionFilter: 0});
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.win, true);
    this.matter.add.gameObject(this.add.image(19450, 5300, 'win'), gameState.win, true);

    } else if (level == 6) {
    gameState.ground = this.matter.add.rectangle(700, 1000, 1500, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground, 0.75);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground, true);
    this.matter.add.gameObject(this.add.rectangle(700, 1000, 1500, 100, 0xA5F2F3), gameState.ground, true);

    gameState.ground2 = this.matter.add.rectangle(2100, 1970, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground2, 0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground2, true);
    this.matter.add.gameObject(this.add.rectangle(2100, 1970, 2000, 100, 0xA5F2F3), gameState.ground2, true);

    gameState.ground3 = this.matter.add.rectangle(3910, 2680, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground3, 0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground3, true);
    this.matter.add.gameObject(this.add.rectangle(3910, 2680, 2000, 100, 0xA5F2F3), gameState.ground3, true);

    gameState.ground4 = this.matter.add.rectangle(5840, 2920, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(5840, 2920, 2000, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground5 = this.matter.add.rectangle(6940, 2820, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground5, -0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground5, true);
    this.matter.add.gameObject(this.add.rectangle(6940, 2820, 1000, 100, 0xA5F2F3), gameState.ground5, true);

    gameState.ground6 = this.matter.add.rectangle(7300, 2650, 700, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground6, -0.55);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground6, true);
    this.matter.add.gameObject(this.add.rectangle(7300, 2650, 700, 100, 0xA5F2F3), gameState.ground6, true);

    gameState.ground7 = this.matter.add.rectangle(10300, 2500, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground7, 0.6);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground7, true);
    this.matter.add.gameObject(this.add.rectangle(10300, 2500, 1000, 100, 0xA5F2F3), gameState.ground7, true);

    gameState.ground8 = this.matter.add.rectangle(11170, 2975, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground8, 0.4);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground8, true);
    this.matter.add.gameObject(this.add.rectangle(11170, 2975, 1000, 100, 0xA5F2F3), gameState.ground8, true);

    gameState.ground9 = this.matter.add.rectangle(12030, 3170, 800, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground9, true);
    this.matter.add.gameObject(this.add.rectangle(12030, 3170, 800, 100, 0xA5F2F3), gameState.ground9, true);

    gameState.ground10 = this.matter.add.rectangle(12800, 3072, 800, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground10, -0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground10, true);
    this.matter.add.gameObject(this.add.rectangle(12800, 3072, 800, 100, 0xA5F2F3), gameState.ground10, true);

    gameState.ground11 = this.matter.add.rectangle(13450, 2800, 700, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground11, -0.55);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground11, true);
    this.matter.add.gameObject(this.add.rectangle(13450, 2800, 700, 100, 0xA5F2F3), gameState.ground11, true);

    gameState.ground12 = this.matter.add.rectangle(13900, 2400, 700, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground12, -0.90);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground12, true);
    this.matter.add.gameObject(this.add.rectangle(13900, 2400, 700, 100, 0xA5F2F3), gameState.ground12, true);

    gameState.ground13 = this.matter.add.rectangle(14160, 2060, 200, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground13, -1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground13, true);
    this.matter.add.gameObject(this.add.rectangle(14160, 2060, 200, 100, 0xA5F2F3), gameState.ground13, true);

    gameState.ground14 = this.matter.add.rectangle(14810, 3350, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground14, 1.05);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground14, true);
    this.matter.add.gameObject(this.add.rectangle(14810, 3350, 1000, 100, 0xA5F2F3), gameState.ground14, true);

    gameState.ground15 = this.matter.add.rectangle(15380, 4060, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground15, 0.75);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground15, true);
    this.matter.add.gameObject(this.add.rectangle(15380, 4060, 1000, 100, 0xA5F2F3), gameState.ground15, true);

    gameState.ground16 = this.matter.add.rectangle(15960, 4515, 500, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground16, 0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground16, true);
    this.matter.add.gameObject(this.add.rectangle(15960, 4515, 500, 100, 0xA5F2F3), gameState.ground16, true);

    gameState.ground17 = this.matter.add.rectangle(10800, 3303, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground17, 0.50);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground17, true);
    this.matter.add.gameObject(this.add.rectangle(10800, 3303, 1000, 100, 0xA5F2F3), gameState.ground17, true);

    gameState.ground18 = this.matter.add.rectangle(11702, 3685, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground18, 0.30);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground18, true);
    this.matter.add.gameObject(this.add.rectangle(11702, 3685, 1000, 100, 0xA5F2F3), gameState.ground18, true);

    gameState.ground19 = this.matter.add.rectangle(12670, 3830, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground19, true);
    this.matter.add.gameObject(this.add.rectangle(12670, 3830, 1000, 100, 0xA5F2F3), gameState.ground19, true);

    gameState.ground20 = this.matter.add.rectangle(13580, 3720, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground20, -0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground20, true);
    this.matter.add.gameObject(this.add.rectangle(13580, 3720, 1000, 100, 0xA5F2F3), gameState.ground20, true);

    gameState.ground21 = this.matter.add.rectangle(13940, 3550, 700, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground21, -0.55);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground21, true);
    this.matter.add.gameObject(this.add.rectangle(13940, 3550, 700, 100, 0xA5F2F3), gameState.ground21, true);

    gameState.ground22 = this.matter.add.rectangle(14300, 3200, 700, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground22, -0.90);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground22, true);
    this.matter.add.gameObject(this.add.rectangle(14300, 3200, 700, 100, 0xA5F2F3), gameState.ground22, true);

    gameState.ground23 = this.matter.add.rectangle(17700, 5900, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground23, 0.7);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground23, true);
    this.matter.add.gameObject(this.add.rectangle(17700, 5900, 1000, 100, 0xA5F2F3), gameState.ground23, true);

    gameState.ground24 = this.matter.add.rectangle(18520, 6400, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground24, 0.4);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground24, true);
    this.matter.add.gameObject(this.add.rectangle(18520, 6400, 1000, 100, 0xA5F2F3), gameState.ground24, true);

    gameState.ground25 = this.matter.add.rectangle(19450, 6640, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground25, 0.1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground25, true);
    this.matter.add.gameObject(this.add.rectangle(19450, 6640, 1000, 100, 0xA5F2F3), gameState.ground25, true);

    gameState.ground26 = this.matter.add.rectangle(20940, 6690, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground26, true);
    this.matter.add.gameObject(this.add.rectangle(20940, 6690, 2000, 100, 0xA5F2F3), gameState.ground26, true);

    gameState.win = this.matter.add.rectangle(22000, 6310, 200, 200, {collisionFilter: 0});
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.win, true);
    this.matter.add.gameObject(this.add.image(22000, 6310, 'win'), gameState.win, true);

    } else if (level == 7) {
    gameState.ground = this.matter.add.rectangle(1200, 1500, 3000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground, 0.75);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground, true);
    this.matter.add.gameObject(this.add.rectangle(1200, 1500, 3000, 100, 0xA5F2F3), gameState.ground, true);

    gameState.ground2 = this.matter.add.rectangle(3160, 2990, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground2, 0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground2, true);
    this.matter.add.gameObject(this.add.rectangle(3160, 2990, 2000, 100, 0xA5F2F3), gameState.ground2, true);

    gameState.ground3 = this.matter.add.rectangle(4970, 3700, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground3, 0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground3, true);
    this.matter.add.gameObject(this.add.rectangle(4970, 3700, 2000, 100, 0xA5F2F3), gameState.ground3, true);

    gameState.ground4 = this.matter.add.rectangle(6900, 3940, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(6900, 3940, 2000, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground5 = this.matter.add.rectangle(8000, 3840, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground5, -0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground5, true);
    this.matter.add.gameObject(this.add.rectangle(8000, 3840, 1000, 100, 0xA5F2F3), gameState.ground5, true);

    gameState.ground6 = this.matter.add.rectangle(8450, 3600, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground6, -0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground6, true);
    this.matter.add.gameObject(this.add.rectangle(8450, 3600, 1000, 100, 0xA5F2F3), gameState.ground6, true);

    gameState.ground7 = this.matter.add.rectangle(8800, 3300, 2400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground7, -0.69);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground7, true);
    this.matter.add.gameObject(this.add.rectangle(8800, 3300, 2400, 100, 0xA5F2F3), gameState.ground7, true);

    gameState.ground8 = this.matter.add.circle(11000, 4145, 2100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground8, true);
    this.matter.add.gameObject(this.add.circle(11000, 4145, 2100, 0xA5F2F3), gameState.ground8, true);

    gameState.ground9 = this.matter.add.rectangle(15000, 4400, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground9, 0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground9, true);
    this.matter.add.gameObject(this.add.rectangle(15000, 4400, 2000, 100, 0xA5F2F3), gameState.ground9, true);

    gameState.ground10 = this.matter.add.rectangle(16500, 4800, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground10, true);
    this.matter.add.gameObject(this.add.rectangle(16500, 4800, 2000, 100, 0xA5F2F3), gameState.ground10, true);

    gameState.ground11 = this.matter.add.rectangle(17500, 4700, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground11, -0.35);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground11, true);
    this.matter.add.gameObject(this.add.rectangle(17500, 4700, 1000, 100, 0xA5F2F3), gameState.ground11, true);

    gameState.ground12 = this.matter.add.rectangle(19200, 4200, 700, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground12, -0.55);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground12, true);
    this.matter.add.gameObject(this.add.rectangle(19200, 4200, 700, 100, 0xA5F2F3), gameState.ground12, true);

    gameState.ground13 = this.matter.add.rectangle(19700, 3780, 1100, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground13, -0.85);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground13, true);
    this.matter.add.gameObject(this.add.rectangle(19700, 3780, 1100, 100, 0xA5F2F3), gameState.ground13, true);

    gameState.ground14 = this.matter.add.rectangle(16245, 5970, 5000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground14, -0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground14, true);
    this.matter.add.gameObject(this.add.rectangle(16245, 5970, 5000, 100, 0xA5F2F3), gameState.ground14, true);

    gameState.ground15 = this.matter.add.rectangle(16060, 5870, 5000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground15, -0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground15, true);
    this.matter.add.gameObject(this.add.rectangle(16060, 5870, 5000, 100, 0xA5F2F3), gameState.ground15, true);

    gameState.ground16 = this.matter.add.rectangle(12000, 8290, 5000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground16, -0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground16, true);
    this.matter.add.gameObject(this.add.rectangle(12000, 8290, 5000, 100, 0xA5F2F3), gameState.ground16, true);

    gameState.ground17 = this.matter.add.rectangle(9100, 9480, 1500, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground17, true);
    this.matter.add.gameObject(this.add.rectangle(9100, 9480, 1500, 100, 0xA5F2F3), gameState.ground17, true);

    gameState.ground18 = this.matter.add.rectangle(7760, 9150, 1500, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground18, 0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground18, true);
    this.matter.add.gameObject(this.add.rectangle(7760, 9150, 1500, 100, 0xA5F2F3), gameState.ground18, true);

    gameState.ground19 = this.matter.add.rectangle(6870, 8430, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground19, 1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground19, true);
    this.matter.add.gameObject(this.add.rectangle(6870, 8430, 1000, 100, 0xA5F2F3), gameState.ground19, true);

    gameState.ground20 = this.matter.add.rectangle(20050, 2900, 100, 1000);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground20, true);
    this.matter.add.gameObject(this.add.rectangle(20050, 2900, 100, 1000, 0xA5F2F3), gameState.ground20, true);

    gameState.win = this.matter.add.rectangle(5574, 6700, 200, 200, {collisionFilter: 0});
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.win, true);
    this.matter.add.gameObject(this.add.image(5574, 6700, 'win'), gameState.win, true);

    } else if (level == 8) {
    gameState.ground0 = this.matter.add.rectangle(2480, 3400, 7500, 100, { friction: 0 });
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground0, 0.9);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground0, true);
    this.matter.add.gameObject(this.add.rectangle(2480, 3400, 7500, 100, 0xA5F2F3), gameState.ground0, true);

    gameState.ground = this.matter.add.rectangle(5850, 7300, 3000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground, 0.75);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground, true);
    this.matter.add.gameObject(this.add.rectangle(5850, 7300, 3000, 100, 0xA5F2F3), gameState.ground, true);


    gameState.ground2 = this.matter.add.rectangle(7750, 8870, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground2, 0.6);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground2, true);
    this.matter.add.gameObject(this.add.rectangle(7750, 8870, 2000, 100, 0xA5F2F3), gameState.ground2, true);

    gameState.ground3 = this.matter.add.rectangle(9440, 9850, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground3, 0.45);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground3, true);
    this.matter.add.gameObject(this.add.rectangle(9440, 9850, 2000, 100, 0xA5F2F3), gameState.ground3, true);

    gameState.ground4 = this.matter.add.rectangle(10800, 10425, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground4, 0.3);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(10800, 10425, 1000, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground5 = this.matter.add.rectangle(11770, 10647, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground5, 0.15);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground5, true);
    this.matter.add.gameObject(this.add.rectangle(11770, 10647, 1000, 100, 0xA5F2F3), gameState.ground5, true);

    gameState.ground6 = this.matter.add.rectangle(13500, 10720, 2500, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground6, true);
    this.matter.add.gameObject(this.add.rectangle(13500, 10720, 2500, 100, 0xA5F2F3), gameState.ground6, true);

    gameState.ground7 = this.matter.add.rectangle(15610, 10590, 1800, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground7, -0.15);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground7, true);
    this.matter.add.gameObject(this.add.rectangle(15610, 10590, 1800, 100, 0xA5F2F3), gameState.ground7, true);

    gameState.ground8 = this.matter.add.rectangle(16970, 10310, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground8, -0.3);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground8, true);
    this.matter.add.gameObject(this.add.rectangle(16970, 10310, 1000, 100, 0xA5F2F3), gameState.ground8, true);

    gameState.ground10 = this.matter.add.rectangle(18100, 9845, 1500, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground10, -0.45);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground10, true);
    this.matter.add.gameObject(this.add.rectangle(18100, 9845, 1500, 100, 0xA5F2F3), gameState.ground10, true);

    gameState.ground11 = this.matter.add.rectangle(19160, 9250, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground11, -0.6);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground11, true);
    this.matter.add.gameObject(this.add.rectangle(19160, 9250, 1000, 100, 0xA5F2F3), gameState.ground11, true);

    gameState.ground12 = this.matter.add.rectangle(19925, 8605, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground12, -0.8);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground12, true);
    this.matter.add.gameObject(this.add.rectangle(19925, 8605, 1000, 100, 0xA5F2F3), gameState.ground12, true);

    gameState.ground13 = this.matter.add.rectangle(20535, 7840, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground13, -1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground13, true);
    this.matter.add.gameObject(this.add.rectangle(20535, 7840, 1000, 100, 0xA5F2F3), gameState.ground13, true);

    gameState.ground14 = this.matter.add.rectangle(20940, 6950, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground14, -1.2854);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground14, true);
    this.matter.add.gameObject(this.add.rectangle(20940, 6950, 1000, 100, 0xA5F2F3), gameState.ground14, true);

    gameState.ground15 = this.matter.add.rectangle(21077, 6050, 100, 900);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground15, true);
    this.matter.add.gameObject(this.add.rectangle(21077, 6050, 100, 900, 0xA5F2F3), gameState.ground15, true);

    gameState.ground16 = this.matter.add.rectangle(20970, 5280, 700, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground16, -1.9);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground16, true);
    this.matter.add.gameObject(this.add.rectangle(20970, 5280, 700, 100, 0xA5F2F3), gameState.ground16, true);

    gameState.ground17 = this.matter.add.rectangle(20680, 4710, 600, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground17, -2.2);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground17, true);
    this.matter.add.gameObject(this.add.rectangle(20680, 4710, 600, 100, 0xA5F2F3), gameState.ground17, true);

    gameState.ground18 = this.matter.add.rectangle(20350, 4350, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground18, -2.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground18, true);
    this.matter.add.gameObject(this.add.rectangle(20350, 4350, 400, 100, 0xA5F2F3), gameState.ground18, true);

    gameState.ground19 = this.matter.add.rectangle(20040, 4143, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground19, -2.6);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground19, true);
    this.matter.add.gameObject(this.add.rectangle(20040, 4143, 400, 100, 0xA5F2F3), gameState.ground19, true);

    gameState.ground20 = this.matter.add.rectangle(19740, 4000, 300, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground20, -2.8);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground20, true);
    this.matter.add.gameObject(this.add.rectangle(19740, 4000, 300, 100, 0xA5F2F3), gameState.ground20, true);

    gameState.ground21 = this.matter.add.rectangle(19400, 3950, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground21, true);
    this.matter.add.gameObject(this.add.rectangle(19400, 3950, 400, 100, 0xA5F2F3), gameState.ground21, true);

    gameState.ground22 = this.matter.add.rectangle(19060, 3990, 300, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground22, -0.3);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground22, true);
    this.matter.add.gameObject(this.add.rectangle(19060, 3990, 300, 100, 0xA5F2F3), gameState.ground22, true);

    gameState.ground23 = this.matter.add.rectangle(18740, 4110, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground23, -0.4);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground23, true);
    this.matter.add.gameObject(this.add.rectangle(18740, 4110, 400, 100, 0xA5F2F3), gameState.ground23, true);

    gameState.ground24 = this.matter.add.rectangle(18380, 4340, 500, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground24, -0.7);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground24, true);
    this.matter.add.gameObject(this.add.rectangle(18380, 4340, 500, 100, 0xA5F2F3), gameState.ground24, true);

    gameState.ground25 = this.matter.add.rectangle(18155, 4600, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground25, -1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground25, true);
    this.matter.add.gameObject(this.add.rectangle(18155, 4600, 400, 100, 0xA5F2F3), gameState.ground25, true);

    gameState.ground26 = this.matter.add.rectangle(18050, 4920, 100, 300);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground26, true);
    this.matter.add.gameObject(this.add.rectangle(18050, 4920, 100, 300, 0xA5F2F3), gameState.ground26, true);

    gameState.ground27 = this.matter.add.rectangle(18100, 5250, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground27, 1.3);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground27, true);
    this.matter.add.gameObject(this.add.rectangle(18100, 5250, 400, 100, 0xA5F2F3), gameState.ground27, true);

    gameState.ground28 = this.matter.add.rectangle(18237, 5600, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground28, 1.1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground28, true);
    this.matter.add.gameObject(this.add.rectangle(18237, 5600, 400, 100, 0xA5F2F3), gameState.ground28, true);

    gameState.ground29 = this.matter.add.rectangle(18440, 5920, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground29, 0.9);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground29, true);
    this.matter.add.gameObject(this.add.rectangle(18440, 5920, 400, 100, 0xA5F2F3), gameState.ground29, true);

    gameState.ground30 = this.matter.add.rectangle(18710, 6200, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground30, 0.7);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground30, true);
    this.matter.add.gameObject(this.add.rectangle(18710, 6200, 400, 100, 0xA5F2F3), gameState.ground30, true);

    gameState.ground31 = this.matter.add.rectangle(19030, 6420, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground31, 0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground31, true);
    this.matter.add.gameObject(this.add.rectangle(19030, 6420, 400, 100, 0xA5F2F3), gameState.ground31, true);

    gameState.ground32 = this.matter.add.rectangle(19380, 6570, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground32, 0.3);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground32, true);
    this.matter.add.gameObject(this.add.rectangle(19380, 6570, 400, 100, 0xA5F2F3), gameState.ground32, true);

    gameState.ground33 = this.matter.add.rectangle(19770, 6650, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground33, 0.1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground33, true);
    this.matter.add.gameObject(this.add.rectangle(19770, 6650, 400, 100, 0xA5F2F3), gameState.ground33, true);

    gameState.ground34 = this.matter.add.rectangle(20150, 6670, 400, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground34, true);
    this.matter.add.gameObject(this.add.rectangle(20150, 6670, 400, 100, 0xA5F2F3), gameState.ground34, true);


    gameState.win = this.matter.add.rectangle(20260, 6290, 200, 200, {collisionFilter: 0});
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.win, true);
    this.matter.add.gameObject(this.add.image(20260, 6290, 'win'), gameState.win, true);

    } else if (level == 9) {
    gameState.ground = this.matter.add.rectangle(1200, 1500, 3000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground, 0.75);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground, true);
    this.matter.add.gameObject(this.add.rectangle(1200, 1500, 3000, 100, 0xA5F2F3), gameState.ground, true);

    gameState.ground2 = this.matter.add.rectangle(3160, 2990, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground2, 0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground2, true);
    this.matter.add.gameObject(this.add.rectangle(3160, 2990, 2000, 100, 0xA5F2F3), gameState.ground2, true);

    gameState.ground3 = this.matter.add.rectangle(4970, 3700, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground3, 0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground3, true);
    this.matter.add.gameObject(this.add.rectangle(4970, 3700, 2000, 100, 0xA5F2F3), gameState.ground3, true);

    gameState.ground4 = this.matter.add.rectangle(6900, 3940, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(6900, 3940, 2000, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground5 = this.matter.add.rectangle(8000, 3840, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground5, -0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground5, true);
    this.matter.add.gameObject(this.add.rectangle(8000, 3840, 1000, 100, 0xA5F2F3), gameState.ground5, true);

    gameState.ground6 = this.matter.add.rectangle(8450, 3600, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground6, -0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground6, true);
    this.matter.add.gameObject(this.add.rectangle(8450, 3600, 1000, 100, 0xA5F2F3), gameState.ground6, true);

    gameState.ground7 = this.matter.add.rectangle(8800, 3300, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground7, -0.7);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground7, true);
    this.matter.add.gameObject(this.add.rectangle(8800, 3300, 1000, 100, 0xA5F2F3), gameState.ground7, true);

    gameState.ground8 = this.matter.add.rectangle(9200, 2900, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground8, -0.9);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground8, true);
    this.matter.add.gameObject(this.add.rectangle(9200, 2900, 1000, 100, 0xA5F2F3), gameState.ground8, true);

    gameState.ground9 = this.matter.add.rectangle(10000, 2000, 100, 1000);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground9, true);
    this.matter.add.gameObject(this.add.rectangle(10000, 2000, 100, 1000, 0xA5F2F3), gameState.ground9, true);

    gameState.win = this.matter.add.rectangle(8850, 2200, 200, 200, {collisionFilter: 0});
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.win, true);
    this.matter.add.gameObject(this.add.image(8850, 2200, 'win'), gameState.win, true);
    
    } else if (level == 10) {
    
    gameState.ground = this.matter.add.rectangle(1200, 1500, 3000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground, 0.75);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground, true);
    this.matter.add.gameObject(this.add.rectangle(1200, 1500, 3000, 100, 0xA5F2F3), gameState.ground, true);

    gameState.ground2 = this.matter.add.rectangle(3160, 2990, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground2, 0.5);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground2, true);
    this.matter.add.gameObject(this.add.rectangle(3160, 2990, 2000, 100, 0xA5F2F3), gameState.ground2, true);

    gameState.ground3 = this.matter.add.rectangle(4970, 3700, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground3, 0.25);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground3, true);
    this.matter.add.gameObject(this.add.rectangle(4970, 3700, 2000, 100, 0xA5F2F3), gameState.ground3, true);

    gameState.ground4 = this.matter.add.rectangle(6900, 4042, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground4, 0.1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground4, true);
    this.matter.add.gameObject(this.add.rectangle(6900, 4042, 2000, 100, 0xA5F2F3), gameState.ground4, true);

    gameState.ground5 = this.matter.add.rectangle(11000, 5100, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground5, 0.3);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground5, true);
    this.matter.add.gameObject(this.add.rectangle(11000, 5100, 2000, 100, 0xA5F2F3), gameState.ground5, true);

    gameState.ground6 = this.matter.add.rectangle(12950, 5447, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground6, 0.05);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground6, true);
    this.matter.add.gameObject(this.add.rectangle(12950, 5447, 2000, 100, 0xA5F2F3), gameState.ground6, true);

    gameState.ground7 = this.matter.add.rectangle(14446, 5497, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground7, true);
    this.matter.add.gameObject(this.add.rectangle(14446, 5497, 1000, 100, 0xA5F2F3), gameState.ground7, true);

    gameState.ground8 = this.matter.add.rectangle(15925, 5300, 2000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground8, -0.2);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground8, true);
    this.matter.add.gameObject(this.add.rectangle(15925, 5300, 2000, 100, 0xA5F2F3), gameState.ground8, true);

    gameState.ground9 = this.matter.add.rectangle(19200, 4700, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground9, -0.2);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground9, true);
    this.matter.add.gameObject(this.add.rectangle(19200, 4700, 1000, 100, 0xA5F2F3), gameState.ground9, true);

    gameState.ground10 = this.matter.add.rectangle(22470, 4200, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground10, -0.2);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground10, true);
    this.matter.add.gameObject(this.add.rectangle(22470, 4200, 1000, 100, 0xA5F2F3), gameState.ground10, true);

    gameState.ground11 = this.matter.add.rectangle(25600, 3850, 1000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground11, -0.1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground11, true);
    this.matter.add.gameObject(this.add.rectangle(25600, 3850, 1000, 100, 0xA5F2F3), gameState.ground11, true);

    gameState.ground12 = this.matter.add.rectangle(32000, 6000, 4000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground12, 0.1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground12, true);
    this.matter.add.gameObject(this.add.rectangle(32000, 6000, 4000, 100, 0xA5F2F3), gameState.ground12, true);

    gameState.ground13 = this.matter.add.rectangle(30800, 5470, 100, 600);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground13, 0.1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground13, true);
    this.matter.add.gameObject(this.add.rectangle(30800, 5470, 100, 600, 0xA5F2F3), gameState.ground13, true);

    gameState.ground14 = this.matter.add.rectangle(32415, 5883, 3200, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground14, 0.1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground14, true);
    this.matter.add.gameObject(this.add.rectangle(32415, 5883, 3200, 100, 0xA5F2F3), gameState.ground14, true);

    gameState.ground15 = this.matter.add.rectangle(33990, 5700, 100, 600);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground15, 0.1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground15, true);
    this.matter.add.gameObject(this.add.rectangle(33990, 5700, 100, 600, 0xA5F2F3), gameState.ground15, true);

    gameState.ground16 = this.matter.add.rectangle(35900, 6435, 3000, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground16, 0.11);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground16, true);
    this.matter.add.gameObject(this.add.rectangle(35900, 6435, 3000, 100, 0xA5F2F3), gameState.ground16, true);

    gameState.ground17 = this.matter.add.rectangle(37810, 6640, 250, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground17, 0.11);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground17, true);
    this.matter.add.gameObject(this.add.rectangle(37810, 6640, 250, 100, 0xA5F2F3), gameState.ground17, true);

    gameState.ground18 = this.matter.add.rectangle(38010, 6662, 250, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground18, 0.11);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground18, true);
    this.matter.add.gameObject(this.add.rectangle(38010, 6662, 250, 100, 0xA5F2F3), gameState.ground18, true);

    gameState.ground19 = this.matter.add.rectangle(38140, 6420, 250, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground19, 0.11);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground19, true);
    this.matter.add.gameObject(this.add.rectangle(38140, 6420, 250, 100, 0xA5F2F3), gameState.ground19, true);

    gameState.ground20 = this.matter.add.rectangle(36000, 6260, 4240, 100);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground20, 0.11);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground20, true);
    this.matter.add.gameObject(this.add.rectangle(36000, 6260, 4240, 100, 0xA5F2F3), gameState.ground20, true);

    gameState.ground21 = this.matter.add.rectangle(38200, 6600, 100, 300);
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.ground21, 0.4);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.ground21, true);
    this.matter.add.gameObject(this.add.rectangle(38200, 6600, 100, 300, 0xA5F2F3), gameState.ground21, true);


    gameState.win = this.matter.add.rectangle(37500, 7100, 200, 200, {collisionFilter: 0});
    Phaser.Physics.Matter.Matter.Body.setAngle(gameState.win, 0.1);
    Phaser.Physics.Matter.Matter.Body.setStatic(gameState.win, true);
    this.matter.add.gameObject(this.add.image(37500, 7100, 'win'), gameState.win, true);
    }


    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.wasd = this.input.keyboard.addKeys('W,S,A,D,R,Q');


    this.cameras.main.startFollow(gameState.rightHip.position, true, 1, 1, 0, 90);
    this.cameras.main.setZoom(0.6);





}

update()
{
    gameState.rightHipShadow.x = gameState.rightHipGameObject.x + 1;
    gameState.rightHipShadow.y = gameState.rightHipGameObject.y + 4;

    gameState.rightLegShadow.x = gameState.rightLegGameObject.x + 1;
    gameState.rightLegShadow.y = gameState.rightLegGameObject.y + 4;
    gameState.rightLegShadow.rotation = gameState.rightLegGameObject.rotation;

    gameState.rightKneeShadow.x = gameState.rightKneeGameObject.x + 1;
    gameState.rightKneeShadow.y = gameState.rightKneeGameObject.y + 4;

    gameState.rightShinShadow.x = gameState.rightShinGameObject.x + 1;
    gameState.rightShinShadow.y = gameState.rightShinGameObject.y + 3;
    gameState.rightShinShadow.rotation = gameState.rightShinGameObject.rotation;

    gameState.leftLegShadow.x = gameState.leftLegGameObject.x + 1;
    gameState.leftLegShadow.y = gameState.leftLegGameObject.y + 4;
    gameState.leftLegShadow.rotation = gameState.leftLegGameObject.rotation;

    gameState.leftKneeShadow.x = gameState.leftKneeGameObject.x + 1;
    gameState.leftKneeShadow.y = gameState.leftKneeGameObject.y + 4;

    gameState.leftShinShadow.x = gameState.leftShinGameObject.x + 1;
    gameState.leftShinShadow.y = gameState.leftShinGameObject.y + 3;
    gameState.leftShinShadow.rotation = gameState.leftShinGameObject.rotation;


    if (this.matter.overlap(gameState.win, [gameState.leftLeg, gameState.rightLeg, gameState.leftHip, gameState.rightHip, gameState.leftShin, gameState.rightShin, gameState.leftKnee, gameState.rightKnee, gameState.leftFoot, gameState.rightFoot])) {
        if (this.completed < 1) {
            var currentStorage = JSON.parse(window.localStorage.getItem('progress1'));
            currentStorage[level-1] = true;
            window.localStorage.setItem('progress1', JSON.stringify(currentStorage));

            handle = 'window' + sceneCount++;
            demo = new Eyes(handle);
            this.scene.add(handle, demo, true);
            this.completed++;
        }
    }
    

    if (gameState.leftHip.speed < 20) {
        this.cameras.main.setZoom(0.6);
    } else if (gameState.leftHip.speed > 100) {
        this.cameras.main.setZoom(0.3);
    } else {
        this.cameras.main.setZoom(0.6 - ((gameState.leftHip.speed - 20)*0.00375));
    }

    if (gameState.wasd.R.isDown || gameState.rightHip.position.y > 100000) {
        this.completed = 0;
        this.scene.manager.getScenes(true, false).forEach(scene =>
            this.scene.stop(scene));
        this.scene.start('GameScene', { level: level, musicEnabled: musicEnabled});
    }
    if (gameState.wasd.Q.isDown) {
        this.completed = 0;
        this.scene.manager.getScenes(true, false).forEach(scene =>
            this.scene.stop(scene));
        this.scene.start('StartScene', { musicEnabled: musicEnabled});
    }


    rightHipAngle = convertAngle(gameState.rightHip.angle);
    leftHipAngle = convertAngle(gameState.leftHip.angle);
    if (rightHipAngle > leftHipAngle) {
        if ((rightHipAngle - leftHipAngle) > Math.PI) {
            bodyAngle = (leftHipAngle + rightHipAngle + (2*Math.PI))/2;
        } else {
            bodyAngle = (leftHipAngle + rightHipAngle)/2;
        }
    } else if (leftHipAngle > rightHipAngle) {
        if ((leftHipAngle - rightHipAngle) > Math.PI) {
            bodyAngle = (leftHipAngle + rightHipAngle + (2*Math.PI))/2;
        } else {
            bodyAngle = (leftHipAngle + rightHipAngle)/2;
        }
    } else {
        bodyAngle = (leftHipAngle + rightHipAngle)/2;
    }

    leftBodyThreshold = previousBodyAngle - 2;
    leftBodyThreshold = convertAngle(leftBodyThreshold);
    rightBodyThreshold = previousBodyAngle + 2;
    rightBodyThreshold = convertAngle(rightBodyThreshold);


    if (bodyAngle < leftBodyThreshold && bodyAngle > rightBodyThreshold) {
        bodyAngle = convertAngle((bodyAngle + Math.PI));
    } else if (bodyAngle > rightBodyThreshold && ((leftBodyThreshold + (2*Math.PI)) - bodyAngle) < 2.2832) {
        bodyAngle = convertAngle((bodyAngle + Math.PI));
    } else if (bodyAngle < leftBodyThreshold && (bodyAngle - (rightBodyThreshold - (2*Math.PI))) < 2.2832) {
        bodyAngle = convertAngle((bodyAngle + Math.PI));
    }

    previousBodyAngle = bodyAngle;


    rightHipCounterLimit = bodyAngle - 1.14;
    rightHipCounterLimit = convertAngle(rightHipCounterLimit);
    rightHipCounterEnd = rightHipCounterLimit - 2;

    rightHipClockLimit = bodyAngle - .2;
    rightHipClockLimit = convertAngle(rightHipClockLimit);
    rightHipClockEnd = rightHipClockLimit + 2;

    leftHipCounterLimit = bodyAngle + .2;
    leftHipCounterLimit = convertAngle(leftHipCounterLimit);
    leftHipCounterEnd = leftHipCounterLimit - 2;

    leftHipClockLimit = bodyAngle + 1.14;
    leftHipClockLimit = convertAngle(leftHipClockLimit);
    leftHipClockEnd = leftHipClockLimit + 2;


    if (leftHipAngle < leftHipCounterLimit) {
        if (leftHipAngle > leftHipCounterEnd) {
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, 0.1);
        }
    } else if (leftHipCounterEnd < 0) {
        if ((leftHipAngle - (2*Math.PI)) > leftHipCounterEnd) {
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, 0.1);
        }
    }

    if (rightHipAngle > rightHipClockLimit) {
        if (rightHipAngle < rightHipClockEnd) {
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, -0.1);
        }
    } else if (rightHipClockEnd > (2*Math.PI)) {
        if ((rightHipAngle + (2*Math.PI)) < rightHipClockEnd) {
           Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, -0.1);
        }
    }

    if (leftHipAngle > leftHipClockLimit) {
        if (leftHipAngle < leftHipClockEnd) {
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, -0.1);
        }
    } else if (leftHipClockEnd > (2*Math.PI)) {
        if ((leftHipAngle + (2*Math.PI)) < leftHipClockEnd) {
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, -0.1);
        }
    }

    if (rightHipAngle < rightHipCounterLimit) {
        if (rightHipAngle > rightHipCounterEnd) {
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, 0.1);
        }
    } else if (rightHipCounterEnd < 0) {
        if ((rightHipAngle - (2*Math.PI)) > rightHipCounterEnd) {
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, 0.1);
        }
    }


    if (gameState.cursors.left.isDown && gameState.cursors.right.isDown) {

    } else if (gameState.cursors.left.isDown) {
        if (rightHipAngle > rightHipClockLimit) {
            if (rightHipAngle > rightHipClockEnd) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, 0.1);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, -0.1);
            }
        } else {
            if (rightHipClockEnd > (2*Math.PI)) {
                if ((rightHipAngle + (2*Math.PI)) > rightHipClockEnd) {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, 0.1);
                } else {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, -0.1);
                }
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, 0.1);
            }
        }
    } else if (gameState.cursors.right.isDown) {
        if (rightHipAngle < rightHipCounterLimit) {
            if (rightHipAngle < rightHipCounterEnd) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, -0.1);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, 0.1);
            }
        } else {
            if (rightHipCounterEnd < 0) {
                if ((rightHipAngle - (2*Math.PI)) < rightHipCounterEnd) {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, -0.1);
                } else {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, 0.1);
                }
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightHip, -0.1);
            }
        }
    }

    if (gameState.wasd.A.isDown && gameState.wasd.D.isDown) {

    } else if (gameState.wasd.A.isDown) {
        if (leftHipAngle > leftHipClockLimit) {
            if (leftHipAngle > leftHipClockEnd) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, 0.1);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, -0.1);
            }
        } else {
            if (leftHipClockEnd > (2*Math.PI)) {
                if ((leftHipAngle + (2*Math.PI)) > leftHipClockEnd) {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, 0.1);
                } else {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, -0.1);
                }
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, 0.1);
            }
        }
    } else if (gameState.wasd.D.isDown) {
        if (leftHipAngle < leftHipCounterLimit) {
            if (leftHipAngle < leftHipCounterEnd) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, -0.1);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, 0.1);
            }
        } else {
            if (leftHipCounterEnd < 0) {
                if ((leftHipAngle - (2*Math.PI)) < leftHipCounterEnd) {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, -0.1);
                } else {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, 0.1);
                }
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftHip, -0.1);
            }
        }
    }


    rightHipAngle = convertAngle(gameState.rightHip.angle);
    leftHipAngle = convertAngle(gameState.leftHip.angle);
    rightKneeAngle = convertAngle(gameState.rightKnee.angle);
    leftKneeAngle = convertAngle(gameState.leftKnee.angle);

    rightKneeCounterLimit = rightHipAngle + 0.2;
    rightKneeCounterLimit = convertAngle(rightKneeCounterLimit);
    rightKneeCounterEnd = rightKneeCounterLimit - 2;

    rightKneeClockLimit = rightHipAngle + 2;
    rightKneeClockLimit = convertAngle(rightKneeClockLimit);
    rightKneeClockEnd = rightKneeClockLimit + 2;

    rightKneeFullForce = rightHipAngle + 1;
    rightKneeFullForce = convertAngle(rightKneeFullForce);
    rightKneeHalfForce = rightHipAngle + 0.5;
    rightKneeHalfForce = convertAngle(rightKneeHalfForce);


    leftKneeCounterLimit = leftHipAngle + 0.2;
    leftKneeCounterLimit = convertAngle(leftKneeCounterLimit);
    leftKneeCounterEnd = leftKneeCounterLimit - 2;

    leftKneeClockLimit = leftHipAngle + 2;
    leftKneeClockLimit = convertAngle(leftKneeClockLimit);
    leftKneeClockEnd = leftKneeClockLimit + 2;

    leftKneeFullForce = leftHipAngle + 1;
    leftKneeFullForce = convertAngle(leftKneeFullForce);
    leftKneeHalfForce = leftHipAngle + 0.5;
    leftKneeHalfForce = convertAngle(leftKneeHalfForce);
    
    if (gameState.cursors.up.isDown) {
        if (rightKneeAngle > rightKneeClockLimit) {
            if (rightKneeAngle > rightKneeClockEnd) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightKnee, 0.19);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightKnee, -0.1);
            }
        } else {
            if (rightKneeClockEnd > (2*Math.PI)) {
                if ((rightKneeAngle + (2*Math.PI)) > rightKneeClockEnd) {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightKnee, 0.19);
                } else {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightKnee, -0.1);
                }
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightKnee, 0.19);
            }
        }
    } else {
        if (rightKneeAngle < rightKneeCounterLimit) {
            if (rightKneeAngle < rightKneeCounterEnd) {
                extendForward(gameState.rightKnee, rightKneeAngle, rightKneeClockLimit, rightKneeCounterLimit, rightHipAngle, gameState.rightHip);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightKnee, 0.2);
            }
        } else {
            if (rightKneeCounterEnd < 0) {
                if ((rightKneeAngle - (2*Math.PI)) < rightKneeCounterEnd) {
                    extendForward(gameState.rightKnee, rightKneeAngle, rightKneeClockLimit, rightKneeCounterLimit, rightHipAngle, gameState.rightHip);
                } else {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.rightKnee, 0.2);
                }
            } else {
                extendForward(gameState.rightKnee, rightKneeAngle, rightKneeClockLimit, rightKneeCounterLimit, rightHipAngle, gameState.rightHip);
            }
        }
    }
    

    if (gameState.wasd.W.isDown) {
        if (leftKneeAngle > leftKneeClockLimit) {
            if (leftKneeAngle > leftKneeClockEnd) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftKnee, 0.19);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftKnee, -0.1);
            }
        } else {
            if (leftKneeClockEnd > (2*Math.PI)) {
                if ((leftKneeAngle + (2*Math.PI)) > leftKneeClockEnd) {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftKnee, 0.19);
                } else {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftKnee, -0.1);
                }
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftKnee, 0.19);
            }
        }
    } else {
        if (leftKneeAngle < leftKneeCounterLimit) {
            if (leftKneeAngle < leftKneeCounterEnd) {
                extendForward(gameState.leftKnee, leftKneeAngle, leftKneeClockLimit, leftKneeCounterLimit, leftHipAngle, gameState.leftHip);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftKnee, 0.2);
            }
        } else {
            if (leftKneeCounterEnd < 0) {
                if ((leftKneeAngle - (2*Math.PI)) < leftKneeCounterEnd) {
                    extendForward(gameState.leftKnee, leftKneeAngle, leftKneeClockLimit, leftKneeCounterLimit, leftHipAngle, gameState.leftHip);
                } else {
                    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(gameState.leftKnee, 0.2);
                }
            } else {
                extendForward(gameState.leftKnee, leftKneeAngle, leftKneeClockLimit, leftKneeCounterLimit, leftHipAngle, gameState.leftHip);
            }
        }
    }

}
}

    function convertAngle(matterBodyAngle)
    {
        if (matterBodyAngle > 0) {
            return matterBodyAngle % (2*Math.PI);
        } else {
            return (matterBodyAngle % (2*Math.PI)) + (2*Math.PI);
        }
    }
    
    function extendForward(knee, kneeAngle, clockLimit, counterLimit, hipAngle, hip)
    {
        fullForce = clockLimit - 1;
        fullForce = convertAngle(fullForce);
        halfForce = fullForce - 0.5;
        halfForce = convertAngle(halfForce);
    
        bentKneeAngle = clockLimit + 1.25;
    
        if (clockLimit < fullForce) {
            if ((kneeAngle <= bentKneeAngle && (kneeAngle + (2*Math.PI) > fullForce)) || (kneeAngle <= (bentKneeAngle + (2*Math.PI)) && kneeAngle > fullForce )) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.5);
            } else if (kneeAngle <= fullForce && kneeAngle > halfForce) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.2);
            } else if (kneeAngle <= halfForce && kneeAngle > counterLimit) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.07);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.15);
            }
        } else if (fullForce < halfForce) {
            if (kneeAngle <= bentKneeAngle && kneeAngle > fullForce) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.5);
            } else if ((kneeAngle <= fullForce && (kneeAngle + (2*Math.PI) > halfForce)) || (kneeAngle <= (fullForce + (2*Math.PI)) && kneeAngle > halfForce )) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.2);
            } else if (kneeAngle <= halfForce && kneeAngle > counterLimit) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.07);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.15);
            }
        } else if (halfForce < counterLimit) {
            if (kneeAngle <= bentKneeAngle && kneeAngle > fullForce) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.5);
            } else if (kneeAngle <= fullForce && kneeAngle > halfForce) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.2);
            } else if ((kneeAngle <= halfForce && (kneeAngle + (2*Math.PI) > counterLimit)) || (kneeAngle <= (halfForce + (2*Math.PI)) && kneeAngle > counterLimit )) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.07);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.15);
            }
        } else {
            if (kneeAngle <= bentKneeAngle && kneeAngle > fullForce) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.5);
            } else if (kneeAngle <= fullForce && kneeAngle > halfForce) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.2);
            } else if (kneeAngle <= halfForce && kneeAngle > counterLimit) {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.07);
            } else {
                Phaser.Physics.Matter.Matter.Body.setAngularVelocity(knee, -0.15);
            }
        }
        if (kneeAngle > hipAngle) {
            if ((kneeAngle - hipAngle) > 0.8 && (kneeAngle - hipAngle) < 1.6) {
            }
        } else {
            if (((kneeAngle + (2*Math.PI)) - hipAngle) > 0.8 && ((kneeAngle + (2*Math.PI)) - hipAngle) < 1.6) {
            }
        }
    }

class Eyes extends Phaser.Scene {

    constructor (handle)
    {
        super(handle);
    }

    create ()
    {
        this.add.image(440, 75, 'window').setOrigin(0);
        this.add.text( 488, 140, 'Completed', {fill: '#004225', fontSize: '45px'});
        
        this.scene.bringToTop();
    }
}


Eyes.WIDTH = 336;
Eyes.HEIGHT = 214;