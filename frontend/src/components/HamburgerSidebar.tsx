import Hamburger  from "hamburger-react"; //https://hamburger-react.netlify.app
import NavigationList from "./NavigationList";
import { useState } from "react";


export default function HamburgerComponent(){
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Hamburger 
            size={30}
            toggled={open}
            toggle={setOpen}         
        /> 
        {open && <div className ="absolute top-20 left-0 w-screen lg:w-64 h-screen p-4 bg-[rgb(77,16,49)]">
        <NavigationList/>
        </div>}
      </div>
    )
};