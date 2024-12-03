import './Releasenotes.scss';

export function ReleaseNotes() {
    return (
        <section className="app-releasenotes__wrap" aria-labelledby="app_releasenotes_title">
            <div className="app-container">
                <h2 className="app-releasenotes__title">Release Notes</h2>
                <ol className="app-releasenotes__list">
                    <li>
                        <div className="app-releasenotes__group" role="group" aria-labelledby="releasenote_v_1.2">
                            <h3 id='releasenote_v_1.1'>Version 1.1 - 04.12.2024</h3>
                            <ul>
                                <li>Implemented decode</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="app-releasenotes__group" role="group" aria-labelledby="releasenote_v_1.1">
                            <h3 id='releasenote_v_1.1'>Version 1.0 - 03.12.2024</h3>
                            <ul>
                                <li>MVP deployed</li>
                                <li>Implemented Encode</li>
                                <li>Added multi colour background to vuew SVG</li>
                            </ul>
                        </div>
                    </li>
                </ol>
            </div>
        </section>
    )
}