<p align="center"><a href="https://maintained.cc" target="_blank" rel="noopener noreferrer"><img src=".github/readme/banner.png" width="100%" alt="Maintained"></a></p>

<hr>

## Tai

Tai is a Deno badging module. It is written with Maintained's badging system in mind.

### Permissions

You may need to run scripts that use Tai with the `allow-read` permission, if you use icons in your badges. Tai reads downloaded icons from the filesystem.

### Usage

```ts
import { generate } from "https://deno.land/x/tai/mod.ts";

const badge = {
	fields: [
    {
      content: "Build Status",
      color: 0, // 0-6 or BadgeColor.Simple (etc), refer to BadgeColor enum
      width: 93 // specifies width of badge text (11px Verdana)
    },
    {
      content: "Passing",
      color: 4,
      width: 67
    },
    // ...
    // Minimum one field, unlimited maximum for true mayhem
  ],
	style: 0 // 0-2 or BadgeStyle.Plastic (etc), refer to BadgeStyle enum
}

// Returns SVG string of badge
const svg = await generate(badge);
```

### BadgeStyle & BadgeColor (exported types)
```ts
enum BadgeColor {
	Simple,
	Slate,
	Seabed,
	Subterranean,
	Savannah,
	Sahara,
	Sunset
}

enum BadgeStyle {
	Plastic,
	Flat,
	ForTheBadge
}
```