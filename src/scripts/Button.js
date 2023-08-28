class Button extends Tile {
	
	constructor(boardWidth, boardHeight, x, y) {
		super(boardWidth, boardHeight, x, y);
		this.btn = this.createButton(x, y);
		this.container.appendChild(this.btn);
	}

	createButton(x, y) {
		var div = document.createElement("div");
		div.x = x;
		div.y = y;
		div.style.width = this.size + "px";
		div.style.height = this.size + "px";
		div.style.left = this.getX() + "px";
		div.style.top = this.getY() + "px";
		div.style.cursor = "pointer";
		div.className = "unselectable";
		return div;
	}

	resize() {
		super.resize();
		this.draw();
	}

	draw() {
		this.btn.style.left = this.getX() + "px";
		this.btn.style.top = this.getY() + "px";
		this.btn.style.width = this.size + "px";
		this.btn.style.height = this.size + "px";
	}

	/*hilight(_color){
		this.btn.style.backgroundColor = _color || "";
	}

	hilightInteraction(){
		this.btn.style.backgroundColor = "rgba(255, 212, 212, 0.5)";
	}

	hilightEmpty(){
		this.btn.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
	}

	hilightMovement(){
		this.btn.style.backgroundColor = "rgba(0, 255, 0, 0.4)";
	}

	hilightPlacement(){
		this.btn.style.backgroundColor = "rgba(192, 255, 192, 0.5)";
	}

	hilightAttack(){
		this.btn.style.backgroundColor = "rgba(255, 112, 128, 0.4)";
	}

	hilightAttacked(){
		this.btn.style.backgroundColor = "rgba(255, 0, 32, 0.5)";
	}*/
}