// @ts-check
import { execSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Regenerate the agent layer (tokens.json/system.md/tokens.css/llms.txt + /v1/)
// from global.css on every dev start and build — so the served files always match
// the current tokens and never need to be committed.
function publishSystem() {
	return {
		name: 'publish-system',
		hooks: {
			'astro:config:setup': () => execSync('npx tsx scripts/publish-system.ts', { stdio: 'inherit' }),
		},
	};
}

// https://astro.build/config
export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	integrations: [publishSystem()],
	vite: {
		plugins: [tailwindcss()],
	},
});
