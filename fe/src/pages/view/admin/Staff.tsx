import AdminNavbar from "@/components/AdminNavbar";
import { User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import StaffForm from "@/components/StaffForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Staff() {
  interface Staff {
    _id: string;
    userName: string;
    userEmail: string;
    userDesignation: string;
    userExperience: string;
    staffImage: string;
  }

  const navigate = useNavigate();

  let [staffs, setStaffs] = useState<Staff[]>([]);
  let [isSelected, setIsSelected] = useState<Staff | null>(null);
  let [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  let handleCreateStaff = async (formData: FormData) => {
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
      setIsDialogOpen(false);
      toast.success("Staff added successfully");
      navigate("/admin/dashboard");
    } else {
      toast.error("Something went wrong while creating the staff");
    }
  };

  let handleUpdateStaff = async (formData: FormData) => {
    try {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("No token in headers");
      }

      if (!formData.get("staffImage")) {
        formData.delete("staffImage");
      }

      console.log("Client is sending:");
      for (let [k, v] of formData.entries()) {
        console.log(`  ${k}:`, v);
      }

      await axios.patch(
        `http://localhost:4646/admin/update-staff/${isSelected?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsDialogOpen(false);
      toast.success("Staff updated successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    let fetchStaff = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];

        if (!token) {
          throw new Error("No token in authorization headers");
        }

        let response = await axios.get("http://localhost:4646/admin/staff", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStaffs(response.data.staff);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    fetchStaff();
    let interval = setInterval(fetchStaff, 10000);
    return () => clearInterval(interval);
  }, []);

  let handleDelete = async (isSelected: any) => {
    try {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("No token in headers");
      }
      await axios.delete(
        `http://localhost:4646/admin/delete-staff/${isSelected._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Staff deleted successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-12 dark:bg-muted overflow-x-hidden">
      <div className="col-span-full">
        <div className="top-0 sticky z-50">
          <AdminNavbar />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center border-2 rounded-lg p-6 shadow-lg hover:border-blue-500">
            <div className="flex items-center gap-2">
              <User size={40} color="blue" />
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                Staffs
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger
                className="border px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer hover:scale-105 hover:bg-blue-400"
                onClick={() => {
                  setIsSelected(null);
                  setIsDialogOpen(true);
                }}
              >
                Add Staff
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <StaffForm
                      staff={isSelected}
                      onSubmit={
                        isSelected ? handleUpdateStaff : handleCreateStaff
                      }
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full flex flex-col gap-4">
            {staffs.map((staff) => (
              <div
                key={staff._id}
                className="border-2 rounded-lg hover:border-blue-500 flex flex-col sm:flex-row gap-4 shadow-lg"
              >
                <div className="w-full md:w-1/3">
                  <img
                    src={`http://localhost:4646${staff.staffImage}`}
                    alt="staff image"
                    className="aspect-video rounded-l-lg "
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between w-full p-4">
                  <div className=" flex flex-col gap-4 ">
                    <p className="font-bold">
                      Name:{" "}
                      <span className="font-normal">{staff.userName}</span>
                    </p>
                    <p className="font-bold">
                      Email:{" "}
                      <span className="font-normal">{staff.userEmail}</span>
                    </p>
                    <p className="font-bold">
                      Designation:{" "}
                      <span className="font-normal">
                        {staff.userDesignation}
                      </span>
                    </p>
                    <p className="font-bold">
                      Experience:{" "}
                      <span className="font-normal">
                        {staff.userExperience}
                      </span>
                    </p>
                  </div>
                  <div className="self-end flex gap-2">
                    <button
                      className="px-4 py-2  bg-green-500 rounded-lg text-white hover:scale-105 cursor-pointer hover:bg-green-400"
                      onClick={() => {
                        setIsSelected(staff);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2  bg-red-500 rounded-lg text-white hover:scale-105 cursor-pointer hover:bg-red-400"
                      onClick={() => {
                        handleDelete(staff);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
