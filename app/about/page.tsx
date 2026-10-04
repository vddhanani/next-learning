import type { Metadata } from "next";

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This is my first additional route.</p>
    </main>
  );
}
export const metadata: Metadata = {
  title: "About | My Next.js Learning Site",
  description: "Learn about this Next.js learning project.",
};