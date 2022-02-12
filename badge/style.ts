
import { BadgeStyle } from "../schema/mod.ts";

interface StyleDefinition {
  borderRadius: number
  fontSize: number
  fontWeight?: string
  letterSpacing?: number
}

export function mapStyle(style: BadgeStyle) {
  switch(style) {
    case BadgeStyle.Plastic:
      return {
        borderRadius: 3,
        fontSize: 11
      };
    case BadgeStyle.Flat:
      return {
        borderRadius: 0,
        fontSize: 11
      };
    case BadgeStyle.ForTheBadge:
      return {
        fontSize: 13,
        fontWeight: "bold",
        letterSpacing: 1
      };
    default: return {}
  }
}