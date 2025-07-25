import cloudinary from "./cloudinary.js";


export const uploadBufferToCloudinary = (fileBuffer, filename, mimetype, folder = "notes") => {
    return new Promise((resolve, reject) => {
      const isImage = mimetype.startsWith("image/");
      const resourceType = isImage ? "image" : "raw";
  
      const extension = mimetype.split("/")[1] || "file";
      const sanitizedFilename = filename.replace(/\s+/g, "_");
      const fullFilename = `${sanitizedFilename}.${extension}`; 
  
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          public_id: `${folder}/${fullFilename}`, 
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
  
      stream.end(fileBuffer);
    });
  };