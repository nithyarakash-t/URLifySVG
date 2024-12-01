import './Releasenotes.scss';

export function ReleaseNotes() {
    return (
        <section className="app-releasenotes__wrap" aria-labelledby="app_releasenotes_title">
            <div className="app-container">
                <h2 className="app-releasenotes__title">Release Notes</h2>
                <ol className="app-releasenotes__list">
                    <li>
                        <div className="app-releasenotes__group" role="group" aria-labelledby="">
                            <h3>Version 1.1 - 06.12.2024</h3>
                            <ul>
                                <li>Implemented basic functionalitites</li>
                                <li>MVP deployed</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="app-releasenotes__group" role="group" aria-labelledby="">
                            <h3>Version 1.0 - 03.12.2024</h3>
                            <ul>
                                <li>Implemented basic functionalitites</li>
                                <li>MVP deployed</li>
                            </ul>
                        </div>
                    </li>
                </ol>
            </div>
        </section>
    )
}