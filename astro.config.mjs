import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://walletgenerator.dev",
  integrations: [
    starlight({
      title: "walletgenerator.dev",
      description:
        "Documentation for walletgenerator.dev — the open-source, browser-only developer wallet generator for EVM, Solana, Stellar, XRP Ledger, and Bitcoin.",
      customCss: ["./src/styles/starlight.css"],
      favicon: "/favicon.svg",
      head: [
        { tag: "link", attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" } },
        { tag: "meta", attrs: { property: "og:image", content: "/og-image.png" } },
        { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
        { tag: "meta", attrs: { name: "twitter:image", content: "/og-image.png" } },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/bitfent/walletgenerator",
        },
      ],
      components: {
        SiteTitle: "./src/components/docs/SiteTitle.astro",
      },
      sidebar: [
        {
          label: "Start here",
          items: [
            { label: "Introduction", slug: "getting-started" },
            { label: "Quickstart", slug: "quickstart" },
            { label: "Security model", slug: "security" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Supported chains", slug: "supported-chains" },
            { label: "Funding test wallets", slug: "funding" },
            { label: "Export formats", slug: "export-formats" },
            { label: "Derivation paths", slug: "derivation-paths" },
          ],
        },
        {
          label: "Workflow guides",
          items: [
            { label: "Hardhat accounts", slug: "guides/hardhat" },
            { label: "Foundry wallets", slug: "guides/foundry" },
          ],
        },
        {
          label: "Chains",
          items: [
            { label: "EVM wallets", slug: "chains/evm" },
            { label: "Solana keypairs", slug: "chains/solana" },
            { label: "Stellar keypairs", slug: "chains/stellar" },
            { label: "XRP Ledger wallets", slug: "chains/xrp" },
            { label: "Bitcoin wallets", slug: "chains/bitcoin" },
          ],
        },
        {
          label: "Project",
          items: [
            { label: "FAQ", slug: "faq" },
            { label: "Contributing", slug: "contributing" },
          ],
        },
      ],
    }),
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
});
