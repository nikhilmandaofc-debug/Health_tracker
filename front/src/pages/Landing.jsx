import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HeartPulse, ShieldCheck, Activity, Users } from "lucide-react";

export default function Landing() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">

      {/* NAVBAR */}

      <div className="flex justify-between items-center px-16 py-6">

        <div className="flex items-center gap-3">
          <HeartPulse size={30} className="text-blue-600"/>
          <h1 className="text-2xl font-bold text-gray-800">
            AI Smart Triage
          </h1>
        </div>

        <div className="flex gap-8 text-gray-700 font-medium">

          <a href="#platform" className="hover:text-blue-600">Platform</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>

        </div>

      </div>



      {/* HERO SECTION */}

      <div className="max-w-7xl mx-auto px-16 mt-20 text-center">

        <motion.h1
          initial={{opacity:0,y:40}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.8}}
          className="text-5xl font-bold text-gray-800"
        >

          Intelligent Healthcare

          <span className="text-blue-600"> Triage Platform</span>

        </motion.h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">

          AI-powered healthcare platform designed to help hospitals classify
          and prioritize patients efficiently using configurable triage rules
          and intelligent decision systems.

        </p>

      </div>



      {/* PORTAL ACCESS */}

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-16 px-16">

        <PortalCard
          title="Administrator Portal"
          text="Configure triage rules, manage platform settings, and control system intelligence."
          button="Enter Administrator Portal"
          action={() => navigate("/admin-login")}
        />

        <PortalCard
          title="Manager Dashboard"
          text="Monitor prioritized patients, view operational insights, and export reports."
          button="Enter Manager Portal"
          action={() => navigate("/manager-login")}
        />

      </div>



      {/* PLATFORM FEATURES */}

      <section id="platform" className="mt-32 bg-white py-24">

        <div className="max-w-6xl mx-auto text-center px-16">

          <h2 className="text-3xl font-bold text-gray-800">
            Platform Capabilities
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            <Feature
              icon={<ShieldCheck size={24}/>}
              title="AI Rule Engine"
              text="Configurable triage rules enabling intelligent patient prioritization."
            />

            <Feature
              icon={<Activity size={24}/>}
              title="Operational Monitoring"
              text="Track healthcare operations and patient flow through dashboards."
            />

            <Feature
              icon={<Users size={24}/>}
              title="Role-Based Access"
              text="Separate access for administrators and healthcare managers."
            />

          </div>

        </div>

      </section>



      {/* ABOUT */}

      <section id="about" className="py-24">

        <div className="max-w-4xl mx-auto text-center px-16">

          <h2 className="text-3xl font-bold text-gray-800">
            About the Platform
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">

            AI Smart Triage is designed to assist healthcare institutions
            in prioritizing patient treatment using intelligent systems.
            The platform integrates rule-based decision models with
            modern enterprise dashboards to help hospitals improve
            operational efficiency.

          </p>

        </div>

      </section>



      {/* CONTACT */}

      <section id="contact" className="bg-gray-100 py-24">

        <div className="max-w-4xl mx-auto text-center px-16">

          <h2 className="text-3xl font-bold text-gray-800">
            Contact
          </h2>

          <p className="mt-4 text-gray-600">
            For platform information or technical inquiries.
          </p>

          <div className="mt-8 text-gray-700">

            Email: support@aismattriage.com
            <br/>
            Phone: +1 800 123 4567

          </div>

        </div>

      </section>



      {/* FOOTER */}

      <footer className="text-center py-10 text-gray-500">

        © 2026 AI Smart Triage Platform

      </footer>

    </div>
  );
}



function PortalCard({title,text,button,action}){

  return(

    <motion.div
      whileHover={{scale:1.05}}
      className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
    >

      <h3 className="text-xl font-semibold text-gray-800">
        {title}
      </h3>

      <p className="text-gray-600 mt-4">
        {text}
      </p>

      <button
        onClick={action}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        {button}
      </button>

    </motion.div>

  )

}



function Feature({icon,title,text}){

  return(

    <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">

      <div className="flex justify-center mb-4 text-blue-600">
        {icon}
      </div>

      <h3 className="font-semibold text-lg text-gray-800">
        {title}
      </h3>

      <p className="text-gray-600 mt-2">
        {text}
      </p>

    </div>

  )

}