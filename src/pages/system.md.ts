import { buildSystemMd } from "../lib/design-system";

export const prerender = true;

export function GET() {
	return new Response(buildSystemMd(), {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
}
