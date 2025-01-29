import { useEffect, useState, useRef } from 'react';
import './Flyout.scss';
import { useStorage } from '../data/storageContext';

export function Flyout() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);
    const { localHistory, deleteFromHistory } = useStorage();
    const [searchTerm, setSearchTerm] = useState("");
    // Filtered history based on the search term
    const filteredHistory = localHistory.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //delete item from history
    function handleDelete(index:number) {
        deleteFromHistory(index);
    }

    //flyout ui methods - start
    //useeffect for open/close
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
    //flyout ui methods - end

    return (
        <>
            <button className='app-flyout__control' type='button' onClick={(openFlyout)} aria-label='Open Flyout'></button>

            <dialog ref={dialogRef} className="app-flyout__wrap" id="app-flyout" aria-labelledby="app-flyout-title">
                <div className="app-flyout__container">
                    <div className="app-flyout__header">
                        <h2 id="app-flyout-title">Flyout title</h2>
                        <button type="button" autoFocus onClick={closeFlyout} aria-label='Close flyout'>
                            <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                        
                        {/* Search */}
                        <input type="search" aria-label='Search'
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name" className="app-flyout__search"
                        />
                    </div>
                    <div className="app-flyout__body">
                        { localHistory.length === 0 && <p>History is empty</p> }
                        { 
                            (localHistory.length > 0 && filteredHistory.length === 0 ) ?
                            (<p>No items match your search doofus</p>)
                            :
                            (
                                <ul className='app-flyout__list'>
                                    {
                                        filteredHistory.map((item,ind)=>{
                                            return <li key={ind}>
                                                <div className='-details'>
                                                    <span>{item.name}</span>
                                                    <div>
                                                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(item.svg)}`} alt=''/>
                                                    </div>
                                                </div>
                                                <div className='-controls'>
                                                    <button type='button' aria-label='Load Item' title='Load item back'>
                                                        <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6-4-4-4 4"/><path d="M12 2v8"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 18h.01"/><path d="M10 18h.01"/></svg>
                                                    </button>
                                                    <button type='button' aria-label='Edit Item'>
                                                        <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                                                    </button>
                                                    <button type='button' aria-label='Delete' onClick={()=>handleDelete(ind)}>
                                                        <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                                    </button>
                                                </div>
                                                
                                            </li>
                                        })
                                    }
                                </ul>
                            )
                        }
                    </div>
                </div>
            </dialog>
        </>
    )
}