import React, { useState } from "react";
import { Input } from "./ui/input";

interface StaffFormProps {
  staff: any;
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function StaffForm({ staff, onSubmit }: StaffFormProps) {
  let [userName, setUserName] = useState(staff?.userName || "");
  let [userEmail, setUserEmail] = useState(staff?.userEmail || "");
  let [userDesignation, setUserDesignation] = useState(
    staff?.userDesignation || ""
  );
  let [userExperience, setUserExperience] = useState(
    staff?.userExperience || ""
  );
  let [staffImage, setStaffImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStaffImage(e.target.files[0]);
    }
  };

  let handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userEmail", userEmail);
    formData.append("userDesignation", userDesignation);
    formData.append("userExperience", userExperience);
    if (staffImage) {
      formData.append("staffImage", staffImage);
    }

    await onSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-4">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="userName">Staff Name</label>
          <Input
            placeholder="Enter the name of the staff"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="userEmail">Staff Email</label>
          <Input
            placeholder="Enter the email of the staff"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            type="email"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="userDesignation">Staff Designation</label>
          <Input
            placeholder="Enter the designation of the staff"
            value={userDesignation}
            onChange={(e) => {
              setUserDesignation(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="userExperience">Staff Experience</label>
          <Input
            placeholder="Enter the experience of the staff"
            value={userExperience}
            onChange={(e) => {
              setUserExperience(e.target.value);
            }}
            type="number"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="staffImage">Staff Image</label>
          <Input placeholder="" type="file" onChange={handleImageChange} />
        </div>
        <div className="flex justify-center">
          <button
            className="w-full border px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer hover:scale-105 hover:bg-blue-400"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
