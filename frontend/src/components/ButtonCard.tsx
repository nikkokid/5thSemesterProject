type ButtonCardProps = {
  image: string;
  title: string;
  description?: string;
  onClick?: () => void;
};

export default function ButtonCard({
  image,
  title,
  description,
  onClick,
}: ButtonCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex flex-col items-center
        
      "
    >
      <img
        src={image}
        className="w-24 h-24 p-2"
        alt={title}
      />

      <h3 className="mt-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-gray-600 text-center">
          {description}
        </p>
      )}
    </button>
  );
}
