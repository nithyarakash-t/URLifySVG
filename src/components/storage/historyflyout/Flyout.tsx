import { useEffect, useState, useRef } from 'react';
import './Flyout.scss';
import { useStorage } from '../data/storageContext';
import { Modal } from '../savemodal/Modal';
import { ConfirmModal, ConfirmModalProps } from '../confirmationmodal/Confirmation';

export function Flyout({loadEncodeInput}
    :{readonly loadEncodeInput:(input:string)=>void}) {

    const [open, setOpen] = useState(false); //control flyout state
    const [searchTerm, setSearchTerm] = useState("");
    const [showEditModal, setShowEditModal] = useState(false); //control edit modal
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined); //prop for edit, delete cofirmation modals
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmModalProps, setConfirmModalProps] = useState<ConfirmModalProps>();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const {localHistory, deleteFromHistory, clearHistory} = useStorage();

    /**App logic - START */
    // Filtered history based on the search term
    const filteredHistory = localHistory.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //delete item from history
    function handleDelete(index:number) {
       setConfirmModalProps({
            id: 'app-confirm-delete',
            title: `Delete ${localHistory[index].name}`,
            content: `Are you sure you want to delete ${localHistory[index].name} icon?`,
            onConfirm: () => deleteSelectedItem(index)
        });

       setShowConfirmModal(true);
    }
    function deleteSelectedItem(index:number) {
        deleteFromHistory(index);
    }

    //load an item to insert textarea
    function handleLoad(svg:string) {
        loadEncodeInput(svg);
        setOpen(false);
    }

    //edit an item in history
    function handleEdit(index:number) {
        setSelectedIndex(index);
        setShowEditModal(true);
    }

    //Clear all
    function handleClear() {
        setConfirmModalProps({
            id: 'app-confirm-clear',
            title: 'Clear History',
            content: 'Are you sure you want to clear all saved history ?',
            onConfirm: clearHistory
        });
        setShowConfirmModal(true);
    }
    /**App logic - END */

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

    useEffect(()=>{
        function handleKeyDown(e:KeyboardEvent) {
            if(e.key === 'Escape') {
                setOpen(false);
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return ()=>{
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [])
    //flyout ui methods - end

    return (
        <>
            <button className='app-flyout__control' type='button' onClick={()=>setOpen(true)} aria-label='Open Flyout'></button>

            <dialog ref={dialogRef} className="app-flyout__wrap" id="app-flyout" aria-labelledby="app-flyout-title">
                <div className="app-flyout__container">
                    <div className="app-flyout__header">
                        <h2 id="app-flyout-title">Flyout title</h2>
                        <button type="button" autoFocus onClick={()=>setOpen(false)} aria-label='Close flyout'>
                            <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                        
                        {/* Search and clear */}
                        <div className='app-flyout__header-group'>
                            <input type="search" aria-label='Search'
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name" className="app-flyout__search"
                            />
                            <button className='app-flyout__clear' type='button' aria-label='Clear all saved icons' onClick={()=>handleClear()}></button>
                        </div>
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
                                        filteredHistory.map((item, ind)=>{
                                            return <li key={item.name}>
                                                <div className='-details'>
                                                    <div>
                                                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(item.svg)}`} alt=''/>
                                                    </div>
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className='-controls'>
                                                    <button type='button' aria-label='Load item' title={`Load icon back - ${item.name}`} onClick={()=>handleLoad(item.svg)}>
                                                        <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6-4-4-4 4"/><path d="M12 2v8"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 18h.01"/><path d="M10 18h.01"/></svg>
                                                    </button>
                                                    <button type='button' aria-label='Rename item' title={`Rename icon - ${item.name}`} onClick={()=>handleEdit(ind)}>
                                                        <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                                                    </button>
                                                    <button type='button' aria-label='Delete item' title={`Delete icon - ${item.name}`} onClick={()=>handleDelete(ind)}>
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

            {
                showEditModal 
                && 
                <Modal mode='edit' setShowModal={setShowEditModal}
                index={selectedIndex} name={localHistory[selectedIndex as number].name} svg={localHistory[selectedIndex as number].svg} />    
            }

            {
                showConfirmModal
                &&
                <ConfirmModal title={confirmModalProps?.title} content={confirmModalProps?.content}
                id={confirmModalProps?.id} 
                onConfirm={confirmModalProps?.onConfirm} parentSetter={setShowConfirmModal} />
            }
        </>
    )
}