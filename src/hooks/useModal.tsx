// hooks-useModal
import useModalStore from '@/store/modalStore';
import { createPortal } from 'react-dom';

const useModal = () => {
  const { isOpen, content, openModal, closeModal } = useModalStore();

  const Modal = () => {
    if (!isOpen) return null;

    return createPortal(
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg p-6 max-w-md w-full"
        >
          {content}
        </div>
      </div>,
      document.body,
    );
  };

  return { Modal, openModal, closeModal };
};

export default useModal;
