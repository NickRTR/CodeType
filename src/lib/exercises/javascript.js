export const javascript = [
	// functions
	"function <variableName>(<params>) {",
	"export async function <variableName>(<params>) {",
	"async function <variableName>(<params>) {",
	"export const <variableName> = async (<params>) => {",
	"export const <variableName> = (<params>) => {",

	// variables
	"<variableModifier> <variableName> = <randomNumber><;>",
	"<variableModifier> <variableName> = <'><randomString><'><;>",
	"<variableModifier> <variableName> = <randomBoolean><;>",
	"<variableModifier> res = await fetch(<'>/api/<variableName><'>)<;>",

	// common syntax
	"console.log(<variableName>)<;>",

	// scripts
	"npm run dev",
	"npm run test",
	"npm run build",
	"npm run format"
];
