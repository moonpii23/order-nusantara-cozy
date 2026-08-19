import { createFileRoute } from "@tanstack/react-router";
import { Coffee, Leaf, Flame, HandHeart, Star, MapPin, Clock, Mail, Phone, Instagram, Facebook } from "lucide-react";

import heroCoffee from "@/assets/hero-coffee.jpg";
import aboutInterior from "@/assets/about-interior.jpg";
import avatarRian from "@/assets/avatar-rian.jpg";
import avatarAnisa from "@/assets/avatar-anisa.jpg";
import avatarBudi from "@/assets/avatar-budi.jpg";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { MenuSection } from "@/components/menu-section";

const WHATSAPP_URL =
  "https://wa.me/6281234567890?text=Halo%20Kopi%20Nusantara,%20saya%20ingin%20memesan%20kopi.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kopi Nusantara — Cita Rasa Asli Indonesia" },
      {
        name: "description",
        content:
          "Dari petani lokal langsung ke cangkir Anda. Nikmati kopi single-origin Indonesia terbaik di Kopi Nusantara.",
      },
      {
        property: "og:title",
        content: "Kopi Nusantara — Cita Rasa Asli Indonesia",
      },
      {
        property: "og:description",
        content:
          "Dari petani lokal langsung ke cangkir Anda. Nikmati kopi single-origin Indonesia terbaik.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kopi Nusantara — Cita Rasa Asli Indonesia" },
      {
        name: "twitter:description",
        content:
          "Dari petani lokal langsung ke cangkir Anda. Nikmati kopi single-origin Indonesia terbaik.",
      },
    ],
  }),
  component: Index,
});

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-coffee/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2 text-primary-foreground">
          <Coffee className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">Kopi Nusantara</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-primary-foreground/90 sm:flex">
          <a href="#tentang" className="transition-colors hover:text-primary-foreground">
            Tentang
          </a>
          <a href="#menu" className="transition-colors hover:text-primary-foreground">
            Menu
          </a>
          <a href="#testimoni" className="transition-colors hover:text-primary-foreground">
            Testimoni
          </a>
          <a href="#kontak" className="transition-colors hover:text-primary-foreground">
            Kontak
          </a>
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-white shadow-sm transition-transform hover:scale-105"
        >
          Pesan
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img
        src={heroCoffee}
        alt="Biji kopi lokal Indonesia yang baru disangrai"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-coffee/80 via-coffee/60 to-coffee/80" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-20 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
          <Leaf className="h-4 w-4" />
          100% Biji Kopi Lokal Indonesia
        </span>
        <h1 className="mt-6 text-balance text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Nikmati Otentisitas Kopi Terbaik Nusantara
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-primary-foreground/80 sm:text-xl">
          Dari petani lokal langsung ke cangkir Anda. Setiap tegukan menyimpan cerita dari kekayaan alam Indonesia.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Pesan Sekarang via WhatsApp
          </a>
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Lihat Menu Kami
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const features = [
    {
      icon: Leaf,
      title: "100% Biji Kopi Lokal",
      description: "Dipetik dari perkebunan terbaik di seluruh Indonesia.",
    },
    {
      icon: Flame,
      title: "Freshly Roasted",
      description: "Biji kopi disangrai secara teratur untuk menjaga kesegaran rasa.",
    },
    {
      icon: HandHeart,
      title: "Direct Trade",
      description: "Mendukung kesejahteraan petani kopi lokal secara berkelanjutan.",
    },
  ];

  return (
    <section id="tentang" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <img
              src={aboutInterior}
              alt="Interior hangat kedai Kopi Nusantara dengan manual brew station"
              width={1200}
              height={800}
              loading="lazy"
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-coffee-light">
              Tentang Kami
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Menghubungkan Rasa, Melestarikan Tradisi
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Didirikan pada tahun 2020, <strong className="text-foreground">Kopi Nusantara</strong> lahir dari kecintaan kami terhadap keberagaman kopi Indonesia. Kami bermitra langsung dengan para petani lokal dari Aceh hingga Papua untuk menyajikan biji kopi <em>single-origin</em> pilihan berkualitas tinggi.
              </p>
              <p>
                Kami percaya bahwa kopi bukan sekadar minuman, melainkan media untuk merayakan keberagaman dan kehangatan kebersamaan.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote:
        "Gayo Single Origin-nya juara banget! Aromatic dan aftertaste-nya sangat clean. Tempat favorit buat kerja santai.",
      name: "Rian S.",
      role: "Graphic Designer",
      avatar: avatarRian,
      rating: 5,
    },
    {
      quote:
        "Kopi Kenangan Masa Lalu-nya unik, perpaduan gula aren lokalnya pas dan gak bikin enek. Wajib coba kalau ke sini!",
      name: "Anisa P.",
      role: "Food Blogger",
      avatar: avatarAnisa,
      rating: 5,
    },
    {
      quote:
        "Pelayanan ramah, suasananya cozy, dan yang paling penting biji kopinya selalu segar. Sukses terus Kopi Nusantara!",
      name: "Budi Santoso",
      role: "Kopi Enthusiast",
      avatar: avatarBudi,
      rating: 5,
    },
  ];

  return (
    <section id="testimoni" className="py-16 md:py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-coffee-light">
            Testimoni
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Apa Kata Mereka?
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex gap-1" aria-label={`Rating ${item.rating} dari 5`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber text-amber" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-muted-foreground">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={`Foto ${item.name}`}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-card-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="kontak" className="bg-coffee py-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2">
              <Coffee className="h-7 w-7" />
              <span className="text-2xl font-bold">Kopi Nusantara</span>
            </a>
            <p className="mt-4 max-w-md text-primary-foreground/80">
              Menyajikan Cita Rasa Terbaik Indonesia dalam Setiap Cangkir.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Kontak & Lokasi</h3>
            <ul className="mt-5 space-y-4 text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                <span>Jl. Jalur Kopi No. 45, Jakarta Selatan</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                <span>Senin - Minggu (08.00 - 22.00 WIB)</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                <a href="mailto:halo@kopinusantara.id" className="hover:text-primary-foreground">
                  halo@kopinusantara.id
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                <a href="tel:+6281234567890" className="hover:text-primary-foreground">
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Media Sosial</h3>
            <ul className="mt-5 space-y-4 text-primary-foreground/80">
              <li>
                <a
                  href="https://instagram.com/kopinusantara.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary-foreground"
                >
                  <Instagram className="h-5 w-5 text-amber" />
                  @kopinusantara.id
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@kopinusantara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary-foreground"
                >
                  <TikTokIcon className="h-5 w-5 text-amber" />
                  @kopinusantara
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/kopinusantara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary-foreground"
                >
                  <Facebook className="h-5 w-5 text-amber" />
                  Kopi Nusantara Official
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2026 Kopi Nusantara. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Testimonials />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
