
function generateTitle() {
	var titleArr = [
		[[22,22,32,-1,11,11,11,11]],
		[[26,6,-46],[7,14,-45,6],[7,14,-36,6],[7,14,-27,6]],
		[],
		//example
		[[12,4,-2,,,3,1,3],[12.5,4,-.5,6.5,1,3,1,1],[14.5,4,-2.5,14,3,1,3],[4,3.5,,3.5,1,1,1,1,1,,1],[3.5,3.5,6,3.5,1,1,1,1,1,,1],[4,4.6,,10,1,1,1,1,1,,1],[3.5,4.6,8,10,1,1,1,1,1,,1]],
		[[10,4,,14,1,1,3,3],[4.5,4,,6.6,,3,1,1],[4.5,4,5.5,7,3,,1,1],[3.5,4.5,.5,10,1,1,1,1,1,,1],[3.5,4,6,10.5,1,1,1,1,1,,1]],
		[[4,5,,6,,3,,1],[7,4,3,7,3,3,1,1,,,,1],[4.5,4,,14,1,1,3,3],[4.5,5,5.5,14,1,1,,3],[3.5,4,6,10.5,1,1,1,1,1,,1],[3.5,4,.5,10.5,1,1,1,1,1,,1]],
		[[4,5,,6,,3,,1],[7,4,3,7,3,3,1,1,,,,1],[4.5,4,,14,1,1,3,3],[4.5,5,5.5,14,1,1,,3],[3.5,4,6,10.5,1,1,1,1,1,,1],[3.5,4,.5,10.5,1,1,1,1,1,,1]],
		[[4.5,4,,7,3,3,1,1],[4.5,6,5.5,5,3.5,,1,1],[10,4,,14,1,1,3,3],[3.5,4,.5,10.5,1,1,1,1,1,,1],[3.5,4,6,10.5,1,1,1,1,1,,1],[3.5,5,3.5,17.5,1,1,,2.5,1]],
		[[4,5,-1,-1,3,,3]],[[4,5,-.5,-2,3,,3]]
	];

	drawTitle(titleArr, -13, 25, 7.5, "title");
}

function drawTitle(titleArr, baseLeft, baseTop, scale, className) {
	var piece;
	var segment;
	var pieceWidth;
	for(var i = 0; i < titleArr.length; i++){
		pieceWidth = 0;
		for(var j = 0; j < titleArr[i].length; j++){
			segment = titleArr[i][j];
			if(pieceWidth < (segment[0]||0)+(segment[2]||0)) pieceWidth = (segment[0]||0)+(segment[2]||0);
			piece = document.createElement("div");
			gameContainer.appendChild(piece).className = className;
			piece.style.width = ((segment[0]*scale)||0)+"px";
			piece.style.height = ((segment[1]*scale)||0)+"px";
			piece.style.left = (baseLeft+((segment[2]*scale)||0))+"px";
			piece.style.top = (baseTop+((segment[3]*scale)||0))+"px";
			piece.style.borderRadius = ((segment[4]*scale)||0)+"px "+((segment[5]*scale)||0)+"px "+((segment[6]*scale)||0)+"px "+((segment[7]*scale)||0)+"px";
			if(segment[8]) piece.style.borderTop = "none";
			if(segment[9]) piece.style.borderRight = "none";
			if(segment[10]) piece.style.borderBottom = "none";
			if(segment[11]) piece.style.borderLeft = "none";
		}
		baseLeft += (pieceWidth*scale) + scale;
	}
}

