import { settings } from "$lib/persistentStores";
import { get } from "svelte/store";

import { variableNames } from "$lib/exercises/variableNames";
import { strings } from "$lib/exercises/strings";
import { javascript } from "$lib/exercises/javascript";

export default function generateExercise() {
	let exercise = javascript[Math.floor(Math.random() * javascript.length)];

	exercise = replaceVariableName(exercise);
	exercise = replaceRandomNumber(exercise);
	exercise = replaceRandomBoolean(exercise);
	exercise = replaceRandomString(exercise);
	exercise = replaceParams(exercise);
	exercise = replaceVariableModifier(exercise);
	exercise = replaceSemicolon(exercise);
	exercise = replaceQuotes(exercise);

	return exercise;
}

function replaceVariableName(exercise) {
	// replaces the <varName> placeholder with a random variable name
	return exercise.replace("<variableName>", variableNames[Math.floor(Math.random() * variableNames.length)]);
}

function replaceRandomNumber(exercise) {
	// replaces the <randomNumber> placeholder with a random number
	return exercise.replace("<randomNumber>", Math.floor(Math.random() * 999));
}

function replaceRandomBoolean(exercise) {
	// replaces the <randomBoolean> placeholder with a random boolean
	return exercise.replace("<randomBoolean>", Math.floor(Math.random() * 2) === true);
}

function replaceRandomString(exercise) {
	// replaces the <randomString> placeholder with a random name
	return exercise.replace("<randomString>", strings[Math.floor(Math.random() * strings.length)]);
}

function replaceParams(exercise) {
	// randomly replaces the <params> placeholder with a random variable name
	if (Math.floor(Math.random() * 2) === 1) {
		return exercise.replace("<params>", variableNames[Math.floor(Math.random() * variableNames.length)]);
	} else {
		return exercise.replace("<params>", "");
	}
}

function replaceVariableModifier(exercise) {
	// replaces the <variableModifier> placeholder with a random variable modifier (const, let, var)
	const modifier = Math.floor(Math.random() * 3);
	switch (modifier) {
		case 1:
			return exercise.replace("<variableModifier>", "let");
		case 2:
			return exercise.replace("<variableModifier>", "const");
		case 3:
			return exercise.replace("<variableModifier>", "var");
		default:
			return exercise.replace("<variableModifier>", "let");
	}
}

function replaceSemicolon(exercise) {
	const { semicolon } = get(settings);

	// replaces the <;> placeholder with a semicolon if semicolons are enabled in settings
	if (semicolon) {
		return exercise.replaceAll("<;>", ";");
	} else {
		return exercise.replaceAll("<;>", "");
	}
}

function replaceQuotes(exercise) {
	const { doubleQuotes } = get(settings);

	// switches between single and double quotes according to settings
	if (doubleQuotes) {
		return exercise.replaceAll("<'>", '"');
	} else {
		return exercise.replaceAll("<'>", "'");
	}
}
