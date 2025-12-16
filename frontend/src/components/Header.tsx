import Hamburger from "./HamburgerSidebar"
import {Link} from "react-router-dom";

export default function Header(){ 
  return( 
    <header className="relative flex items-center p-4 bg-[rgb(77,16,49)]"> 
      <Hamburger />
        <Link to ="/" className="absolute left-1/2 -translate-x-1/2 mt-3 hover:!bg-transparent"> 
          <h1 className="text-white tangerine m-0 ">Buurgaard Vin</h1>
        </Link>
    </header> 
  ) 
}

