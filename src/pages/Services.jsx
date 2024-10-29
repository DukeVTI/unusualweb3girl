const Skills = () => {
    const skillsList = [
      "Content Management",
      "Social Media Management",
      "Content Creation",
      "Conflict Resolution",
      "Community Engagement",
      "Strategic Planning",
      "Space Host",
      "Event Host"
    ];
  
    return (
      <div id="skills" className="h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        <div className="grid grid-cols-2 gap-8">
          {skillsList.map((skill, index) => (
            <div key={index} className="text-lg font-medium bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
              {skill}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Skills;
  