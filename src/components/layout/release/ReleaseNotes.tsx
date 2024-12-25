import { Link } from 'react-router-dom';
import './Releasenotes.scss';

export function ReleaseNotes() {
    return (
        <section className="app-releasenotes__wrap" aria-labelledby="app_releasenotes_title">
            <div className="app-container">
                <div className='app-releasenotes__head'>
                    {/* Test autofocus - may not work */}
                    <Link autoFocus to={'/'} className='app-releasenotes__back' aria-label="Back to home">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/></svg>
                    </Link>
                    <h2 className="app-releasenotes__title">Release Notes</h2>
                </div>
                <ol className="app-releasenotes__list">
                    <li>
                        <div className="app-releasenotes__group" role="group" aria-labelledby="releasenote_v_1.2">
                            <h3 id='releasenote_v_1.4'>Version 1.4 - 22.12.2024</h3>
                            <ul>
                                <li>Changed color scheme to only light and added dark theme via mix blend mode</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="app-releasenotes__group" role="group" aria-labelledby="releasenote_v_1.2">
                            <h3 id='releasenote_v_1.3'>Version 1.3 - 05.12.2024</h3>
                            <ul>
                                <li>Minor UI modifications</li>
                                <li>Accessibility enhancements</li>
                                <li>Implemented option drag and drop svg on to a dropzone -- BETA</li>
                                <li>v1.3.1 - Implemented dark mode using mix-blend-mode, added vercel analytics</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="app-releasenotes__group" role="group" aria-labelledby="releasenote_v_1.2">
                            <h3 id='releasenote_v_1.2'>Version 1.2 - 04.12.2024</h3>
                            <ul>
                                <li>Added favicon</li>
                                <li>Implemented option to choose external quote</li>
                                <li>Implemented option to load example</li>
                                <li>Implemented copy to clipboard option</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="app-releasenotes__group" role="group" aria-labelledby="releasenote_v_1.2">
                            <h3 id='releasenote_v_1.1'>Version 1.1 - 03.12.2024</h3>
                            <ul>
                                <li>Implemented decode</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="app-releasenotes__group" role="group" aria-labelledby="releasenote_v_1.1">
                            <h3 id='releasenote_v_1.1'>Version 1.0 - 02.12.2024</h3>
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