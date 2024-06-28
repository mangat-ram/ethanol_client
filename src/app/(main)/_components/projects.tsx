import React, { useEffect, useState } from "react";
import { LabType } from "@/interfaces";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

type ProjectProps = {
  projects:Array<LabType>
}

const Projects:React.FC<ProjectProps> = ({ projects = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const {user} = useUser();
  const router = useRouter();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleProjectClick = (_id: string,labname:string) => {
    router.push(`/dashboard/${user?.userName}/${labname}`)
    setActiveProject(_id);
  };

  return (
    <div className="w-full bg-blue-400 p-4 text-white text-[1.08rem]">
      <button
        onClick={handleToggle}
        className="flex items-center space-x-2"
      >
        {isExpanded ? <FaArrowDown size={16} /> : <FaArrowRight size={16} />}
        <span>Your Projects</span>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              role="button"
              key={project._id}
              onClick={() => handleProjectClick(project._id,project.labName)}
              className={`text-sm font-light cursor-pointer ${
                activeProject === project._id ? "bg-blue-300 text-white rounded-full" : "" // Add "active" class
              }`}
            >
              <span className="ml-2">{project.labName}</span>
            </div>
          ))
        ) : (
          <div className="p-2 mt-2 text-sm font-light">No projects available</div>
        )}
      </div>
    </div>
  );
};

export default Projects;
