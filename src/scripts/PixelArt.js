class PixelArt {

	static init() {

		PixelArt.paletteObjects = [
			"2dcb0053ff000083007e321a622411b04321d3702e",
			"067c000ebb0046e40059ff00d041147e321a622411",
			"f7e064b4897c5f4e482b8a0e1e68078d4029622411",
			"89b3ff427eeb1e61db1448a60b378532bd17077707",
			"5f4e424c3f35947f6f7d6a5cb59c88d0b7a5403329"
		];
		PixelArt.paletteMoai = "cdaf98a88e7986715f6b56455444364736292d211a";
		PixelArt.paletteCharacter = "fffdc1ff4e24fe9773cb7151864016642600401800";
		PixelArt.paletteAhu = "d0b7a5b39c8a947f6f7d6a5c5f4e424c3f35b69c88";
		PixelArt.paletteTiles = [
			"97de595cc149f5cf7597de59f5cf75f5cf75f5cf75",
			"97de595cc149f5cf757cc9ff1e8edcfe751ae4ff00",
			"97de595cc149f5cf75f5cf75f5cf75fe751ae4ff00",
			"97de595cc149f5cf757cc9ff1e8edcf5cf7597de59"
		];

		PixelArt.dataObjects = PixelArt.extract(
			// Palm
			"HIRY@@@@@[IJC@A@@@[QaHJ@@@X[eQQAPI@hn[IJJ[ItDX[QYQJcM@@KKJ[lLJ@HQYxf]QAXHCpl\\KB@X@xfE[A@@@plDXA@@@xfEX@@@@plD@@@@@\`eE@@@@@@m@@@@" +
			// Tree
			"@@@QA@@@@@PdJ@R@@RP\\SP\\BPdBZAPdSP\\BHAa[J@ZAppMSA@Hnb~@@@Q@P\\BPB@bTP\\zbT@b[OJqb[BaSEyFbSAHRAwGQSA@I@nFHI@@@@uG@@@@@@~F@@@@@puw@@@" +
			// Rock
			"@@@@RZB@@@@PY~S@@@@JQG_B@@PIZ^XB@@NQry{C@@KRN_GG@xQRQz{C@tYJRJZG\`Or_RQCChKRCNZx@xNrxSRwc}QZwR{PoSRCWZ\\JzS{c{}S|\\po_G_}x}Gx{G" +
			// Lake
			"@@@wGp@@pGxeewGFxll[JllGfQ[SIZ[}W[SJZ[Kj\\SR[[KQ[cbcccZ[STll\\\\\\SjeeeeeebkmlllllllmmmeeeemommmmmmEpmmmmmmFpxmmmmwGx@vGw@@@G@x@x@" +
			// Ahu
			"@IIJIJI@H[[Y[Y[AaIaIIaIL\\[c[[c[ccd\\dd\\d\\\\e[]l[eca\\ddcd\\Ls]k[]]knJuuvuvu|UdJJbdbScI]YIIZWl\\cackIOl\\daLd]OYNJJQc|z\`eY^SIyG@cbcLe|@",
			256
		);

		PixelArt.spritesObjects = PixelArt.drawSprites(PixelArt.dataObjects, PixelArt.paletteObjects);

		PixelArt.dataTiles = PixelArt.extract(
			// Grass (uses 4 palettes)
			"@@c_qCH@@hS[~^SAXeMSsY[BSkC@@P[[NC@@h@XKwHHKeEBqFP@PhYB@HP@@@ZCHP@P[A@@P@XN[[@A@YswKKEB@ZJ^SklYZ[SH@[]sY[C@@@Z~^S@@BAAqKP@A[B@@C",
			256
		);

		PixelArt.spritesTiles = PixelArt.drawSprites(PixelArt.dataTiles, PixelArt.paletteTiles);

		PixelArt.dataMoai = PixelArt.extract(
			// Front
			"@@Qgc@@@XZ[\\D@@P~@wC@@sGZxf@@~xQGw@@^tQ^t@@VsQVs@@XTItD@@PtxfC@@ZbwTc@@SKZZ[@@\\jvVc@@\`S[[D@@@\\bc@@@wG@x~@x~~uwwGwwu~x~~ncuoFwp]l~~}F@fuwww@" +
			// Left
			"@@XZQs@@@eJJZF@hoS\\lC@x@wcuE@@Qx\\n@@JbGcu@PQ|n\\^A@bfaccC@@LZ\\nD@uWccX@xh\\\\uG@w\\b}n@@\`SDw\\@@@@xecF@@@oZ\\t@@\`UlfeF@lcuuow@e]l~x}hlduEGG@wn~|~@" +
			// Right - TODO: remove the following, will flip the tile while drawing on canvas
			"@ZbZ@@@xZJQl@@PecZ}E@hn\\~@G@@ucGJ@@@n\\xTQ@HscugJBXl\\LtT@\`ubSa@@@CT\\zn@@xnccEG@@uoTc~@@c~\`ZD@p\\lG@@@fYZ}@@pTtekD@~e~n^e@oltGGl@xeE~~\`E@wgwu~@",
			280
		);

		PixelArt.spritesMoai = PixelArt.drawSprites(PixelArt.dataMoai, PixelArt.paletteMoai, 20, 14);

		PixelArt.dataCharacter = PixelArt.extract(
			"@@@@@xJG@@@@@Wy@@@@~~xG@h@xuuuG@UEg\\[l@JB{h|pc@VFDYCan@p@\`|\`\\e@h@@c\\k@@\\@@tWD@@{cWoegfCp\\PEG\\_\\h@PS}cFcp@PZBl@\\h@pRt|@@p@@Vz_D@h@]h@ek@x@Oz@Wy@" +
			"@@@@@xJG@@@@@Wy@@@@~~xG@h@xuuuG@UEg\\[l@JBsoDwc@VFLXK\`n@p@\`|\`\\e@h@@c\\k@@\\@@tWD@@{cWoegfCp\\PEG\\_\\h@PS}cFcp@PZBl@\\h@pRt|@@p@@Vz_D@h@]h@ek@x@Oz@Wy@" +
			"@@@@@@Oz@@@@@xQGh@@o~~B@UEpecuG@JB}h|x@@VFDaCa{@x@\`\\c[]@p@pCgc^@\\@hc[l\`@{C@LI}@@pdEgu\`fChXfEG\\_\\p@PS}cFch@VZrl@\\p@pRB|@@h@@V}^D@@@]@@ek@@@O}@oy@"+
			"@uunmnm@h[[][][Eememmeml\\[c[[c[ccd\\dd\\d\\\\g[_|[gce\\ddcd\\lK_{[__{ynOOIOIOtrdnnfdfscmZ]mm^v|\\cecSmnU\\deld_h^innuctvib]YsmENJlfclgtQKIIIIIIYXRQRJRJC",
			288
		);

		PixelArt.spritesAhu = PixelArt.drawSprites([PixelArt.dataCharacter.pop()], PixelArt.paletteAhu, 18);
		PixelArt.spritesCharacter = PixelArt.drawSprites(PixelArt.dataCharacter, PixelArt.paletteCharacter, 18);
	}

	static drawSprites(data, palette, height = 16, width = 16) {
		const sprites = [];
		data.forEach((spriteData, id) => {
			if (Array.isArray(palette)) {
				if (data.length < palette.length) {
					// draw tiles that have same data but multiple palettes (grass)
					palette.forEach((colors) => {
						sprites.push(PixelArt.drawSprite(spriteData, width, height, colors));
					});
				} else {
					// draw objects
					sprites.push(PixelArt.drawSprite(spriteData, width, height, palette[id], id > 2 ? 0 : (id + 1) * 0.25));
				}
			} else {
				// draw elements that have the same palette (character, moai)
				sprites.push(PixelArt.drawSprite(spriteData, width, height, palette, 1));
			}
		});

		return sprites;
	}

	static drawSprite(spriteData, width, height, palette, addShadow = 0) {
		const spriteCanvas = document.createElement("canvas");
		spriteCanvas.width = width;
		spriteCanvas.height = height + 1;
		const ctx = spriteCanvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;
		if (addShadow) PixelArt.addShadow(ctx, 1, 0, addShadow);

		for(let y = 0; y < height; y ++) {
			for(let x = 0; x < width; x ++) {
				if (spriteData[y * width + x]) {
					ctx.fillStyle = "#" + palette.substr(6 * (spriteData[y * width + x] - 1), 6);
					ctx.fillRect(x, y, 1, 1);
				}
			}
		}

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
