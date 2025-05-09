import { cloudinary } from "@/config/cloudinary";

export const uploadImages = async (
  imagesFile: File[]
): Promise<string[] | undefined> => {
  try {
    // console.log("imagesFile: ", imagesFile);

    const uploadPromises = imagesFile.map(async (image) => {
      const buffer = await image.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");

      return cloudinary.uploader
        .upload(`data:image/png;base64,${base64Image}`)
        .then((r) => r.secure_url);
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return uploadedImages;
  } catch (error) {
    console.log("error en uploadImages ", error);
    return undefined;
  }
};
