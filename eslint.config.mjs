import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals.map((config) =>
    config.plugins?.["react-hooks"]
      ? {
          ...config,
          // Keep existing compiler diagnostics visible while adopting the Next 16 lint runner.
          rules: {
            ...config.rules,
            "react-hooks/set-state-in-effect": "warn",
            "react-hooks/immutability": "warn",
            "react-hooks/purity": "warn",
          },
        }
      : config,
  ),
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
