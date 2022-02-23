
// Icon set paths to query
const iconSets = ["simple-icons/icons", "twbs-icons/icons"];
// Reject reads if permission not granted
const granted = (await Deno.permissions.query({ name: "read" })).state === "granted";

// Returns an SVG string or empty string if not found
export async function getIconDataURL(name: string, forceLight: boolean): Promise<string> {
	if (!granted) {
		console.error("Permission denied: read access to icon files");
		return "";
	}

	// Get SVG and change color to be white
	let svg = await readSVG(name);
	if (!svg) return "";
	if (forceLight) {
		svg = svg.replace("fill=\"currentColor\"", "fill=\"#fff\"");
		svg = svg.replace("<path", "<path fill='#fff'");
	}

	// Return as data URL
	return "data:image/svg+xml;base64," + btoa(svg);
}

// Checks all downloaded iconsets for icon presence
async function readSVG(name: string): Promise<string> {
	for (const iconSet of iconSets) {
		const path = `icon/${iconSet}/${name}.svg`;
		let svg = "";
		try { svg = await Deno.readTextFile(path); }
		catch (e) { continue; }
		if (svg) return svg;
	}
	return "";
}