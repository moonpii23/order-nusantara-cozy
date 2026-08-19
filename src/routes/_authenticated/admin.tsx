import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { adminMenuQuery, formatRupiah, type MenuItem } from "@/lib/menu";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

type FormState = {
  id: string | null;
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
  sort_order: string;
};

const emptyForm: FormState = {
  id: null,
  name: "",
  description: "",
  price: "0",
  category: "Kopi",
  image_url: "",
  is_available: true,
  is_featured: false,
  sort_order: "0",
};

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(Boolean(data));
    })();
  }, []);

  const { data, isLoading } = useQuery(adminMenuQuery);

  const save = useMutation({
    mutationFn: async (values: FormState) => {
      const payload = {
        name: values.name,
        description: values.description,
        price: Number(values.price) || 0,
        category: values.category || "Kopi",
        image_url: values.image_url || null,
        is_available: values.is_available,
        is_featured: values.is_featured,
        sort_order: Number(values.sort_order) || 0,
      };
      const { error: mutationError } = values.id
        ? await supabase.from("menu_items").update(payload).eq("id", values.id)
        : await supabase.from("menu_items").insert(payload);
      if (mutationError) throw mutationError;
    },
    onSuccess: () => {
      setForm(emptyForm);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
    onError: (mutationError: Error) => setError(mutationError.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error: deleteError } = await supabase.from("menu_items").delete().eq("id", id);
      if (deleteError) throw deleteError;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menu"] }),
    onError: (deleteError: Error) => setError(deleteError.message),
  });

  function edit(item: MenuItem) {
    setForm({
      id: item.id,
      name: item.name,
      description: item.description,
      price: String(item.price),
      category: item.category,
      image_url: item.image_url ?? "",
      is_available: item.is_available,
      is_featured: item.is_featured,
      sort_order: String(item.sort_order),
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  return (
    <main className="min-h-screen bg-cream py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kelola Menu</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Perubahan langsung tampil di halaman pelanggan.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/"
              className="rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground"
            >
              Lihat Landing Page
            </Link>
            <button
              onClick={signOut}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Keluar
            </button>
          </div>
        </div>

        {isAdmin === false && (
          <p className="mt-6 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
            Akun ini belum berstatus admin, jadi menu hanya bisa dilihat. Minta pemilik menambahkan
            peran admin untuk akun ini agar bisa mengubah menu.
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate(form);
          }}
          className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-foreground">Nama Menu</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-foreground">Deskripsi</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Harga (Rp)</label>
            <input
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Kategori</label>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">URL Gambar (opsional)</label>
            <input
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Urutan</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-6 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.is_available}
                onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
              />
              Tersedia
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
              />
              Favorit
            </label>
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={save.isPending}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {form.id ? "Simpan Perubahan" : "Tambah Menu"}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={() => setForm(emptyForm)}
                className="rounded-full border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground"
              >
                Batal
              </button>
            )}
          </div>
        </form>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <div className="mt-8 space-y-3">
          {isLoading && <p className="text-sm text-muted-foreground">Memuat menu…</p>}
          {(data ?? []).map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div>
                <p className="font-semibold text-card-foreground">
                  {item.name}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    · {item.category} · {formatRupiah(item.price)}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.is_available ? "Tersedia" : "Tidak tersedia"}
                  {item.is_featured ? " · Favorit" : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => edit(item)}
                  className="rounded-full border border-input bg-background px-4 py-1.5 text-sm"
                >
                  Ubah
                </button>
                <button
                  onClick={() => remove.mutate(item.id)}
                  className="rounded-full border border-destructive px-4 py-1.5 text-sm text-destructive"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
