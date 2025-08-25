import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase.from("jobs").select("*");

  const { data, error } = await query;

  if (error) {
    console.error("error.message", error);
    return null;
  } else {
    return data;
  }
}
