# Frontend & design-system resources — iOS + web

A small, curated shortlist for building UI on **iOS (SwiftUI + React Native)** and the **web**,
with a bias toward things that pair well with design systems. Pricing drifts — treat it as
**Free / Freemium / Paid** and confirm current terms before you buy. Verified July 2026.

> **How to use these with our systems:** these are *parts and tools*, not design languages.
> Anything you pull in must be **re-skinned to our tokens** (`Aurora.*`, `--cds-*`, or `--mx-*`)
> or it will clash. Items we already use or reference are marked ⭐.

## iOS & cross-platform (SwiftUI + React Native)

| Resource | Cost | What / why |
| --- | --- | --- |
| **Apple Human Interface Guidelines** | Free | The ground truth for iOS. Aurora is built on it. |
| **SF Symbols** (app + library) | Free | 6,000+ Apple icons, weights/scales. Aurora's iOS icon source. ⭐ |
| **HeroUI v3** (was NextUI) | Free/OSS | Now "one design system for web + native" — 75+ web + **37 React Native** components on Tailwind v4. Strong Aurora-adjacent option. |
| **gluestack-ui** | Free/OSS | shadcn-style, copy-paste RN components on NativeWind. Aurora's RN reference pattern. ⭐ |
| **Tamagui** | Free/OSS | Universal (RN + web) with a compiler for performance; own token system. |
| **NativeWind** | Free/OSS | Tailwind for React Native. The styling layer under gluestack/HeroUI-native. ⭐ |
| **React Native Reusables** | Free/OSS | shadcn/ui ported to RN — copy-paste, own the code. |
| **Expo** | Free/Freemium | The standard RN toolchain (build, OTA, native modules). |
| **Pow** (Movingparts) | Paid | Delightful ready-made SwiftUI transitions & effects. |
| **SwiftUIX** | Free/OSS | Fills gaps in SwiftUI's standard components. |

## Web UI libraries

| Resource | Cost | What / why |
| --- | --- | --- |
| **shadcn/ui** | Free/OSS | React + Tailwind + Radix, copy-paste/CLI — you own the code. The model to follow for Maxilius. ⭐ |
| **Radix UI** (Primitives + Themes) | Free/OSS | Accessible, unstyled primitives — the accessibility engine under shadcn. |
| **Tailwind CSS** | Free | Utility CSS. Pairs naturally with token-driven systems. |
| **Tailwind Plus** (was Tailwind UI) | Paid | Official 500+ blocks/templates + Catalyst kit. One-time (~$299 personal / ~$979 team), lifetime. |
| **MUI** (Material UI) | Freemium | Mature React Material lib; MUI X (data grid, pickers) is paid. |
| **Mantine** | Free/OSS | Big, batteries-included React lib with hooks. |
| **Chakra UI** | Free/OSS | Accessible, themeable React components. |
| **Ant Design** | Free/OSS | Dense, enterprise/admin-oriented React lib. |
| **Aceternity / Magic UI** | Free/Freemium | Flashy animated marketing components (use as inspiration; re-skin). |
| **Uiverse** | Free | Community copy-paste CSS snippets. Inspiration only — quality/consistency varies. |

## Design systems worth studying (references, all Free)

Material Design 3 (Google) · Apple HIG · **Shopify Polaris** (OSS) · **IBM Carbon** (OSS) ·
Atlassian Design System · Microsoft Fluent 2 · **Primer** (GitHub, OSS) · **Base** (Uber, OSS).
Read these for structure and do/don't discipline, not to copy visuals.

## Tokens & design-system tooling (the plumbing)

| Resource | Cost | What / why |
| --- | --- | --- |
| **Design Tokens (DTCG) format** | Free/standard | The interoperable token JSON. All three of our systems use it. ⭐ |
| **Style Dictionary** | Free/OSS | Compiles one token source → CSS / Swift / TS / Figma. Aurora + Maxilius build engine. ⭐ |
| **Tokens Studio** (Figma plugin) | Freemium | Manage tokens in Figma, export to DTCG/Style Dictionary. |
| **Storybook** | Free/OSS | Component docs & visual testing. Maxilius uses it. ⭐ |
| **Zeroheight** | Freemium/Paid | Hosted design-system documentation sites. |
| **Supernova / Knapsack** | Paid | End-to-end design-system platforms (tokens → docs → code). |

## Design tools & handoff

| Resource | Cost | What / why |
| --- | --- | --- |
| **Figma** | Freemium | The standard; variables map cleanly to our tokens. |
| **Penpot** | Free/OSS | Open-source Figma alternative. |
| **Framer** | Freemium | Design + publish; good for marketing sites. |
| **Sketch** | Paid | Mac-native design tool. |

## Icons & assets

| Resource | Cost | What / why |
| --- | --- | --- |
| **SF Symbols** | Free | iOS/Apple platforms. ⭐ |
| **Lucide** | Free/OSS | Clean 2px-stroke set — Aurora's cross-platform fallback recommendation. ⭐ |
| **Phosphor / Tabler / Heroicons / Iconoir** | Free/OSS | Excellent open icon sets for web + RN. |
| **Lottie / LottieFiles** | Freemium | JSON animations that run on web, iOS, and RN. |
| **Rive** | Freemium | Interactive, state-driven animations; cross-platform runtimes. |
| **Streamline** | Paid | Very large unified icon + illustration library. |

## Motion

| Resource | Cost | What / why |
| --- | --- | --- |
| **GSAP** | Free | Now 100% free incl. all plugins & commercial use (Webflow-owned). Web. |
| **Motion** (was Framer Motion) | Free/OSS | React web animation. |
| **Anime.js** | Free | Lightweight JS animation for web. |
| **Reanimated** | Free/OSS | The RN animation engine — Aurora's motion layer. ⭐ |
| **Pow** | Paid | SwiftUI effects (see iOS section). |

---

### The one rule

Our three design systems are the **rules**; everything above is **raw material**. Grab components
and motion from these, but **restyle to the target system's tokens** so a screen still reads as one
system. When in doubt, the system's own docs and do/don't tables win.
