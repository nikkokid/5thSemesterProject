import { Link } from "react-router-dom";

type NavigationListProps = {
  onNavigate: () => void;
};

export default function NavigationList({onNavigate}: NavigationListProps) {
  return (
    <div className="flex flex-col sm:gap-2 sm:mt-0 sm:text-left sm:text-base mt-5 gap-6 text-center text-2xl">
      <Link className="p-3 rounded" to="/grape" onClick={onNavigate}>
        Druesort
      </Link>
      <Link className="p-3 rounded" to="/wine" onClick={onNavigate}>
        Vine
      </Link>
      <Link className="p-3 rounded" to="/grape-row" onClick={onNavigate}>
        Rækker
      </Link>
      <Link className="p-3 rounded" to="/additive" onClick={onNavigate}>
        Tilsætningsstoffer
      </Link>
    </div>
  );
}