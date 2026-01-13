import { useNavigate } from "react-router-dom";
import backsvg from "../assets/back2-svgrepo-com.svg"

export default function BackButton(){
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back(); // goes back 1 step in browser history. Use navigate(-1) for React Router history instead.
        } else {
            navigate("/");
        }
    }

    return(
        <button className="bg-yellow-200! p-0! hover:border-[rgb(77,16,49)]!"
                onClick={handleBack} 
        >
        <img className="w-14 h-8" src={backsvg} alt="Tilbage"></img>
        </button>
    );
}