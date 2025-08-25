import { supabase } from "./supabaseClient";

export const uploadImage = async (
  file: File,
  folderName: string
): Promise<{ publicUrl: string } | null> => {
  try {
    console.log("Uploading image:", file.name);
    const filePath = `${file.name}-${Date.now()}`;
    console.log(filePath, file);

    const response = await supabase.storage
      .from(folderName)
      .upload(filePath, file);

    console.log("Upload response error:", response);

    if (response.error) {
      console.error("Error uploading image:", response.error.message);
      return null;
    }

    const { data } = await supabase.storage
      .from(folderName)
      .getPublicUrl(filePath);

    return data;
  } catch (error) {
    console.error("Error fetching public URL:", error);
    return null;
  }
};
