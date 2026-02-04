
export default function ModalWrapper({ children, onClose }) {
  return (
    <>
      {/* Blur Background */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-40
                   opacity-0 animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Popup */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50
                   opacity-0 scale-95 animate-popup"
      >
        {children}
      </div>
    </>
  );
}
