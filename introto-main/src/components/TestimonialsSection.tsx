import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Senior Data Analyst at TechCorp",
    content: "EduVista transformed my career. The Data Science course gave me practical skills I use every day. The instructors are world-class and truly invested in student success.",
    rating: 5,
    image: "SM"
  },
  {
    id: 2,
    name: "James Chen",
    role: "Marketing Director",
    content: "The Digital Marketing Mastery course exceeded all expectations. I implemented strategies from week one and saw immediate results in our campaigns.",
    rating: 5,
    image: "JC"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer at StartupLab",
    content: "As a career changer, I was nervous about learning UX design. EduVista's supportive community and hands-on projects made the transition seamless.",
    rating: 5,
    image: "ER"
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "Financial Analyst",
    content: "The Financial Analytics course provided deep insights into modeling techniques. My salary increased by 40% after earning the certification.",
    rating: 5,
    image: "MT"
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "AI Research Engineer",
    content: "Outstanding curriculum! The AI Essentials course bridges theory and practice perfectly. I now lead AI projects at my company.",
    rating: 5,
    image: "PP"
  },
  {
    id: 6,
    name: "David Kim",
    role: "Project Manager",
    content: "The PMP course was comprehensive and exam-focused. Passed on my first attempt with flying colors thanks to EduVista's excellent preparation.",
    rating: 5,
    image: "DK"
  },
  {
    id: 7,
    name: "Lisa Anderson",
    role: "Cybersecurity Specialist",
    content: "Cybersecurity Fundamentals gave me the confidence to transition into this exciting field. The practical labs were invaluable.",
    rating: 5,
    image: "LA"
  },
  {
    id: 8,
    name: "Carlos Martinez",
    role: "Business Consultant",
    content: "The Business Leadership course refined my strategic thinking. I've since been promoted to senior management.",
    rating: 5,
    image: "CM"
  },
  {
    id: 9,
    name: "Anna Kowalski",
    role: "Content Marketing Manager",
    content: "Amazing platform! The instructors respond quickly, the content is current, and the community is incredibly supportive.",
    rating: 5,
    image: "AK"
  },
  {
    id: 10,
    name: "Robert Taylor",
    role: "Software Engineer",
    content: "Best investment in my career. The course materials are top-notch and the certification opened many doors for me.",
    rating: 5,
    image: "RT"
  },
  {
    id: 11,
    name: "Michelle Lee",
    role: "HR Director",
    content: "We enrolled our entire team in EduVista courses. The results have been phenomenal—increased productivity and morale.",
    rating: 5,
    image: "ML"
  },
  {
    id: 12,
    name: "Ahmed Hassan",
    role: "Entrepreneur",
    content: "Started my own business after completing the Business Strategy course. The practical frameworks were game-changing.",
    rating: 5,
    image: "AH"
  },
  {
    id: 13,
    name: "Jennifer Wu",
    role: "Product Designer",
    content: "The UX/UI course completely transformed how I approach design. Now I create user-centered products with confidence.",
    rating: 5,
    image: "JW"
  },
  {
    id: 14,
    name: "Thomas Brown",
    role: "Data Scientist",
    content: "Excellent balance of theory and hands-on practice. The real-world projects prepared me for industry challenges.",
    rating: 5,
    image: "TB"
  },
  {
    id: 15,
    name: "Sofia Hernandez",
    role: "Digital Strategist",
    content: "The quality of instruction is unmatched. Every lesson is thoughtfully designed and incredibly engaging.",
    rating: 5,
    image: "SH"
  },
  {
    id: 16,
    name: "Kevin O'Brien",
    role: "Operations Manager",
    content: "Project Management course helped me streamline processes and deliver projects ahead of schedule.",
    rating: 5,
    image: "KO"
  },
  {
    id: 17,
    name: "Yuki Tanaka",
    role: "Machine Learning Engineer",
    content: "The depth of ML content is impressive. I went from beginner to building production models in just 3 months.",
    rating: 5,
    image: "YT"
  },
  {
    id: 18,
    name: "Rachel Green",
    role: "Brand Manager",
    content: "Marketing course gave me fresh perspectives and actionable strategies. Our brand engagement tripled!",
    rating: 5,
    image: "RG"
  },
  {
    id: 19,
    name: "Marcus Johnson",
    role: "Security Analyst",
    content: "Comprehensive cybersecurity training with real-world scenarios. Feel confident protecting our organization now.",
    rating: 5,
    image: "MJ"
  },
  {
    id: 20,
    name: "Elena Petrov",
    role: "Business Analyst",
    content: "The analytics tools and techniques I learned are now essential to my daily work. Highly recommend!",
    rating: 5,
    image: "EP"
  },
  {
    id: 21,
    name: "Daniel Park",
    role: "Tech Lead",
    content: "Leadership course helped me grow from individual contributor to managing a team of 15 engineers.",
    rating: 5,
    image: "DP"
  },
  {
    id: 22,
    name: "Olivia White",
    role: "Communications Director",
    content: "Business Communication course improved my presentation skills dramatically. Now I speak at industry conferences.",
    rating: 5,
    image: "OW"
  },
  {
    id: 23,
    name: "Nathan Cooper",
    role: "Finance Manager",
    content: "Financial modeling techniques learned here directly contributed to our company's profitability analysis.",
    rating: 5,
    image: "NC"
  },
  {
    id: 24,
    name: "Isabella Romano",
    role: "Creative Director",
    content: "Design course unlocked my creative potential. Now leading a team at a prestigious design agency.",
    rating: 5,
    image: "IR"
  },
  {
    id: 25,
    name: "William Foster",
    role: "Chief Technology Officer",
    content: "As a CTO, I recommend EduVista to all my team members. The quality and depth of courses are exceptional.",
    rating: 5,
    image: "WF"
  }
];

export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonialsPerPage = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleTestimonials = testimonials.slice(
    currentSlide * testimonialsPerPage,
    (currentSlide + 1) * testimonialsPerPage
  );

  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6 px-4 sm:px-0 font-bold">
            <span className="text-white">Real Words.</span> <span className="bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">Real Transformation</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto italic px-4 sm:px-0">
            Stories of clarity, confidence and transformation<br />
            - from seekers across 19+ countries
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 mb-8 items-stretch">
            {visibleTestimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
                className="h-full flex"
              >
                <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all w-full flex flex-col h-full">
                  <p className="text-white/90 mb-6 leading-relaxed line-clamp-4 min-h-[6rem] sm:min-h-[6.5rem] flex-shrink-0 text-sm sm:text-base overflow-hidden">
                    {testimonial.content}
                  </p>

                  <div className="flex items-center gap-1 mb-4 h-5 flex-shrink-0">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-auto h-16 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white flex-shrink-0">
                      {testimonial.image}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">{testimonial.name}</div>
                      <div className="text-sm text-white/70 truncate">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {[...Array(totalSlides)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide 
                      ? 'w-8 bg-amber-400' 
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
