import React, { createContext, useContext, useState, useCallback } from 'react';

interface ModalContextProps {
  openModal: (content: React.ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
  isOpen: boolean;
  content: React.ReactNode | null;
  options: ModalOptions;
}

interface ModalOptions {
  closeOnOverlayClick?: boolean;
  // Add more options as needed
}

const ModalContext = createContext<ModalContextProps>({
  openModal: () => {},
  closeModal: () => {},
  isOpen: false,
  content: null,
  options: {}
});

export const useModal = () => useContext(ModalContext);

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [options, setOptions] = useState<ModalOptions>({});

  const openModal = useCallback((content: React.ReactNode, options: ModalOptions = {}) => {
    setContent(content);
    setOptions(options);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    setOptions({});
  }, []);

  const value: ModalContextProps = {
    openModal,
    closeModal,
    isOpen,
    content,
    options,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={options.closeOnOverlayClick ? closeModal : undefined}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};