
interface FieldOptions {
  borderRadius: number
  color: string
  content: string
  fontSize: number
  fontWeight?: string
  letterSpacing?: number

  iconURI?: string

  offset: number
  height: number
  width: number
}

interface FieldResult {
  content: string
  width: number
}

export function generateField(o: FieldOptions): FieldResult {
  // Icon size
  const isz = o.iconURI ? o.height*2/3 : 0;

  // Icon padding left & right
  let ipl = 0, ipr = 0;
  if (o.iconURI) {
    ipl = o.content ? o.height/3 : o.height/6;
    ipr = o.content ? o.height/3 : o.height/6;
  }

  // Text positioning + transform
  const tr = (isz+ipl+ipr)*2/3;
  const tx = o.width/2 + o.offset;
  const ty = o.height/2 + 4.5;

  // Increase width to accomodate icon
  // If content doesn't exist, already sufficient
  o.width += o.content ? tr : 0;

  return {
    content: `
      <rect x="${o.offset}" width="${o.width}" height="${o.height}" fill="${o.color}"/>
      <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif"
          font-size="${o.fontSize}" font-weight="${o.fontWeight}" letter-spacing="${o.letterSpacing ?? 0}px">
        ${icon(o.iconURI ?? "", o.offset + ipl, o.height)}
        <text x="${tx}" y="${ty+1}" transform="translate(${tr})" fill="#010101" fill-opacity=".3">${o.content}</text>
        <text x="${tx}" y="${ty}" transform="translate(${tr})">${o.content}</text>
      </g>`,
    width: o.width
  }
}

function icon(iconURI: string, x: number, h: number): string {
  const s = h*2/3;
  const y = (h-s)/2;
  return `
  <image x="${x}" y="${y}" height="${s}px" width="${s}px" href="${iconURI}" />`;
}