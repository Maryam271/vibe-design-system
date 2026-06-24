import { buildTokensCss } from "../lib/design-system";

export const prerender = true;

export function GET() {
	return new Response(buildTokensCss(), {
		headers: {
			"Content-Type": "text/css; charset=utf-8",
		},
	});
}
