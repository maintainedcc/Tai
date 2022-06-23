<p align="center"><a href="https://maintained.cc" target="_blank" rel="noopener noreferrer"><img src=".github/readme/banner.png" width="100%" alt="Maintained"></a></p>

# Tai

Tai is a Deno badge generation module. It is written with [Maintained](https://github.com/maintainedcc/Maintained)'s badging system in mind.

### Examples

The following are examples of Tai badges:

![https://tai.maintained.cc/ivynya/Maintained/1](https://tai.maintained.cc/ivynya/Maintained/1)

![https://tai.maintained.cc/ivynya/Maintained/2](https://tai.maintained.cc/ivynya/Maintained/2)

![https://tai.maintained.cc/ivynya/Maintained-Tai/1](https://tai.maintained.cc/ivynya/Maintained-Tai/1)

### Permissions

You may need to run scripts that use Tai with the `allow-read` permission, if you use icons in your badges. Tai reads downloaded icons from the filesystem in `./icon/simple-icons/icons`, relative from the Deno execution context.

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

### (Current) Caveats

Because Tai is built with Maintained in mind first and foremost, it offloads the width calculation of badge fields to the Maintained dashboard (or whatever project consumes it). This makes sense to reduce development overhead because browsers/web apps can calculate the width easily, while an additional package would be needed in Tai.
