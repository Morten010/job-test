import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/hints",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/leaflet",
  ],
  css: [
    "leaflet.markercluster/dist/MarkerCluster.css",
    "leaflet.markercluster/dist/MarkerCluster.Default.css",
    "./app/assets/css/main.css",
  ],
  vite: {
    plugins: [tailwindcss() as any],
  },
  fonts: {
    fontshare: {
      id: ["Satoshi", "General-Sans"],
      weights: ["300", "400", "500", "600", "700", "800", "900"],
    },
  },
  leaflet: {
    markerCluster: true,
  },
});
