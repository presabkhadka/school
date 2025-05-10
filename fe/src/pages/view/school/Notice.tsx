import SchoolNavbar from "@/components/SchoolNavbar";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Notice {
  _id: string;
  notice: string;
}

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get("http://localhost:4646/notice");
        setNotices(response.data.notice);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    fetchNotice();
    const interval = setInterval(fetchNotice, 10000);
    return () => clearInterval(interval);
  }, []);

  const isImage = (filename: string) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
  const isPDF = (filename: string) => /\.pdf$/i.test(filename);

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-12 overflow-x-hidden dark:bg-muted">
      <div className="col-span-full">
        <div className="top-0 sticky z-50">
          <SchoolNavbar />
        </div>
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Notice Board
          </h1>
          {notices.length === 0 ? (
            <p className="text-center text-gray-500">No notices available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {notices.map((item) => {
                const fileUrl = `http://localhost:4646${item.notice}`;
                return (
                  <div
                    key={item._id}
                    onClick={() => setSelectedNotice(item)}
                    className="cursor-pointer   border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-md transition-shadow duration-300 hover:scale-105"
                  >
                    {isImage(item.notice) ? (
                      <img
                        src={fileUrl}
                        alt="Notice"
                        className="w-full h-40 object-cover rounded"
                      />
                    ) : isPDF(item.notice) ? (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 dark:text-blue-400 text-center font-medium hover:underline"
                      >
                        Open notice file in new page
                      </a>
                    ) : (
                      <p className="text-red-500 text-center">
                        Unsupported file format
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selectedNotice && (
        <div
          className="fixed inset-0 bg-muted flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="rounded-lg p-4 max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNotice(null)}
              className="text-sm float-right text-red-500 hover:underline"
            >
              <X size={40} />
            </button>
            <div className="mt-4">
              {isImage(selectedNotice.notice) ? (
                <img
                  src={`http://localhost:4646${selectedNotice.notice}`}
                  alt="Notice"
                  className="w-full h-auto rounded"
                />
              ) : isPDF(selectedNotice.notice) ? (
                <iframe
                  src={`http://localhost:4646${selectedNotice.notice}`}
                  title="PDF Notice"
                  className="w-full h-[80vh] rounded"
                ></iframe>
              ) : (
                <p className="text-red-500">Unsupported file format</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
