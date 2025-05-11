import React, { useState, useEffect } from 'react';
import './Aquarium.css';
import Fish from './Fish';
import SeaPlant from './SeaPlant';
import Sign from './Sign';

const Aquarium = ({ onAboutClick, onProjectsClick, onSharkTrackerClick }) => {
  const [waterColor, setWaterColor] = useState('#1E90FF');
  const [plantColor, setPlantColor] = useState('#2E8B57');
  const [sandColor, setSandColor] = useState('#F5DEB3');
  const [fishColors, setFishColors] = useState({});
  const [isMarsMode, setIsMarsMode] = useState(false);

  useEffect(() => {
    const handleAquariumColorChange = (e) => {
      if (e.detail && e.detail.type && e.detail.color) {
        switch (e.detail.type) {
          case 'water':
            setWaterColor(e.detail.color);
            setIsMarsMode(e.detail.color === '#330000'); // Check if it's Mars water color
            break;
          case 'plant':
            setPlantColor(e.detail.color);
            break;
          case 'sand':
            setSandColor(e.detail.color);
            break;
          case 'fish':
            setFishColors(prev => ({
              ...prev,
              [e.detail.id]: e.detail.color
            }));
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('aquariumColorChange', handleAquariumColorChange);
    return () => window.removeEventListener('aquariumColorChange', handleAquariumColorChange);
  }, []);

  // Function to get water gradient based on mode
  const getWaterGradient = () => {
    if (isMarsMode) {
      return `linear-gradient(180deg, ${waterColor} 0%, ${waterColor} 100%)`;
    }
    return `linear-gradient(180deg, 
      rgba(0, 100, 150, 0.6) 0%,
      rgba(0, 80, 120, 0.7) 30%,
      rgba(0, 60, 90, 0.8) 60%,
      rgba(0, 40, 70, 0.9) 100%
    )`;
  };

  // Function to get sand gradient based on mode
  const getSandGradient = () => {
    if (isMarsMode) {
      return `linear-gradient(180deg, ${sandColor} 0%, ${sandColor} 100%)`;
    }
    return `linear-gradient(180deg, 
      rgba(233, 206, 166, 0.8) 0%,
      rgba(233, 206, 166, 1) 100%
    )`;
  };

  return (
    <div className="aquarium-container">
      <div className="retro-lamp"></div>
      <div className="aquarium-frame">
        <div className="aquarium">
          <div 
            className="aquarium-background" 
            style={{ 
              backgroundColor: waterColor,
              background: getWaterGradient()
            }}
          ></div>
          <div className="aquarium-floor">
            <div 
              className="sand" 
              style={{ 
                backgroundColor: sandColor,
                background: getSandGradient()
              }}
            ></div>
            <Sign 
              onAboutClick={onAboutClick} 
              onProjectsClick={onProjectsClick} 
              onSharkTrackerClick={onSharkTrackerClick}
              sandColor={sandColor}
            />
            
            {/* Sea Plants */}
            <SeaPlant height={120} left={2} delay={0.2} bottom={30} color={plantColor} />
            <SeaPlant height={160} left={5} delay={0.8} bottom={45} color={plantColor} />
            <SeaPlant height={140} left={8} delay={0.5} bottom={60} color={plantColor} />
            <SeaPlant height={180} left={11} delay={1.2} bottom={25} color={plantColor} />
            <SeaPlant height={150} left={14} delay={0.3} bottom={70} color={plantColor} />
            <SeaPlant height={170} left={17} delay={0.9} bottom={40} color={plantColor} />
            <SeaPlant height={190} left={20} delay={0.6} bottom={55} color={plantColor} />
            <SeaPlant height={130} left={23} delay={1.1} bottom={35} color={plantColor} />
            <SeaPlant height={175} left={26} delay={0.4} bottom={50} color={plantColor} />
            <SeaPlant height={145} left={29} delay={1.0} bottom={65} color={plantColor} />
            <SeaPlant height={165} left={32} delay={0.7} bottom={30} color={plantColor} />
            <SeaPlant height={185} left={35} delay={1.3} bottom={45} color={plantColor} />
            <SeaPlant height={155} left={38} delay={0.1} bottom={60} color={plantColor} />
            <SeaPlant height={135} left={41} delay={0.6} bottom={75} color={plantColor} />
            <SeaPlant height={170} left={44} delay={0.9} bottom={40} color={plantColor} />
            <SeaPlant height={140} left={47} delay={0.2} bottom={55} color={plantColor} />
            <SeaPlant height={180} left={50} delay={0.8} bottom={30} color={plantColor} />
            <SeaPlant height={160} left={53} delay={0.5} bottom={45} color={plantColor} />
            <SeaPlant height={190} left={56} delay={1.2} bottom={60} color={plantColor} />
            <SeaPlant height={150} left={59} delay={0.3} bottom={35} color={plantColor} />
            <SeaPlant height={170} left={62} delay={0.9} bottom={50} color={plantColor} />
            <SeaPlant height={130} left={65} delay={0.6} bottom={65} color={plantColor} />
            <SeaPlant height={175} left={68} delay={1.1} bottom={40} color={plantColor} />
            <SeaPlant height={145} left={71} delay={0.4} bottom={55} color={plantColor} />
            <SeaPlant height={165} left={74} delay={1.0} bottom={70} color={plantColor} />
            <SeaPlant height={185} left={77} delay={0.7} bottom={30} color={plantColor} />
            <SeaPlant height={155} left={80} delay={1.3} bottom={45} color={plantColor} />
            <SeaPlant height={135} left={83} delay={0.1} bottom={60} color={plantColor} />
            <SeaPlant height={170} left={86} delay={0.6} bottom={35} color={plantColor} />
            <SeaPlant height={140} left={89} delay={0.9} bottom={50} color={plantColor} />
            <SeaPlant height={180} left={92} delay={0.2} bottom={65} color={plantColor} />
            <SeaPlant height={160} left={95} delay={0.8} bottom={40} color={plantColor} />
            <SeaPlant height={190} left={98} delay={0.5} bottom={55} color={plantColor} />
            <SeaPlant height={150} left={15} delay={1.2} bottom={30} color={plantColor} />
            <SeaPlant height={170} left={25} delay={0.3} bottom={45} color={plantColor} />
            <SeaPlant height={130} left={35} delay={0.9} bottom={60} color={plantColor} />
            <SeaPlant height={175} left={45} delay={0.6} bottom={35} color={plantColor} />
            <SeaPlant height={145} left={55} delay={1.1} bottom={50} color={plantColor} />
            <SeaPlant height={165} left={65} delay={0.4} bottom={65} color={plantColor} />
            <SeaPlant height={185} left={75} delay={1.0} bottom={40} color={plantColor} />
            <SeaPlant height={155} left={85} delay={0.7} bottom={55} color={plantColor} />
            <SeaPlant height={140} left={10} delay={0.4} bottom={20} color={plantColor} />
            <SeaPlant height={160} left={20} delay={0.9} bottom={35} color={plantColor} />
            <SeaPlant height={150} left={30} delay={0.6} bottom={50} color={plantColor} />
            <SeaPlant height={180} left={40} delay={1.1} bottom={65} color={plantColor} />
            <SeaPlant height={130} left={50} delay={0.3} bottom={15} color={plantColor} />
            <SeaPlant height={170} left={60} delay={0.8} bottom={30} color={plantColor} />
            <SeaPlant height={145} left={70} delay={0.5} bottom={45} color={plantColor} />
            <SeaPlant height={165} left={80} delay={1.0} bottom={60} color={plantColor} />
            <SeaPlant height={190} left={90} delay={0.7} bottom={75} color={plantColor} />
            <SeaPlant height={155} left={15} delay={0.2} bottom={25} color={plantColor} />
            <SeaPlant height={175} left={25} delay={0.7} bottom={40} color={plantColor} />
            <SeaPlant height={135} left={35} delay={0.4} bottom={55} color={plantColor} />
            <SeaPlant height={160} left={45} delay={0.9} bottom={70} color={plantColor} />
            <SeaPlant height={150} left={55} delay={0.6} bottom={20} color={plantColor} />
            <SeaPlant height={185} left={65} delay={1.1} bottom={35} color={plantColor} />
            <SeaPlant height={140} left={75} delay={0.8} bottom={50} color={plantColor} />
            <SeaPlant height={170} left={85} delay={0.5} bottom={65} color={plantColor} />
            <SeaPlant height={145} left={95} delay={1.0} bottom={15} color={plantColor} />
            <SeaPlant height={165} left={5} delay={0.7} bottom={30} color={plantColor} />
            <SeaPlant height={190} left={15} delay={0.4} bottom={45} color={plantColor} />
            <SeaPlant height={155} left={25} delay={0.9} bottom={60} color={plantColor} />
            <SeaPlant height={175} left={35} delay={0.6} bottom={75} color={plantColor} />
            <SeaPlant height={135} left={45} delay={1.1} bottom={20} color={plantColor} />
            <SeaPlant height={160} left={55} delay={0.8} bottom={35} color={plantColor} />
            <SeaPlant height={150} left={65} delay={0.5} bottom={50} color={plantColor} />
            <SeaPlant height={185} left={75} delay={1.0} bottom={65} color={plantColor} />
            <SeaPlant height={140} left={85} delay={0.7} bottom={15} color={plantColor} />
            <SeaPlant height={170} left={95} delay={0.4} bottom={30} color={plantColor} />
            
            {/* Fish - 9 different fish with various species, scales, positions, and directions */}
            <Fish id="fish1" delay={0} speed={25} scale={1.1} species="basic" style={{ top: '-80px' }} direction="left-to-right" color={fishColors['fish1']}/>
            <Fish id="fish2" delay={5} speed={30} scale={1.1} species="pink" style={{ top: '-150px' }} direction="right-to-left" zIndex={1} color={fishColors['fish2']} />
            <Fish id="fish3" delay={10} speed={42} scale={1.3} species="blue" style={{ top: '-220px' }} direction="left-to-right" zIndex={15} title="LinkedIn" link="https://www.linkedin.com/in/yalisommer/" color={fishColors['fish3']} />
            <Fish id="fish4" delay={15} speed={22} scale={1.0} species="green" style={{ top: '-290px' }} direction="right-to-left" zIndex={15} color={fishColors['fish4']}/>
            <Fish id="fish5" delay={20} speed={27} scale={0.6} species="yellow" style={{ top: '-360px' }} direction="left-to-right" color={fishColors['fish5']} />
            <Fish id="fish6" delay={25} speed={24} scale={1.4} species="purple" style={{ top: '-420px' }} direction="right-to-left" color={fishColors['fish6']} />
            <Fish id="fish7" delay={30} speed={45} scale={1.4} species="orange" style={{ top: '-480px' }} direction="left-to-right" title="Gmail" link="mailto:yalisommer@gmail.com" color={fishColors['fish7']} />
            <Fish id="fish8" delay={35} speed={26} scale={0.8} species="striped" style={{ top: '-200px' }} direction="left-to-right" color={fishColors['fish8']} />
            <Fish id="fish9" delay={40} speed={23} scale={1.8} species="striped" style={{ top: '-350px' }} direction="right-to-left" color={fishColors['fish9']} />
            
            {/* Bubbles */}
            <div className="bubble bubble-1"></div>
            <div className="bubble bubble-2"></div>
            <div className="bubble bubble-3"></div>
            <div className="bubble bubble-4"></div>
            <div className="bubble bubble-5"></div>
            <div className="bubble bubble-6"></div>
            <div className="bubble bubble-7"></div>
            <div className="bubbly-text">
              <span className="letter" style={{ animationDelay: '0s', color: '#ffb6c1' }}>Y</span>
              <span className="letter" style={{ animationDelay: '0.1s', color: '#b3cde0' }}>a</span>
              <span className="letter" style={{ animationDelay: '0.2s', color: '#ccebc5' }}>l</span>
              <span className="letter" style={{ animationDelay: '0.3s', color: '#decbe4' }}>i</span>
              <span className="letter" style={{ animationDelay: '0.4s', color: 'transparent', marginRight: '30px' }}> </span>
              <span className="letter" style={{ animationDelay: '0.5s', color: '#b3cde0' }}>S</span>
              <span className="letter" style={{ animationDelay: '0.6s', color: '#ccebc5' }}>o</span>
              <span className="letter" style={{ animationDelay: '0.7s', color: '#decbe4' }}>m</span>
              <span className="letter" style={{ animationDelay: '0.8s', color: '#fed9a6' }}>m</span>
              <span className="letter" style={{ animationDelay: '0.9s', color: '#ffffcc' }}>e</span>
              <span className="letter" style={{ animationDelay: '1s', color: '#fbb4ae' }}>r</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aquarium; 