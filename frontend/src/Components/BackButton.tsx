import { useNavigate } from "react-router-dom";
import backsvg from "../assets/back2-svgrepo-com.svg"

export default function BackButton({to}: {to: string}){
    const navigate = useNavigate();

    

    return(
        <button className="bg-gray-200! p-0! border-black! border! hover:border-[rgb(77,16,49)]! hover:bg-gray-300! "
                onClick={() => navigate(to)} 
        >
        <img className="w-14 h-8" src={backsvg} alt="Tilbage"></img>
        </button>
    );
}