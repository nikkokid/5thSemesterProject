import { Link } from "react-router-dom";

type NavigationListProps = {
  onNavigate: () => void;
};

export default function NavigationList({onNavigate}: NavigationListProps) {
  return (
    <div className="flex flex-col gap-2">
      <Link className="p-2! rounded" to="/grape" onClick={onNavigate}>
        Druesort
      </Link>
      <Link className="p-2 rounded" to="/wine" onClick={onNavigate}>
        Vine
      </Link>
      <Link className="p-2 rounded" to="/grape-row" onClick={onNavigate}>
        Rækker
      </Link>
    </div>
  );
}