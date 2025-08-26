import { useSession } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function useSupabaseClient() {
  const { session } = useSession();
  console.log(session.getToken())
  const supabaseClient = createClient(supabaseUrl, supabaseKey, {
    async accessToken() {
      return (await session?.getToken()) ?? null;
    },
  });
  return supabaseClient;
}
