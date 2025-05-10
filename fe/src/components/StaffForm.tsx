import React, { useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function StaffForm() {
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userDesignation, setUserDesignation] = useState("");
  let [userExperience, setUserExperience] = useState("");
  let [staffImage, setStaffImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("userName", userName);
  formData.append("userEmail", userEmail);
  formData.append("userDesignation", userDesignation);
  formData.append("userExperience", userExperience);
  if (staffImage) {
    formData.append("staffImage", staffImage);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStaffImage(e.target.files[0]);
    }
  };

  let handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let token = localStorage.getItem("Authorization")?.split(" ")[1];

    if (!token) {
      throw new Error("No authorization token in headers");
    }

    let response = await axios.post(
      "http://localhost:4646/admin/add-staff",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success("Staff added successfully");
      navigate("/admin/dashboard");
    } else {
      toast.error("Something went wrong while creating the staff");
    }
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
            onSubmit={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
