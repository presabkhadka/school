import Footer from "@/components/footer";
import SchoolNavbar from "@/components/SchoolNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface GalleryItem {
  _id: string;
  photo: string;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("http://localhost:4646/gallery");
        setPhotos(response.data.gallery);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    fetchPhotos();
    const interval = setInterval(fetchPhotos, 10000);
    return () => clearInterval(interval);
  }, []);

  const openPhoto = (item: GalleryItem) => {
    setSelectedPhoto(item);
  };
  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="h-screen w-screen overflow-x-hidden dark:bg-muted grid grid-cols-1 md:grid md:grid-cols-12">
      <div className="col-span-full">
        <div className="top-0 sticky z-50 ">
          <SchoolNavbar />
        </div>
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-semibold mb-6 text-center">Gallery</h1>
          {photos.length === 0 ? (
            <p className="text-center text-gray-500">No photos to display.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((item) => (
                <div
                  key={item._id}
                  onClick={() => openPhoto(item)}
                  className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                >
                  <img
                    src={`http://localhost:4646/${item.photo}`}
                    alt="Gallery item"
                    className="w-full h-56 object-cover transform transition-transform duration-300 hover:scale-125"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer/>
      </div>
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={closePhoto}
        >
          <img
            src={`http://localhost:4646/${selectedPhoto.photo}`}
            alt="Enlarged gallery item"
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
