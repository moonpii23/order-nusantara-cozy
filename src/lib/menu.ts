import { supabase } from "@/integrations/supabase/client";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
};

export const MENU_COLUMNS =
  "id, name, description, price, category, image_url, is_available, is_featured, sort_order";

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const publicMenuQuery = {
  queryKey: ["menu", "public"] as const,
  queryFn: async (): Promise<MenuItem[]> => {
    const { data, error } = await supabase
      .from("menu_items")
      .select(MENU_COLUMNS)
      .eq("is_available", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as MenuItem[];
  },
};

export const adminMenuQuery = {
  queryKey: ["menu", "admin"] as const,
  queryFn: async (): Promise<MenuItem[]> => {
    const { data, error } = await supabase
      .from("menu_items")
      .select(MENU_COLUMNS)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as MenuItem[];
  },
};
