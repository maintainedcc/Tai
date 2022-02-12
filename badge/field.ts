
import { BadgeField } from "../schema/mod.ts";

interface FieldOptions {
  borderRadius: number
  color: string
  content: string
  fontSize: number
  fontWeight?: string
  letterSpacing?: number

  offset: number
  height: number
  width: number
}

export function generateField(o: FieldOptions): string {
  return `
  <rect x="${o.offset}" width="${o.width}" height="${o.height}" fill="${o.color}"/>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${o.fontSize}">
    <text x="${o.width/2 + o.offset}" y="15" fill="#010101" fill-opacity=".3">${o.content}</text>
    <text x="${o.width/2 + o.offset}" y="14">${o.content}</text>
  </g>`;
}

export function icon(field: BadgeField, color: string, offset = 0): string {
  return `
  <image x="${12 + offset}" y="3" height="14px" width="14px" href="${field.iconURI ?? ""}" />`;
}