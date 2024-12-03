import { FormEvent } from "react";
import "./Insert.scss";

export function Insert({input, handlerFunction}:{readonly input:string, readonly handlerFunction:(input:string)=>void}) {

    /** Handle insert input - start */
    function changeHandler(event:FormEvent) {
        const target = event.currentTarget as HTMLTextAreaElement;
        handlerFunction(target.value);
    }
    /**Handle insert input - end */

    return (
        <section className="app-group" aria-labelledby="section_insert_title">
            <div className="app-group__head">
                <h2 className="app-group__title" id="section_insert_title">Insert SVG:</h2>
                {/* <button type="button" className="linkbutton" aria-label="Load an example">Example</button> */}
            </div>
            <div className="app-group__body">
                <textarea id="app_insert_svg" name="app_insert_svg" spellCheck="false"
                value={input}
                onChange={(e)=>changeHandler(e)}></textarea>
            </div>
        </section>
    )
}