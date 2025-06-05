import AdminNavbar from "@/components/AdminNavbar";
import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import GalleryForm from "@/components/GalleryForm";

export default function AdminGallery() {
  interface Gallery {
    _id: string;
    photo: string;
  }

  let [gallery, setGallery] = useState<Gallery[]>([]);
  let [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    let fetchGallery = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("No token in headers");
        }
        let response = await axios.get("http://localhost:4646/admin/gallery", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGallery(response.data.gallery);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    fetchGallery();
    let interval = setInterval(fetchGallery, 10000);
    return () => clearInterval(interval);
  }, []);

  let handleDelete = async (isSelected: any) => {
    try {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];

      if (!token) {
        throw new Error("No token in headers");
      }

      await axios.delete(
        `http://localhost:4646/admin/delete-photo/${isSelected?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Photo deleted from the gallery, Please wait few seconds.");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  let handleCreate = async (formData: FormData) => {
    try {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("No token in headers");
      }
      await axios.post(
        "http://localhost:4646/admin/add-photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Photo successfully added in gallery");
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-12 dark:bg-muted overflow-x-hidden">
      <div className="col-span-full">
        <div className="top-0 z-50 sticky">
          <AdminNavbar />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="border-2 p-6 rounded-lg shadow-lg flex justify-between items-center hover:border-blue-500">
            <div className="flex items-center gap-2">
              <Camera size={40} color="blue" />
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                Gallery
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger
                className="border px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-400 hover:scale-105 cursor-pointer"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                Add Gallery
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <GalleryForm onSubmit={handleCreate} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((gal) => (
              <div
                key={gal._id}
                className="border-2 rounded-lg hover:border-blue-500 flex flex-col gap-4 shadow-lg col-span-1"
              >
                <div className="w-full">
                  <img
                    src={`http://localhost:4646/${gal.photo}`}
                    alt="staff image"
                    className="aspect-video rounded-t-lg "
                  />
                </div>
                <div className="flex justify-center items-center p-4">
                  <button
                    className="px-4 py-2  bg-red-500 rounded-lg text-white cursor-pointer hover:bg-red-400 w-full"
                    onClick={() => {
                      handleDelete(gal);
                    }}
                  >
                    Delete this photo
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
