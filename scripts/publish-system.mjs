#!/usr/bin/env node
/*
 * publish-system — build the agent-readable design-system layer.
 *
 * Reads the live token source of truth (src/styles/global.css `@theme`) plus the
 * design context if present (PRODUCT.md, DESIGN.md), and emits the files an AI
 * agent consumes to apply the system anywhere:
 *
 *   public/tokens.json  — exact token values, grouped (color/space/text/…)
 *   public/tokens.css   — drop-in :root custom properties for any web project
 *   public/system.md    — the human/agent-readable spec (rules + tokens)
 *   public/llms.txt     — discovery + how-to-apply for agents
 *
 * Re-run this whenever you change tokens or your design context.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");
const NAME = "Aurora Day";
const SITE_URL = (process.env.SITE_URL || process.env.CF_PAGES_URL || "https://vibe-design-system.lucas-silva-cea.workers.dev").replace(/\/$/, "");
const VERSION = "v1";

/** Parse the @theme block of global.css into grouped tokens. */
function readTokens() {
	const css = readFileSync(join(ROOT, "src/styles/global.css"), "utf8");
	const theme = css.match(/@theme\s*\{([^}]*)\}/s);
	if (!theme) throw new Error("No @theme block found in src/styles/global.css");

	const groups = {};
	const order = [];
	for (const m of theme[1].matchAll(/--([\w-]+):\s*([^;]+);/g)) {
		const [, name, value] = m;
		const dash = name.indexOf("-");
		const group = dash === -1 ? name : name.slice(0, dash);
		const key = dash === -1 ? name : name.slice(dash + 1);
		(groups[group] ??= {})[key] = value.trim();
		if (!order.includes(group)) order.push(group);
	}
	return { groups, order, raw: theme[1] };
}

/** Re-emit the tokens as a portable :root block. */
function tokensCss({ groups }) {
	const lines = [":root {"];
	for (const [group, entries] of Object.entries(groups)) {
		for (const [key, value] of Object.entries(entries)) {
			lines.push(`\t--${group}-${key}: ${value};`);
		}
	}
	lines.push("}", "");
	return lines.join("\n");
}

/** Pull a named section out of an Impeccable doc, if the file exists. */
function readDoc(file) {
	const path = join(ROOT, file);
	return existsSync(path) ? readFileSync(path, "utf8").trim() : null;
}

function systemMd(tokens) {
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
		`# ${NAME} — System Spec`,
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
		parts.push(
			"",
			"## Status: neutral canvas",
			"",
			"No design context defined yet — these are placeholder/neutral tokens. Run",
			"`/impeccable init` then `/impeccable document` to generate `PRODUCT.md` and",
			"`DESIGN.md`, then re-run `publish-system` to enrich this spec.",
		);
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

function llmsTxt() {
	return [
		`# ${NAME}`,
		"",
		"> A machine-readable design system. Read the files below, then apply the system",
		"> to any project in its own tech stack — using exact token values.",
		"",
		"- [System spec](/system.md): rules, voice, components, and the token reference",
		"- [Tokens](/tokens.json): exact color, type, spacing, radius, and motion values",
		"- [Tokens CSS](/tokens.css): drop-in :root custom properties for any web project",
		"",
		"## Versioned URLs",
		"",
		`- [System spec](${SITE_URL}/${VERSION}/system.md)`,
		`- [Tokens](${SITE_URL}/${VERSION}/tokens.json)`,
		`- [Tokens CSS](${SITE_URL}/${VERSION}/tokens.css)`,
		"",
		"## Apply",
		"",
		"Read /system.md and /tokens.json, then refactor or build a page to match —",
		"replacing ad-hoc styles with the system's tokens and following its rules.",
		"",
		"## Install the skill",
		"",
		`Download \`${SITE_URL}/${VERSION}/skills/apply-system.md\` and save it to your`,
		"agent's skills directory:",
		"",
		"- Claude Code: `.claude/skills/apply-system/SKILL.md`",
		"- Cursor: `.cursor/skills/apply-system/SKILL.md`",
		"",
		"Then invoke it by asking your agent to apply the design system.",
		"",
	].join("\n");
}

function main() {
	if (!existsSync(PUBLIC)) mkdirSync(PUBLIC, { recursive: true });
	const tokens = readTokens();

	const json = { name: NAME, ...Object.fromEntries(tokens.order.map((g) => [g, tokens.groups[g]])) };
	const jsonStr = JSON.stringify(json, null, 2) + "\n";
	const cssStr = tokensCss(tokens);
	const systemStr = systemMd(tokens);
	const llmsStr = llmsTxt();

	// Root files
	writeFileSync(join(PUBLIC, "tokens.json"), jsonStr);
	writeFileSync(join(PUBLIC, "tokens.css"), cssStr);
	writeFileSync(join(PUBLIC, "system.md"), systemStr);
	writeFileSync(join(PUBLIC, "llms.txt"), llmsStr);

	// Versioned copies: public/v1/
	const V1 = join(PUBLIC, VERSION);
	mkdirSync(V1, { recursive: true });
	writeFileSync(join(V1, "tokens.json"), jsonStr);
	writeFileSync(join(V1, "tokens.css"), cssStr);
	writeFileSync(join(V1, "system.md"), systemStr);

	// Installable hosted skill: public/v1/skills/apply-system.md
	const skillsSrc = join(ROOT, ".claude/skills/apply-system/SKILL.md");
	const skillsDir = join(V1, "skills");
	mkdirSync(skillsDir, { recursive: true });
	const localSkill = readFileSync(skillsSrc, "utf8");
	const hostedSkill =
		"<!-- Installable build of apply-system. Reads this design system from its hosted URL. Save to your agent's skills dir and invoke. -->\n" +
		localSkill
			.replace(/public\/tokens\.json/g, `${SITE_URL}/${VERSION}/tokens.json`)
			.replace(/public\/system\.md/g, `${SITE_URL}/${VERSION}/system.md`);
	writeFileSync(join(skillsDir, "apply-system.md"), hostedSkill);

	const count = tokens.order.reduce((n, g) => n + Object.keys(tokens.groups[g]).length, 0);
	console.log(`publish-system: wrote tokens.json, tokens.css, system.md, llms.txt (${count} tokens, groups: ${tokens.order.join(", ")})`);
	console.log(`publish-system: version=${VERSION} site=${SITE_URL} — wrote public/${VERSION}/ (tokens.json, tokens.css, system.md, skills/apply-system.md)`);
}

main();
