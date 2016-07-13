function toRestartStatus() {
	var style = {
	    font : 'bold italic 100px Arial',
	    fill : '#002856'
	};

	var func0 = function(){
			curState = gameState["starting"];
			changeStateFlag = 1;
	};
	
	var func1 = function(){
			curState = gameState["loading"];
			changeStateFlag = 1;
	};

	backgroundMusic.pause();
	overMusic.play();
	foregroundlayer.removeChildren();

	var blurFilter = new PIXI.filters.BlurFilter();
	backgroundlayer.filters = [blurFilter];
	objectlayer.filters = [blurFilter];
	
    blurFilter.blur = 10;
   

	var textureButtonEnd0 = PIXI.Texture.fromImage("pic/button30.png");
	var textureButtonDown0 = PIXI.Texture.fromImage("pic/button32.png");
	var textureButtonOver0 = PIXI.Texture.fromImage("pic/button31.png");
	initStartButton(textureButtonEnd0, textureButtonDown0, textureButtonOver0, 400, 300, func0, foregroundlayer); 


	foregroundlayer.addChild(countingText);
	countingText.style = style;
	countingText.text = 'score: ' + Math.floor(scoreCount);
	countingText.anchor.x = 0.5;
    countingText.position.x = 400;
    countingText.position.y = 100;
}

function waitLoop() {
	inputObject();
	detectOutOfScreen(boats, objectlayer);
	detectOutOfScreen(foes, objectlayer);
	detectOutOfScreen(fuels, objectlayer);
    speedUpFoes();
	moveObject();
	count++;
}
