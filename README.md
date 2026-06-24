# Vibe Design System

A modern, token-driven design system framework and live showcase built for AI-assisted workflows. This repository provides a seamless foundation to construct, document, and deploy your own visual identity, integrating directly with AI agents to automate the UI workflow.

## 🚀 Tech Stack & Tools Used

This project is built with modern, high-performance tooling:

* **[Astro 6](https://astro.build/):** The core web framework used for fast, static site generation.
* **Node.js (v22+):** The required runtime environment for Astro 6.
* **[Cursor](https://cursor.com/):** The recommended AI-powered IDE. (The free tier is sufficient for this project).
* **[Impeccable](https://impeccable.style/):** An AI design agent used to generate and document design tokens. **Note:** Impeccable is pre-vendored in this repository (`.claude` and `.cursor` directories)—no manual installation is needed.
* **[Cloudflare](https://www.cloudflare.com/):** The target platform for deploying the final static site.

## 📋 Prerequisites

Before you begin, ensure your local environment meets the following requirements:

* **Node.js:** Version 22.0.0 or higher.
* **Editor:** Cursor IDE.
* **Accounts:** A free Cloudflare account (for deployment later).

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Maryam271/vibe-design-system.git](https://github.com/Maryam271/vibe-design-system.git)
    cd vibe-design-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the local development server:**
    ```bash
    npm run dev
    ```

4.  **View the application:**
    Open your browser and navigate to `http://localhost:4321`. You will see the live design-system showcase. As you update your design tokens, this page will reskin automatically.

## Generating Your Design System (Impeccable)

Since Impeccable is already vendored in the repository, you can skip the installation step and dive straight into building your design language.

Inside the **Cursor** AI chat, after completing your mood board and AI interview, simply run:

📦 Deployment
This project is configured for seamless deployment to Cloudflare Pages.
(Deployment instructions / Wrangler configurations can be executed here).

📄 License
This project is open-source and available under the MIT License.
