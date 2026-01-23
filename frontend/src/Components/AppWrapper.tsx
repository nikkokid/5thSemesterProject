import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";

function getParentPath(pathname: string) {
    const parts = pathname.split("/").filter(Boolean);

    // If there are no parts or only one part (e.g., "/"), return "/"
    if(parts.length <= 1) return "/";

    // Remove the last part to get the parent path
    return "/" + parts.slice(0, -1).join("/");
}

export default function AppWrapper({children}: {children: React.ReactNode}) {
    const location = useLocation();

    const showBackButton = location.pathname !== "/";
    const parentPath = getParentPath(location.pathname);

    return (
        <div className="p-2 sm:pl-3 sm:pr-3 sm:pt-1 sm:pb-3 bg-gray-100">
            {showBackButton && <BackButton to={parentPath} /> }             {/*If variable true, show button*/} 
            {children}                                                      {/*Displays whatever's inside the AppWrapper tags, check main.tsx for clarity*/}
        </div>
    );
}