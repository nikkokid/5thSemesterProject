import { Link } from "react-router-dom";



export default function NavigationList() {
  return (
    <div className="flex flex-col gap-2">
      <Link to="/grape" className="p-2 rounded">
        Druesort
      </Link>
      <Link to="/wine" className="p-2 rounded">
        Vine
      </Link>
      <Link to="/grape-row" className="p-2 rounded">
        Rækker
      </Link>
    </div>
  );
}