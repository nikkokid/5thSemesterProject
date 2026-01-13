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
        flex flex-col items-center justify-evenly
        w-full h-56
        sm:w-60 sm:h-full 
        bg-white rounded-lg shadow
        hover:shadow-md hover:border-[rgb(77,16,49)]! transition
      "
    >
      <img
        src={image}
        className="w-21 h-21 sm:w-24 sm:h-24 object-contain mt-2 sm:mt-0"
        alt={title}
      />

      <div className="flex flex-col text-center mt-2">
        <h3 className="font-semibold text-sm sm:text-base">{title}</h3>

        {description && (
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            {description}
          </p>
        )}
      </div>
    </button>
  );
}
