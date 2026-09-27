import { defineConfig } from 'vitest/config';

// .mts so Vite loads it as ESM. Path aliases from tsconfig.json resolve
// natively now, so no vite-tsconfig-paths plugin is needed.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    // Everything under test is pure TypeScript — no DOM needed.
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
