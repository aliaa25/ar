import { FaGithub, FaCrown } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { motion } from "framer-motion";

const team = [
  {
    name: "Jehan Mostafa",
    role: "Frontend & AR Developer",
    github: "https://github.com/gehanmostafa", // عدلي اللينك حسب حسابك
  },
  {
    name: "Aliaa Nasr Eldin",
    role: "Backend & AR Developer",
    github: "https://github.com/aliaa25 ",
  },
  {
    name: "Maryam Waleed",
    role: "Backend Developer",
    github: "https://github.com/maryam",
  },
  {
    name: "Yasmin Eid",
    role: "Frontend Developer",
    github: "https://github.com/yasmin",
  },
  
  {
    name: "Shaimaa Rashidy",
    role: "Web Developer",
    github: "https://github.com/ShaimaaRashidy",
  },
  
  {
    name: "Khadiga Yahya",
    role: " AI Engineer",
    github: " https://github.com/Khadigayahya",
  },
  {
    name: "Lamiaa Ali",
    role: "AI Engineer",
    github: " https://github.com/Lami9",
  },
  
  
  
  {
    name: "Dr. Maha Medhat",
    role: "Supervisor",
    isSupervisor: true,
  },
];

export default function MeetTheTeam() {
  return (
<section className="py-20 px-6 bg-[#0d4c3e] text-white ">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-12">
      Meet the <span className="text-green-300">Team</span>
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
      {team.map((member, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md text-white px-6 py-8 rounded-xl shadow-lg w-full max-w-xs hover:scale-105 transition-transform duration-300"
        >
          <div className="text-green-300 text-4xl mb-4">
            {member.isSupervisor ? <FaCrown /> : <FaUserGraduate />}
          </div>

          <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
          <p className="text-sm text-gray-200 mb-3">{member.role}</p>

          {!member.isSupervisor && member.github && (
            <div className="flex gap-4 justify-center">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:text-white text-xl"
              >
                <FaGithub />
              </a>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </div>
</section>

  );
}
