
import { BadgeField } from "../schema/mod.ts";

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

export function generateField(o: FieldOptions): string {
  let iOffset = o.iconURI ? 10 : 0;

  o.width += iOffset;
  const tx = o.width/2 + o.offset + iOffset;
  const ty = o.height/2 + 4;

  return `
  <rect x="${o.offset}" width="${o.width}" height="${o.height}" fill="${o.color}"/>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif"
      font-size="${o.fontSize}" font-weight="${o.fontWeight}" letter-spacing="${o.letterSpacing ?? 0}px">
    ${icon(o.iconURI ?? "", o.offset + 8, (o.height - 14)/2)}
    <text x="${tx}" y="${ty+1}" fill="#010101" fill-opacity=".3">${o.content}</text>
    <text x="${tx}" y="${ty}">${o.content}</text>
  </g>`;
}

export function icon(iconURI: string, x: number, y: number): string {
  return `
  <image x="${x}" y="${y}" height="14px" width="14px" href="${iconURI}" />`;
}