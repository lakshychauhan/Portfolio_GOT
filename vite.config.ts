import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Sync generated visual assets into project folders before build
import fs from "fs";
try {
  const src = "C:/Users/laksh/.gemini/antigravity-ide/brain/bbebff3c-873e-4746-820f-dfdccb400402/iron_throne_illustration_1784627752007.png";
  const dest = "c:/Users/laksh/Portfolio-GOT/src/assets/iron-throne-forge.png";
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
} catch (err) {
  // Silent fail
}

export default defineConfig(async ({ command }) => {
  const plugins = [
    tailwindcss(),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      server: { entry: "server" },
    }),
    viteReact(),
  ];

  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(
      nitro({
        defaultPreset: "vercel",
      })
    );
  }

  return {
    resolve: {
      tsconfigPaths: true,
    },
    plugins,
  };
});
