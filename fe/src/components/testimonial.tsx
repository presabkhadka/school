import { useEffect, useState } from "react";

export default function Testimonial() {
  let testimonials = [
    {
      name: "Principal",
      message:
        "As the Head Teacher, I am proud to lead an institution committed to quality education, fostering holistic development, and nurturing dreams. Our dedicated team ensures a vibrant learning environment for students in both English and Nepali mediums from nursery to class 10, extending to +2. Join us on this educational journey!",
      image: "principal.jpeg",
    },
    {
      name: "Teacher",
      message:
        "As a teacher, I feel privileged to be part of an institution that values quality education and the holistic development of every student. I am committed to supporting our learners in both English and Nepali mediums, from nursery to class 10 and extending to +2. Together with our dedicated team, we strive to create a vibrant and nurturing environment where students can grow, learn, and follow their dreams.",
      image: "teacher.jpeg",
    },
  ];

  let [currentIdx, setCurrentIdx] = useState(0);

  let changeTestimonial = () => {
    setCurrentIdx((prevIdx) => (prevIdx + 1) % testimonials.length);
  };

  useEffect(() => {
    let interval = setInterval(changeTestimonial, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <h1 className="text-4xl font-bold text-green-500">What teacher says</h1>
      <p className="w-[60vw] text-lg">
        <span className="text-6xl">"</span>
        {testimonials[currentIdx].message}
        <span className="text-6xl line-clamp-1 text-end">"</span>
      </p>
      <img
        src={testimonials[currentIdx].image}
        alt=""
        className="h-30 w-30 rounded-full"
      />
      <p className="font-bold text-lg">{testimonials[currentIdx].name}</p>
    </div>
  );
}
