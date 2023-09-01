class Unit extends Tile {

	constructor(x, y, type) {
		super(x, y, type);

		this.offsetX = 0;
		this.offsetY = 0;
		this.frame = 0;
		this.W = 16;
		this.H = 16;
		this.S = 16;

		switch (type) {
			case 1: // palm (level data == 1)
				this.art = "HIRY@@@@@[IJC@A@@@[QaHJ@@@X[eQQAPI@hn[IJJ[ItDX[QYQJcM@@KKJ[lLJ@HQYxf]QAXHCpl\\KB@X@xfE[A@@@plDXA@@@xfEX@@@@plD@@@@@\`eE@@@@@@m@@@@";
				this.palete = "2dcb0053ff000083007e321a622411b04321d3702e";
				this.S = 15;
				this.offsetY = -5;
				break;
			case 2: // tree (level data == 2)
				this.art = "@@@QA@@@@@PdJ@R@@RP\\SP\\BPdBZAPdSP\\BHAa[J@ZAppMSA@Hnb~@@@Q@P\\BPB@bTP\\zbT@b[OJqb[BaSEyFbSAHRAwGQSA@I@nFHI@@@@uG@@@@@@~F@@@@@puw@@@";
				this.palete = "067c000ebb0046e40059ff00d041147e321a622411";
				this.offsetX = 5;
				this.offsetY = 9;
				this.S = 18;
				break;
			case 3: // rock (level data == 3)
				this.art = "@@@@IVC@@@@HZuZ@@@@QQ{^C@@HJR]_C@@UQR^xC@@KRZWFG@xRRsUsC@lQj~JZF@VR]oQs@\`KRsMZ~@pUj~SRnCtQZoR{vgSRCWZ^wswS{ss{{|v\\h^^F_p|wFxsG";
				this.palete = "ccaaaa997a705f4e482b8a0e8d40296224112e0f06";
				this.offsetY = 9;
				break;
			case 4: // obstackle lake ? (level map == 3)
				this.art = "@@@wGp@@pGxeewGFxll[JllGfQ[SIZ[}W[SJZ[Kj\\SR[[KQ[cbcccZ[STll\\\\\\SjeeeeeebkmlllllllmmmeeeemommmmmmEpmmmmmmFpxmmmmwGx@vGw@@@G@x@x@";
				this.palete = "89b3ff427eeb1e61db1448a60b378532bd17077707";
				this.offsetY = 20;
				break;
			case 5: // moai ? ()
			default:
				this.art = [
					"@@XZc@@@XZ[\\D@@P~@wC@@sGZxf@@~xQGw@@fsQ^t@@^rQVs@@\`SI\\D@@XtxfC@@ZbwTc@@SKZZ[@@\\jvVc@@\`S[[D@@@\\bc@@@wG@x~@x~ntGwGww]~ux~~ncuoFwp]l~~}F@fuwww@",
					"@@XZQ{@@@eJJZG@hoS\\lC@x@wcuE@@Qx\\n@@JbGcu@PQ|n\\^A@bfaccC@@LZ\\nD@uWccX@xh\\\\uG@w\\b}n@@\`SDw\\@@@@xecF@@@oZ\\t@@\`UlfeF@lcuuow@e]l~x}hlduEGG@wn~|~@",
					"@ZbZ@@@xZJQl@@PecZ}E@hn\\~@G@@ucGJ@@@n\\xTQ@HscugJBXl\\LtT@\`ubSa@@@CT\\zn@@xnccEG@@uoTc~@@c~\`ZD@p\\lG@@@fYZ}@@pTtekD@~e~n^e@oltGGl@xeE~~\`E@wgwu~@"
				];
				this.palete = "cdaf98a88e7986715f6b56455444364736292d211a";
				this.H = 20; this.W = 14; this.S = 18;
				//this.offsetX = 40;
				//this.offsetY = -20;
				if (!state && (x > 9 || y > 4)) this.frame = 1;
				if (!state && (x < 3 && y > 4)) this.frame = 2;
				break;
			case 6: // player
				this.art = [
					"@@@@@xJG@@@@@Wy@@@@~~xG@p@xuuuG@~Fg\\[l@ME{x|xc@VFDYCan@h@\`|\`\\e@h@@c\\k@@\\@@EGE@@{cWomggCp\\HBG\\_\\h@PQ{cGcp@JJBQ@\\h@PQt{@@p@@Jz_D@h@]h@ek@x@Oz@Wy@",
					"@@@@@xJG@@@@@Wy@@@@~~xG@p@xuuuG@~Fg\\[l@ME{x|xc@VFL_Kgn@h@\`|\`\\e@h@@c\\k@@\\@@EGE@@{cWomggCp\\HBG\\_\\h@PQ{cGcp@JJBQ@\\h@PQt{@@p@@Jz_D@h@]h@ek@x@Oz@Wy@",
					"@@@@@@Wy@@@@@xJGp@@o~~A@~FpuuuG@ME}x|x@@VFDaCa{@p@\`\\c\\]@p@@C_[^@\\@Xddt\`@{C@KI~@@pdBgu\`gChXWAG\\_\\p@HJ{cGch@QQiQ@\\p@xJD{@@h@\`Pz_D@@@]D@ek@@@Oz@Wy@"
				];
				this.palete = "fffdc1c0a272c5805ab3663c6e3e21532f11410023";
				this.H = 20;
				this.animated = true;
				this.animate();
				break;
		}
	}

	animate() {
		if (this.animated) {
			clearTimeout(this.timeout);
			const blink = Math.random() < .2;
			this.timeout = setTimeout(() => {
				if (Math.random() < .6) this.frame = Game.instance.step % 9 == 0 ? 1 : -1;
				this.frame ++;
				if (this.frame > this.art.length - 1) this.frame = 0;
				this.animate();
			}, blink ? 1 : 600 + Math.random() * 600);
		}
	}

	resize() {
		super.resize();
		this.width = this.elementSize * this.scale;
		this.height = this.elementSize * this.scale;
		this.draw();
	}

	draw() {
		const px = [];
		let art = this.art;
		if (typeof this.art !== 'string') {
			art = this.art[this.frame];
		}
		const P = art.replace(/./g, a=>{
			const z = a.charCodeAt();
			px.push(z & 7);
			px.push((z >> 3) & 7);
		});

		let offsetX = this.getOffsetX() + this.offsetX * this.scale;
		let offsetY = this.getOffsetY() + this.offsetY * this.scale;
		let clr;

		for(let j = 0; j < this.H; j++) {
			for(let i = 0; i < this.W; i++) {
				if (px[j * this.W + i]) {
					this.context.beginPath();
					// add contour via 1 pixel drop-shadow
					if (this.type == 3 || this.type == 5 || this.type == 6) {
						this.context.fillStyle = "#000";
						this.context.fillRect(
							(this.type == 5 ? 5 * this.scale : 0) + offsetX + this.x * this.elementSize * this.scale + this.width / this.S * i,
							offsetY + (this.y) * this.elementSize * this.tilt * this.scale + this.height / this.S * (j + 1),
							this.width / this.S,
							this.width / this.S 
						);
					}

					clr = (px[j * this.W + i] - 1);
					this.context.fillStyle = "#" + this.palete.substr(6 * clr, 6);
					const green = this.type == 1 && clr < 2 || this.type == 2 && clr < 4 || this.type == 4 && clr < 5;
					const upd = green ? 1 : 2;
					const lim = (clr + 1) * 10;

					this.context.fillRect(
						(this.type == 5 ? 5 * this.scale : 0)-(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 16 + (this.shake ? -Math.random()*upd : 0) + offsetX + this.x * this.elementSize * this.scale + this.width / this.S * i,
						-(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 16 + (this.shake ? -Math.random()*upd : 0) + offsetY + (this.y ) * this.elementSize * this.tilt * this.scale + this.height / this.S * j,
						(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 8 + (this.shake ? Math.random()*upd : 0) + (this.width*1.1) / this.S,
						(green ? (Game.instance.step/lim|0) % 2 == 0 ? Game.instance.step % lim : lim - (Game.instance.step%lim) : 0) / 8 + (this.shake ? Math.random()*upd : 0) + (this.height*1.1) / this.S
					);
					
					this.context.fill();
					this.context.closePath();
				}
			}
		}
	}
}
