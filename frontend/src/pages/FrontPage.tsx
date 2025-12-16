import { useNavigate } from 'react-router-dom'; // for at kunne navigere til de andre sider
import Grape from "./assets/grape.svg"; 
import Statistics from "./assets/statistics.svg";
import WineBottle from "./assets/winebottle.svg";


type ButtonCardProps = {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
};
//Genanvendelig knappe komponent, bruger det istedet for at kode 3 knapper, hvilket også virker fint
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
  const navigate = useNavigate(); // for at kunne navigere til de andre sider

  //definere billede, tekst og onClick til de 3 knapper
  const buttons = [
    { image: Grape, title: "Druesort", description: "Se druedata her", onClick: () => navigate('/druesorter')},
    { image: Statistics, title: "Statistik", description: "Se statistik her", onClick: () => navigate('/statistik')},
    { image: WineBottle, title: "Vin", description: "Se vindata her", onClick: () => navigate('/vine')}
  ];
  return (
    <>
      <h2 className="text-center">
        Forside
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-25 p-2 "> {/*Grid til alle knapper*/}

        {/*Mappe hver knap fra tidligere array til en ButtonCard komponent ting*/}
        {buttons.map((btn, index) => (
          <ButtonCard
            key={index}                     // unik nøgle til React's rendering fis så den kan iterere over arrayet
            image={btn.image}
            title={btn.title}
            description={btn.description}
            onClick={btn.onClick}
        />
        ))}

      {/* dåm knap bare for visuals*/} 
        <button className="flex flex-col items-center">
          <div className="">
            <img src={WineBottle} className="w-24 h-24 p-2" alt="Wine Bottle" />
          </div>
          <h1 className="mt-2">Whatever</h1>
          <p>Hvis der skulle komme noget mere, <br/>bare for lige at se hvordan det ser ud</p>
        </button>
      </div>    
    </>
  );
};

