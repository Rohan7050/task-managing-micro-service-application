import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {

  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-10 bg-gray-900 rounded-2xl shadow-lg p-6 w-lg max-w-full transition-all duration-300 scale-100 animate-fadeIn">
        <div className="absolute top-0 right-0 m-3">
            <XMarkIcon onClick={() => onClose()} className="text-white cursor-pointer" color='fff' height={25} width={25}/>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
