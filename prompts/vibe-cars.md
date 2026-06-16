Build a full single-page landing page for a car dealership called **Vibe Cars**.
Use semantic HTML and CSS in a single file.

## Visual Identity
Bold, sleek, and confident — built for buyers browsing new and pre-owned vehicles. Use a clean
sans-serif typeface (e.g. Inter or DM Sans) for body and a strong geometric display face
(e.g. Syne or Archivo) for headlines. Palette should feel premium and energetic without feeling
aggressive. Think a modern EV showroom meets a trusted local dealer.

## Sections (in order)

1. **Hero** — Full-viewport with a bold headline, short subheading, and an inventory search bar
   (fields: make, model, body type, min–max price) with a "Browse inventory" CTA button.

2. **Featured inventory** — A 3-column card grid showcasing 6 fictional vehicles. Each card
   includes a placeholder image (CSS-styled), year/make/model, price, mileage, and key stats
   (transmission, fuel type, drivetrain). Cards should have a subtle hover lift effect.

3. **Services** — Three service tiles: Buy, Finance, and Trade-In. Each has an icon, a short
   title, and a 2-sentence description of what Vibe Cars offers for that journey.

4. **Dealership stats** — A clean data strip with 4 headline numbers relevant to the lot:
   e.g. vehicles in stock, average days on lot, cars sold this month, customer satisfaction rate.
   Large typographic numbers with small labels beneath.

## Design Details
- **Palette:** clean white `#FFFFFF`, cool silver `#F3F4F6`, electric blue `#2563EB`,
  deep asphalt `#111827`, mid grey `#6B7280`
- Sticky nav with logo left, "Browse inventory" CTA button right
- Vehicle cards use `border-radius: 12px` with a light border and hover shadow
- Dealership stats section uses electric blue as a background accent
- Smooth scroll and subtle fade-in on scroll for each section
- Fully responsive down to mobile — search bar stacks vertically on small screens
