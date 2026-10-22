import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>
        This idea hasn’t
        <br />
        been built <span className="serif">yet.</span>
      </h1>
      <p>
        The page you’re looking for doesn’t exist. There’s plenty to explore
        back home.
      </p>
      <Link href="/" className="button button-primary">
        Back to home <ArrowUpRight size={18} />
      </Link>
    </main>
  );
}
