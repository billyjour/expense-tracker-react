import { createPortal } from 'react-dom';

function Modal({isOpen, onClose, onDelete, onEdit, isEditing, onSave, children}){
    if(!isOpen) return null;    
    return createPortal(
        <div className="modal-pop-up-container">
            <div className="modal-pop-up">
                {children}
                <button className="modal-close-btn" onClick={onClose}>X</button>                
                <div className="modal-btns">
                    <button className="modal-edit-btn" onClick={isEditing? onSave : onEdit}>{isEditing ? "Save" : "Edit"}</button>
                    <button className="modal-del-btn" onClick={onDelete}><i class="bi bi-trash-fill"></i></button>
                </div>
            </div>
        </div>,
        document.body
    )

}

export default Modal