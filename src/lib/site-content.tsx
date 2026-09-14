import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { loadSiteContent } from "@/lib/content-fns";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";

type Ctx = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  reload: () => Promise<void>;
};

const SiteContentContext = createContext<Ctx>({
  content: DEFAULT_CONTENT,
  setContent: () => undefined,
  reload: async () => undefined,
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  const reload = async () => {
    try {
      setContent(await loadSiteContent());
    } catch {
      /* keep defaults */
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  const value = useMemo(() => ({ content, setContent, reload }), [content]);
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
