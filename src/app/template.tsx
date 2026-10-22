import type { ReactNode } from "react";

// Next remounts this boundary for each route. Content is always visible;
// navigation never waits for an outgoing page's animation to finish.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-content">{children}</div>;
}
