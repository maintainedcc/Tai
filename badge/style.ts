
import { BadgeStyle } from "../schema/mod.ts";

interface StyleDefinition {
  borderRadius: number
  fontSize: number
  fontWeight?: string
  letterSpacing?: number
  height: number

  padding?: number
  scale?: number
}

export function mapStyle(style: BadgeStyle): StyleDefinition {
  switch(style) {
    case BadgeStyle.Plastic:
      return {
        borderRadius: 3,
        fontSize: 11,
        height: 20
      };
    case BadgeStyle.Flat:
      return {
        borderRadius: 0,
        fontSize: 11,
        height: 20
      };
    case BadgeStyle.ForTheBadge:
      return {
        borderRadius: 0,
        fontSize: 13,
        fontWeight: "bold",
        letterSpacing: 1,
        height: 36,
        scale: 1.8
      };
  }
}