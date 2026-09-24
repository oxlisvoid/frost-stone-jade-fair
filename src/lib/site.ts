export const SITE = {
  name: "OxlisVoid",
  instagram: "https://instagram.com/oxlisvoid",
  instagramHandle: "@oxlisvoid",
  tagline: "The step-by-step system to launch AI models and sell content without showing your face.",
  price: 9.99,
  comparePrice: 97,
  currency: "USD",
  email: "oxlisvoid1@gmail.com",
} as const;

export const PAYMENT = {
  successPath: "/success",
  cancelPath: "/canceled",
} as const;

export const OFFER = {
  name: "OxlisVoid System",
  priceLabel: "$9.99",
  compareLabel: "$97",
  headline: "Build an AI model business without showing your face.",
  sells:
    "Creation, posting, and monetization in one pack. Demos on this site. The real system is emailed within 24 hours of Stripe payment.",
} as const;

export const KITS = [
  { id: "image", name: "Image Kit", price: 97, sells: "Consistent character stills." },
  { id: "video", name: "Video Kit", price: 235, sells: "AI video workflows." },
  { id: "motion", name: "Motion Kit", price: 300, sells: "Motion-controlled clips." },
  { id: "total", name: "Total Kit", price: 500, sells: "Image + video + motion." },
  { id: "mentorship", name: "Mentorship", price: 1050, sells: "Full stack plus a call." },
] as const;

export const ADDON = {
  id: "instagram",
  name: "Help building the Instagram",
  price: 89,
  rule: "Optional add-on after All Access. Not sold separately.",
} as const;

export const INCLUDED = [
  "Character creation system (face, body, identity lock)",
  "7 plug-and-play image + video workflows",
  "13 step-by-step tutorials",
  "TikTok + Instagram growth playbooks",
  "Fan-page monetization structure",
  "Prompt libraries and lifetime updates",
  "Emailed within 24 hours of payment",
] as const;

export const NOT_SOLD = [
  "Course sold without the tools",
  "Server sold alone",
  "Instagram help on its own",
] as const;

export const LEARN = [
  "Create a consistent AI girl from scratch",
  "Keep the same face across photos and clips",
  "Turn Reels and TikToks into traffic",
  "Build a profile that converts visits into buyers",
  "Place your link without burning the account",
  "Package private content people actually pay for",
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
    body: "The system in one pass: character lock, stills, motion, publish.",
    src: "/media/v-studio.mp4",
    poster: "/media/p-studio.jpg",
  },
  {
    id: "install",
    title: "How to install ComfyUI",
    time: "01:23",
    body: "Local install or a fresh GPU pod.",
    src: "/media/v-indoor.mp4",
    poster: "/media/p-indoor.jpg",
  },
  {
    id: "basics",
    title: "ComfyUI basics",
    time: "17:56",
    body: "Nodes, queues, seeds, samplers.",
    src: "/media/v-indoor.mp4",
    poster: "/media/p-office.jpg",
  },
  {
    id: "character",
    title: "Generating your character",
    time: "05:12",
    body: "Lock identity before you scale content.",
    src: "/media/v-cafe.mp4",
    poster: "/media/p-cafe.jpg",
  },
  {
    id: "dataset",
    title: "Generating a dataset",
    time: "05:11",
    body: "Framing, angles, captions.",
    src: "/media/v-rooftop.mp4",
    poster: "/media/p-rooftop.jpg",
  },
  {
    id: "lora",
    title: "Training a LoRA",
    time: "03:08",
    body: "Production settings. Stop before overfit.",
    src: "/media/v-beach.mp4",
    poster: "/media/p-beach.jpg",
  },
  {
    id: "images",
    title: "Generating images",
    time: "08:31",
    body: "From character sheet to social-ready stills.",
    src: "/media/v-studio.mp4",
    poster: "/media/p-studio.jpg",
  },
  {
    id: "editing",
    title: "Editing images",
    time: "07:12",
    body: "Inpaint and skin-enhance without breaking identity.",
    src: "/media/v-skin-after.mp4",
    poster: "/media/skin-after.jpg",
  },
  {
    id: "motion",
    title: "Motion control",
    time: "06:46",
    body: "Drive video from a still plus a motion reference.",
    src: "/media/v-motion.mp4",
    poster: "/media/p-night.jpg",
  },
  {
    id: "krea",
    title: "Generating images (Krea2)",
    time: "06:32",
    body: "Faster iteration, cleaner skin, tighter prompts.",
    src: "/media/v-night.mp4",
    poster: "/media/p-night.jpg",
  },
  {
    id: "sops",
    title: "Social media growth SOPs",
    time: "written",
    body: "Cadence, hooks, carousel structure.",
    src: "/media/v-man.mp4",
    poster: "/media/p-man.jpg",
  },
  {
    id: "prompts",
    title: "Prompt guide",
    time: "written",
    body: "Subject, style, lens, framing, mood.",
    src: "/media/v-cafe.mp4",
    poster: "/media/p-cafe.jpg",
  },
] as const;

export const FAQ = [
  {
    q: "When do I receive the tools?",
    a: "After Stripe confirms payment we email the workflows, tutorials, playbooks, and prompt libraries to the address you enter at checkout — within 24 hours. Check spam if you do not see it.",
  },
  {
    q: "Why do you need my email?",
    a: "That is the inbox that receives the pack. Stripe also sends the receipt there.",
  },
  {
    q: "Is $9.99 a subscription?",
    a: "No. One-time payment. Lifetime access and lifetime tool updates. No monthly fee.",
  },
  {
    q: "What if I get stuck?",
    a: "Write oxlisvoid1@gmail.com or DM @oxlisvoid on Instagram with a screenshot. We help with install, first character, and first posts.",
  },
  {
    q: "Can I sell with the models I create?",
    a: "Yes. The system is built so you can create AI models and sell with them on TikTok, Instagram, and fan platforms.",
  },
  {
    q: "Do I need a powerful computer?",
    a: "No. Most people generate on a cloud GPU. Mac works. Weak PCs are covered.",
  },
  {
    q: "How do you take payment?",
    a: "Existing Stripe checkout on this site. Card numbers never touch the landing page.",
  },
  {
    q: "Do I need coding experience?",
    a: "No. Step by step. Built for people who have never opened ComfyUI.",
  },
] as const;

export const PORTRAITS = [
  { src: "/media/brand-pool.jpg", alt: "OxlisVoid pool still" },
  { src: "/media/brand-crop.jpg", alt: "OxlisVoid terrace still" },
  { src: "/media/brand-hoodie.jpg", alt: "OxlisVoid hoodie still" },
  { src: "/media/brand-mirror.jpg", alt: "OxlisVoid mirror still" },
  { src: "/media/brand-terrace.jpg", alt: "OxlisVoid merch still" },
] as const;
