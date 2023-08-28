class Unit extends Tile {

	constructor(boardWidth, boardHeight, x, y, type) {
		super(boardWidth, boardHeight, x, y, type);

		this.PixelArt = {
			tree1: "HIRY@@@@@[IJC@A@@@[QaHJ@@@X[eQQAPI@hn[IJJ[IwDX[QYQJcM@@KKJ[lLJ@HQYxf]QAXHCpl\\KB@X@xfE[A@@@plDXA@@@xfEX@@@@plD@@@@@\`eE@@@@@hmE@@@",
			tree1_palete: "44a00054c103067c007e321a622411b04321d3702e",

			tree2: "@@@QC@@@@@PdZ@R@@RPLQPLBPdBJCPdQPLBXCcIZ@JChh^QC@Xub}@@@S@PLBPB@bTPLzbT@bI_ZkbIBcQF{EbQCXRCoGSQC@[@uEX[@@@@nG@@@@@@}E@@@@@hno@@@",
			tree2_palete: "48a90026900d067c0054c1037e321ab04321622411",

			char1: "@@@@@HRA@@@@@QJ@@@@cc\`A@X@\`]]]D@KCt~nd@UEg\`f\`w@SCFzGr}@h@tfp~u@h@hw~oD@~@\`]]e@@gwqDDttGX~xn~~y~h@pwuwDwX@@}nn@~h@@PRb@@X@pGR|F@h@}n@uo@\`@QJ@QJ@",
			char2: "@@@@@HRA@@@@@QJ@@@@cc\`A@X@\`]]]D@KCt~nd@UEGDFDw@SCVxWp}@h@tfp~u@h@hw~oD@~@\`]]e@@gwqDDttGX~xn~~y~h@pwuwDwX@@}nn@~h@@PRb@@X@pGR|F@h@}n@uo@\`@QJ@QJ@",
			char3: "@@@@@@QJ@@@@@HRAX@@lccB@KCX]]]D@UEe\`f\`\`@SCFrGrw@X@w~w~}@X@}G|s@~@hvv^D@gG@URc@@Xv@@DptGhxyn~~y~X@pwuwDwh@@}nn@~X@@PRB@@h@pGRxF@@@}n@uo@@@QJ@QJ@",
			char_palete: "322940959a9e432309250f0f5b2b1b84442f8f5b30",

			obj2: "@@@@QcE@@@@HNID@@@@o}LA@@@xmhe@@@@@NEg@@@@PygKB@@@JL^IC@@piQKOA@@@@uIOD@@@eIaE@@@xINl@@@@hsie@@@@@@\`I@@@@@@a^A@@@@HtaL@@@@aKddA@",
			obj1: "@@@@QC@@@@@HLI@@@@@unOF@@@xN~F@@@vyF@@@NyOF@@pIy~@@OqNv@xIywOw@xIvy~w@HIOvqqFNyNywOFNywNwNwNvO_wNq@~IyOvw@p~K@vF",
			obj_palete: "622411a751377a35204f1e0f2e0f068d4029461608",
		}

		this.art = type == 5 ? this.PixelArt.char1 : type == 1 ? this.PixelArt.tree1 : type == 2 ? this.PixelArt.tree2 : type == 3 ? this.PixelArt.obj1 : this.PixelArt.obj2;
		this.palete = type == 5 ? this.PixelArt.char_palete : type == 1 ? this.PixelArt.tree1_palete : type == 2 ? this.PixelArt.tree2_palete : this.PixelArt.obj_palete;
		
		if (type == 5) {
			this.animated = true;
			this.animate();
		}
	}

	animate() {
		if (this.animated) {
			clearTimeout(this.timeout);
			const blink = Math.random() < .2;
			this.timeout = setTimeout(() => {
				this.art = blink
					? this.art == this.PixelArt.char1 ? this.PixelArt.char2 : this.PixelArt.char1
					: Math.random() < .1 ? this.PixelArt.char3 : Math.random() < .5 ? this.PixelArt.char1 : this.PixelArt.char2;
				this.animate();
			}, blink ? 30 : 600 + Math.random() * 600);
		}
	}

	resize() {
		super.resize();
		this.size = this.elementSize / 1.3;
		this.draw();
	}

	draw() {
		const px = [];
		const P = this.art.replace(/./g, a=>{
			const z = a.charCodeAt();
			px.push(z & 7);
			px.push((z >> 3) & 7);
		});
		const W = 16;
		const H = 18;
		let S = 13.6;
		let offsetX = 9;
		let offsetY = -50;
		let clr;
		for(let j = 0; j < H; j++) {
			for(let i = 0; i < W; i++) {
				if (px[j * W + i]) {
					if (this.type > 2) {
						offsetY = -6;
						offsetX = 24;
						S = 16;
						this.context.fillStyle = "#000";
						this.context.fillRect(
							offsetX + this.x * this.elementSize + this.size / S * i,
							offsetY + this.y * this.elementSize + this.size / S * (j + 1),
							(this.size*1.1) / S,
							(this.size*1.1) / S
						);
					}

					clr = (px[j * W + i] - 1);
					this.context.fillStyle = "#" + this.palete.substr(6 * clr, 6);
					const green = this.type == 1 && clr < 3 || this.type == 2 && clr < 4;
					const upd = green ? 1 : 2;//Game.instance.step % 5 == 0;
					this.context.fillRect(
						-(green ? (Game.instance.step/30|0) % 2 == 0 ? Game.instance.step % 30 : 30 - (Game.instance.step%30) : 0) / 16 + (this.shake ? -Math.random()*upd : 0) + offsetX + this.x * this.elementSize + this.size / S * i,
						-(green ? (Game.instance.step/30|0) % 2 == 0 ? Game.instance.step % 30 : 30 - (Game.instance.step%30) : 0) / 16 + (this.shake ? -Math.random()*upd : 0) + offsetY + this.y * this.elementSize + this.size / S * j,
						(green ? (Game.instance.step/30|0) % 2 == 0 ? Game.instance.step % 30 : 30 - (Game.instance.step%30) : 0) / 8 + (this.shake ? Math.random()*upd : 0) + (this.size*1.1) / S,
						(green ? (Game.instance.step/30|0) % 2 == 0 ? Game.instance.step % 30 : 30 - (Game.instance.step%30) : 0) / 8 + (this.shake ? Math.random()*upd : 0) + (this.size*1.1) / S
					);
				}
			}
		}
	}
}