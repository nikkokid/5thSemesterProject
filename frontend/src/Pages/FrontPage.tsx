import { useNavigate } from 'react-router-dom';
import ButtonCard from "../Components/ButtonCard";
import grape from "../assets/grapesvg.svg"; 
import statistics from "../assets/statisticssvg.svg";
import wine from "../assets/winesvg.svg";
import plantsvg from "../assets/plant-svgrepo-com.svg"
import additive from "../assets/ingredients-mix-svgrepo-com.svg"



type ButtonCardProps = {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
};

/**
 * A reusable button card used on the front page.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.image - The image displayed on button
 * @param {string} props.title - The button title text, also used as alt text
 * @param {string} props.description - A short description shown below the title
 * @param {() => void} [props.onClick]
 * @returns {JSX.Element} A button card element
 */
export default function FrontPage() {
  const navigate = useNavigate();

  const buttons = [
  { image: grape, title: "Druesort", description: "Se druedata her", onClick: () => navigate('/grape')},
  { image: wine, title: "Vin", description: "Se vindata her", onClick: () => navigate('/wine')},
  { image: plantsvg, title: "Rækker", description: "Se rækkedata her", onClick: () => navigate('/grape-row')},
  { image: additive, title: "Tilsætningsstoffer", description: "Se tilsætningsstofsdata her", onClick: () => navigate('/additive')},
  { image: statistics, title: "Statistik", description: "Kommer senere..."},
];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16 p-2"> 

        {buttons.map((btn, index) => (
          <ButtonCard
            key={index}                    
            image={btn.image}
            title={btn.title}
            description={btn.description}
            onClick={btn.onClick}
        />
        ))}
      </div>    
    </>
  );
};

