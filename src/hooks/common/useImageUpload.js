import { useSupabaseClient } from "./useSupabaseClient";

export const useUploadImage = () => {
  const supabase = useSupabaseClient();

  const uploadImage = async (file, folderName) => {
    try {
      const filePath = `${file.name}-${Date.now()}`;

      const response = await supabase.storage
        .from(folderName)
        .upload(filePath, file);

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

  return { uploadImage };
};
