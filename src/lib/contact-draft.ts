export type ContactMessage = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export function prepareContactDraft(
  message: ContactMessage,
  recipient: string,
) {
  const name = message.name.trim().replace(/[\r\n]+/g, " ");
  const subject = `${message.topic} — ${name}`;
  const body = `Hi Pratham,\n\n${message.message.trim()}\n\n${name}\nReply to: ${message.email.trim()}`;
  const gmail = new URL("https://mail.google.com/mail/");
  gmail.search = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: recipient,
    su: subject,
    body,
  }).toString();
  const outlook = new URL("https://outlook.live.com/mail/0/deeplink/compose");
  outlook.search = new URLSearchParams({
    to: recipient,
    subject,
    body,
  }).toString();
  return {
    recipient,
    subject,
    body,
    mailto: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    gmail: gmail.toString(),
    outlook: outlook.toString(),
    text: `To: ${recipient}\nSubject: ${subject}\n\n${body}`,
  };
}
