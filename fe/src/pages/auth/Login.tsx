import { Input } from "@/components/ui/input";
import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let [userEmail, setUserEmail] = useState<string>("");
  let [userPassword, setUserPassword] = useState<string>("");
  let [isVisible, setIsVisible] = useState<boolean>(false);
  let navigate = useNavigate();

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response = await axios.post("http://localhost:4646/admin/login", {
        userEmail,
        userPassword,
      });
      let { token } = response.data;
      localStorage.setItem("Authorization", `Bearer ${token}`);
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-screen overflow-hidden">
      <div className="col-span-1 h-full flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-1/2">
          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-full flex flex-col gap-2">
              <label htmlFor="userName">Email</label>
              <Input
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="col-span-full flex flex-col gap-2 relative">
              <label htmlFor="userName">Password</label>
              <Input
                placeholder="Enter your password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="relative pr-12"
                type={isVisible ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute top-10 right-3"
                onClick={toggleVisibility}
              >
                {isVisible ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            <div className="col-span-full">
              <button className="border px-4 py-2 bg-gradient-to-r from-blue-300 to-green-300 w-full rounded-lg cursor-pointer hover:scale-105 text-white transition-all">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden md:flex justify-center items-center bg-gradient-to-r from-blue-300 to-green-300 rounded-l-lg">
        <h1 className="text-5xl text-white font-bold">Login as admin</h1>
      </div>
    </div>
  );
}
