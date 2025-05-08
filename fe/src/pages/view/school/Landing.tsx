import Footer from "@/components/footer";
import ImageSlider from "@/components/image-slider";
import SchoolNavbar from "@/components/SchoolNavbar";
import Testimonial from "@/components/testimonial";

export default function Landing() {
  return (
    <div className="grid grid-cols-1 h-screen md:grid md:grid-cols-12 overflow-x-hidden">
      <div className="col-span-full">
        <div className="top-0 sticky z-50 bg-white shadow-lg overflow-hidden dark:bg-black">
          <SchoolNavbar />
        </div>
        <div className="col-span-full overflow-hidden">
          <ImageSlider />
        </div>
        <div className="col-span-full">
          <div className=" p-10 flex flex-col items-center gap-2 dark:bg-muted">
            <h1 className="text-blue-500 font-bold text-4xl">Our School</h1>
            <p className="h-64 overflow-y-scroll md:h-fit md:overflow-hidden md:w-[60vw] md:text-lg md:text-justify">
              Welcome to Shree Balmandir Secondary School, a distinguished
              government institution dedicated to providing quality education in
              both English and Nepali mediums. Our commitment extends from
              nurturing young minds in nursery classes through grade 10, all the
              way to guiding students in the higher secondary level (+2). At
              Shree Balmandir, we believe in the power of education to transform
              lives. Our experienced and dedicated faculty is passionate about
              fostering academic excellence and holistic development in our
              students. Through a well-rounded curriculum, we aim to equip our
              learners with the knowledge, skills, and values necessary to
              thrive in a dynamic world. We take pride in creating a conducive
              and enriching environment for learning. Our classrooms are not
              just spaces for academic pursuits; they are vibrant hubs of
              creativity, curiosity, and collaboration. We understand the
              importance of extracurricular activities, and our students are
              encouraged to explore their talents and passions beyond the
              traditional classroom setting. With a focus on both English and
              Nepali mediums, we embrace diversity and inclusivity, ensuring
              that all students have the opportunity to excel and reach their
              full potential. Our commitment to academic excellence is
              complemented by a dedication to instilling strong ethical values
              and a sense of responsibility in our students. As we extend our
              educational offerings to the higher secondary level, our aim is to
              guide students through this crucial phase of their academic
              journey, preparing them for the challenges of higher education and
              beyond. Join us at Shree Balmandir Secondary School, where
              education goes beyond textbooks, and every student is empowered to
              achieve their dreams. Together, let's shape a brighter future for
              our students and contribute to the development of our community
              and nation.
            </p>
          </div>
          <div className="p-6 bg-muted flex flex-col items-center dark:bg-muted dark:border">
            <Testimonial />
          </div>
          <div className="pt-10 flex flex-col items-center dark:bg-muted gap-4">
            <h1 className="text-4xl font-bold">Find Us</h1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d890.2843054242068!2d86.694891!3d26.803759!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eec2531101fabb%3A0xc2021f82ffea82f4!2sShree%20BalMandir%20Secondary%20School!5e0!3m2!1sen!2sus!4v1746712456310!5m2!1sen!2sus"
              className="aspect-video w-full h-[60vh] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  );
}
