import { semicolon } from "$lib/stores";
import { get } from "svelte/store";

export function generateExercise() {
	let exercise = javascript[Math.floor(Math.random() * javascript.length)];

	// replace the <varName> placeholder with a random variable name
	exercise = exercise.replace(
		"<varName>",
		variableNames[Math.floor(Math.random() * variableNames.length)]
	);

	// replace the <randomNumber> placeholder with a random number
	exercise = exercise.replace("<randomNumber>", Math.floor(Math.random() * 1000));

	// replace the <;> placeholder with a semicolon if semicolons are enabled
	if (get(semicolon)) {
		exercise = exercise.replace("<;>", ";");
	} else {
		exercise = exercise.replace("<;>", "");
	}

	return exercise;
}

export const javascript = [
	"function <varName>()",
	"let <varName> = <randomNumber><;>",
	"const <varName> = <RandomName><;>"
];

export const variableNames = ["name", "age"];

export const names = ["Mario", "Luigi", "Peter", "Bob"];
