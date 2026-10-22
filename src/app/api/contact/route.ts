import { createContactHandler } from "@/lib/contact-api";
export const runtime = "nodejs";
const handleContact = createContactHandler({ env: process.env });
export async function POST(request: Request) {
  return handleContact(request);
}
