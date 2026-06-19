# Joseph Varghese - Portfolio Website v2 (Evil Martians Edition)

A high-performance, responsive portfolio website featuring a bold, premium **tech-brutalist design** adapted from the iconic "Evil Martians" agency layout. Deployed with sleek micro-animations, tactile shadows, a custom 3D developer mascot, and an integrated AI chat assistant.

Original Figma Project: [Portfolio Website with Animations](https://www.figma.com/design/oKusL2PiiTtUTFO8gYSC5M/Portfolio-website-with-animations)

---

## 🎨 Design System & Aesthetics

- **Signature Palette**: Vibrant yellow-lime (`#D4F138`) background with deep off-black (`#111111`) text and structural borders.
- **Neo-Brutalist Cards**: White card tiles with flat, unblurred offset drop shadows (`shadow-[4px_4px_0px_0px_#111111]`).
- **Tactile Hover/Click States**: Interactive elements physical shift down-right (`translate-x-[2px] translate-y-[2px]`) while their solid shadows compress, mimicking physical buttons.
- **Custom Mascot**: Centered 3D alien developer mascot styled after the reference illustration.
- **Rotating Stamp Badge**: A circular badge displaying rotating text *• JOSEPH VARGHESE • AI ENGINEER • KANNUR •* wrapped around a floating rocket icon.

---

## 🏗️ Layout Architecture (Responsive 3-Column Grid)

- **Left Column (Navigation Sidebar)**: Top SVGs/logo branding, capitalized menu buttons with active dot indicators, and the rotating stamp badge. (Sticky on desktop).
- **Center Column (Main Scrollpane)**: Houses the content sections (Home, About, Skills, Projects, Experience, and Contact) with clean responsive typography.
- **Right Column (CTA & Socials)**: Top "Hire Joseph" pill CTA and a vertical stack of utilities (AI chat trigger, GitHub, LinkedIn, and Email). (Sticky on desktop).
- **Responsive Stacking**: On screen sizes `< lg` (tablets and mobile), the navigation collapses into a sticky top bar header with an interactive mobile drawer, and the badge/social links move into a clean footer layout.

---

## 🤖 Features

- **Slide-out Chat Drawer**: An integrated, animated AI chat drawer sliding from the right edge, powered by Framer Motion. Allows users to query Joseph's tech stack, experience, and contact details.
- **Dynamic Photos Slideshow**: A smooth photo carousel in the About section transitioning through Joseph's professional portraits.
- **Smooth Scrolling**: Smooth scrolling anchors for easy navigation through all sections.

---

## 🛠️ Tech Stack

- **Core**: React, TypeScript, HTML5
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4) with custom utility layers
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React
- **Notifications**: Sonner (toasts on form submit)

---

## 🚀 Running the Project

### Installation
Install the project dependencies using `pnpm`:
```bash
pnpm install
```
*(Alternatively, use `npm install` or `yarn install` depending on your environment).*

### Development Server
Run the local Vite development server:
```bash
pnpm dev
```
Navigate to `http://localhost:5173` in your browser.

### Production Build
Compile the application for production:
```bash
pnpm build
```
The output bundle will be generated in the `dist/` directory.