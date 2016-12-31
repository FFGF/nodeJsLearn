var board = new Array();
var score = 0;
var hasConflicted = new Array();

$(document).ready(function(){
	prepareForMobile();
	newgame();	
})

function prepareForMobile(){
	if(documentWidth > 500){
		 gridContainerWidth = 500;
         cellSpace = 20;
         cellSideLength = 100;
	}
	$('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);
	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);

}

function newgame () {
	//初始化棋盘格局
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function init(){
	for(var i = 0; i < 4; i ++)
		for(var j = 0; j < 4; j ++){
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}

	for(var i = 0; i < 4; i ++){
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j = 0; j < 4; j ++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	updateBoardView();
	score = 0;
}

function updateBoardView () {
	$(".number-cell").remove();
	for(var i = 0; i < 4; i ++)
		for(var j = 0; j < 4; j ++){
		    // $("#grid-container").append("<div class=\"number-cell\" id=\"number-cell-"+i+"-"+j+"\"></div>");
		    $("#grid-container").append(`<div class="number-cell" id=number-cell-${i}-${j}></div>`);

			var theNumberCell = $("#number-cell-"+i+"-"+j);

			if(board[i][j] == 0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2);
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
		$(".number-cell").css('line-height',cellSideLength + 'px');
		$(".number-cell").css('font-size',0.6*cellSideLength + 'px');
}

function generateOneNumber(){
	if(nospace(board))
		return false;
	//随机一个位置
	var fgf = new Array();
	for(var i = 0; i < 4; i ++)
		for(var j = 0; j < 4; j ++){
			if(board[i][j] == 0){
				var temp = new Array(i,j)
				fgf.push(temp);
			}
		}
	var length = fgf.length - 1; 
	var randFgf = parseInt(Math.floor(Math.random() * length));

	randx = fgf[randFgf][0];
	randy = fgf[randFgf][1];

	//随机一个位置
	// var randx = parseInt(Math.floor(Math.random() * 4));
	// var randy = parseInt(Math.floor(Math.random() * 4));

	// var times = 0;
	// while(times < 50){
	// 	if(board[randx][randy] == 0)
	// 		break;
	// 	var randx = parseInt(Math.floor(Math.random() * 4));
	// 	var randy = parseInt(Math.floor(Math.random() * 4));
	// }
	// if(times == 50){
	// 	for(var i = 0; i < 4; i ++)
	// 		for(var j = 0; j < 4; j ++){
	// 			if(board[i][j] == 0){
	// 				randx = i;
	// 				randy = j;
	// 			}
	// 		}
	// }
	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	//在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);
	return true;
}

$(document).keydown(function(event) {
	event.preventDefault()
	switch(event.keyCode){
		case 37://left
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		break;
	case 38://up
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		break;
	case 39://right
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		break;
	case 40://down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		break;
	default:
		break;
	}
	
});

document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY; 
});
document.addEventListener('touchmove',function(event){
	event.preventDefault();
})

document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;

	if(Math.abs(deltax) < 0.3*documentWidth && Math.abs(deltay) < 0.3*documentWidth)
		return;
	//x
	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax > 0){
			//move right
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}else{
			//move left
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
	}
	//y
	else{
		if(deltay > 0){
			//move down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}else{
			//move up
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
	}
});


function isgameover(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}

function gameover(){
	alert('gameOver');
}

function moveLeft(){
	if(!canMoveLeft(board))
		return false;
	//moveLeft
	for(var i = 0; i < 4; i++)
		for(var j = 1; j < 4; j ++){
			if(board[i][j] !=0){
				for(var k = 0; k < j; k ++){
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	
	return true
}

function moveRight(){
	if(!canMoveRight(board))
		return false;
	//moveRight
	for(var i = 0; i < 4; i++)
		// for(var j = 0; j < 4; j ++){
		   for( var j = 2 ; j >= 0 ; j -- ){
			if(board[i][j] !=0){
				for(var k = 3; k > j; k --){
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	
	return true
}

function moveUp(){
	if(!canMoveUp(board))
		return false;
	//moveUp
	for(var i = 0; i < 4; i++)
		// for(var j = 0; j < 4; j ++){
	  	   for( var j = 1 ; j < 4 ; j ++ ){
			if(board[j][i] !=0){
				for(var k = 0; k < j; k ++){
					if(board[k][i] == 0 && noBlockVertical(i,k,j,board)){
						//move
						showMoveAnimation(j,i,k,i);
						board[k][i] = board[j][i];
						board[j][i] = 0;
						continue;
					}
					else if(board[k][i] == board[j][i] && noBlockVertical(i,k,j,board) && !hasConflicted[k][i]){
						//move
						showMoveAnimation(j,i,k,i);
						//add
						board[k][i] += board[j][i];
						board[j][i] = 0;
						//add score
						score += board[k][i];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	
	return true
}

function moveDown(){
	if(!canMoveDown(board))
		return false;
	//moveDown
	for(var i = 0; i < 4; i++)
		// for(var j = 0; j < 4; j ++){
		for( var j = 2 ; j >= 0 ; j -- ){
	
			if(board[j][i] !=0){
				for(var k = 3; k > j; k --){
					if(board[k][i] == 0 && noBlockVertical(i,j,k,board)){
						//move
						showMoveAnimation(j,i,k,i);
						board[k][i] = board[j][i];
						board[j][i] = 0;
						continue;
					}
					else if(board[k][i] == board[j][i] && noBlockVertical(i,j,k,board) && !hasConflicted[k][i]){
						//move
						showMoveAnimation(j,i,k,i);
						//add
						board[k][i] += board[j][i];
						board[j][i] = 0;
						//add score
						score += board[k][i];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	
	return true
}