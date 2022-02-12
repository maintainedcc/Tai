
interface WrapperOptions {
  content: string
  title: string
  height: number
  width: number
}

export function generateWrapper(o: WrapperOptions): string {
  return `
		<svg xmlns="http://www.w3.org/2000/svg" width="${o.width}" height="${o.height}">
			<title>${o.title}</title>
			${o.content}
		</svg>`;
}