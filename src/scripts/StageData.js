class StageData {

	static getStageData(_stage) {
		return StageData["Stage"+_stage] || StageData.Stage1;
	}

	static getStageObj(id) {
		const obj = [
			{
				name: "Easter Island",
				size: 14, x: 6, y: 7,
				map: "aaaaaaaaaaaaaaa85aaaaa001aaaa0005aaa4000128030030900000290000aa90005aa0015aaa0caaaaa00aaaaa82",
				data: "0000000000000002f000009030000660f000fd1074024800d302061831000003200f00903f0007200000b90000024",
				path: "",//"                  eac",
			},
			{
				name: "Stage 1",
				size: 5, x: 2, y: 0,
				map: "9580033c000c",
				data: "00007c424ec2c",
				path: ""//"     26d",
			},
			{
				name: "Stage 2",
				size: 5, x: 3, y: 0,
				map: "00033c000c",
				data: "007c424ec2c",
				path: "   26d",
			}
		];

		obj[id].id = id;

		return obj[id];
	}
	
	static get Stage0() {
		return StageData.getStageObj(0);
	}

	static get Stage1() {
		return StageData.getStageObj(1);
	}

	static get Stage2() {
		return StageData.getStageObj(2);
	}

	//? initial test
	/*static get Stage1() {
		return {
			name: "Stage 1",
			width: 5, height: 5, x: 2, y: 0,
			map: "958003003",//"A8030600"
			data: "001c0c8c4",
			path: "      3a    f95   6    2",
		};
	}*/
}