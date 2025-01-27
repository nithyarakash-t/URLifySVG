import { useEffect, useState, useRef, FormEvent } from 'react';
import './Modal.scss';
import { Datum, localStorage } from '../data/storage';
// `^(?=(.*[a-z]){3})[a-z0-9-]{3,30}$`;
// "^[a-z0-9-]{3,30}$";
// ^(?=(.*[a-z]){3})[\w]{3,16}$
// const regex = "\w{3,30}";
interface FormDataObject {
    [key: string]: string | number; // Define the type of values (string or number)
}

export function Modal({svg}:{readonly svg:Datum['svg']}) {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

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

    //Modal methods - start
    function openModal() {
        setOpen(true);
    }
    function closeModal() {
        setOpen(false);
        resetForm();

    }
    //Modal methods-end

    //Form methods - start
    // add regex on form to only allow lowercase a-z 0-9 and -
    function handleFormSubmit(e:FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data:FormDataObject = {};
        formData.forEach((value, key) => {
            if (typeof value === 'string') {
                data[key] = value; // Assign string values directly
            }
            else if (value instanceof File) {
                // Handle File objects (e.g., upload or ignore)
                console.warn(`File input detected for key "${key}". Files are not included in the data object.`);
            } 
            else {
                // Handle other cases (unlikely, but TypeScript requires it)
                console.warn(`Unexpected value type for key "${key}".`);
            }
        });

        localStorage.push(
            {
                name: `${data.name}`,
                svg: svg
            }
        );
        resetForm();
        closeModal();
    }
    function resetForm() {
        formRef.current?.reset()
    }
    //Form methods - end

    return (
        <>
            <button type='button' onClick={openModal}>Save</button>
            
            <dialog ref={dialogRef} className="app-modal__wrap" id="app-modal" aria-labelledby="app-modal-title">
                <div className="app-modal__container">
                    <div className="app-modal__header">
                        <button type="button" className='app-modal__close' autoFocus onClick={closeModal} aria-label='Close'></button>
                        <h2 className='app-modal__title' id="app-modal-title">Save</h2>
                    </div>
                    <div className="app-modal__body">
                        <form ref={formRef} id='app-savemodal-form' className='app-modal__form'
                        onSubmit={handleFormSubmit}>
                            <label className='app-modal__input'>
                                <input id='name' name='name' required type='text' placeholder='Enter name for your svg' 
                                aria-label='Enter name - 3-30 characters, lowercase a-z, 0-9, and unsercores only. Ensure to include atleast 3 a-z' 
                                pattern='^(?=(.*[a-z]){3})[a-z0-9_]{3,30}' //minLength={3} maxLength={30}                                
                                />
                                <span>Name: </span>
                            </label>
                        </form>
                    </div>
                    <div className='app-modal__footer'>
                        <button type='button' aria-label='cancel'>Cancel</button>
                        <button type='submit' form='app-savemodal-form' aria-label='submit'>Submit</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}