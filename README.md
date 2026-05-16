# AURA

A cinematic luxury ecommerce experience built with Next.js 15, Tailwind CSS, Firebase, Razorpay, Framer Motion, and shadcn-style UI primitives.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in Firebase and Razorpay credentials.

3. Run the app:

```bash
npm run dev
```

## Integrations

- Firebase Authentication powers email/password and Google login.
- Firestore helpers are ready for products, users, orders, wishlist, and cart collections.
- Razorpay order creation lives at `/api/razorpay/order`.

The app ships with curated demo data so the full luxury shopping flow works before backend data is connected.
