import { definePlugin } from "nitro";

function bind() {
  const g = globalThis as {
    process?: { env?: Record<string, string | undefined> };
    __oxlisEnv?: Record<string, string | undefined>;
  };
  g.__oxlisEnv = { ...(g.process?.env ?? {}) };
}

bind();

export default definePlugin(() => {
  bind();
});
