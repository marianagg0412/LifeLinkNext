import React from 'react';
import FocusTrap from 'focus-trap-react';
import ScrollableCard from './TermsAndConditions';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptTerms: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAcceptTerms }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50" // Increased opacity for full coverage
      onClick={onClose}
    >
      <FocusTrap>
        <div className="bg-white max-w-4xl p-8 rounded-lg shadow-lg overflow-y-auto">
          <ScrollableCard onClose={onClose} onAcceptTerms={onAcceptTerms} />
        </div>
      </FocusTrap>
    </div>
  );
};


export default Modal;
