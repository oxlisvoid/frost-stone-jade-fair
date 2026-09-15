export const SITE = {
  name: "OxlisVoid",
  tagline: "Own the stack. Run AI influencers without a monthly rent.",
  price: 59.9,
  comparePrice: 1050,
  currency: "USD",
  email: "hello@oxlisvoid.com",
} as const;

export const PAYMENT = {
  /** Hosted Checkout — Price IDs come from Vercel env, not Payment Links. */
  successPath: "/success",
  cancelPath: "/canceled",
} as const;

export const OFFER = {
  name: "All Access",
  priceLabel: "$59.90",
  headline: "Every tool. One payment. No expiry on this price.",
  sells:
    "Image, video, motion, LoRA, skin, swap, inpaint, VoidPrompt, tutorials, and the course demo. The real pack is emailed within 24 hours of payment.",
} as const;

export const KITS = [
  {
    id: "image",
    name: "Image Kit",
    price: 97,
    sells: "Tools and workflows to generate AI images. Model files. No limits.",
  },
  {
    id: "video",
    name: "Video Kit",
    price: 235,
    sells: "Tools and workflows to generate AI video. Model files. No limits.",
  },
  {
    id: "motion",
    name: "Motion Kit",
    price: 300,
    sells: "Video with real motion — the body copies the reference. Motion workflows. No limits.",
  },
  {
    id: "total",
    name: "Total Kit",
    price: 500,
    sells: "Image + Video + Motion. Start-from-zero support. Online course.",
  },
  {
    id: "mentorship",
    name: "Mentorship",
    price: 1050,
    sells: "Everything in Total Kit + course + 1 meeting with the team.",
  },
] as const;

export const ADDON = {
  id: "instagram",
  name: "Help building the Instagram",
  price: 89,
  rule: "Optional add-on after All Access. Not sold separately.",
} as const;

export const INCLUDED = [
  "7 plug-and-play ComfyUI workflows",
  "13 step-by-step tutorials",
  "2 social growth playbooks (TikTok + Instagram)",
  "Prompt libraries and helpful tools",
  "Lifetime updates — free forever",
  "Emailed within 24 hours of payment",
] as const;

export const NOT_SOLD = [
  "Course sold without the tools",
  "Server sold alone",
  "Instagram help on its own",
] as const;

export const LEARN = [
  "Create realistic AI faces and avatars",
  "Build consistent characters with local workflows",
  "Use ComfyUI without random tutorial-hopping",
  "Train LoRA characters for repeatable results",
  "Enhance skin textures and overall quality",
  "Use the prompts, settings, and SOPs behind the system",
] as const;

export const WORKFLOWS = [
  { name: "Krea2 Image generator", tag: "New" },
  { name: "Wan SCAIL Motion Control", tag: "Video" },
  { name: "LoRA Dataset generator", tag: null },
  { name: "Skin enhancer", tag: null },
  { name: "Face swapper", tag: null },
  { name: "Img2img inpainting", tag: null },
  { name: "VoidPrompt img2prompt", tag: "Free" },
] as const;

export const TUTORIALS = [
  "ComfyUI setup",
  "ComfyUI basics",
  "Local image generation",
  "Consistent characters with LoRA",
  "Dataset generation for training",
  "Image editing",
  "Skin enhancing",
  "Rapid carousels with Nano Banana",
  "Local video generation",
  "Local motion control",
  "Paid video generation",
  "Cloud GPU on Runpod",
  "Publishing SOPs",
] as const;

export const COURSE = [
  {
    id: "welcome",
    title: "Welcome to OxlisVoid",
    time: "01:58",
    body: "The system in one pass: character lock, stills, motion, publish. Watch this before you touch a node.",
    src: "/media/v-studio.mp4",
    poster: "/media/p-studio.jpg",
  },
  {
    id: "install",
    title: "How to install ComfyUI",
    time: "01:23",
    body: "Local install or a fresh GPU pod. We keep the graph portable so the same file runs on both.",
    src: "/media/v-indoor.mp4",
    poster: "/media/p-indoor.jpg",
  },
  {
    id: "basics",
    title: "ComfyUI basics",
    time: "17:56",
    body: "Nodes, queues, seeds, samplers. This is the longest lesson — everything later assumes this vocabulary.",
    src: "/media/v-indoor.mp4",
    poster: "/media/p-office.jpg",
  },
  {
    id: "character",
    title: "Generating your character",
    time: "05:12",
    body: "Lock identity before you scale content. Reference stills, prompt structure, tight seed range.",
    src: "/media/v-cafe.mp4",
    poster: "/media/p-cafe.jpg",
  },
  {
    id: "dataset",
    title: "Generating a dataset",
    time: "05:11",
    body: "Framing, angles, captions. Dataset quality decides LoRA quality.",
    src: "/media/v-rooftop.mp4",
    poster: "/media/p-rooftop.jpg",
  },
  {
    id: "lora",
    title: "Training a LoRA",
    time: "03:08",
    body: "Production settings. Conservative steps, preview, stop before overfit.",
    src: "/media/v-beach.mp4",
    poster: "/media/p-beach.jpg",
  },
  {
    id: "images",
    title: "Generating images",
    time: "08:31",
    body: "From character sheet to finished stills that survive a social crop.",
    src: "/media/v-studio.mp4",
    poster: "/media/p-studio.jpg",
  },
  {
    id: "editing",
    title: "Editing images",
    time: "07:12",
    body: "Inpaint, restyle and skin-enhance without destroying identity.",
    src: "/media/v-skin-after.mp4",
    poster: "/media/skin-after.jpg",
  },
  {
    id: "motion",
    title: "Motion control",
    time: "06:46",
    body: "Drive video from a still plus a motion reference. Keep the first pass modest.",
    src: "/media/v-motion.mp4",
    poster: "/media/p-night.jpg",
  },
  {
    id: "krea",
    title: "Generating images (Krea2)",
    time: "06:32",
    body: "Current Krea2 stack. Faster iteration, cleaner skin, tighter prompt adherence.",
    src: "/media/v-night.mp4",
    poster: "/media/p-night.jpg",
  },
  {
    id: "sops",
    title: "Social media growth SOPs",
    time: "written",
    body: "Cadence, hooks, carousel structure for TikTok and Instagram.",
    src: "/media/v-man.mp4",
    poster: "/media/p-man.jpg",
  },
  {
    id: "prompts",
    title: "Prompt guide",
    time: "written",
    body: "Subject, style, lens, framing, mood — the skeleton VoidPrompt emits.",
    src: "/media/v-cafe.mp4",
    poster: "/media/p-cafe.jpg",
  },
] as const;

export const FAQ = [
  {
    q: "When do I receive the tools?",
    a: "The toolkit and course on this website are demos. After Stripe confirms payment we email the real workflows, tutorials, playbooks, and prompt libraries to the address you enter at checkout — within 24 hours. Check spam if you do not see it.",
  },
  {
    q: "Why do you need my email?",
    a: "That is the inbox that receives the pack. Use an address you actually check. Stripe also sends the receipt there.",
  },
  {
    q: "Is $59.90 a limited flash sale?",
    a: "No. This is the standing All Access price for unlimited time. No countdown, no fake timer, no subscription.",
  },
  {
    q: "What if I get stuck?",
    a: "We take care of our clients. More than 30 people are online to help you install, train a LoRA, and ship content. Write in with a screenshot.",
  },
  {
    q: "Can I sell with the models I create?",
    a: "Yes. The system is built so you can create AI models and sell products with them on TikTok, Instagram, fan platforms, and brand deals. The two growth playbooks cover launch and scaling.",
  },
  {
    q: "Do I need a powerful computer?",
    a: "No. Every purchase includes the OxlisVoid server if your PC is weak. Most people generate on a cloud GPU anyway. Mac works.",
  },
  {
    q: "How do you take payment?",
    a: "Stripe hosted checkout. Card numbers never touch this website. The toolkit is emailed after the charge clears. After delivery, the sale is final.",
  },
  {
    q: "Are there any subscriptions?",
    a: "No. Pay once. Lifetime access and lifetime tool updates. No monthly payment.",
  },
  {
    q: "Do I need coding experience?",
    a: "No. Everything is explained step by step and designed for beginners who have never opened ComfyUI.",
  },
] as const;

export const PORTRAITS = [
  { src: "/media/brand-pool.jpg", alt: "OxlisVoid pool still" },
  { src: "/media/brand-crop.jpg", alt: "OxlisVoid terrace still" },
  { src: "/media/brand-hoodie.jpg", alt: "OxlisVoid hoodie still" },
  { src: "/media/brand-mirror.jpg", alt: "OxlisVoid mirror still" },
  { src: "/media/brand-terrace.jpg", alt: "OxlisVoid merch still" },
] as const;
