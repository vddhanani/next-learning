import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
        <Link className="nav-link" href="/">Home</Link>
        <Link className="nav-link" href="/about">About</Link>
    </header>
  );
}