"use client";
import { motionTokens } from "@/lib/motion";

import { useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CopyEmail } from "@/components/contact-form";
import { email, social } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site-config";

const channels = [
  {
    name: "WhatsApp",
    label: "Start a direct chat",
    href: siteConfig.whatsapp.url,
    note: `Chat with me directly on WhatsApp: ${siteConfig.whatsapp.number}.`,
    external: true,
  },
  {
    name: "GitHub",
    label: "Explore the code",
    href: social.github,
    note: "Repositories, experiments, and the implementation behind the projects.",
    external: true,
  },
  {
    name: "LinkedIn",
    label: "Connect with me",
    href: social.linkedin,
    note: "Professional experience, ongoing work, and a place to continue the conversation.",
    external: true,
  },
  {
    name: "Resume",
    label: "Download PDF",
    href: "/Pratham-Dagli-Resume.pdf",
    note: "Education, technical skills, and the full experience in one document.",
    external: false,
  },
];

export function ContactOrbit() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [emailHover, setEmailHover] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 180, damping: 18 });
  const y = useSpring(pointerY, { stiffness: 180, damping: 18 });

  function follow(event: PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 15);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 12);
  }
  function reset() {
    pointerX.set(0);
    pointerY.set(0);
    setEmailHover(false);
  }

  return (
    <div className="contact-orbit">
      <div className="contact-invitation-label">
        <span className="eyebrow">01 / THE DIRECT LINE</span>
        <span className="contact-invitation-status">
          {emailHover ? "OPEN YOUR EMAIL APP ↗" : "A CONVERSATION STARTS HERE"}
        </span>
      </div>
      <a
        href={`mailto:${email}`}
        className="contact-magnetic-email"
        aria-label={`Write to ${email}`}
        onPointerMove={follow}
        onPointerEnter={() => setEmailHover(true)}
        onPointerLeave={reset}
        onFocus={() => setEmailHover(true)}
        onBlur={reset}
      >
        <motion.span
          className="contact-email-type"
          style={reduced ? undefined : { x, y }}
        >
          <span>prathamdagli11</span>
          <span>@gmail.com</span>
        </motion.span>
        <motion.span
          className="contact-email-arrow"
          animate={{ rotate: emailHover ? 45 : 0 }}
          transition={{ duration: reduced ? 0 : motionTokens.duration.base }}
        >
          <ArrowUpRight aria-hidden="true" />
        </motion.span>
        <span className="contact-email-rule" aria-hidden="true" />
      </a>
      <CopyEmail />
      <div className="contact-browser-email" aria-label="Write using webmail">
        <span>No email app?</span>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
          target="_blank"
          rel="noreferrer"
        >
          Open Gmail <ArrowUpRight size={13} />
        </a>
        <a
          href={`https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}`}
          target="_blank"
          rel="noreferrer"
        >
          Open Outlook <ArrowUpRight size={13} />
        </a>
      </div>
      <p className="contact-invitation-copy">
        For project ideas, internships, and collaborations in applied AI or
        software development. Tell me about the problem, the people it affects,
        and what you’d like to build.
      </p>
      <div className="contact-channel-list" onPointerLeave={() => setActive(0)}>
        {channels.map((channel, index) => (
          <a
            key={channel.name}
            href={channel.href}
            target={channel.external ? "_blank" : undefined}
            rel={channel.external ? "noreferrer" : undefined}
            download={!channel.external || undefined}
            className={active === index ? "is-active" : ""}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <span className="contact-channel-number">0{index + 2}</span>
            <span className="contact-channel-name">{channel.name}</span>
            <span className="contact-channel-purpose">{channel.label}</span>
            <ArrowUpRight size={21} aria-hidden="true" />
            {active === index && (
              <motion.span
                layoutId="contact-channel-highlight"
                className="contact-channel-highlight"
                transition={{ duration: reduced ? 0 : motionTokens.duration.base }}
              />
            )}
          </a>
        ))}
      </div>
      <div className="contact-channel-note">
        <ArrowDownRight size={18} aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={active}
            initial={{ opacity: 0, y: reduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={{ duration: reduced ? 0 : motionTokens.duration.fast }}
          >
            {channels[active].note}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
