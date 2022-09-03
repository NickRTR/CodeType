<script>
	export let data;

	function averageCPM() {
		const CPMs = data.stats.map((stat) => {
			return stat.CPM;
		});

		const average = CPMs.reduce((a, b) => a + b, 0) / CPMs.length;

		return average;
	}
</script>

<body>
	<h1>Dashboard</h1>
	<p>Hello {data.user.email}</p>

	<p>Average CPM: {averageCPM()}</p>
</body>
