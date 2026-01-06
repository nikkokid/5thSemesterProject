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
        flex flex-col items-center justify-between
        w-full h-48 p-4
        bg-white rounded-lg shadow
        hover:shadow-md transition
      "
    >
      <img
        src={image}
        className="w-24 h-24 object-contain"
        alt={title}
      />

      <h3 className="mt-2 text-center font-semibold">{title}</h3>

      {description && (
        <p className="text-sm text-gray-600 text-center">
          {description}
        </p>
      )}
    </button>
  );
}
