import { useEffect, useState, useRef } from 'react';
import './Confirmation.scss';

// Note: T serves no purpose here, added for educational purposes
// Check historyFlyout's handleDelete to see onConfirm will be receiving an arrow fn - () => --Actual function--
// Example - onConfirm: () => deleteSelectedItem(index)
export type ConfirmModalProps<T = void> = {
    readonly title?:string,
    readonly content?:string,
    readonly id?:string,
    readonly onConfirm?:(param?:T)=>void, // param:T is not needed as we're receiving arrow fns
    readonly parentSetter?:React.Dispatch<React.SetStateAction<boolean>>
}

export function ConfirmModal<T,>({ // Note: Even if we were using T above, it's mostly not needed here
    title='Confirmation',
    content='Are you sure ?',
    id='app-confirm-mod',
    onConfirm,
    parentSetter}:ConfirmModalProps<T>) {

    const [open, setOpen] = useState(true);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(()=>{
        if(open) {
            dialogRef.current?.showModal();
            document.body.style.setProperty('overflow', 'hidden');
        }
        else {
            dialogRef.current?.close();
            document.body.style.removeProperty('overflow');

            if(parentSetter) parentSetter(false);
        }
    }, [open]);
    
    useEffect(()=>{
        const dialog = (dialogRef.current as HTMLDialogElement);
        //Close dialog on escape
        function handleKeyDown(e:KeyboardEvent) {
            if(e.key === 'Escape') setOpen(false);
        }
        //Close dialog on backdrop click
        function handlePointerDown(event:PointerEvent) {
            if ( event.target === dialog ) setOpen(false);
        }
        
        dialog.addEventListener('pointerdown', handlePointerDown)
        window.addEventListener('keydown', handleKeyDown);

        return ()=>{
            dialog.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    /** Submission */
    function handleConfirm() {
        setOpen(false);
        if(onConfirm) onConfirm();
    }

    /** Cancel */
    function handleCancel() {
        setOpen(false);
    }

    return (
            <dialog ref={dialogRef} role='alertdialog' className="app-confirmmod__wrap" id={id} aria-labelledby="app-confirmmod-title">
                <div className="app-confirmmod__container">
                    <div className="app-confirmmod__header">
                        <button type="button" className='app-confirmmod__close' onClick={()=>setOpen(false)} aria-label='Close'></button>
                        <h2 className='app-confirmmod__title' id="app-confirmmod-title">
                            { title }
                        </h2>
                    </div>
                    <div className="app-confirmmod__body">
                       <p>{content}</p>
                    </div>
                    <div className='app-confirmmod__footer'>
                        <button type='button' className='app-button -secondary' aria-label='cancel' onClick={()=>handleCancel()}>Cancel</button>
                        <button type='button' className='app-button -primary' aria-label='Confirm' onClick={()=>handleConfirm()}>Confirm</button>
                    </div>
                </div>
            </dialog>
    )
}