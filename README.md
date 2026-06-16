<img width="1681" height="651" alt="Screenshot 2026-06-16 at 08 56 41" src="https://github.com/user-attachments/assets/a8896497-e5bb-40d9-9eec-711a759c7aac" />


# Summer Vibes: Create Your Design System Using Cursor

Foundation repo for the **Summer Vibes** live coding session at [DataCamp](https://www.datacamp.com/).

Clone this before the session starts, open it in Cursor, and follow along as we build a design system from scratch. You do not need to know Astro beforehand. The repo is pre-scaffolded so we can spend the session on taste, systems, and iteration, not boilerplate.

## Requirements

Set these up before we go live:

| Requirement | Notes |
| --- | --- |
| [Cursor](https://cursor.com/) | Free tier is probably enough for the session |
| [Impeccable](https://impeccable.style/) | We install it together during the session |
| [Cloudflare](https://www.cloudflare.com/) | Free tier is enough (used later in the session) |
| Node.js 22+ | Required by Astro 6 |

## Get set up in Cursor

When the session starts, clone this repo and open the folder in Cursor.

```sh
git clone https://github.com/lucas-datacamp/vibe-design-system.git
cd vibe-design-system
```

Then ask Cursor to install dependencies and start the dev server. You can paste something like:

```text
I just cloned this repo to follow the Summer Vibes live coding session. Please install dependencies and run the dev server. Node.js 22+ is required.
```

Cursor should run:

```sh
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). You should see a plain `hello world` page. That is expected. We have not styled anything yet.

### If Cursor asks what to do

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview the production build |

### Impeccable

We install Impeccable during the session. Each attendee builds their own design system, so `PRODUCT.md` and `DESIGN.md` stay local and are gitignored.

```sh
npx impeccable skills install
```

Then in Cursor, after the mood board and AI interview:

```text
/impeccable init
```

That creates your personal `PRODUCT.md`. Later, `/impeccable document` creates your `DESIGN.md`. Commands like `/impeccable live` and `/impeccable craft` read from those files.

## About the session

**Format:** Live presentation + live Cursor demo

**Tone:** Playful summer vibes, but serious about craft

### What we cover

1. **What is vibe coding?** The idea (popularized by Andrej Karpathy), and the toolbox: Cursor, v0, Lovable, Claude / Claude Code.
2. **Meet the slop.** A deliberately low-effort prompt to show that generic AI output is real. We look at why so much of the web is starting to look the same now that code is cheap.
3. **Code got cheap. Taste didn't.** How to make an app feel intentional, not like a high school project pasted out of ChatGPT. The session deck itself is an example of AI output elevated by a real design system.
4. **Design System ≠ System Design.** Easy to mix up because the words overlap. A **design system** is about design: visual language, components, tokens, consistency. **System design** is about engineering: architecture, data flow, reliability. The order of the words changes everything.
5. **Find your taste.** Build a mood board of references you actually like.
6. **AI-assisted interview.** Use an agent to pull out the intricate details of *your* system: palette, type, density, voice, anti-patterns.
7. **Build it with Cursor + [Impeccable](https://impeccable.style/).** Wire up the stack, iterate in the browser, and un-slopify as you go.

### Related decks

The talk narrative was shaped in a design session and delivered as HTML slide decks:

- **Summer Vibes Deck** — main session flow (vibe coding → slop → taste → design systems → mood board → interview → build)
- **Design System Anatomy Deck** — companion deck on foundations, components, and connective tissue

Those decks are separate artifacts from this repo. This repository is where we build the design system together during the live demo.

## What's in this repo

Pre-configured scaffold for the session:

| Piece | Version |
| --- | --- |
| [Astro](https://astro.build/) | 6.x |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x |
| [daisyUI](https://daisyui.com/) | 5.x |

Tailwind is wired through the Vite plugin. daisyUI is registered in `src/styles/global.css` but not applied to pages until that stylesheet is imported from a layout.

Dev toolbar is disabled in `astro.config.mjs` so the live demo stays clean.

## Closing thought

The dream is a web with diverse, high-quality design that does not depend on a handful of experts alone. Tools like Cursor and Impeccable lower the floor; taste, systems thinking, and deliberate iteration raise the ceiling.

Now go build yours.
