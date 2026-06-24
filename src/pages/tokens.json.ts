import { buildTokensJson } from "../lib/design-system";

export const prerender = true;

export function GET() {
	const body = JSON.stringify(buildTokensJson(), null, 2) + "\n";
	return new Response(body, {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	});
}
