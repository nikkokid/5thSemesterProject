import Hamburger from "./HamburgerSidebar"
import {Link} from "react-router-dom";

export default function Header(){ 
  return( 
    <header className="relative flex items-center p-4 bg-[rgb(77,16,49)]"> 
      <Hamburger />
        <Link to ="/" className="absolute left-1/2 -translate-x-1/2 mt-3 hover:bg-transparent! focus:bg-transparent! "> 
          <h1 className="tangerine m-0 text-xs md:text-4xl whitespace-nowrap">Buurgaard Vin</h1>
        </Link>
    </header> 
  ) 
}

