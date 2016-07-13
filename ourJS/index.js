var fLayer = new PIXI.DisplayGroup(2, false);
var oLayer = new PIXI.DisplayGroup(1, false);
var bLayer = new PIXI.DisplayGroup(0, false);
//播放组,确定显示的顺序

var charm;
//包裹整个框架的动画控制实例

var rootlayer;
var foregroundlayer;
var objectlayer;
var backgroundlayer;
//显示的不同的层
//分别为前景层:z-index最高
//物体层:z-index中等
//背景层:z-index最低
//这种设计便于整个显示层级的管理

var renderer;
//绘制变量
var stage;
//整个动画的场景


var myLogo;
var missile;
var boomTexture = new Array(6);
var bonusTexture = new Array(6);
var foeTexture;
var fuelTexture;
var boatTexture;
var missileTexture;
var bgTexture = new Array();
var textureButton = new Array();
var textureButtonEnd = new Array();
var textureButtonDown = new Array();
var textureButtonOver = new Array();
//纹理对应变量

var hurtSound;
var bonusSound;
var backgroundMusic;
var titleMusic;
var overMusic;
//声效和背景音乐对应变量

var buttons = [];
//按钮管理数组


var curState = 0;
var gameState = {
    "loading": 0,
    "starting": 1,
    "playing": 2,
    "ending": 3,
}
//游戏状态对应的变量

var scoreCount;
var bgCount = 0;
var count = 0;
//背景,分数,时间循环的控制变量

var changeStateFlag = 0;
//状态变换处理与否的标志变量

var boats;
var foes;
var fuels;
//飞行物的控制变量

var bg = new Array(3);
//背景精灵的实例
var missile;
//英雄精灵的实例

var bloodBar, innerBar, outerBar;
var fuelBar, fuelinnerBar, fuelouterBar;
var countingText;
//界面元素


var skipPoint = 0;
var tmpM = 0;
//动画相关控制参数

initLoadingOnce();
initLoadingGame();
prepareNew();
startLoading();


function animate() {
    requestAnimationFrame(animate);
    charm.update();
    if (curState === gameState["loading"]) {
    	if (changeStateFlag == 1) {
    		initLoadingGame();
			changeStateFlag = 0;
    	}
        waitLoop();
		renderer.render(stage);
		return;
    }

    if (curState === gameState["starting"]) {
    	initGame();
    	setPara();
    	renderer.render(stage);
		return;
    }

    if (curState === gameState["playing"]) {
    	gameLoop();
    	renderer.render(stage);
		return;
    }

    if (curState === gameState["ending"]) {
    	if (changeStateFlag == 1) {
            toRestartStatus();
            changeStateFlag = 0;
        }
        waitLoop();
    	renderer.render(stage);
		return;
    }
}
//动画函数,内部是状态的判定及调用相应的函数.
	
	