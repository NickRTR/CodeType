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

	function createCalendar(firstDate, lastDate) {
		const monthDifference = getMonthDifference(firstDate, lastDate);

		const months = [];
		const year = Math.round(monthDifference / 12);
		for (let month = 0; month <= monthDifference; month++) {
			months.push(createMonth(firstDate.getFullYear() + year, month));
		}

		let calendar = [];
		let i = 0;

		// divide months into years of 12 months
		while (i < months.length) {
			calendar.push(months.slice(i, (i += 12)));
		}

		return calendar;
	}

	function getMonthDifference(startDate, endDate) {
		let months;
		months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
		months -= startDate.getMonth();
		months += endDate.getMonth();
		return months <= 0 ? 0 : months;
	}

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

	const calendar = createCalendar(firstDate, lastDate);

	console.log(calendar);
</script>

<main id="heatmap">
	<p>Calendar</p>
	{#each calendar as year}
		{#each year as month}
			{#each month as day, i}
				<div class="day">{i}</div>
			{/each}
		{/each}
	{/each}
</main>

<style>
	.day {
		border: 2px solid grey;
	}
</style>
