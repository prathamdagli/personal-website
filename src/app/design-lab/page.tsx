import type { Metadata } from "next";
import { SignaturePrototypes } from "@/components/signature-prototypes";
export const metadata: Metadata = {
  title: "Signature prototypes",
  robots: { index: false, follow: false },
};
export default function DesignLab() {
  return (
    <main id="main" className="container section design-lab">
      <span className="eyebrow">Design review / choose one signature</span>
      <h1>One defining moment.</h1>
      <p>
        Compare these directions before one becomes part of the homepage.
        Nothing here changes the selected site identity. Interactive scenes load
        only when requested, render on demand, and unload off screen. Mobile,
        low-power, and reduced-motion visitors see a static preview.
      </p>
      <SignaturePrototypes />
    </main>
  );
}
