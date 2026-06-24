import { buildDesignJson } from "../lib/design-system";

export const prerender = true;

export function GET() {
	const body = JSON.stringify(buildDesignJson(), null, 2) + "\n";
	return new Response(body, {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	});
}
