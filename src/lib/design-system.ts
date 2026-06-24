import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export const SYSTEM_NAME = "Aurora Day";
export const SITE_URL = (
	process.env.SITE_URL ||
	process.env.CF_PAGES_URL ||
	"https://vibe-design-system.lucas-silva-cea.workers.dev"
).replace(/\/$/, "");
export const VERSION = "v1";

export type TokenGroups = Record<string, Record<string, string>>;

export interface ParsedTokens {
	groups: TokenGroups;
	order: string[];
}

const ROOT = process.cwd();

function globalCssPath() {
	return join(ROOT, "src/styles/global.css");
}

/** Parse the @theme block of global.css into grouped tokens. */
export function readTokens(): ParsedTokens {
	const css = readFileSync(globalCssPath(), "utf8");
	const theme = css.match(/@theme\s*\{([^}]*)\}/s);
	if (!theme) throw new Error("No @theme block found in src/styles/global.css");

	const groups: TokenGroups = {};
	const order: string[] = [];
	for (const m of theme[1].matchAll(/--([\w-]+):\s*([^;]+);/g)) {
		const [, name, value] = m;
		const dash = name.indexOf("-");
		const group = dash === -1 ? name : name.slice(0, dash);
		const key = dash === -1 ? name : name.slice(dash + 1);
		(groups[group] ??= {})[key] = value.trim();
		if (!order.includes(group)) order.push(group);
	}
	return { groups, order };
}

function readDoc(file: string): string | null {
	const path = join(ROOT, file);
	return existsSync(path) ? readFileSync(path, "utf8").trim() : null;
}

/** Parse YAML frontmatter from DESIGN.md into a plain object. */
export function readDesignFrontmatter(): Record<string, unknown> | null {
	const raw = readDoc("DESIGN.md");
	if (!raw?.startsWith("---")) return null;
	const end = raw.indexOf("---", 3);
	if (end === -1) return null;
	return parseSimpleYaml(raw.slice(3, end).trim());
}

function parseSimpleYaml(yaml: string): Record<string, unknown> {
	const root: Record<string, unknown> = {};
	const stack: { obj: Record<string, unknown>; key: string; indent: number }[] = [];

	for (const line of yaml.split("\n")) {
		if (!line.trim() || line.trim().startsWith("#")) continue;
		const indent = line.search(/\S/);
		const trimmed = line.trim();

		while (stack.length && indent <= stack[stack.length - 1].indent) {
			stack.pop();
		}
		const current = stack.length
			? (stack[stack.length - 1].obj[stack[stack.length - 1].key] as Record<string, unknown>)
			: root;

		const kv = trimmed.match(/^([\w-]+):\s*(.*)$/);
		if (!kv) continue;
		const [, key, rest] = kv;

		if (rest === "" || rest === "|") {
			const obj: Record<string, unknown> = {};
			current[key] = obj;
			stack.push({ obj: current, key, indent });
		} else {
			current[key] = rest.replace(/^["']|["']$/g, "");
		}
	}
	return root;
}

export function buildTokensJson() {
	const { groups, order } = readTokens();
	return { name: SYSTEM_NAME, ...Object.fromEntries(order.map((g) => [g, groups[g]])) };
}

export function buildTokensCss() {
	const { groups } = readTokens();
	const lines = [":root {"];
	for (const [group, entries] of Object.entries(groups)) {
		for (const [key, value] of Object.entries(entries)) {
			lines.push(`\t--${group}-${key}: ${value};`);
		}
	}
	lines.push("}", "");
	return lines.join("\n");
}

export function buildSystemMd() {
	const tokens = readTokens();
	const product = readDoc("PRODUCT.md");
	const design = readDoc("DESIGN.md");

	const tokenRef = tokens.order
		.map((group) => {
			const rows = Object.entries(tokens.groups[group])
				.map(([k, v]) => `- \`--${group}-${k}\`: \`${v}\``)
				.join("\n");
			return `### ${group}\n${rows}`;
		})
		.join("\n\n");

	const parts = [
		`# ${SYSTEM_NAME} — System Spec`,
		"",
		"Machine- and human-readable definition of this design system. An agent should",
		"read this file plus `tokens.json`, then apply the system to a target in the",
		"target's own tech stack — using exact token values, never approximations.",
		"",
		"## Tokens",
		"",
		tokenRef,
	];

	if (product) parts.push("", "## Product & Voice", "", product);
	if (design) parts.push("", "## Visual System", "", design);

	if (!product && !design) {
		parts.push("", "## Status: neutral canvas", "", "No design context defined yet.");
	}

	parts.push(
		"",
		"## Applying this system",
		"",
		"1. Read this file and `tokens.json`.",
		"2. Detect the target project's stack; emit idiomatic code for it.",
		"3. Map every color/type/space/radius/motion value to an exact token above.",
		"4. Follow the voice and visual rules; introduce none of the anti-patterns.",
		"",
	);
	return parts.join("\n");
}

export function buildLlmsTxt() {
	return [
		`# ${SYSTEM_NAME}`,
		"",
		"> A machine-readable design system. Read the files below, then apply the system",
		"> to any project in its own tech stack — using exact token values.",
		"",
		"- [System spec](/system.md): rules, voice, components, and the token reference",
		"- [Tokens](/tokens.json): exact color, type, spacing, radius, and motion values",
		"- [Tokens CSS](/tokens.css): drop-in :root custom properties for any web project",
		"- [Design JSON](/design.json): Stitch-style design tokens + component recipes",
		"",
		"## Source (local dev)",
		"",
		"Routes: `src/pages/tokens.json.ts`, `tokens.css.ts`, `system.md.ts`, `llms.txt.ts`, `design.json.ts`",
		"",
		"## Versioned URLs",
		"",
		`- [System spec](${SITE_URL}/${VERSION}/system.md)`,
		`- [Tokens](${SITE_URL}/${VERSION}/tokens.json)`,
		`- [Tokens CSS](${SITE_URL}/${VERSION}/tokens.css)`,
		"",
		"## Apply",
		"",
		"Read /system.md and /tokens.json, then refactor or build a page to match.",
		"",
	].join("\n");
}

const COMPONENTS = [
	{ name: "Button", path: "src/components/ds/Button.astro", variants: ["primary", "moment", "secondary", "ghost"] },
	{ name: "Badge", path: "src/components/ds/Badge.astro", tones: ["neutral", "ocean", "aurora", "moment", "deep"] },
	{ name: "Card", path: "src/components/ds/Card.astro", props: ["title", "compact", "elevated"] },
	{ name: "Input", path: "src/components/ds/Input.astro", props: ["id", "label", "type", "placeholder", "helper", "error"] },
	{ name: "Section", path: "src/components/ds/Section.astro", props: ["heading", "lede", "id", "tight"] },
	{ name: "ColorSwatch", path: "src/components/ds/ColorSwatch.astro", props: ["name", "token"] },
];

export function buildDesignJson() {
	return {
		name: SYSTEM_NAME,
		version: VERSION,
		source: {
			tokens: "src/styles/global.css",
			product: "PRODUCT.md",
			design: "DESIGN.md",
			routes: [
				"src/pages/tokens.json.ts",
				"src/pages/tokens.css.ts",
				"src/pages/system.md.ts",
				"src/pages/llms.txt.ts",
				"src/pages/design.json.ts",
			],
		},
		tokens: buildTokensJson(),
		design: readDesignFrontmatter(),
		components: COMPONENTS,
	};
}

export function buildDesignSystemExports() {
	return {
		tokensJson: buildTokensJson(),
		tokensCss: buildTokensCss(),
		systemMd: buildSystemMd(),
		llmsTxt: buildLlmsTxt(),
		designJson: buildDesignJson(),
	};
}

export function previewText(text: string, maxLines = 14): string {
	const lines = text.split("\n");
	if (lines.length <= maxLines) return text;
	return lines.slice(0, maxLines).join("\n") + `\n… (${lines.length - maxLines} more lines)`;
}
