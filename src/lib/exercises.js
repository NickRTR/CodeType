import { settings } from "$lib/persistentStores";
import { get } from "svelte/store";

export function generateExercise() {
	const { semicolon, doubleQuotes } = get(settings);

	let exercise = javascript[Math.floor(Math.random() * javascript.length)];

	// replace the <varName> placeholder with a random variable name
	exercise = exercise.replace("<variableName>", variableNames[Math.floor(Math.random() * variableNames.length)]);

	// replace the <randomNumber> placeholder with a random number
	exercise = exercise.replace("<randomNumber>", Math.floor(Math.random() * 1000));

	// replace the <randomName> placeholder with a random name
	exercise = exercise.replace("<randomName>", names[Math.floor(Math.random() * names.length)]);

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
	"function <variableName>()",
	"let <variableName> = <randomNumber><;>",
	"const <variableName> = <'><randomName><'><;>",
	"console.log(<variableName>)<;>",
	"npm run dev",
	"npm run test",
	"npm run build",
	"npm run format",
	"export async function <variableName>() {",
	"export const <variableName> = async () => {"
];

export const variableNames = ["name", "age", "isMobile", "length", "velocity", "speed", "time"];

export const names = [
	"Mario",
	"Luigi",
	"Peter",
	"Bob",
	"Joey",
	"Aurelio",
	"Evan",
	"Donny",
	"Foster",
	"Dwayne",
	"Grady",
	"Quinton",
	"Darin",
	"Mickey",
	"Hank",
	"Kim",
	"Peter",
	"Jeremy",
	"Jess",
	"Jimmie",
	"Vern",
	"Pasquale",
	"Romeo",
	"Chris"
];
