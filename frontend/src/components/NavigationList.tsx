import { Link } from "react-router-dom";



export default function NavigationList() {
  return (
    <div className="flex flex-col gap-2">
      <Link to="/grape-type" className="p-2 rounded">
        Druesort
      </Link>
      <Link to="/statistics" className="p-2 rounded">
        Statistik
      </Link>
      <Link to="/wine" className="p-2 rounded">
        Høst
      </Link>
    </div>
  );
}