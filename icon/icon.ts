
// Returns an SVG string or empty string
// Gets icons from simpleicons
export async function getIconDataURL(name: string, forceLight: boolean): Promise<string> {
	const path = `icon/simpleicons/${name}.svg`;
	let svg = await Deno.readTextFile(path).catch(() => "");
	if (!svg) return "";

	// Force fill white
	if (forceLight) svg = svg.replace("<path", "<path fill='#fff'");

	return "data:image/svg+xml;base64," + btoa(svg);
}