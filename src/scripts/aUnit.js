class Unit extends Tile {

	constructor(boardWidth, boardHeight, x, y, type) {
		super(boardWidth, boardHeight, x, y, type);

		this.PixelArt = {
			tree1: "HIRY@@@@@[IJC@A@@@[QaHJ@@@X[eQQAPI@hn[IJJ[ItDX[QYQJcM@@KKJ[lLJ@HQYxf]QAXHCpl\\KB@X@xfE[A@@@plDXA@@@xfEX@@@@plD@@@@@\`eE@@@@@@m@@@@",
			tree1_palete: "2dcb0053ff000083007e321a622411b04321d3702e",

			tree2: "@@@QA@@@@@PdJ@R@@RP\\SP\\BPdBZAPdSP\\BHAa[J@ZAppMSA@Hnb~@@@Q@P\\BPB@bTP\\zbT@b[OJqb[BaSEyFbSAHRAwGQSA@I@nFHI@@@@uG@@@@@@~F@@@@@puw@@@",
			tree2_palete: "067c0026900d48a90054c103b043217e321a622411",

			char1: "@@@@@HRA@@@@@QJ@@@@cc\`A@X@\`]]]D@KCt~nd@UEg\`f\`w@SCFzGr}@h@tfp~u@h@hw~oD@~@\`]]e@@gwqDDttGX~xn~~y~h@pwuwDwX@@}nn@~h@@PRb@@X@pGR|F@h@}n@uo@\`@QJ@QJ@",
			char2: "@@@@@HRA@@@@@QJ@@@@cc\`A@X@\`]]]D@KCt~nd@UEGDFDw@SCVxWp}@h@tfp~u@h@hw~oD@~@\`]]e@@gwqDDttGX~xn~~y~h@pwuwDwX@@}nn@~h@@PRb@@X@pGR|F@h@}n@uo@\`@QJ@QJ@",
			char3: "@@@@@@QJ@@@@@HRAX@@lccB@KCX]]]D@UEe\`f\`\`@SCFrGrw@X@w~w~}@X@}G|s@~@hvv^D@gG@URc@@Xv@@DptGhxyn~~y~X@pwuwDwh@@}nn@~X@@PRB@@h@pGRxF@@@}n@uo@@@QJ@QJ@",
			char_palete: "322940959a9e432309250f0f5b2b1b84442f8f5b30",

			obj1: "@@@@IVC@@@@HZuZ@@@@QQ{^C@@HJR]_C@@UQR^xC@@KRZWFG@xRRsUsC@lQj~JZF@VR]oQs@\`KRsMZ~@pUj~SRnCtQZoR{vgSRCWZ^wswS{ss{{|v\\h^^F_p|wFxsG",
			obj2: "@@@@IVC@@@@HZuZ@@@@QQ{^C@@HJR]_C@@UQR^xC@@KRZWFG@xRRsUsC@lQj~JZF@VR]oQs@\`KRsMZ~@pUj~SRnCtQZoR{vgSRCWZ^wswS{ss{{|v\\h^^F_p|wFxsG",
			obj_palete: "ccaaaa997a705f4e482b8a0e8d40296224112e0f06",

			lake1: "@@@wGp@@pGxeewGFxll[[llGfR[[[[[}W[[QZ[Sj\\LR[[SJ[cbccc[[[Tll\\\\\\[keeeeeebkmllllll|ommeeeeommmm}@pmuGFpxxxwpGx@v@v@w@@@G@x@x@",
			lake_palete: "89b3ff427eeb1e61db1448a60b378532bd17077707"
		}

		this.art = type == 6 ? this.PixelArt.lake1 : type == 5 ? this.PixelArt.char1 : type == 1 ? this.PixelArt.tree1 : type == 2 ? this.PixelArt.tree2 : type == 3 ? this.PixelArt.obj1 : this.PixelArt.obj2;
		this.palete = type == 6 ? this.PixelArt.lake_palete : type == 5 ? this.PixelArt.char_palete : type == 1 ? this.PixelArt.tree1_palete : type == 2 ? this.PixelArt.tree2_palete : this.PixelArt.obj_palete;
		
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
			}, blink ? 150 : 600 + Math.random() * 600);
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
		let S = this.type == 1 ? 12 : this.type == 6 ? 12.4 : this.type == 2 ? 12.4 : 13.6;
		let offsetX = this.type == 2 || this.type == 6 ? 0 : this.size/18;
		let offsetY = -this.size/3;
		let clr;
		for(let j = 0; j < H; j++) {
			for(let i = 0; i < W; i++) {
				if (px[j * W + i]) {
					this.context.beginPath();
					if (this.type > 2 && this.type < 6) {
						offsetY = this.type == 3 ? -36 : -6;
						offsetX = this.type == 3 ? 0 : 24;
						S = this.type == 3 ? 12.4 : 16;
						this.context.fillStyle = "#000";
						this.context.fillRect(
							offsetX + this.x * this.elementSize + this.size / S * i,
							offsetY + this.y * this.elementSize + this.size / S * (j + 1),
							(this.size*1.1) / S,
							(this.size*1.1) / S
						);
					} else if (this.type == 1) {
						offsetY = -72;
					} else if (this.type == 2) {
						offsetY = -64;
					} else if (this.type == 6) {
						offsetY = 16;
					}

					clr = (px[j * W + i] - 1);
					this.context.fillStyle = "#" + this.palete.substr(6 * clr, 6);
					const green = this.type == 1 && clr < 2 || this.type == 2 && clr < 4;
					const upd = green ? 1 : 2;//Game.instance.step % 5 == 0;
					const lim = (clr + 1) * 10;

					this.context.fillRect(
						-(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 16 + (this.shake ? -Math.random()*upd : 0) + offsetX + this.x * this.elementSize + this.size / S * i,
						-(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 16 + (this.shake ? -Math.random()*upd : 0) + offsetY + this.y * this.elementSize + this.size / S * j,
						(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 8 + (this.shake ? Math.random()*upd : 0) + (this.size*1.1) / S,
						(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 8 + (this.shake ? Math.random()*upd : 0) + (this.size*1.1) / S
					);
					
					/*if (green) this.context.arc(
						-(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 16 + (this.shake ? -Math.random()*upd : 0) + offsetX + this.x * this.elementSize + this.size / S * i,
						-(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 16 + (this.shake ? -Math.random()*upd : 0) + offsetY + this.y * this.elementSize + this.size / S * j,
						(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 8 + (this.shake ? Math.random()*upd : 0) + (this.size*1.1) / S,
						0, 2 * Math.PI
					);*/
					this.context.fill();
					this.context.closePath();

					/**/
				}
			}
		}
	}
}