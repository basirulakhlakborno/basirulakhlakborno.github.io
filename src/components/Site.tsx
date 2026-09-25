import { useEffect, useRef, useState } from "react";
import type { FormEvent, MouseEvent as ReactMouseEvent } from "react";
import { projects, services, socials } from "../data";
import type { ProjectCategory } from "../data";
import { ArrowIcon, FacebookIcon, GitHubIcon, InstagramIcon } from "../icons";
import TrackingTimeline from "@/components/ui/order-history";
import type { TimelineItem } from "@/components/ui/order-history";
import { AppWindow, Braces, Code2, Layers, LayoutDashboard, Monitor, Rocket, Server } from "lucide-react";

type FilterName = "all" | ProjectCategory;

const filters: { id: FilterName; label: string }[] = [
  { id: "all", label: "All" },
  { id: "real", label: "Real Project" },
  { id: "exploration", label: "Exploration" },
];

const experienceItems: TimelineItem[] = [
  {
    id: 1,
    status: "completed",
    title: "Web applications",
    detail: "Interface, API, and data together",
    date: "",
    icon: <AppWindow />,
  },
  {
    id: 2,
    status: "completed",
    title: "Dashboards",
    detail: "Admin tools and data-heavy screens",
    date: "",
    icon: <LayoutDashboard />,
  },
  {
    id: 3,
    status: "completed",
    title: "APIs",
    detail: "Auth, integrations, and clean data",
    date: "",
    icon: <Braces />,
  },
  {
    id: 4,
    status: "completed",
    title: "Launch",
    detail: "Deploy, monitoring, and speed",
    date: "",
    icon: <Rocket />,
  },
  {
    id: 5,
    status: "in-progress",
    title: "Fullstack developer",
    detail: "Products, from the first screen to launch",
    date: "Now",
    icon: <Code2 />,
  },
];

const serviceIcons = {
  fullstack: <Layers />,
  frontend: <Monitor />,
  backend: <Server />,
  ship: <Rocket />,
};

const socialIcons = {
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  github: <GitHubIcon />,
};

export function Site() {
  const [filter, setFilter] = useState<FilterName>("all");
  const [contactOpen, setContactOpen] = useState(false);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const portraitRef = useRef<HTMLImageElement>(null);
  const colorRef = useRef<HTMLImageElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const moveGlow = (event: ReactMouseEvent<HTMLDivElement>) => {
    const img = portraitRef.current;
    const color = colorRef.current;
    const spot = spotRef.current;
    if (!img || !color || !spot) return;
    const rect = img.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    if (!inside) {
      spot.style.opacity = "0";
      return;
    }
    const localX = x - rect.left;
    const localY = y - rect.top;
    const spotW = 1500;
    const spotH = 280;
    spot.style.opacity = "1";
    spot.style.left = `${localX}px`;
    spot.style.top = `${localY}px`;
    color.style.width = `${rect.width}px`;
    color.style.height = `${rect.height}px`;
    color.style.left = `${spotW / 2 - localX}px`;
    color.style.top = `${spotH / 2 - localY}px`;
    color.style.transformOrigin = `${localX}px ${localY}px`;
    color.style.transform = "rotate(-45deg)";
  };

  const hideGlow = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [contactOpen]);

  const openContact = () => {
    setSendState("idle");
    setContactOpen(true);
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSendState("sending");
    try {
      const response = await fetch("https://formsubmit.co/ajax/basirulakhlak@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: `Portfolio inquiry from ${data.get("name")}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const result = await response.json();
      if (!response.ok || String(result.success) !== "true") throw new Error("Send failed");
      setSendState("sent");
      form.reset();
    } catch {
      setSendState("error");
    }
  };

  const visibleProjects = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );

  return (
    <div className="sky">
      <main className="wrap">
        <section className="sheet" id="top">
          <div className="screen">
          <header className="nav">
            <a className="pill status" href="#contact">
              <span className="dot" aria-hidden="true" />
              Available for New Project
            </a>
            <nav className="links" aria-label="Primary">
              <a href="#work">
                Work <span>[40+]</span>
              </a>
              <a href="#service">
                Service <span>[6+]</span>
              </a>
              <a href="#experience">
                Experience <span>[5y+]</span>
              </a>
              <a href="mailto:basirulakhlak@gmail.com">Contact</a>
            </nav>
            <button className="btn btn-dark" type="button" onClick={openContact}>
              Let’s Talk <ArrowIcon />
            </button>
          </header>

          <div className="hero" onMouseMove={moveGlow} onMouseLeave={hideGlow}>
            <h1 className="display">
              <span className="ghost">BASIRUL</span>
              <span className="solid">AKHLAK</span>
            </h1>
            <div className="portrait-frame">
              <img
                ref={portraitRef}
                className="portrait"
                src="/images/portrait.png?v=9"
                alt="Basirul Akhlak"
                width={1024}
                height={889}
                fetchPriority="high"
              />
              <div ref={spotRef} className="portrait-spot">
                <img ref={colorRef} className="portrait-color" src="/images/portrait.png?v=9" alt="" aria-hidden="true" />
              </div>
            </div>
            <div className="hero-row">
              <div className="intro">
                <h2>Fullstack Developer</h2>
                <p>
                  Shipping products end to end, from the interface to the API, the data, and the
                  deploy.
                </p>
                <a className="btn btn-dark" href="#contact">
                  Let’s collaborate <ArrowIcon />
                </a>
              </div>
              <div className="social-col">
                {socials.map((social) => (
                  <a key={social.label} className="chip" href={social.href} target="_blank" rel="noreferrer">
                    {socialIcons[social.icon]}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          </div>

          <section className="work" id="work">
            <div className="work-head">
              <p className="watermark" aria-hidden="true">
                PORTFOLIO
              </p>
              <h2>/SELECTED WORK</h2>
            </div>
            <div className="work-bar">
              <div className="filters" role="tablist" aria-label="Project filters">
                {filters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    className={filter === item.id ? "is-active" : undefined}
                    aria-selected={filter === item.id}
                    onClick={() => setFilter(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button className="chip view-all" type="button" onClick={() => setFilter("all")}>
                View All Work <ArrowIcon />
              </button>
            </div>
            <div className="grid">
              {visibleProjects.map((project) => (
                <article key={project.title} className="card">
                  <a className="shot" href="#work">
                    <img
                      className={project.full ? "is-full" : undefined}
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="arrow" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </a>
                  <h3>{project.title}</h3>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="services" id="service">
          <div className="section-title">
            <p className="watermark light" aria-hidden="true">
              SERVICE
            </p>
            <h2>/SERVICE</h2>
          </div>
          <div className="svc-list">
            {services.map((service) => (
              <article key={service.id} className="svc-row">
                <span className="svc-mark" aria-hidden="true">
                  {serviceIcons[service.id as keyof typeof serviceIcons]}
                </span>
                <div className="svc-copy">
                  <strong>{service.title}</strong>
                  <p>{service.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="exp-frame" id="experience">
          <div className="exp">
            <p className="watermark dark" aria-hidden="true">
              EXPERIENCE
            </p>
            <div className="exp-head">
              <div>
                <h2>/EXPERIENCE</h2>
                <p>End-to-end product engineering</p>
              </div>
              <div className="exp-stats">
                <p>
                  <strong>5y+</strong>
                  <span>Experience</span>
                </p>
                <p>
                  <strong>40+</strong>
                  <span>Works</span>
                </p>
              </div>
            </div>
            <div className="exp-timeline">
              <TrackingTimeline items={experienceItems} />
            </div>
          </div>
        </section>

        <section className="cta" id="contact">
          <a className="pill status" href="#contact">
            <span className="dot" aria-hidden="true" />
            Available for New Project
          </a>
          <h2>HAVE A PRODUCT TO SHIP?</h2>
          <p>I can take it from the first screen to the API, the data, and the launch.</p>
          <a className="btn btn-dark" href="mailto:basirulakhlak@gmail.com">
            Contact Me <ArrowIcon />
          </a>
          <a className="cta-mail" href="mailto:basirulakhlak@gmail.com">
            basirulakhlak@gmail.com
          </a>
          <div className="footer-row">
            <a className="chip chip-dark" href="#top">
              <img src="/images/portrait.png?v=9" alt="" loading="lazy" decoding="async" />
              Basirul Akhlak
            </a>
            {socials.map((social) => (
              <a key={social.label} className="chip" href={social.href} target="_blank" rel="noreferrer">
                {socialIcons[social.icon]}
                {social.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      {contactOpen && (
        <div className="modal-overlay" onClick={() => setContactOpen(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close"
              onClick={() => setContactOpen(false)}
            >
              ×
            </button>
            <h3 id="contact-modal-title">Let’s Talk</h3>
            <p>Tell me about the product. I usually reply within a day.</p>
            {sendState === "sent" ? (
              <div className="modal-sent">
                <p><strong>Message sent.</strong></p>
                <p>Thanks for reaching out. I will get back to you within a day.</p>
                <button className="btn btn-dark" type="button" onClick={() => setContactOpen(false)}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <form className="modal-form" onSubmit={submitContact}>
                  <input name="name" placeholder="Your name" autoComplete="name" required />
                  <input name="email" type="email" placeholder="Your email" autoComplete="email" required />
                  <textarea name="message" placeholder="What are we building?" rows={4} required />
                  <button className="btn btn-dark" type="submit" disabled={sendState === "sending"}>
                    {sendState === "sending" ? "Sending…" : (
                      <>
                        Send Message <ArrowIcon />
                      </>
                    )}
                  </button>
                  {sendState === "error" && (
                    <p className="form-error" role="alert">
                      Couldn’t send right now. Please use the mail button below.
                    </p>
                  )}
                </form>
                <div className="modal-or" aria-hidden="true">or</div>
                <a className="btn btn-light" href="mailto:basirulakhlak@gmail.com">
                  Mail directly · basirulakhlak@gmail.com
                </a>
              </>
            )}
            <div className="modal-meta">
              <div className="modal-socials">
                {socials.map((social) => (
                  <a key={social.label} className="chip" href={social.href} target="_blank" rel="noreferrer">
                    {socialIcons[social.icon]}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
