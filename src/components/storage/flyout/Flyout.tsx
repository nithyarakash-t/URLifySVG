import { useEffect, useRef } from 'react';
import './Flyout.scss';

export function Flyout() {
    const dialog = useRef(null);
    let dialogRef:HTMLDialogElement;

    useEffect(()=>{
        dialogRef = (dialog.current as unknown as HTMLDialogElement);
        return () => {
            dialogRef.removeEventListener('animationend', cleanup);
        }
    });

    function openFlyout() {
        document.body.style.setProperty('overflow', 'hidden');
        dialogRef.showModal();
    }
    function closeFlyout() {
        dialogRef.close();
        dialogRef.addEventListener('animationend', cleanup);
        document.body.style.removeProperty('overflow');
    }

    function cleanup() {
        console.info('flyout cleanup')
    }
    return (
        <>
            <button type='button' onClick={openFlyout}>Flyout</button>

            <dialog ref={dialog} className="app-flyout__wrap" id="app-flyout" aria-labelledby="app-flyout-title">
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