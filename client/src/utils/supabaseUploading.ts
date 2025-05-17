import { supabase } from "./supabaseConfig";


interface UploadedFileInfo {
    url: string;
    path: string;
    metadata: {
        filename: string;
        mimeType: string;
        size: number;
        uploadedAt: string;
    };
}

export async function uploadFile(file: File): Promise<UploadedFileInfo> {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `events/${fileName}`;

    try {
        // 1. Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("events")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: true,
                contentType: file.type,
            });

        if (uploadError || !uploadData) {
            console.error("Supabase upload error:", uploadError);
            throw new Error(`Upload failed: ${uploadError?.message}`);
        }

        // 2. Get public URL
        const { data: urlData } = supabase.storage
            .from("events")
            .getPublicUrl(uploadData.path);

        if (!urlData?.publicUrl) {
            throw new Error("Failed to generate public URL");
        }

        // 3. Return formatted data
        return {
            url: urlData.publicUrl,
            path: uploadData.path,
            metadata: {
                filename: fileName,
                mimeType: file.type,
                size: file.size,
                uploadedAt: new Date().toISOString(),
            },
        };
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
}
