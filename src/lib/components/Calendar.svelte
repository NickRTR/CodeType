<script>
	export let data;

	const firstDate = new Date(data[0]);
	const lastDate = new Date(data[data.length - 1]);

	function addDay(date) {
		return new Date(date.setDate(date.getDate() + 1));
	}

	function createMonth(year, month) {
		const date = getFirstDayOfMonth(year, month);
		let days = [];
		while (date.getMonth() === month) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return days;
	}

	function createYear(startDate) {
		const year = [];
		for (let month = 0; month < 12; month++) {
			year.push(createMonth(startDate.getYear(), month));
		}
	}
	createYear(firstDate);

	function getMonthLength(year, month) {
		console.log(month);
		console.log(new Date(year, month, 0).getDate());
		return new Date(year, month, 0).getDate();
	}

	function getFirstDayOfMonth(year, month) {
		return new Date(year, month, 1);
	}

	function getLastDayOfMonth(date) {
		return new Date(date.getFullYear(), date.getMonth(), 0);
	}
</script>

<main id="heatmap"><p>Calendar</p></main>
