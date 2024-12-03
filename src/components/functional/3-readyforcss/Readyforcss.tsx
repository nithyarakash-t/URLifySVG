import { useRef } from 'react';
import './Readyforcss.scss';

export function Readyforcss({input}:{readonly input:string}) {
    const textarea = useRef<HTMLTextAreaElement>(null);

    /**
     * Copy textarea value to clipboard
     */
    function copyToClipboard() {
        (textarea.current as HTMLTextAreaElement).select();
        (textarea.current as HTMLTextAreaElement).setSelectionRange(0, 99999); //mobile
        
        navigator.clipboard.writeText((input.length > 0 ? 'background-image: ' : '') + input + (input.length > 0 ? ';' : ''));
    }

    return (
        <section className="app-group" aria-labelledby="section_ready_title">
            <div className="app-group__head">
                <h2 className="app-group__title" id="section_ready_title">Ready for CSS:</h2>
                <a role='button' onClick={copyToClipboard} aria-label="Copy to clipboard">Copy</a>
            </div>
            <div className="app-group__body">
                <textarea ref={textarea} id="app_ready_texarea" name="app_ready_texarea" 
                defaultValue={(input.length > 0 ? 'background-image: ' : '') + input + (input.length > 0 ? ';' : '')} 
                spellCheck="false"></textarea>
            </div>
        </section>
    )
}