# Next.js Learning Notes

These notes summarize the concepts covered so far while learning to build a static website with Next.js. Code examples are kept in English.

## Learning goal

Build a static business website inspired by [Gail International](https://www.gailinternational.com/), step by step. The reference website focuses on adhesive products, product details, and contact information.

## Project structure

```text
next-learning/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── products/
│   │   ├── [slug]/
│   │   │   ├── page.tsx
│   │   │   └── ProductDetails.module.css
│   │   ├── page.tsx
│   │   └── ProductsPage.module.css
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.module.css
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ProductCard.module.css
│   ├── ProductCard.tsx
│   ├── PropsExample.tsx
│   ├── PropsExample.module.css
│   └── PublicImageExample.tsx
├── data/
│   └── products.ts
├── public/
│   └── products/
└── package.json
```

- `app/` contains routes and layouts.
- `app/page.tsx` is the home page at `/`.
- `app/about/page.tsx` is the About page at `/about`.
- `app/layout.tsx` is the shared root layout.
- `app/globals.css` contains global styles.
- `components/` holds reusable UI components. A component file here does not create a URL by itself.
- `data/products.ts` holds the static product records used by the product list and detail route.
- `public/` holds static files such as images and SVGs.
- `package.json` lists project scripts and dependencies.
- `next.config.ts` holds Next.js configuration; it is currently empty.

## Concepts covered

### 1. React and Next.js

- React is used to build UI from components.
- Next.js is a framework built on React. It adds routing, layouts, and other application features.
- A React component is a function that returns UI (JSX).
- Components should start with a capital letter and are used like `<Header />`.

### 2. App Router and file-based routes

Next.js uses folder and file names under `app/` to determine routes:

```text
app/page.tsx          -> /
app/about/page.tsx    -> /about
```

Next.js selects the matching `page.tsx` for the requested URL and renders its default-exported component. No manual call to `Home()` is needed.

### 3. Root layout and `children`

`app/layout.tsx` provides shared outer structure for routes inside it. The root layout typically contains `<html>` and `<body>`, and renders the current route where `{children}` appears.

```tsx
<body>
  <Header />
  {children}
  <Footer />
</body>
```

Here, the selected route's page is passed into the layout as `children`. Components placed before or after it can appear across the routes using that layout.

### 4. Components, props, and reuse

- Components divide the UI into named, reusable pieces.
- Props are inputs passed from a parent component to a child component.
- TypeScript types can describe the props a component expects.

```tsx
function Welcome({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
```

Use the same component with different values:

```tsx
<Welcome title="First topic" description="A short explanation." />
<Welcome title="Second topic" description="Another explanation." />
```

### 5. Rendering a list

JavaScript's `.map()` can render a component for each item in an array. Each rendered item should have a stable, unique `key`.

```tsx
{examples.map((example) => (
  <Welcome
    key={example.title}
    title={example.title}
    description={example.description}
  />
))}
```

### 6. Navigation with `Link`

Use `Link` from `next/link` to navigate between routes in the same Next.js app:

```tsx
import Link from "next/link";

<Link href="/about">About</Link>
```

`Link` is built on the HTML anchor element and supports Next.js navigation features. Ordinary `<a>` elements are still useful, especially for external destinations.

### 7. JSX and HTML attributes

- JSX uses `className` instead of HTML's `class`.
- JavaScript expressions inside JSX are written in braces, such as `{title}`.
- A component that takes no children can be written as `<Example />`.
- Use semantic HTML elements such as `<main>`, `<header>`, `<footer>`, and `<section>` to describe page structure. A section is optional when content does not need its own grouping.

### 8. Styling

- `app/globals.css` is imported by the root layout and is suitable for site-wide CSS.
- A CSS class is connected to an element using `className`.
- A CSS Module has a `.module.css` filename and scopes class names to the imported component.

```tsx
import styles from "./Example.module.css";

<section className={styles.card}>...</section>
```

Use multiple module classes by combining their generated class-name strings:

```tsx
<section className={`${styles.card} ${styles.highlighted}`}>
```

Responsive styles can be added with media queries:

```css
@media (max-width: 600px) {
  .site-header {
    padding: 14px;
  }
}
```

### 9. Images in `public/`

Files under `public/` are addressed from the root URL. For example, `public/next.svg` is referenced as `/next.svg`. Next.js provides the `Image` component from `next/image`:

```tsx
import Image from "next/image";

<Image src="/next.svg" alt="Next.js logo" width={100} height={20} />
```

### 10. Metadata

Metadata describes a page to browsers and search engines; it does not style the visible UI. Next.js route `page.tsx` and `layout.tsx` files can export metadata. A root layout provides defaults, while a page can provide route-specific metadata.

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About this learning project.",
};
```

### 11. Footer placement

The root layout places the footer after `{children}`. A flex-column body and a growing `main` area can push the footer to the bottom on short pages. For long pages, the footer follows the content; it should not normally be fixed over the content.

### 12. Dynamic product routes

A folder name in square brackets makes a dynamic route segment:

```text
app/products/[slug]/page.tsx -> /products/<slug>
```

For example, `/products/evofix-pur` supplies `evofix-pur` as the route's `slug`. In this Next.js 16 project, `params` is a Promise and must be awaited:

```tsx
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}
```

Next.js calls the default-exported page component for the matching route. It does not need to be manually inserted into the root layout; the current route is rendered in the layout's `{children}`.

### 13. Finding data and showing a 404

The product detail page looks up a record by its URL slug. `find()` returns a matching record or `undefined`. Call `notFound()` when no record matches:

```tsx
const product = products.find((item) => item.slug === slug);

if (!product) {
  notFound();
}
```

`notFound` comes from `next/navigation`; it stops rendering that route and shows the Next.js not-found UI.

### 14. Static product data and product cards

Each product in `data/products.ts` has a unique `slug`, `name`, `description`, and `image` path. The products page maps over this array and passes each record's values to a reusable `ProductCard`.

The card links to the matching detail route:

```tsx
<Link href={`/products/${slug}`}>{name}</Link>
```

The product-list page owns the layout for the group of cards; `ProductCard` owns the markup and style for one card. For example, a CSS Module beside the products page can define the grid, while `ProductCard.module.css` defines each card.

### 15. Product image sizing and layout

The detail page uses `next/image` with a local `public/` image path. `width` and `height` should reflect the image's proportions. The CSS Module can limit the displayed image height and use `object-fit: contain` to keep the complete image visible without cropping.

The detail layout uses CSS Grid for desktop columns and a media query to switch to one column on narrow screens. Apply CSS Module classes to the JSX with `className={styles.className}`; defining a CSS class alone does not apply it.

### 16. Server and Client Components (intro)

In the App Router, pages and layouts are Server Components by default. Static content and product details can stay server-rendered.

Use a Client Component only when browser-side interaction is needed, such as React state, event handlers, or an interactive menu. A file that needs this begins with:

```tsx
"use client";
```

This topic was introduced but has not yet been practiced in the project. It is not required for the current static pages.

## Build and deployment status

`npm run lint`, `npm run build`, and deployment were discussed. Lint was run; production build and deployment are intentionally deferred so the focus stays on building the site.

## What remains to learn

Next practical steps for the Gail International-inspired static website:

1. Create the Contact route and add it to the shared Header.
2. Build the Home page sections: company intro, hero/banner, featured products, and contact call-to-action.
3. Improve About and Products pages with accurate, verified business/product content.
4. Refine all pages' styles and responsive behavior; check that header and footer work consistently.
5. Add a contact form only if needed. A static form does not send messages by itself; submission needs a backend or form service.
6. Learn Client Components when adding an interactive feature.
7. Later, revisit production build and deployment.

The current project has a working learning example for Home, About, product listing, dynamic product detail routes, shared Header/Footer, local product images, and responsive CSS examples. It is not yet a finished visual recreation of the reference website.

## Teaching preferences

- Explain in simple Hindi/Hinglish, with PHP comparisons when they help.
- Keep each lesson short and teach one step at a time.
- Do not provide the entire website code at once.
- Keep all code, identifiers, and UI example text in English.
