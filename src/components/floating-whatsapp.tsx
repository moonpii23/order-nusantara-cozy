import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/6281234567890?text=Halo%20Kopi%20Nusantara,%20saya%20ingin%20memesan%20kopi.";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pesan kopi sekarang via WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MessageCircle className="h-5 w-5 fill-current" />
      <span className="text-sm">Pesan Kopi Sekarang</span>
    </a>
  );
}
