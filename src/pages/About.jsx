const Experience = () => {
    return (
      <div id="experience" className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-8">Experience</h2>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold">KOL (Key Opinion Leader)</h3>
            <ul className="list-disc pl-5">
              <li>Bitget Africa</li>
              <li>Navy AI</li>
              <li>Axelar</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Community Manager</h3>
            <ul className="list-disc pl-5">
              <li>Green Dragon</li>
              <li>Astroarmadilos</li>
              <li>Xircus Protocol</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Assistant Community Lead</h3>
            <p>Women in DeFi</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">SMM (Social Media Management)</h3>
            <ul className="list-disc pl-5">
              <li>Autonomint</li>
              <li>IQ.Wiki</li>
              <li>IQIntern</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Ambassador Roles</h3>
            <ul className="list-disc pl-5">
              <li>SBP</li>
              <li>Meme_Token</li>
              <li>Alkimi</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default Experience;
  