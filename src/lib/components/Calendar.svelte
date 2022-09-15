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
			count[`${stat.getFullYear()}.${stat.getMonth()}.${stat.getDate()}`] = (count[`${stat.getFullYear()}.${stat.getMonth()}.${stat.getDate()}`] || 0) + 1;
		});

		Object.keys(count).forEach((date) => {
			const dateObject = new Date(date);
			calendar[0][0][dateObject.getDate()] = count[date];
		});

		// console.log(calendar[0][0]);
	}

	function getYear(index) {
		return firstDate.getFullYear() + index;
	}

	function getMonth(index) {
		const month = firstDate.getMonth() + index;
		return new Date(2000, month).toLocaleString("en-US", {
			month: "long"
		});
	}

	function getColor(exercises) {
		if (exercises === 0) {
			return 0;
		} else if (exercises < 5) {
			return 1;
		} else if (exercises < 10) {
			return 2;
		} else if (exercises < 20) {
			return 3;
		} else if (exercises >= 20) {
			return 4;
		} else {
			return 0;
		}
	}

	const calendar = createCalendar(firstDate, lastDate);
</script>

<main id="heatmap">
	<h3>Activity map</h3>
	{#each calendar as year, y}
		{#each year as month, m}
			<p>{getMonth(m)} {getYear(y)}</p>
			<div class="days">
				{#each Object.values(month) as day}
					<div class="day" class:p0={getColor(day) === 0} class:p1={getColor(day) === 1} class:p2={getColor(day) === 2} class:p3={getColor(day) === 3} class:p4={getColor(day) === 4}>{day}</div>
				{/each}
			</div>
		{/each}
	{/each}
</main>

<style>
	main {
		display: inline-block;
		margin-bottom: 1rem;
	}

	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.25rem;
	}

	.day {
		display: flex;
		justify-content: center;
		align-items: center;
		filter: opacity(calc());
		color: var(--background);
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.25rem;
	}

	.p0 {
		background-color: white;
	}

	.p1 {
		background-color: #b7efc5;
	}

	.p2 {
		background-color: #6ede8a;
	}

	.p3 {
		background-color: #2dc653;
	}

	.p4 {
		background-color: lime;
	}
</style>
