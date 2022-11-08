<script>
	import Graph from "$lib/components/Graph.svelte";
	import Calendar from "$lib/components/Calendar.svelte";

	export let data;

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
			case "highest":
				result = values.sort();
				result = result[result.length - 1];
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

	function cutDay(date) {
		return parseInt(date.substr(8, 10));
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
			if (i === 0 || cutDay(date) - 1 === cutDay(uniqueDates[i - 1])) {
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

	let graphLabels = [];

	for (let i = 0; i < 15; i++) {
		const totalExercises = data.stats.length;
		graphLabels.unshift(totalExercises - i);
	}

	const graphData = [filterKeyValues("WPM").reverse().slice(0, 15), filterKeyValues("CPM").reverse().slice(0, 15), filterKeyValues("mistakes").reverse().slice(0, 15)];
</script>

<body>
	<h1>Dashboard</h1>
	<i><span>Hello</span> {data.user.email}!</i>

	<hr />

	<p>Total days practiced on: <span>{days().uniqueDates}</span></p>
	<p>Current Streak: <span>{days().streak} days</span></p>
	<p>Longest Streak: <span>{days().longestStreak} days</span></p>
	<p>Total exercises: <span>{data.stats.length}</span></p>
	<p>Total time trained: <span>{Math.floor(calculate("sum", "time") / 60)}m {calculate("sum", "time") - Math.floor(calculate("sum", "time") / 60) * 60}s</span></p>

	<p>Best CPM: <span>{calculate("highest", "CPM")}</span></p>
	<p>Best WPM: <span>{calculate("highest", "WPM")}</span></p>

	<p>Average CPM: <span>{calculate("average", "CPM")}</span></p>
	<p>Average WPM: <span>{calculate("average", "WPM")}</span></p>
	<p>Average accuracy: <span>{calculate("average", "accuracy")}%</span></p>

	<hr />

	<Graph width="500px" height="" data={graphData} labels={graphLabels} titles={["WPM", "CPM", "Mistakes"]} />

	<Calendar data={filterKeyValues("created_at")} />
</body>

<style>
	body {
		text-align: left;
		margin: auto;
	}

	span {
		color: var(--accent);
	}
</style>
