<script>
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
			case "sum":
				result = values.reduce((a, b) => a + b, 0);
				break;
		}

		return Math.round(result, 2);
	}

	function days() {
		const times = filterKeyValues("created_at");

		const dates = times.map((time) => {
			return time.substr(0, 10);
		});

		const uniqueDates = [...new Set(dates)];

		return uniqueDates.length;
	}
</script>

<body>
	<h1>Dashboard</h1>
	<i>Hello {data.user.email}!</i>

	<hr />

	<p>Total days practiced on: {days()}</p>
	<p>Total exercises: {data.stats.length}</p>
	<p>Total time trained: {calculate("sum", "time")}s</p>

	<p>Average CPM: {calculate("average", "CPM")}</p>
	<p>Average WPM: {calculate("average", "WPM")}</p>
	<p>Average accuracy: {calculate("average", "accuracy")}%</p>
</body>

<style>
	body {
		text-align: left;
		margin: auto;
	}
</style>
