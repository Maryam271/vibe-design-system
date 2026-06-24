import { buildLlmsTxt } from "../lib/design-system";

export const prerender = true;

export function GET() {
	return new Response(buildLlmsTxt(), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
