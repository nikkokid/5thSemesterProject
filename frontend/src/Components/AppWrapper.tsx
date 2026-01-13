import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";

export default function AppWrapper({children}: {children: React.ReactNode}) {
    const location = useLocation();

    const showBackButton = location.pathname !== "/";

    return (
        <div className="p-2 sm:pl-3 sm:pr-3 sm:pt-1 sm:pb-3 bg-gray-100">
            {showBackButton && <BackButton /> }                             {/*If variable true, show button*/} 
            {children}                                                      {/*Displays whatever's inside the AppWrapper tags, check main.tsx for clarity*/}
        </div>
    );
}