"use client";

import { useState, type FormEvent } from "react";
import { profile, type GitHubProfile } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import SocialLinks from "@/components/SocialLinks";

function Field({
  id,
  label,
  type = "text",
  textarea,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="group relative">
      {textarea ? (
        <textarea
          id={id}
          required
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          className="peer w-full resize-none rounded-md border border-white/15 bg-black/40 px-4 pb-2 pt-5 font-mono text-sm text-ink outline-none transition-all focus:border-neon-green/60 focus:shadow-neon-green/30"
        />
      ) : (
        <input
          id={id}
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          className="peer w-full rounded-md border border-white/15 bg-black/40 px-4 pb-2 pt-5 font-mono text-sm text-ink outline-none transition-all focus:border-neon-green/60 focus:shadow-neon-green/30"
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-3.5 font-mono text-xs text-muted transition-all peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-neon-green peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact({ github }: { github: GitHubProfile | null }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState("sending");
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    setTimeout(() => {
      window.location.href = `${profile.links.email}?subject=${subject}&body=${body}`;
      setState("sent");
      setTimeout(() => setState("idle"), 4000);
    }, 900);
  };

  const info = [
    { label: "email", value: profile.email, href: profile.links.email },
    {
      label: "github",
      value: github?.login ? `@${github.login}` : "@proffaro",
      href: github?.htmlUrl || profile.links.github,
    },
    { label: "location", value: github?.location || profile.location, href: undefined },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <SectionHeading
        index="06"
        command="./establish --connection"
        title="Contact"
        // subtitle="// open a secure channel — let's build something"
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal variant="left" className="lg:col-span-2">
          <div className="glass holo h-full rounded-lg border border-white/10 p-6 font-mono text-sm">
            <p className="mb-4 text-neon-green/80">
              <span className="text-neon-blue">$</span> ./contact --info
            </p>
            <ul className="space-y-4">
              {info.map((row) => (
                <li key={row.label}>
                  <span className="block text-[10px] uppercase text-muted">
                    {row.label}
                  </span>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.label === "github" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="break-all text-ink transition-colors hover:text-neon-green"
                      data-cursor="hover"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className="text-ink">{row.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-white/10 pt-4">
              <SocialLinks githubUrl={github?.htmlUrl} />
            </div>
          </div>
        </Reveal>

        <Reveal variant="right" className="lg:col-span-3">
          <form onSubmit={submit} className="glass rounded-lg border border-white/10 p-6">
            <div className="space-y-5">
              <Field id="name" label="// your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field id="email" label="// your email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field id="message" label="// your message" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
              <MagneticButton variant="primary" className="w-full">
                {state === "idle" && "> transmit_message()"}
                {state === "sending" && "encrypting & sending..."}
                {state === "sent" && "✓ channel opened — check your mail client"}
              </MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
