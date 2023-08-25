class StageData {

	static getStageData(_stage) {
		return this["Stage"+_stage] || this.Stage1;
	}
	
	static get Stage1() {
		return {
			name: "Stage 1",
			width: 5, height: 5,
			data: [
				
			]
		};
	}
}