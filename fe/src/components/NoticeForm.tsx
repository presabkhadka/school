import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";

interface NoticeFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function NoticeForm({ onSubmit }: NoticeFormProps) {
  let [notice, setNotice] = useState<File | null>(null);

  let handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNotice(e.target.files[0]);
    }
  };

  let handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let formData = new FormData();
    if (notice) {
      formData.append("notice", notice);
    }

    await onSubmit(formData);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-0.5">
            <label htmlFor="notice">Notice</label>
            <Input type="file" onChange={handleFileChange} />
          </div>
          <div className="flex justify-center col-span-full">
            <button
              className="w-full bg-blue-500 rounded-lg px-4 py-2 text-white hover:bg-blue-400 hover:scale-105 cursor-pointer"
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
