import React, { useState } from "react";
import { Input } from "./ui/input";

interface GalleryFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function GalleryForm({ onSubmit }: GalleryFormProps) {
  let [photo, setIsPhoto] = useState<File | null>(null);

  let handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsPhoto(e.target.files[0]);
    }
  };

  let handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let formData = new FormData();
    if (photo) {
      formData.append("photo", photo);
    }
    await onSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 p-4">
          <div className="flex flex-col gap-0.5">
            <label htmlFor="photo">Photo</label>
            <Input type="file" onChange={handleImageChange} />
          </div>
          <div className="flex col-span-full justify-center">
            <button
              className="border px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white hover:scale-105 w-full"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
