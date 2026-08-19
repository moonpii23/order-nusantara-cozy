import { useQuery } from "@tanstack/react-query";

import { publicMenuQuery, formatRupiah, type MenuItem } from "@/lib/menu";

const WHATSAPP_BASE = "https://wa.me/6281234567890?text=";

function orderUrl(item: MenuItem) {
  return (
    WHATSAPP_BASE +
    encodeURIComponent(
      `Halo Kopi Nusantara, saya ingin memesan ${item.name} (${formatRupiah(item.price)}).`,
    )
  );
}

export function MenuSection() {
  const { data, isLoading, isError } = useQuery(publicMenuQuery);

  const categories = Array.from(new Set((data ?? []).map((item) => item.category)));

  return (
    <section id="menu" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-coffee-light">
            Menu
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Pilih Menu Favorit Anda
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pesan langsung dari meja Anda lewat WhatsApp.
          </p>
        </div>

        {isLoading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        )}

        {isError && (
          <p className="mt-10 text-center text-muted-foreground">
            Menu belum bisa dimuat. Silakan coba lagi sebentar lagi.
          </p>
        )}

        {!isLoading && !isError && (data?.length ?? 0) === 0 && (
          <p className="mt-10 text-center text-muted-foreground">Menu belum tersedia.</p>
        )}

        {categories.map((category) => (
          <div key={category} className="mt-12">
            <h3 className="text-xl font-semibold text-foreground">{category}</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(data ?? [])
                .filter((item) => item.category === category)
                .map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        loading="lazy"
                        className="mb-4 h-40 w-full rounded-xl object-cover"
                      />
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold text-card-foreground">{item.name}</h4>
                      {item.is_featured && (
                        <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                          Favorit
                        </span>
                      )}
                    </div>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="font-bold text-foreground">{formatRupiah(item.price)}</span>
                      <a
                        href={orderUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
                      >
                        Pesan
                      </a>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
