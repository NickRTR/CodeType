<script>
	export let data;

	const firstDate = new Date(data[0]);
	const lastDate = new Date(data[data.length - 1]);

	function createMonth(year, month) {
		const date = getFirstDayOfMonth(year, month);

		let days = [];
		while (date.getMonth() === month) {
			// days[new Date(date)] = 0;
			days.push(0);
			date.setDate(date.getDate() + 1);
		}

		return days;
	}

	function createCalendar(firstDate, lastDate) {
		const monthDifference = getMonthDifference(firstDate, lastDate);

		const months = [];
		for (let month = 0; month <= monthDifference; month++) {
			const year = Math.round(month / 12);
			months.push(createMonth(firstDate.getFullYear() + year, firstDate.getMonth() + month));
		}

		let calendar = [];
		let i = 0;

		// divide months into years of 12 months
		while (i < months.length) {
			calendar.push(months.slice(i, (i += 12)));
		}

		joinCalendarWithData(calendar);

		return calendar;
	}

	function getMonthDifference(startDate, endDate) {
		let months;
		months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
		months -= startDate.getMonth();
		months += endDate.getMonth();
		return months <= 0 ? 0 : months;
	}

	function getFirstDayOfMonth(year, month) {
		return new Date(year, month, 1);
	}

	function joinCalendarWithData(calendar) {
		const count = {};

		// count multiple exercises on same day
		data.forEach((stat) => {
			stat = new Date(stat);
			console.log(stat);
			count[`${stat.getFullYear()}.${stat.getMonth()}.${stat.getDate()}`] = (count[`${stat.getFullYear()}.${stat.getMonth()}.${stat.getDate()}`] || 0) + 1;
		});

		Object.keys(count).forEach((date) => {
			const dateObject = new Date(date);
			calendar[0][0][dateObject.getDate()] = count[date];
		});

		console.log(calendar[0][0]);
	}

	const calendar = createCalendar(firstDate, lastDate);
</script>

<main id="heatmap">
	<p>Calendar</p>
	{#each calendar as year}
		{#each year as month}
			<div class="days">
				{#each Object.values(month) as day, i}
					<div class="day">{day}</div>
				{/each}
			</div>
		{/each}
	{/each}
</main>

<style>
	.days {
		display: flex;
		flex-grow: 4;
	}

	.day {
		border: 2px solid grey;
	}
</style>
