import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  toggleDialog: () => void;
};

const Dialog = forwardRef<HTMLDialogElement, Props>(
  ({ children, toggleDialog }, ref) => {
    return (
      <dialog
        ref={ref}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            toggleDialog();
          }
        }}
      >
        <div className="relative p-6">
          {children}
          <button
            onClick={toggleDialog}
            className="absolute top-1 right-1 w-7 h-7 p-0 
            bg-transparent border-0 shadow-none flex items-center 
            justify-center rounded-full hover:bg-gray-200/50 transition-colors"
            aria-label="Close dialog"
          >
            <span className="text-black text-xl font-bold">&times;</span>
          </button>
        </div>
      </dialog>
    );
  }
);

export default Dialog;
