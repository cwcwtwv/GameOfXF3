var startBlood = 100;
var startFuel = 100;
var style = {
    font : 'bold 30px Arial',
    fill : '#002856',
    wordWrap : true,
    wordWrapWidth : 440
};
//本地参数

function addBar(bar, inner, outer, color1, color2, px, py) {
	bar.position.set(px, py);
	foregroundlayer.addChild(bar);
	outer.beginFill(color2);
	outer.drawRect(0, 0, 200, 16);
	outer.endFill();
	bar.addChild(outer);
	bar.outer = outer;
}
//添加Bar控件的函数, 调用多

function prepareNew() {
	backgroundlayer.removeChildren();
	bgTexture[0] = PIXI.Texture.fromImage('pic/backgroundPlay.png');
	bgTexture[1] = PIXI.Texture.fromImage('pic/sob.png');
	bgTexture[2] = PIXI.Texture.fromImage('pic/sob.png');
	count = bgCount = 0;

	for (var i = 0; i < bg.length; i++) {
		bg[i] = new PIXI.extras.TilingSprite(bgTexture[i], renderer.width, renderer.height);
	}
	missileTexture = new Array(14);
	
	for (var i = 0; i < missileTexture.length; i++) {
		missileTexture[i] = boatTexture = PIXI.Texture.fromImage("pic/missile" + i +".png");
	}
	missile = PIXI.Sprite.fromImage("pic/missile01.png");

	boatTexture = new Array(3);
	for (var i = 0; i < boatTexture.length; i++) {
		boatTexture[i] = PIXI.Texture.fromImage("pic/boat" + i + ".png");
	}

	foeTexture = new Array(14);
	for (var i = 0; i < foeTexture.length; i++) {
		foeTexture[i] = PIXI.Texture.fromImage("pic/foe" + i + ".png");
	}
	
	fuelTexture = PIXI.Texture.fromImage("pic/fuel.png");

	countingText = new PIXI.Text('', style);   
    scoreCount = 0;
	boats = new Array();
	foes = new Array();
	fuels = new Array();

	bg[1].scale.x = 1;
	bg[1].scale.y = 100 / 150;
}
//纹理加载部分,仅需要全局执行一次

function startLoading() {
	backgroundlayer.addChild(bg[0]);
	backgroundlayer.addChild(bg[1]);
	var blurFilter = new PIXI.filters.BlurFilter();
	backgroundlayer.filters = [blurFilter];
	objectlayer.filters = [blurFilter];
    blurFilter.blur = 10;
    bg[1].scale.x = 1;
	bg[1].scale.y = 100 / 150;
	missile.vh = -3;
	missile.vx = 5;
	missile.vy = missile.ax = missile.ay = 0;
}
//用于在开始界面执行动画的初始化函数

function initGame() {
	backgroundlayer.filters = [];
	objectlayer.filters = [];
	titleMusic.loop = backgroundMusic.loop = true;
	titleMusic.pause();
	backgroundMusic.play();
	backgroundlayer.removeChildren();
	foregroundlayer.removeChildren();
	objectlayer.removeChildren();
	

	countingText.position.x = 680;
    countingText.position.y = 20;
    countingText.anchor.x = 0.5;
    countingText.style = style;
	boats = new Array();
	foes = new Array();
	fuels = new Array();
	backgroundlayer.addChild(bg[0]);
	backgroundlayer.addChild(bg[1]);

	fuelBar = new PIXI.Container();
	fuelinnerBar = new PIXI.Graphics();
	fuelouterBar = new PIXI.Graphics();
	bloodBar = new PIXI.Container();
	innerBar = new PIXI.Graphics();
	outerBar = new PIXI.Graphics();
	foregroundlayer.addChild(bg[2]);
	foregroundlayer.addChild(countingText);

	myLogo = PIXI.Sprite.fromImage("pic/title0.png");
	foregroundlayer.addChild(myLogo);
	myLogo.position.x = 420;
	myLogo.position.y = 36;
	myLogo.anchor.x = myLogo.anchor.y = 0.5;
	myLogo.scale.x = 0.3;
	myLogo.scale.y = 0.3;

	count = bgCount = 0;	
}
//游戏开始时的逻辑部分, 需要重复执行

function setKeyEvents() {
	left = handleKey(37);
	up = handleKey(38);
	right = handleKey(39);
	down = handleKey(40);
	keyA = handleKey(65);
	keyW = handleKey(87);
	keyD = handleKey(68);
	keyS = handleKey(83);
	
	left.press = keyA.press = function() {
		missile.vh = -3;
	};
	left.release = keyA.release = function() {
		if (!right.isDown) {
			missile.vh = 0;
		}
	};
	right.press = keyD.press = function() {
		missile.vh = 3;
	};
	right.release = keyD.release = function() {
		if (!left.isDown) {
			missile.vh = 0;
		}
	};
	up.press = keyW.press = function() {
		missile.vy = -3;
	};
	up.release = keyW.release = function() {
		if (!down.isDown) {
			missile.vy = 0;
		}
	};
	down.press = keyS.press = function() {
		missile.vy = 3;
	};
	down.release = keyS.release = function() {
		if (!up.isDown) {
			missile.vy = 0;
		}
	};
}
//用于初始化键盘事件的函数,仅需要全局执行一次

function setPara() {
	missile.isDead = false;
	backgroundlayer.addChild(bg[0]);
	backgroundlayer.addChild(bg[1]);
	foregroundlayer.addChild(bg[2]);
	foregroundlayer.addChild(countingText);

	count = bgCount = 0;
	scoreCount = 0;
	
	missile.anchor.x = missile.anchor.y = 0.5;
	missile.position.x = 160;
	missile.position.y = 200;
	missile.vx = 5;
	missile.vy = missile.ax = missile.ay = 0;

	missile.fuel = startFuel;
	missile.blood = startBlood;
	addBar(fuelBar, fuelinnerBar, fuelouterBar, 0x000000, 0x00DDDD, 20, 42);
	addBar(bloodBar, innerBar, outerBar, 0x000000, 0xDD2222, 20, 18);
	setKeyEvents();
	objectlayer.addChild(missile);
	curState = gameState["playing"];
}
//游戏开始的时候的参数重置