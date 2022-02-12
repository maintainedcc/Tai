
import { BadgeColor } from "../schema/mod.ts";

export function mapColor(color: BadgeColor|string): string {
  switch(color) {
    case BadgeColor.Simple:
      return "#555";
    case BadgeColor.Slate:
      return "#556";
    case BadgeColor.Seabed:
      return "#013";
    case BadgeColor.Subterranean:
      return "#111";
    case BadgeColor.Savannah:
      return "#AB2";
    case BadgeColor.Sahara:
      return "#F80";
    case BadgeColor.Sunset:
      return "#F20";
    default: return color;
  }
}