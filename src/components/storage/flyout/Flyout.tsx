import { useEffect, useState, useRef } from 'react';
import './Flyout.scss';

export function Flyout() {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(()=>{
        if(open) {
            dialogRef.current?.showModal();
            document.body.style.setProperty('overflow', 'hidden');
        }
        else {
            dialogRef.current?.close();
            document.body.style.removeProperty('overflow');
        }
    }, [open])

    function openFlyout() {
        setOpen(true);
    }
    function closeFlyout() {
        setOpen(false);

    }

    return (
        <>
            <button type='button' onClick={(openFlyout)}>Flyout</button>

            <dialog ref={dialogRef} className="app-flyout__wrap" id="app-flyout" aria-labelledby="app-flyout-title">
                <div className="app-flyout__container">
                    <div className="app-flyout__header">
                        <button type="button" autoFocus onClick={closeFlyout}>close</button>
                        <h2 id="app-flyout-title">Flyout title</h2>
                    </div>
                    <div className="app-flyout__body">
                        
                    </div>
                </div>
            </dialog>
        </>
    )
}