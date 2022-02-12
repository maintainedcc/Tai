
import { mapColor } from "./color.ts";
import { generateField } from "./field.ts";
import { mapStyle } from "./style.ts";
import { generateWrapper } from "./wrapper.ts";
import { IconService } from "../icon/icon.ts";
import { Badge, BadgeStyle, BadgeField } from "../schema/mod.ts";

interface BadgePartial {
	content: string // SVG or HTML string
	title: string // Accessible title string
	width: number // Width calculation (SVG)
}

export class BadgeService {
	private iconService: IconService;
	constructor() {
		this.iconService = new IconService();
	}

	async generate(badge: Badge): Promise<string> {
		let totalWidth = 0;
		let innerContent = "";
		let accessibleTitle: string[] = [];
		
		// Compile badge partials
		if (badge.fields)
			for await (const field of badge.fields) {
				const part = await this.generatePartial(field, badge.style, totalWidth);
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

	private async generatePartial(field: BadgeField, style: BadgeStyle, offset = 0): Promise<BadgePartial> {
		// Parse potential icon (:iconqualifier:)
		if (field.iconURI) {
			field.content = field.content.replace(/^:(.+):/, "").trim();
			field.iconURI = await this.iconService.getIconDataURL(field.iconURI, true);
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

		// Hex color string of partial
		const colorString = mapColor(field.color);

		const mappedStyle = mapStyle(style);
		if (mappedStyle.textTransform)
			field.content = mappedStyle.textTransform(field.content);
		const width = Math.max(field.width * (mappedStyle.scale ?? 1) + 20, mappedStyle.height);
		const opts: any = {
			...mappedStyle,
			color: colorString,
			content: field.content,
			iconURI: field.iconURI,
			offset: offset,
			width: width
		};

		return {
			content: generateField(opts),
			title: field.content,
			width: width + (field.iconURI ? 10 : 0)
		};
	}
}