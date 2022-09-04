<script>
	export let data;

	function average(key) {
		const values = data.stats.map((stat) => {
			return stat[key];
		});

		if (values.length < 1) {
			return "Not enough data";
		}

		const average = values.reduce((a, b) => a + b, 0) / values.length;

		return Math.round(average, 2);
	}

	function sum(key) {
		const values = data.stats.map((stat) => {
			return stat[key];
		});

		if (values.length < 1) {
			return "Not enough data";
		}

		const sum = values.reduce((a, b) => a + b, 0);

		return Math.round(sum, 2);
	}
</script>

<body>
	<h1>Dashboard</h1>
	<i>Hello {data.user.email}!</i>

	<hr />

	<p>Total exercises: {data.stats.length}</p>
	<p>Total time trained: {sum("time")}s</p>

	<p>Average CPM: {average("CPM")}</p>
	<p>Average WPM: {average("WPM")}</p>
	<p>Average accuracy: {average("accuracy")}%</p>
</body>

<style>
	body {
		text-align: left;
		margin: auto;
	}
</style>
