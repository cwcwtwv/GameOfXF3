var fuelUP = 9;
var enemySpeedUp = 5;
var bloodDownBoat = -8;
var bloodDownFoe = -15;
var stantardSpeedX = 5;
var positionFuel = {
	x: 900,
	yWidth: 350,
	yShift: 0,
	scale: 0.5
}

var positionFoe = {
	x: 900,
	yWidth: 230,
	yShift: 0,
	scale: 1
}

var positionBoat = {
	x: 900,
	yWidth: 60,
	yShift: 350,
	scale: 0.2
}


function detectOutOfScreen(arr, layer) {
	while(arr.length > 0 && arr[0].position.x + arr[0].width < 0) {
		layer.removeChild(arr.pop());
	}
}
//从layer层中移除arr中飞出屏幕的物体

function detectArrCollision(r1, objectArray, whatToAdd, addHowMuch) {
	var touched = false;
	var up = objectArray.length;
	for (var i = 0; i < up; i++) {
		if(detectRectangleCollision(r1, objectArray[i]) && objectArray[i].touchable) {
			objectArray[i].touchable = false;
			charm.fadeOut(objectArray[i]);
			objectArray.splice(i, 1);
			r1[whatToAdd] = (r1[whatToAdd] + addHowMuch) > 100 ? 100 : (r1[whatToAdd] + addHowMuch);
			up--;
			i--;
			touched = true;
		}
	}
	return touched;
}

function detectAlive() {
	if(count % 60 == 57) {
		if(missile.fuel > 0) {
			missile.fuel--;
		}

		if(missile.fuel <= 0) {
			missile.blood = 0;
		}
	}
	if(missile.blood <= 0) {
		missile.isDead = true;
	}
}

function addObject(texture, objectArray, position) {
	var temp = new PIXI.Sprite(texture);
	objectArray.unshift(temp);
	objectlayer.addChild(temp);
	temp.position.x = position.x;
	temp.position.y = Math.random() * position.yWidth + position.yShift;
	temp.scale.x = temp.scale.y = position.scale;
	temp.anchor.x = temp.anchor.y = 0.5;
	temp.touchable = true;
}

function changeVelocityAndAngle() {
	if (missile.isDead) {
		missile.vh = 0;
		missile.vy = 2;
	}
    if (missile.rotation <= 0) {
    	 missile.rotation += 0.02;
    }
    if (missile.rotation >= 0) {
    	 missile.rotation -= 0.02;
    }
    if (missile.vy > 0 && missile.rotation <= 0.5) {
    	missile.rotation += 0.04;
    }
    if ((missile.vy < 0) && missile.rotation >= -0.5) {
    	missile.rotation -= 0.04;
    }
}

function inputObject() {
	if((count == 12) && (Math.floor(Math.random() * 10000) < 2500)) {
		addObject(fuelTexture, fuels, positionFuel)
	}
	if((count == 12) && (Math.floor(Math.random() * 10000) < (1000 + 4 * scoreCount))) {
		addObject(foeTexture[0], foes, positionFoe);
		foes[0].thisSpeed = Math.floor(Math.random() * 10 + 1);
		foes[0].curTexture = 0;
	}
	if((count == 12) && (Math.floor(Math.random() * 10000) < (1000 + 4 * scoreCount))) {
		addObject(boatTexture[Math.floor(Math.random() * 100) % 3], boats, positionBoat);
	}
}

function moveObject() {
	if (missile.isDead) {
		missile.position.y += missile.vy;
	}
	if((missile.position.x < 450 && missile.vh > 0) || (missile.position.x > 90 && missile.vh < 0)) {
		missile.position.x += missile.vh;
	}
	if((missile.position.y < 450 && missile.vy > 0) || (missile.position.y > 0 && missile.vy < 0)) {
		missile.position.y += missile.vy;
	}

	skipPoint++;
	skipPoint = skipPoint % 2;
	if (skipPoint == 0) {
		missile.texture = missileTexture[tmpM];
		tmpM++;
		tmpM = tmpM % 14;
	}
	

	var tempRand = Math.random();
	for (var i = 0; i < fuels.length; i++) {
		fuels[i].position.x -= 0.2 * missile.vx;
	}

	var newBg1Pos = 320 + 30 * Math.sin(bgCount) * Math.abs(Math.sin(bgCount / 2) + Math.cos(bgCount / 3));
	var newBg2Pos = 350 + 30 * Math.sin(bgCount) * Math.abs(Math.sin(bgCount / 2) + Math.cos(bgCount / 3));
	for (var i = 0; i < boats.length; i++) {
		boats[i].position.x -= 0.23 * missile.vx;
		boats[i].position.y += newBg1Pos - bg[1].position.y;
	}
	for (var i = 0; i < foes.length; i++) {
		foes[i].position.x -= 0.25 * (missile.vx + foes[i].thisSpeed);
		foes[i].curTexture++;
		foes[i].curTexture = foes[i].curTexture % 14;
		foes[i].texture = foeTexture[foes[i].curTexture];
	}
	bgCount += 0.01;

    bg[0].tileScale.x = 1// + Math.sin(count);
    bg[0].tilePosition.x -= 0.13// + Math.sin(count);

    bg[1].tileScale.x = 1;// + Math.sin(count);
    bg[1].tileScale.y = 1 + Math.abs(Math.sin(bgCount) + Math.cos(bgCount)) / 4;
    bg[1].tilePosition.x -= tempRand * missile.vx / 8;
    bg[1].position.y = newBg1Pos;

    bg[2].tileScale.x = 1;
    bg[2].tileScale.y = 1 + Math.abs(Math.sin(bgCount) + Math.cos(bgCount)) / 4;
    bg[2].tilePosition.x -= tempRand * missile.vx;
    bg[2].position.y = newBg2Pos;

    if (count === 60) { count = 0; }
}

function countScore() {
	if (count == 30) {
		missile.vx = stantardSpeedX + Math.floor(scoreCount / 10);
		// missile.fuel -= (stantardSpeedX / 5 + Math.floor(scoreCount / 10));
	}
	scoreCount += 0.05;
	countingText.text = 'score: ' + Math.floor(scoreCount);
}

function speedUpFoes() {
	for (var i = 0; i < foes.length; i++) {
		if (foes[i].touchable) {
			detectArrCollision(foes[i], fuels, "thisSpeed", enemySpeedUp);
		}
	}
}

function gameLoop() {
	var boatTouched = false;
	var foeTouched = false;
	var bonusTouched = false;
	if (missile.isDead) {
		changeVelocityAndAngle();
		moveObject();
		detectArrCollision(foes, "blood", bloodDownFoe);
	    detectArrCollision(boats, "blood", bloodDownBoat);
	    detectArrCollision(fuels, "fuel", fuelUP);
		if (missile.position.y >= 550) {
			curState = gameState["ending"];
			changeStateFlag = 1; 
		}
	}
	inputObject();
	detectOutOfScreen(boats, objectlayer);
	detectOutOfScreen(foes, objectlayer);
	detectOutOfScreen(fuels, objectlayer);
	foeTouched = detectArrCollision(missile, foes, "blood", bloodDownFoe);
    boatTouched = detectArrCollision(missile, boats, "blood", bloodDownBoat);
    bonusTouched = detectArrCollision(missile, fuels, "fuel", fuelUP);
    speedUpFoes();
    playMusic(foeTouched, boatTouched, bonusTouched);
    detectAlive();
	fuelBar.outer.width = (missile.fuel * 2) > 0 ? (missile.fuel * 2) : 0;
	bloodBar.outer.width = (missile.blood * 2) > 0 ? (missile.blood * 2) : 0;
	changeVelocityAndAngle();
	moveObject();
	countScore();
	count++;
}

function playMusic(foe, boat, bonus) {
	if (bonus) {
		bonusSound.play();
		return;
	}

	if (boat || foe) {
		hurtSound.play();
		return;
	}
}



