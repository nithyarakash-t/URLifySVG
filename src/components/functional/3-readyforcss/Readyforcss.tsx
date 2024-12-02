import './Readyforcss.scss';

export function Readyforcss({input}:{readonly input:string}) {
    return (
        <section className="app-group" aria-labelledby="section_ready_title">
            <div className="app-group__head">
                <h2 className="app-group__title" id="section_ready_title">Ready for CSS:</h2>
                {/* <a href="#" aria-label="Copy to clipboard">Copy</a> */}
            </div>
            <div className="app-group__body">
                <textarea id="app_ready_texarea" name="app_ready_texarea" defaultValue={input} spellCheck="false"></textarea>
            </div>
        </section>
    )
}