import "./Insert.scss";

export function Insert() {
    return (
        <section className="app-group" aria-labelledby="section_insert_title">
            <div className="app-group__head">
                <h2 className="app-group__title" id="section_insert_title">Insert SVG:</h2>
                <a href="#"></a>
            </div>
            <div className="app-group__body">
                <textarea id="app_insert_svg" name="app_insert_svg" spellCheck="false"></textarea>
            </div>
        </section>
    )
}