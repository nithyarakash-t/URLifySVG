import { FormEvent, useEffect, useRef, DragEvent } from "react";
import "./Insert.scss";
import { svg } from "../../layout/grid/helpers";

export function Insert({encodeInput, handleEncodeChange}
    :{readonly encodeInput:string, readonly handleEncodeChange:(encodeInput:string)=>void}) {

    const dropzone = useRef<HTMLDivElement>(null);
    const handleDragOver_eh = handleDragOver;
    const handleDragEnd_eh = handleDragEnd;

    useEffect(()=>{
        document.addEventListener('dragover', handleDragOver_eh);
        document.addEventListener('dragend', handleDragEnd_eh);

        return ()=>{
            document.removeEventListener('dragover', handleDragOver_eh);
            document.removeEventListener('dragend', handleDragEnd_eh);
        }
    }, [handleDragOver_eh, handleDragEnd_eh])

    /** Handle insert encodeInput */
    function changeHandler(event:FormEvent) {
        const target = event.currentTarget as HTMLTextAreaElement;
        handleEncodeChange(target.value);
    }

    /** Load example to Insert textarea */
    function loadExample() {
        handleEncodeChange(svg);
    }

    /** Drag start handler */
    function handleDragOver(event:Event) {
        event.preventDefault();
        dropzone.current?.classList.add('-active');
    }

    /** Drag end handler */
    function handleDragEnd() {
        dropzone.current?.classList.remove('-active');
    }

    /** Drop handler */
    function handleDrop(event:DragEvent<Element>) {
        event.preventDefault();

        const data = event.dataTransfer;
        const reader = new FileReader();
        const file = data?.files[0];
        handleDragEnd();

        if (file?.type === `image/svg+xml`) {
            reader.readAsText(file);
            reader.onload = () => {
                handleEncodeChange(reader.result as string);
            };
        }
    }

    return (
        <section className="app-group" aria-labelledby="section_insert_title">
            <div className="app-group__head">
                <h2 className="app-group__title" id="section_insert_title">Insert SVG:</h2>
                <button type="button" className="linkbutton" aria-label="Load an example"
                onClick={loadExample}>Example</button>
            </div>
            <div className="app-group__body" id="insert-body">
                <textarea id="app_insert_svg" name="app_insert_svg" spellCheck="false"
                value={encodeInput} 
                aria-label="Insert SVG" aria-describedby="app_insert_foot"
                onChange={(e)=>changeHandler(e)}></textarea>

                <div ref={dropzone} onDrop={(event)=>handleDrop(event)} className="app-dropzone"></div>
            </div>
            <div className="app-group__foot">
                <p id="app_insert_foot">You may enter the code or drop SVG file here</p>
            </div>
        </section>
    )
}