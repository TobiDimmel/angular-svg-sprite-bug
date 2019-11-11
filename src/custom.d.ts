declare module "*.svg" {
	const content: SvgSymbol;
	export default content;
}

interface SvgSymbol {
	id: string,
	viewBox: string,
	url: string,
	toString(): string
}
