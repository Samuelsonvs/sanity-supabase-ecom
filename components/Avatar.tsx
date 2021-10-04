import { ChangeEvent, useState } from "react";
import Image from "next/image";

import { App } from "@/interfaces/app";
import { useUser } from "@/contexts/AuthContext";

export const Avatar = ({size, avatarPathSetter, tempAvatarSetter, tempAvatar }: App.AvatarTypes) => {
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

      const blob = URL.createObjectURL(file);
      tempAvatarSetter(blob)
      avatarPathSetter({filePath, file})
 
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
        <div className="p-2 flex justify-center">
          <div className="mb-8 rounded-box w-24 h-24 ring ring-yellow-600 ring-offset-base-100 ring-offset-2">
            <Image
              src={tempAvatar ?? (avatarUrl ?? "/static/images/navbar/mockprofile.png")}
              alt="Avatar"
              className="rounded-box"
              width={size}
              height={size}
            />
          </div>  
        </div>
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
          onChange={(e) => uploadAvatar(e)}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default Avatar;
