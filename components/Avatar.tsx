import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { supabase, avatarData } from "@/utils/supabaseClient";
import { AvatarTypes } from "@/interfaces/interface";
import { useUser } from "@/contexts/AuthContext";

export const Avatar = ({ size, onUpload }: AvatarTypes) => {
  const { session, avatarUrl } = useUser();
  const [uploading, setUploading] = useState<boolean>(false);

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = await avatarData(filePath);
      if (data) {
        const url = URL.createObjectURL(data);
        onUpload(url);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {avatarUrl ? (
        <div className="p-2 flex justify-center">
          <div className="mb-8 rounded-box w-24 h-24 ring ring-yellow-600 ring-offset-base-100 ring-offset-2">
            <Image
              src={avatarUrl}
              alt="Avatar"
              className="rounded-box"
              width={size}
              height={size}
            />
          </div>
        </div>
      ) : (
        <div className="p-2 avatar">
          <div className="mb-8 rounded-box w-24 h-24 ring ring-yellow-600 ring-offset-base-100 ring-offset-2"></div>
        </div>
      )}
      <div className="flex justify-center">
        <label
          className={`btn btn-primary bg-yellow-600 hover:bg-yellow-700 border-none ${
            uploading ? "loading" : ""
          }`}
          htmlFor="single"
        >
          {uploading ? "Uploading" : "Upload Picture"}
        </label>
        <input
          className="hidden absolute"
          type="file"
          id="single"
          accept="image/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) => uploadAvatar(e)}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default Avatar;
