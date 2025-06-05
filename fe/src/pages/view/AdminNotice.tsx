import AdminNavbar from "@/components/AdminNavbar";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import NoticeForm from "@/components/NoticeForm";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminNotice() {
  interface Notice {
    _id: string;
    notice: string;
  }

  let [notice, setNotice] = useState<Notice[]>([]);
  let [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  let handleCreate = async (formData: FormData) => {
    try {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("No token in headers");
      }
      await axios.post("http://localhost:4646/admin/add-notice", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Notice added successfully");
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  let handleDelete = async (notice: any) => {
    try {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("No token in headers");
      }
      await axios.delete(
        `http://localhost:4646/admin/delete-notice/${notice._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Notice deleted successfully, Please wait few seconds");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    let fetchNotice = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("No token in headers");
        }
        let response = await axios.get("http://localhost:4646/admin/notice", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotice(response.data.notice);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    fetchNotice();
    let interval = setInterval(fetchNotice, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-12 overflow-x-hidden">
      <div className="col-span-full">
        <div className="top-0 sticky z-50">
          <AdminNavbar />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex justify-between border-2 p-6 rounded-lg hover:border-blue-500">
            <div className="flex items-center gap-2">
              <AlertTriangle size={40} color="blue" />
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                Notice
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger
                className=" px-4 py-2 rounded-lg bg-blue-500 text-white hover:scale-105 cursor-pointer"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                Add Notice
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <NoticeForm onSubmit={handleCreate} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {notice.map((notice) => (
              <div
                key={notice._id}
                className="border-2 hover:border-blue-500 rounded-lg flex flex-col"
              >
                <img
                  src={`http://localhost:4646${notice.notice}`}
                  alt={notice.notice}
                  className="rounded-t-lg aspect-video"
                />
                <div className="p-4">
                  <button
                    className="border px-4 py-2 rounded-lg w-full bg-red-500 text-white hover:bg-red-400"
                    onClick={() => {
                      handleDelete(notice);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
