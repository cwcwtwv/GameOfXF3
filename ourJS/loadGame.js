function onResize() {
	var w = $(window).width(); 
	var h = $(window).height(); 
	var ratioValue = (w / 800) < (h / 450) ? (w / 800) : (h / 450);
	renderer.view.style.width = ratioValue * 800 + "px";
	renderer.view.style.height = ratioValue * 450 + "px";
}
//分辨率

function initStartButton(
	texture, 
	textureDown, 
	textureOver, 
	px, 
	py, 
	functionClick, 
	container
) {
		container = container || objectlayer;
		var button = new PIXI.Sprite(texture);
		button.anchor.x = button.anchor.y = 0.5;
		button.position.x = px;
		button.position.y = py;	
		button.interactive = true;
		
		button.mousedown = button.touchstart = function(data){
			this.isdown = true;
			this.texture = textureDown;
			this.alpha = 1;
		}
		
		button.mouseup = button.touchend = function(data){
			this.isdown = false;
			if (this.isOver) {
				this.texture = textureOver;
			} else {
				this.texture = texture;
			}
		}
		
		button.mouseover = function(data){
			this.isOver = true;
			if (this.isdown){
				return;
			}
			this.texture = textureOver;
		}
		
		button.mouseout = function(data){	
			this.isOver = false;
			if (this.isdown){
				return;
			}
			this.texture = texture;
		}
		
		button.click = functionClick;
		container.addChild(button);
		buttons.push(button);
}
//向界面添加按钮元素,实际上可以通过传函数参数与bar的init合并
function initLoadingOnce() {
	$(document).ready(onResize);
	$(window).resize(onResize);
	window.onorientationchange = onResize;
	//window 时间重载
	
	charm = new Charm(PIXI);
	//加载全局的动画效果包裹

	hurtSound = new Audio('music/hurt.mp3');
	bonusSound = new Audio('music/bonus.mp3');
	backgroundMusic = new Audio('music/background.mp3');
	titleMusic = new Audio('music/title.mp3');
	overMusic = new Audio('music/gameOver.mp3');
	titleMusic.loop = backgroundMusic.loop = true;

	var tmpNth = $("audio");
	for (var i in tmpNth) {
		i.preload = true;
	}
	//初始化音乐

	stage = new PIXI.Stage(0x000000, true);
	renderer = PIXI.autoDetectRenderer(800, 450);

	document.body.appendChild(renderer.view);
	rootlayer = new PIXI.Container();
	backgroundlayer = new PIXI.Container();
	objectlayer = new PIXI.Container();
	foregroundlayer = new PIXI.Container();
	//初始化不同层级的容器

	stage.addChild(rootlayer);
	rootlayer.addChild(backgroundlayer);
	rootlayer.addChild(objectlayer);
	rootlayer.addChild(foregroundlayer)
	rootlayer.displayList = new PIXI.DisplayList();
	//将容器加载进对应的层

	

	backgroundlayer.displayGroup = bLayer;
	objectlayer.displayGroup = oLayer;
	foregroundlayer.displayGroup = fLayer;
	//设置每个层级的z-index
	requestAnimationFrame(animate);
	//执行动画框架
}
//只需要执行一次的部分

function initLoadingGame() {

	myLogo = PIXI.Sprite.fromImage("pic/title0.png");
	myLogo.position.x = 420;
	myLogo.position.y = 100;
	myLogo.anchor.x = myLogo.anchor.y = 0.5;
	foregroundlayer.addChild(myLogo);
	//添加游戏的title

	titleMusic.play();
	//播放背景乐
	
	var func = new Array(6);
	func[0] = function(){
		curState = gameState["starting"];
		changeStateFlag = 1;
	};

	func[1] = function(){
		var bgStory = PIXI.Sprite.fromImage("pic/background5.png");
		foregroundlayer.addChild(bgStory);
		initStartButton(
			textureButton[4], 
			textureButtonDown[4], 
			textureButtonOver[4], 
			400, 380,
			func[4],
			foregroundlayer
		);
	};

	func[2] = function(){
		var bgOper = PIXI.Sprite.fromImage("pic/background7.png");
		foregroundlayer.addChild(bgOper);
		initStartButton(
			textureButton[5], 
			textureButtonDown[5], 
			textureButtonOver[5], 
			680, 380,
			func[5],
			foregroundlayer
		);
	};

	func[4] = function(){
		for (var i = 0; i < 2; i++) {
			foregroundlayer.removeChildAt(foregroundlayer.children.length - 1);
		}
	};

	func[5] = function(){
		for (var i = 0; i < 2; i++) {
			foregroundlayer.removeChildAt(foregroundlayer.children.length - 1);
		}
	};
	//按钮事件函数的数组和初始化

	var buttonPositions = [400, 200,
						   400, 280,
						   400, 360];
	

	for (var i = 0; i < 7; i++) {
		textureButton[i] = PIXI.Texture.fromImage("pic/button"+i+"0.png");
		textureButtonEnd[i] = PIXI.Texture.fromImage("pic/button"+i+"0.png");
		textureButtonDown[i] = PIXI.Texture.fromImage("pic/button"+i+"2.png");
		textureButtonOver[i] = PIXI.Texture.fromImage("pic/button"+i+"1.png");

	}
	//按钮纹理的加载

	for (var i = 0; i < 3; i++) {
		initStartButton(
			textureButton[i], 
			textureButtonDown[i], 
			textureButtonOver[i], 
			buttonPositions[i * 2], 
			buttonPositions[i * 2 + 1], 
			func[i],
			foregroundlayer
		);
	};
	//按钮的添加	
}
//可以多次执行的部分