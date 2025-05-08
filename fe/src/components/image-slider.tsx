import { useEffect, useState } from "react";

export default function ImageSlider() {
  const images = [{ url: "bg.jpeg" }, { url: "bg1.jpeg" }, { url: "bg2.jpeg" }];
  let [currentIndex, setCurrentIndex] = useState(0);

  let changeImage = () => {
    setCurrentIndex((prevIdx) => (prevIdx + 1) % images.length);
  };

  useEffect(() => {
    let interval = setInterval(changeImage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-[300px] md:h-[600px]">
      <div
        style={{ backgroundImage: `url(${images[currentIndex].url})` }}
        className="h-full w-full bg-center bg-cover transition-all duration-1000"
      ></div>
    </div>
  );
}
