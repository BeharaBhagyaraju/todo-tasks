import multer from "multer";

const storage = multer.memoryStorage();

export const uploadNote = multer({storage,
    limits:{
        fileSize:1024 * 1024 * 30,
    },
}).single("noteFile");