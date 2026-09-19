# CP Core

**A reusable e-commerce product foundation built through cross-functional technical leadership.**

[Live storefront](https://cp-core-template.vercel.app) · [Curious Packet](https://github.com/Curious-Packet)

CP Core combines a customer storefront, commerce workflows, and an administrative platform in one Next.js application. It was designed as a foundation that could be adapted to different catalog-based businesses without rebuilding the same product, order, customer, and operational capabilities for every engagement.

> This public repository is a portfolio version of a product foundation developed by a small cross-functional team that I assembled and led. It demonstrates the product and technical approach; the public Git history is not intended to represent the full original collaboration.

## My role

**Founder · architecture, backend engineering, and delivery leadership**

I led the project from product direction through delivery. My responsibilities included:

- defining the product direction, scope, and reusable-platform goals;
- hiring and leading the delivery team;
- coordinating UI/UX, frontend, and backend work;
- shaping the architecture and integration boundaries;
- contributing to and reviewing the backend implementation;
- managing delivery and helping the product converge into a usable system; and
- guiding deployment and infrastructure decisions.

The team structure was:

```text
Project Lead / Technical Lead
        |
        +-- UI/UX Designer
        +-- Frontend Engineer
        +-- Backend Engineer
```

This project is evidence of both hands-on engineering and the leadership required to align design, application development, data, infrastructure, and delivery.

## Why we built it

Commerce projects repeatedly need the same core capabilities: structured catalogs, product media, customer accounts, carts, checkout, order management, and an internal operating surface. CP Core brings those concerns into one adaptable foundation so future work can begin with a working product system rather than an empty application.

The current public demo uses the Safety Vision catalog to show the storefront experience.

## Product architecture

```text
                         Customers
                             |
                    Next.js Storefront
                   /        |         \
             Account      Catalog    Commerce
                                      Cart / Checkout
                   \        |         /
                     Server Actions
                           |
             +-------------+-------------+
             |                           |
       Drizzle ORM                    AWS S3
             |                     Product media
       Neon Postgres

                         Admin Team
                             |
                    Admin Dashboard
          Products / Categories / Orders / Customers
                             |
                       Server Actions
                             |
                      Drizzle + Postgres
```

The application uses the Next.js App Router for both the public storefront and the protected admin experience. Server Actions coordinate product, category, customer, cart, checkout, and order operations. Drizzle provides the typed data layer over Postgres, while S3-backed multipart uploads handle product media.

## Customer storefront

The customer-facing application includes:

- a category-led home page and collection browsing;
- product listings and product-detail pages;
- guest and authenticated cart behavior;
- account registration, sign-in, verification, password reset, and profile management;
- checkout with contact and shipping information;
- order creation, confirmation, and confirmation email; and
- a contact surface and responsive navigation.

## Admin platform

The separate admin experience supports day-to-day commerce operations:

- dashboard reporting and visual summaries;
- product creation, editing, deletion, stock, pricing, and status management;
- category and subcategory management;
- multi-image product uploads and image ordering;
- customer creation, editing, and deletion;
- order review, contact and shipping updates, status management, and deletion; and
- administrative settings.

## Authentication and authorization

Authentication uses signed JWT sessions stored in HTTP-only cookies. The routing boundary verifies the session for protected account, checkout, and admin routes, while the admin path also checks the `isAdmin` claim before allowing access.

Passwords are hashed with bcrypt. The account flow includes email verification and password-reset codes, and authenticated carts can be reconciled with the customer's existing cart when a session is created.

## Data architecture

The relational model is implemented with Drizzle ORM and covers:

- users and administrative access;
- products, categories, and product-category relationships;
- product and category images;
- guest and authenticated carts;
- orders and order items; and
- operational fields for stock, pricing, shipping, tax, status, and timestamps.

The schema is backed by Neon Postgres and includes seed tooling for local development and demonstrations.

## Media and email

Product media is uploaded directly to AWS S3 through a multipart upload flow, with server endpoints for initialization and completion. Imgix-compatible URLs and image helpers support optimized delivery in the storefront and admin platform.

Transactional email is implemented with Resend and React Email. The current flows cover account verification, password reset, and order confirmation.

## Deployment

The public demo is deployed on Vercel. Runtime configuration is supplied through Vercel environment variables, and each production deployment runs the Next.js build before the release is promoted.

Image delivery uses the public Imgix source configured by `NEXT_PUBLIC_IMGIX_URL`. The application normalizes stored image paths before passing them to Next.js, preventing malformed duplicate slashes from reaching Vercel's image optimizer.

## Technology choices

| Area | Technology |
| --- | --- |
| Application | Next.js 16, React 19, TypeScript |
| Data | Drizzle ORM, Neon Postgres |
| Authentication | Jose/JWT, HTTP-only cookies, bcrypt |
| Validation and forms | Zod, React Hook Form |
| Client state and data | Zustand, SWR |
| Admin UI | TanStack Table, Recharts, dnd-kit |
| UI system | Tailwind CSS, Radix UI primitives, Lucide |
| Media | AWS S3 multipart uploads, Imgix-compatible delivery |
| Email | Resend, React Email |
| Delivery | Vercel |

## Project structure

```text
src/
├── app/
│   ├── (web)/              # Storefront, account, cart, and checkout
│   ├── admin/              # Protected administrative platform
│   ├── actions/            # Storefront and admin server actions
│   └── api/images/         # S3 multipart-upload endpoints
├── components/
│   ├── web/                # Customer-facing product and commerce UI
│   ├── admin/              # Administrative workflows and tables
│   └── ui/                 # Shared UI primitives
├── db/
│   ├── schema/             # Drizzle relational schema
│   └── seed/               # Demonstration data tooling
├── emails/                 # React Email templates
├── lib/                    # Auth, data access, email, and storage services
├── schemas/                # Zod validation schemas
└── stores/                 # Client-side commerce state
```

## What I learned leading the team

- Reusable foundations require clear boundaries between shared commerce behavior and business-specific presentation.
- Cross-functional delivery depends on defining contracts early: data shapes, validation rules, route ownership, and acceptance criteria.
- Admin tooling is part of the product, not an afterthought; operational workflows need the same design and engineering attention as the storefront.
- Integration and delivery leadership are active technical work. Architecture only creates value when design, frontend, backend, data, and deployment converge into a coherent release.
- Portfolio documentation should make both the implementation and the leadership behind it inspectable.

## Running locally

### Requirements

- Node.js 24
- npm 11
- a Postgres database
- AWS S3 credentials and bucket configuration
- a Resend API key

### Environment

Create `.env.local` with the following values:

```dotenv
DATABASE_URL=
JWT_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
S3_BUCKET_ACCESS_KEY=
S3_BUCKET_SECRET_KEY=
NEXT_PUBLIC_S3_BUCKET_NAME=
NEXT_PUBLIC_S3_BUCKET_REGION=
NEXT_PUBLIC_S3_URL=
NEXT_PUBLIC_IMGIX_URL=
```

Never commit this file or print its contents in build or deployment logs.

### Setup

```bash
npm ci
npm run db:push
npm run db:seed
npm run local-dev
```

Before submitting a change, run the same core checks used by continuous integration:

```bash
npm run lint
npm run typecheck
npm run build
```
