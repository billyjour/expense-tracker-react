import { createPortal } from 'react-dom';

function Modal({isOpen, onClose, onDelete, children}){
    if(!isOpen) return null;
    return createPortal(
        <div className='modal-pop-up-container' onClick={onClose}>
            <div className='modal-pop-up'>
                {children}
                <div className='modal-btns'>
                    <button className='modal-close-btn' onClick={onClose}>X</button>
                    <button className='modal-del-btn' onClick={onDelete}><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal