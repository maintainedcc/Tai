
export interface Badge {
	fields: BadgeField[]
	style: BadgeStyle

	// These fields are also found in the Maintained
	// badge spec, but aren't used by Tai
	// id: number
	// redirect?: string
}

export interface BadgeField {
	content: string
	color: BadgeColor
	iconURI?: string // Icon Resource
	source?: string // DVS URL
	width: number
}

export enum BadgeColor {
	Simple,
	Slate,
	Seabed,
	Subterranean,
	Savannah,
	Sahara,
	Sunset
}

export enum BadgeStyle {
	Plastic,
	Flat,
	ForTheBadge
}