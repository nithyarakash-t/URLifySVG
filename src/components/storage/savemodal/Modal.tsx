import { useEffect, useState, useRef, FormEvent } from 'react';
import './Modal.scss';
import { useStorage, Datum } from "../data/storageContext";
interface FormDataObject {
    [key: string]: string | number; // Define the type of values (string or number)
}
type Mode = 'add' | 'rename'
type ModalProps = {readonly svg:Datum['svg'], 
    readonly mode?:Mode, readonly index?:number, readonly name?:string
    readonly setShowModal?:React.Dispatch<React.SetStateAction<boolean>>}

export function Modal({svg, mode = 'add', index, name='', setShowModal}:ModalProps) {

    const [error, setError] = useState(false);
    const [open, setOpen] = useState(mode === 'rename');
    const dialogRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const { addToHistory, renameHistory } = useStorage();    

    useEffect(()=>{
        if(open) {
            dialogRef.current?.showModal();
            document.body.style.setProperty('overflow', 'hidden');
        }
        else {
            resetForm();
            dialogRef.current?.close();
            document.body.style.removeProperty('overflow');

            if(setShowModal) setShowModal(false);
        }
    }, [open]);
    
    useEffect(()=>{
        const dialog = (dialogRef.current as HTMLDialogElement);
        //Close dialog on escape
        function handleKeyDown(e:KeyboardEvent) {
            if(e.key === 'Escape') {
                setOpen(false);
            }
            if (e.ctrlKey && e.key === 's') {
                //Hotfix - If other dialogs are open do not open save modal
                if(document.querySelector('dialog[open]')) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                setOpen(true);
            }

            setError(false);
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

    //Form methods - start
    // DONE - add regex on form to only allow lowercase a-z 0-9 and -
    function handleFormSubmit(e:FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data:FormDataObject = {};
        formData.forEach((value, key) => {
            if (typeof value === 'string') { // Assign string values directly
                data[key] = value; 
            }
            else if (value instanceof File) {  // Handle File objects (e.g., upload or ignore)
                console.warn(`File input detected for key "${key}". Files are not included in the data object.`);
            } 
            else { // Handle other cases (unlikely, but TypeScript requires it)
                console.warn(`Unexpected value type for key "${key}".`);
            }
        });

        let flag = false;
        if(mode === 'add') {
            flag = addToHistory({ name: `${data.name}`, svg: svg });
        }
        else {
            flag = renameHistory( index as number, { name: `${data.name}`, svg: svg });
        }
 

        if(flag) { //successful addition
            setOpen(false);
        }
        else { //duplicate name, show error
            setError(true);
        }
    }
    function resetForm() {
        formRef.current?.reset();
    }
    //Form methods - end

    return (
        <>
            {
                mode === 'add' &&
                <button type='button' className='app-modal__control' onClick={()=>setOpen(true)} 
                aria-label='Save' aria-controls='save-modal' aria-expanded={open}></button>
            }
            <dialog ref={dialogRef} className="app-modal__wrap" id="save-modal" aria-labelledby="app-modal-title">
                <div className="app-modal__container">
                    <div className="app-modal__header">
                        <button type="button" className='app-modal__close' onClick={()=>setOpen(false)} aria-label='Close'></button>
                        <h2 className='app-modal__title' id="app-modal-title">
                            {mode === 'add' ? 'Add' : "Rename" }
                        </h2>
                    </div>
                    <div className="app-modal__body">
                        <form ref={formRef} id='app-savemodal-form' className='app-modal__form'
                        onSubmit={handleFormSubmit}>
                            <label className='app-modal__input'>
                                <input autoFocus id='name' name='name' required type='text'
                                defaultValue={name}
                                placeholder='a-z0-9_ are allowed | min. 3 a-z | max. 30 chars' 
                                aria-label='Enter name - 3-30 characters, lowercase a-z, 0-9, and underscores only. Ensure to include atleast 3 a-z' 
                                pattern='^(?=(.*[a-z]){3})\w{3,30}' minLength={3} maxLength={30}
                                //^[a-z0-9-]{3,30}$                                
                                //^(?=(.*[a-z]){3})[a-z0-9-]{3,30}
                                />
                                <span>Name: </span>
                            </label>
                        </form>
                        {error &&
                            <p role='alert' className='app-modal__error'>
                                {
                                    mode === 'add' ?
                                    'Name already exists, choose a diffrent name'
                                    :
                                    'Name exists for another existing item, choose a different name'
                                }
                            </p>
                        }
                    </div>
                    <div className='app-modal__footer'>
                        <button type='button' aria-label='cancel' onClick={()=>setOpen(false)}>Cancel</button>
                        <button type='submit' form='app-savemodal-form' aria-label='submit'>Submit</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

//Modal methods - start
// function openModal() {
//     setOpen(true);
// }
// function closeModal() {
//     setOpen(false);
//     resetForm();
// }
//Modal methods-end