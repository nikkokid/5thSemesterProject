import { useNavigate } from 'react-router-dom';
import grape from "../assets/grapesvg.svg"; 
import statistics from "../assets/statisticssvg.svg";
import wine from "../assets/winesvg.svg";
import plantsvg from "../assets/plant-svgrepo-com.svg"



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
function ButtonCard({ image, title, description, onClick}: ButtonCardProps){
  return (
    <button 
      className="flex flex-col items-center"
      onClick={onClick}
    >
        <div>
          <img src={image} className="w-24 h-24 p-2" alt={title} />
        </div>
        <h1 className="mt-2">{title}</h1>
        <p>{description}</p>
        </button>
  )
}  

export default function FrontPage() {
  const navigate = useNavigate();

  const buttons = [
  { image: grape, title: "Druesort", description: "Se druedata her", onClick: () => navigate('/grape')},
  { image: wine, title: "Vin", description: "Se vindata her", onClick: () => navigate('/wine')},
  { image: plantsvg, title: "Rækker", description: "Se rækkedata her", onClick: () => navigate('/grape-row')},
  { image: statistics, title: "Statistik", description: "Kommer senere..."}
];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-25 p-2 "> 

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

