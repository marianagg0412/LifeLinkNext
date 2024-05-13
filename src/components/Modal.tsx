import React, { useState } from 'react';
import FocusTrap from 'focus-trap-react';
import ScrollableCard from './TermsAndConditions';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <FocusTrap>
      <ScrollableCard isOpen={isOpen} onClose={onClose} />
    </FocusTrap>
  );
};

export default Modal;
