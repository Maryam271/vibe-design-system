#!/usr/bin/env node
/**
 * Writes versioned static copies to public/v1/ for deployed hosting.
 * Root routes (/tokens.json, etc.) are served from src/pages/*.ts.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
	SYSTEM_NAME,
	SITE_URL,
	VERSION,
	buildTokensJson,
	buildTokensCss,
	buildSystemMd,
	buildLlmsTxt,
	buildDesignJson,
} from "../src/lib/design-system.ts";

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");

function main() {
	if (!existsSync(PUBLIC)) mkdirSync(PUBLIC, { recursive: true });

	const jsonStr = JSON.stringify(buildTokensJson(), null, 2) + "\n";
	const cssStr = buildTokensCss();
	const systemStr = buildSystemMd();
	const llmsStr = buildLlmsTxt();
	const designStr = JSON.stringify(buildDesignJson(), null, 2) + "\n";

	// Root URLs are served by src/pages/*.ts — do not write public/* duplicates (Astro skips routes on conflict).
	const V1 = join(PUBLIC, VERSION);
	mkdirSync(V1, { recursive: true });
	writeFileSync(join(V1, "tokens.json"), jsonStr);
	writeFileSync(join(V1, "tokens.css"), cssStr);
	writeFileSync(join(V1, "system.md"), systemStr);
	writeFileSync(join(V1, "design.json"), designStr);
	writeFileSync(join(V1, "llms.txt"), llmsStr);

	const skillsSrc = join(ROOT, ".claude/skills/apply-system/SKILL.md");
	const skillsDir = join(V1, "skills");
	mkdirSync(skillsDir, { recursive: true });
	if (existsSync(skillsSrc)) {
		const localSkill = readFileSync(skillsSrc, "utf8");
		const hostedSkill =
			"<!-- Installable build of apply-system. -->\n" +
			localSkill
				.replace(/public\/tokens\.json/g, `${SITE_URL}/${VERSION}/tokens.json`)
				.replace(/public\/system\.md/g, `${SITE_URL}/${VERSION}/system.md`);
		writeFileSync(join(skillsDir, "apply-system.md"), hostedSkill);
	}

	console.log(
		`publish-system: ${SYSTEM_NAME} — wrote public/${VERSION}/ (+ src/pages/*.ts serve root URLs)`,
	);
}

main();
