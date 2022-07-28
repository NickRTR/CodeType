import { settings } from "$lib/persistentStores";
import { get } from "svelte/store";

export function generateExercise() {
	const { semicolon, doubleQuotes } = get(settings);

	let exercise = javascript[Math.floor(Math.random() * javascript.length)];

	// replace the <varName> placeholder with a random variable name
	exercise = exercise.replace("<variableName>", variableNames[Math.floor(Math.random() * variableNames.length)]);

	// replace the <randomNumber> placeholder with a random number
	exercise = exercise.replace("<randomNumber>", Math.floor(Math.random() * 1000));

	// replace the <randomBoolean> placeholder with a random boolean
	exercise = exercise.replace("<randomBoolean>", Math.floor(Math.random() * 2) === true);

	// replace the <randomName> placeholder with a random name
	exercise = exercise.replace("<randomName>", names[Math.floor(Math.random() * names.length)]);

	// randomly replace the <params> placeholder with a random variable name
	if (Math.floor(Math.random() * 2) === 1) {
		exercise = exercise.replace("<params>", variableNames[Math.floor(Math.random() * variableNames.length)]);
	} else {
		exercise = exercise.replace("<params>", "");
	}

	// replace the <;> placeholder with a semicolon if semicolons are enabled
	if (semicolon) {
		exercise = exercise.replaceAll("<;>", ";");
	} else {
		exercise = exercise.replaceAll("<;>", "");
	}

	// switch between single and double quotes according to settings
	if (doubleQuotes) {
		exercise = exercise.replaceAll("<'>", '"');
	} else {
		exercise = exercise.replaceAll("<'>", "'");
	}

	return exercise;
}

export const javascript = [
	// functions
	"function <variableName>(<params>) {",
	"export async function <variableName>(<params>) {",
	"async function <variableName>(<params>) {",
	"export const <variableName> = async (<params>) => {",
	"export const <variableName> = (<params>) => {",

	// variables
	"let <variableName> = <randomNumber><;>",
	"const <variableName> = <'><randomString><'><;>",
	"var <variableName> = <randomBoolean><;>",
	"const data = await fetch(<'>/api/<variableName><'>)<;>",

	// common syntax
	"console.log(<variableName>)<;>",

	// scripts
	"npm run dev",
	"npm run test",
	"npm run build",
	"npm run format"
];

export const variableNames = ["name", "age", "isMobile", "length", "velocity", "speed", "time", "width", "height"];

export const names = ["Mario", "Luigi", "Peter", "Bob", "Joey", "Aurelio", "Evan", "Donny", "Foster", "Dwayne"];
