
import { mapColor } from "./color.ts";
import { generateField } from "./field.ts";
import { mapStyle } from "./style.ts";
import { generateWrapper } from "./wrapper.ts";
import { getIconDataURL } from "../icon/icon.ts";
import { Badge, BadgeStyle, BadgeField } from "../schema/mod.ts";

interface BadgePartial {
	content: string // SVG or HTML string
	title: string // Accessible title string
	width: number // Width calculation (SVG)
}

export async function generate(badge: Badge): Promise<string> {
	let totalWidth = 0;
	let innerContent = "";
	const accessibleTitle: string[] = [];
	
	// Compile badge partials
	if (badge.fields)
		for await (const field of badge.fields) {
			const part = await generatePartial(field, badge.style, totalWidth);
			totalWidth += part.width;
			innerContent += part.content;
			accessibleTitle.push(part.title);
		}

	const aTitle = accessibleTitle.join(" ");
	const mappedStyle = mapStyle(badge.style);
	return generateWrapper({
		content: innerContent,
		title: aTitle,
		height: mappedStyle.height,
		width: totalWidth,
	});
}

async function generatePartial(field: BadgeField, style: BadgeStyle, offset = 0): Promise<BadgePartial> {
	// Parse potential icon (:iconqualifier:)
	if (field.iconURI) {
		field.content = field.content.replace(/^:(.+):/, "").trim();
		field.iconURI = await getIconDataURL(field.iconURI, true);
	}

	// If Dynamic, get the DVS content
	if (field.source) {
		await fetch(field.source)
			.then(res => res.text())
			.then(res => { 
				// Update content and content width
				field.content = res;
				field.width = field.content.length * 5.7;
			})
			.catch(ex => console.warn(ex));
	}

	const mappedStyle = mapStyle(style);
	if (mappedStyle.textTransform)
		field.content = mappedStyle.textTransform(field.content);
	const width = Math.max(field.width * (mappedStyle.scale ?? 1) + 20, mappedStyle.height);
	const opts: any = {
		...mappedStyle,
		color: mapColor(field.color),
		content: field.content,
		iconURI: field.iconURI,
		offset: offset,
		width: width
	};

	const fieldResult = generateField(opts);
	return {
		content: fieldResult.content,
		title: field.content,
		width: fieldResult.width
	};
}