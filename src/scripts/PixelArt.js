class PixelArt {

	static init() {

		PixelArt.paletteObjects = [
			// Palm
			"2dcb0053ff000083007e321a622411b04321d3702e",
			// Tree
			"067c000ebb0046e40059ff00d041147e321a622411",
			// Rock
			"f7e064b4897c5f4e482b8a0e1e68078f4832622411",
			// Lake
			"89b3ff427eeb1e61db1448a60b378532bd17077707"
		];
		PixelArt.paletteMoai = "cdaf98a88e7986715f6b56455444364736292d211a";
		PixelArt.paletteCharacter = "fffdc1ff4e24fe9773cb7151864016642600401800";
		PixelArt.paletteAhu = "d0b7a5b39c8a947f6f7d6a5c5f4e424c3f35b69c88";
		PixelArt.paletteTiles = [
			"97de595cc149ffcc7d97de59ffcc7dffcc7dffcc7d",
			"97de595cc149ffcc7d97de5997de5997de5997de59",
			"97de595cc149ffcc7d97de5997de5997de595cc149",
			"97de595cc149ffcc7d7cc9ff1e8edcfe751ae4ff00",
			"97de595cc149ffcc7dffcc7dffcc7dfe751ae4ff00",
			"97de595cc149ffcc7d7cc9ff1e8edcffcc7d97de59"
		];
		PixelArt.paletteWater = [
			"fee5be97de59bdddf890c7f657a7eb2354d3f1f192",
			"fee5be97de59bdddf890c7f657a7eb2354d3f1f192",
			"fee5be97de59bdddf890c7f657a7eb2354d3f1f192",
			"fee5be97de59bdddf890c7f657a7eb2354d3f1f192"
		];
		PixelArt.paletteRoad = "dabeb3c1aa96b79e7ba08e728d7d567160424e4024";

		// 16x16 transparent sprites
		PixelArt.dataObjects = PixelArt.extract(
			// Palm
			"HIRY@@@@@[IJC@A@@@[QaHJ@@@X[eQQAPI@hn[IJJ[ItDX[QYQJcM@@KKJ[lLJ@HQYxf]QAXHCpl\\KB@X@xfE[A@@@plDXA@@@xfEX@@@@plD@@@@@\`eE@@@@@@m@@@@" +
			// Tree
			"@@@QA@@@@@PdJ@R@@RP\\SP\\BPdBZAPdSP\\BHAa[J@ZAppMSA@Hnb~@@@Q@P\\BPB@bTP\\zbT@b[OJqb[BaSEyFbSAHRAwGQSA@I@nFHI@@@@uG@@@@@@~F@@@@@puw@@@" +
			// Rock
			"@@@@jlD@@@@PI\`\`@@@@JQGED@@pIZ~h@@@NQrqGE@@ORNV^@@xQRQrCE@tYJRJZ@\`Or_RQ{DhKRCNZFGxNrxSRwc}QZwR{PoSRCWZ\\JzS{c{}S|\\po_G_}x}Gx{G" +
			// Lake
			"@@@wGp@@pGxeewGFxll[JllGfQ[SIZ[}W[SJZ[Kj\\SR[[KQ[cbcccZ[STll\\\\\\SjeeeeeebkmlllllllmmmeeeemommmmmmEpmmmmmmFpxmmmmwGx@vGw@@@G@x@x@",
			256
		);

		PixelArt.spritesObjects = PixelArt.drawSprites(PixelArt.dataObjects, PixelArt.paletteObjects);

		// 16x16
		PixelArt.dataTiles = PixelArt.extract(
			// Grass (uses 4 palettes)
			"@@c_qCH@@hS[~^SAXeMSsY[BSkC@@P[[NC@@h@XKwHHKeEBqFP@PhYB@HP@@@ZCHP@P[A@@P@XN[[@A@YswKKEB@ZJ^SklYZ[SH@[]sY[C@@@Z~^S@@BAAqKP@A[B@@C" +
			// Road [o]
			"@@@@@@@@@@@@@@@@@@@@@@@@@@pT{E@@@@sr^@@@\`s\\QnC@@X}fIwG@@xvs}ZF@@xMt_G@@xUtSUC@@XouvnG@@@WJ}f@@@@\`LdA@@@@@@@@@@@@@@@@@@@@@@@@@@" +
			// Road [U]
			"@@{MaS@@@pIdn@@@\`b[M{D@@@wT{MF@@@sr^@@@ps\\Qn@@@@}fIw@@@@vs}Z@@@@Mt_@@@@PtSE@@@@huvF@@@@@J}@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" +
			// Water [~~]
			"hm@mmmm@@hm@@@@m@@@@@@@@vF@pvvF@vvvvvvvv@vvF@@pv@@@@@@@@m@@hmmE@mmmmmmmmlmmmddmmdmdddddddddd[[ddcd\\[[[[[[[[[KY[[[[[IIIY[OIIQIJII" +
			// Water [. ]
			"hm@m@@@@@hm@m@@@@@@@@m@@vF@@@@E@vvvv@@h@@vvvv@h@@@@pvF@Em@@@vF@EmmE@pv@hmmm@pv@hdmmE@v@hddmm@v@Ecdlm@vFE[cdmEpFh[cdmEpFh[[dmEpFh" +
			// Water ['-]
			"I[dmEpFhI[dmEpF@J[lm@pv@Iclm@@vvYclm@@pvY[dmE@@@I[dmE@@@I[dlm@@mI[clmmmmJYcdmmmmIY[ddmedII[cddddQIY[c\\[[IQI[[[[[IIIIYKIYJIJIIIJI",
			256
		);

		// 16x16, 4 grass tiles
		PixelArt.spritesTiles = PixelArt.drawSprites([PixelArt.dataTiles.shift()], PixelArt.paletteTiles);

		// 16x16, roads
		let road1 = PixelArt.dataTiles.shift();
		let road2 = PixelArt.dataTiles.shift();
		PixelArt.spritesRoad = [//drawSprite(spriteData, width, height, palette, addShadow = 0, flipped = false, rotated = 0) {
			PixelArt.drawSprite(road1, 16, 16, PixelArt.paletteRoad),
			PixelArt.drawSprite(road2, 16, 16, PixelArt.paletteRoad),
			PixelArt.drawSprite(road2, 16, 16, PixelArt.paletteRoad, 0, 0, 1),
			PixelArt.drawSprite(road2, 16, 16, PixelArt.paletteRoad, 0, 0, 2),
			PixelArt.drawSprite(road2, 16, 16, PixelArt.paletteRoad, 0, 0, 3),
		];

		// 16x16, 4 arrays with 0,90,180,270 degrees rotated sprites => 12 sprites total inside: 3 sprites * 4 animated frames each.
		PixelArt.spritesWater = [
			PixelArt.drawSprites(PixelArt.dataTiles, PixelArt.paletteWater),
			PixelArt.drawSprites(PixelArt.dataTiles, PixelArt.paletteWater, 16, 16, false, 1),
			PixelArt.drawSprites(PixelArt.dataTiles, PixelArt.paletteWater, 16, 16, false, 2),
			PixelArt.drawSprites(PixelArt.dataTiles, PixelArt.paletteWater, 16, 16, false, 3)
		];

		// 14x20 transparent sprites
		PixelArt.dataMoai = PixelArt.extract(
			// Front
			"@@Qgc@@@XZ[\\D@@P~@wC@@sGZxf@@~xQGw@@^tQ^t@@VsQVs@@XTItD@@PtxfC@@ZbwTc@@SKZZ[@@\\jvVc@@\`S[[D@@@\\bc@@@wG@x~@x~~uwwGwwu~x~~ncuoFwp]l~~}F@fuwww@" +
			// Left
			"@@XZQs@@@eJJZF@hoS\\lC@x@wcuE@@Qx\\n@@JbGcu@PQ|n\\^A@bfaccC@@LZ\\nD@uWccX@xh\\\\uG@w\\b}n@@\`SDw\\@@@@xecF@@@oZ\\t@@\`UlfeF@lcuuow@e]l~x}hlduEGG@wn~|~@",
			280
		);

		PixelArt.spritesMoai = PixelArt.drawSprites(PixelArt.dataMoai, PixelArt.paletteMoai, 20, 14);
		PixelArt.spritesMoai = PixelArt.spritesMoai.concat(PixelArt.drawSprites(PixelArt.dataMoai, PixelArt.paletteMoai, 20, 14, true));

		// 16x18 transparent sprites
		PixelArt.dataCharacter = PixelArt.extract(
			// Character frames
			"@@@@@xJG@@@@@Wy@@@@~~xG@h@xuuuG@UEg\\[l@JB{h|pc@VFDYCan@p@\`|\`\\e@h@@c\\k@@\\@@twD@@{cWodgfCp\\PEG\\_\\h@PS}cFcp@PZBl@\\h@pRt|@@p@@Vz_D@h@]h@ek@x@Oz@Wy@" +
			"@@@@@xJG@@@@@Wy@@@@~~x@@h@xuuuG@UEg\\[l@JBsoDwc@VFLXK\`n@p@\`|\`\\e@h@@c\\k@@\\@@twD@@{cWodgfCp\\PEG\\_\\h@PS}cFcp@PZBl@\\h@pRt|@@p@@Vz_D@h@]h@ek@x@Oz@Wy@" +
			"@@@@@@Wy@@@@@xJGh@@o~~A@UEpecuG@JB}h|x@@VFDaCa{@x@\`\\c[]@p@pCgc^@\\@hc[l\`@{C@LI}@@pdEgu\`fChXfEG\\_\\p@PS}cFch@VZrl@\\p@pRB|@@h@@V}^D@@@]@@ek@@@O}@oy@"+
			// Ahu
			"@uunmnm@h[[][][Eememmeml\\[c[[c[ccd\\dd\\d\\\\g[_|[gce\\ddcd\\lK_{[__{ynOOIOIOtrdnnfdfscmZ]mm^v|\\cecSmnU\\deld_h^innuctvib]YsmENJlfclgtQKIIIIIIYXRQRJRJC",
			288
		);

		PixelArt.spritesAhu = PixelArt.drawSprites([PixelArt.dataCharacter.pop()], PixelArt.paletteAhu, 18);
		PixelArt.spritesCharacter = PixelArt.drawSprites(PixelArt.dataCharacter, PixelArt.paletteCharacter, 18);
	}

	static drawSprites(data, palette, height = 16, width = 16, flipped = false, rotated = 0) {
		const sprites = [];
		data.forEach((spriteData, id) => {
			if (Array.isArray(palette)) {
				if (data.length < palette.length) {
					// draw tiles that have same data but multiple palettes (grass, water)
					palette.forEach((colors) => {
						sprites.push(PixelArt.drawSprite(spriteData, width, height, colors, 0, flipped, rotated));
					});
				} else {
					// draw objects
					sprites.push(PixelArt.drawSprite(spriteData, width, height, palette[id], id > 1 ? 1 : 0.8, flipped, rotated));
				}
			} else {
				// draw elements that have the same palette (character, moai)
				sprites.push(PixelArt.drawSprite(spriteData, width, height, palette, 1, flipped, rotated));
			}
		});

		return sprites;
	}

	static drawSprite(spriteData, width, height, palette, addShadow = 0, flipped = false, rotated = 0) {
		const spriteCanvas = document.createElement("canvas");
		spriteCanvas.width = width;
		spriteCanvas.height = height + (addShadow ? 1 : 0);// additional pixel in height to add contour via drop-shadow
		const ctx = spriteCanvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;
		if (addShadow) PixelArt.addShadow(ctx, 1, 0, addShadow);

		ctx.save();
		if (rotated == 1) ctx.translate(width, 0);
		else if (rotated == 2) ctx.translate(width, height);
		else if (rotated == 3) ctx.translate(0, height);
		ctx.rotate((Math.PI/2) * rotated);
		for(let y = 0; y < height; y ++) {
			for(let z,x = flipped ? width-1 : 0; flipped ? x > 0 : x < width; flipped ? x -- : x ++) {
				z = (flipped ? width - x : x);
				if (spriteData[y * width + z]) {
					ctx.fillStyle = "#" + palette.substr(6 * (spriteData[y * width + z] - 1), 6);
					ctx.fillRect(x, y, 1, 1);
				}
			}
		}
		ctx.restore();

		return spriteCanvas;
	}

	static addShadow(ctx, y, x, s, c) {
		ctx.shadowColor = c || `rgba(0,0,0,${s || 1})`;
		ctx.shadowOffsetY = y || 0;
		ctx.shadowOffsetX = x || 0;
	}

	static extract(encryptedPixelData, totalPixels) {
		const px = [];

		encryptedPixelData.replace(/./g, function(a) {
			let q = a.charCodeAt();
			px.push(q & 7);
			px.push((q >> 3) & 7);
		});

		let i = 0, length = px.length / totalPixels, sprites = [];

		// initialize sprites data
		for(i = 0; i < length; i++) {
			sprites.push(px.splice(0, totalPixels));
		}

		return sprites;
	}
	
}
