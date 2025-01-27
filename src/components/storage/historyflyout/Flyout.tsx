import { useEffect, useState, useRef } from 'react';
import './Flyout.scss';
import { localStorage } from '../data/storage';

export function Flyout() {
    const [open, setOpen] = useState(false);
    const [data] = useState(localStorage);
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
            <button className='app-flyout__control' type='button' onClick={(openFlyout)} aria-label='Open Flyout'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
            </button>

            <dialog ref={dialogRef} className="app-flyout__wrap" id="app-flyout" aria-labelledby="app-flyout-title">
                <div className="app-flyout__container">
                    <div className="app-flyout__header">
                        <button type="button" autoFocus onClick={closeFlyout}>close</button>
                        <h2 id="app-flyout-title">Flyout title</h2>
                    </div>
                    <div className="app-flyout__body">
                        <ul className='app-flyout__list'>
                            {
                                data.map((item,ind)=>{
                                    return <li key={ind}>
                                        <span>{item.name} - </span>
                                        <div>
                                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(item.svg)}`} alt=''/>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </dialog>
        </>
    )
}