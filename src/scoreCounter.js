export const counter = {
	value: 1000
};

export const interval = {
}

const CheckReload = (() => {
	return () => {
		counter.value-=5;
		return counter.value;
	};
})();

export const startCounter = () => {

	interval.refreshId = setInterval(
		() => {
			const properID = CheckReload();
			document.querySelector("#timer").textContent = properID;

			if (properID < 105) {
				clearInterval(interval.refreshId);
			}
		},
		100
	);
}

