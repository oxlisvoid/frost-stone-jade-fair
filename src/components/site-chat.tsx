import { useMemo, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, X } from "lucide-react";
import { formatUsd } from "@/lib/content";
import { useSiteContent } from "@/lib/site-content";

type Msg = { from: "bot" | "you"; text: string };

const STARTER: Msg[] = [
  {
    from: "bot",
    text: "Hey — OxlisVoid support here. The toolkit and course on this site are demos. After Stripe confirms payment we email the real files to the address you enter at checkout, in under 8 hours. You can write any time. With the current volume, a reply can take up to 2 days. What do you need?",
  },
];

function replyFor(input: string, price: string, email: string) {
  const q = input.toLowerCase();
  if (/(email|deliver|receive|send|24|hour|tool)/.test(q)) {
    return "Put the email you actually check at checkout — that is where the toolkit is sent. After Stripe confirms payment, the files go out in under 8 hours. Check spam if it is not in the inbox. Questions on the kit are included for 15 days. Replies can take up to 2 days right now.";
  }
  if (/(demo|course|watch|unlock|download|zip)/.test(q)) {
    return "Read the course outline and browse the toolkit as a demo before you pay. They are previews, not the full pack. The real graphs and files never sit as a public ZIP. They arrive by email after payment is confirmed.";
  }
  if (/(credit|subscri|monthly|rent)/.test(q)) {
    return `Stop paying for credits and monthly subscriptions. All Access is ${price}, one time, lifetime updates. No meter. No rent.`;
  }
  if (/(price|cost|pay|stripe|refund)/.test(q)) {
    return `All Access is ${price}, one time, lifetime updates, no subscription and no credits. Stripe hosts the card form — this site never sees the number. Email us within 30 days of payment for a refund.`;
  }
  if (/(discord|group|community|staff|support|help|human)/.test(q)) {
    return `We look after buyers. More than 30 people are online to help you install ComfyUI, train a LoRA, and get the result you paid for. Use this chat, email ${email}, or the Discord / group links in the footer.`;
  }
  if (/(tiktok|instagram|sell|product|monet)/.test(q)) {
    return "The system is built to create AI models you can post and sell with — TikTok, Instagram, fan platforms, brand deals. You get two growth playbooks (TikTok + Instagram) plus the image, video, and motion workflows.";
  }
  if (/(gpu|mac|pc|computer|runpod)/.test(q)) {
    return "You do not need a powerful PC. Run locally, on a cloud GPU (Runpod), or on the OxlisVoid server included with All Access. Mac works because the graphs can run in the cloud.";
  }
  if (/(lora|comfy|workflow|skin|face|prompt)/.test(q)) {
    return "You get 7 plug-and-play ComfyUI workflows (Krea2, motion control, LoRA dataset, skin enhance, face swap, inpaint, VoidPrompt), 13 tutorials, prompt libraries, and lifetime updates. We email the pack after payment.";
  }
  return `All Access is ${price} lifetime, at a limited-time price. Pay on Stripe with the email that should receive the tools. We send the pack in under 8 hours. You can write any time, including to book a call. Replies are currently within 2 days.`;
}

export function SiteChat() {
  const { content } = useSiteContent();
  const price = formatUsd(content.priceCents);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>(STARTER);
  const hints = useMemo(
    () => ["Where do the tools go?", "Is the course a demo?", "TikTok / Instagram selling", `${price} lifetime?`],
    [price],
  );

  const send = (value: string) => {
    const cleaned = value.trim();
    if (!cleaned) return;
    setMsgs((prev) => [
      ...prev,
      { from: "you", text: cleaned },
      { from: "bot", text: replyFor(cleaned, price, content.email) },
    ]);
    setText("");
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    send(text);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <div className="flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-surface shadow-(--shadow-lift)">
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-paper">
            <div>
              <p className="text-sm font-semibold">OxlisVoid desk</p>
              <p className="text-xs text-paper/60">30+ people online · English</p>
            </div>
            <button type="button" className="grid size-9 place-items-center" onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="size-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((msg, i) => (
              <p
                key={`${msg.from}-${i}`}
                className={
                  msg.from === "bot"
                    ? "max-w-[92%] rounded-2xl bg-paper px-3 py-2 leading-relaxed shadow-(--shadow-card)"
                    : "ml-auto max-w-[92%] rounded-2xl bg-ink px-3 py-2 text-paper"
                }
              >
                {msg.text}
              </p>
            ))}
            <div className="flex flex-wrap gap-1.5">
              {hints.map((hint) => (
                <button
                  key={hint}
                  type="button"
                  className="rounded-full bg-chip px-2.5 py-1 text-xs text-muted"
                  onClick={() => send(hint)}
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask about delivery, Stripe, support…"
              className="h-11 flex-1 rounded-lg bg-paper px-3 text-sm shadow-(--shadow-card)"
            />
            <button type="submit" className="h-11 rounded-lg bg-ink px-3 text-sm font-medium text-paper">
              Send
            </button>
          </form>
          <p className="px-4 pb-3 text-[11px] text-subtle">
            Prefer a human?{" "}
            <Link to="/checkout" className="underline" onClick={() => setOpen(false)}>
              Pay with Stripe
            </Link>{" "}
            · {content.email}
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-medium text-paper shadow-(--shadow-lift)"
        >
          <MessageCircle className="size-4" />
          Ask about All Access
        </button>
      )}
    </div>
  );
}
