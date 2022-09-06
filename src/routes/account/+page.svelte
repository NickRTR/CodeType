<script>
	import Chart from "$lib/components/Chart.svelte";

	export let data;

	console.log(filterUniqueDates());

	function filterKeyValues(key) {
		return data.stats.map((stat) => {
			return stat[key];
		});
	}

	function calculate(operator, key) {
		const values = filterKeyValues(key);

		if (values.length < 1) {
			return "Not enough data";
		}

		let result;

		switch (operator) {
			case "average":
				result = values.reduce((a, b) => a + b, 0) / values.length;
				break;
			case "sum":
				result = values.reduce((a, b) => a + b, 0);
				break;
		}

		return Math.round(result, 2);
	}

	function cutDate(times) {
		return times.map((time) => {
			return time.substr(0, 10);
		});
	}

	function filterUniqueDates() {
		const times = filterKeyValues("created_at");

		const dates = cutDate(times);

		return [...new Set(dates)];
	}

	function days() {
		const uniqueDates = filterUniqueDates();

		let longestStreak = 0;
		let streak = 0;
		for (let i = 0; i < uniqueDates.length; i++) {
			const date = uniqueDates[i];
			// or i === 0 to include first day, where uniqueDates[i - 1] is undefined
			if (date > uniqueDates[i - 1] || i === 0) {
				streak++;
				if (streak > longestStreak) {
					longestStreak = streak;
				}
			} else {
				streak = 0;
			}
		}

		let days = {
			uniqueDates: uniqueDates.length,
			streak,
			longestStreak
		};

		return days;
	}

	const graphLabels = cutDate(filterKeyValues("created_at").reverse().slice(0, 5));
	const graphData = [filterKeyValues("WPM").reverse().slice(0, 5), filterKeyValues("CPM").reverse().slice(0, 5), filterKeyValues("mistakes").reverse().slice(0, 5)];
</script>

<body>
	<h1>Dashboard</h1>
	<i>Hello {data.user.email}!</i>

	<hr />

	<p>Total days practiced on: {days().uniqueDates}</p>
	<p>Current Streak: {days().streak}</p>
	<p>Longest Streak: {days().longestStreak}</p>
	<p>Total exercises: {data.stats.length}</p>
	<p>Total time trained: {calculate("sum", "time")}s</p>

	<p>Average CPM: {calculate("average", "CPM")}</p>
	<p>Average WPM: {calculate("average", "WPM")}</p>
	<p>Average accuracy: {calculate("average", "accuracy")}%</p>

	<hr />

	<Chart width="500px" data={graphData} labels={graphLabels} titles={["WPM", "CPM", "Mistakes"]} />
</body>

<style>
	body {
		text-align: left;
		margin: auto;
	}
</style>
