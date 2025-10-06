
import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;  
  footer?: ReactNode;            
};

export default function Modal({ open, children, onClose, footer }: ModalProps) {
    
  return (
    <>
      <div className={`modal fade ${open ? "show d-block" : ""}`} tabIndex={-1} aria-hidden={!open}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              {footer ?? <button className="btn btn-secondary" onClick={onClose}>Stäng</button>}
            </div>
          </div>
        </div>
      </div>
      {open && <div className="modal-backdrop fade show" />}
    </>
  );
}