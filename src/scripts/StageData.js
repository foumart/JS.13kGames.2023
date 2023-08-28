class StageData {

	static getStageData(_stage) {
		return StageData["Stage"+_stage] || StageData.Stage1;
	}
	
	static get Stage1() {
		return {
			name: "Stage 1",
			width: 5, height: 5, x: 2, y: 0,
			map: "958003003",//"A8030600"
			data: "001c0c8c4",
			path: "      3a    f95   6    2",
		};
	}
}