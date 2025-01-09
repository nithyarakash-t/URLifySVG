import { useRef, useState } from "react"
import './Themetoggle.scss';

export function Themetoggle() {
    const [darkTheme, setDarkTheme] = useState(false);
    const overlay = useRef<HTMLDivElement | null>(null);

    // function handleTransitionEnd() {
    //     const overlayNode = (overlay.current as HTMLElement);
    //     if(darkTheme) {
    //         overlayNode.classList.add('-square');
    //     }
    //     else {
    //         overlayNode.classList.remove('-square');
    //     }
    // }

    function toggle() {
        setDarkTheme(!darkTheme);
    }
    return (
        <>  
            <button type="button" className="cc-themetoggle__button" aria-controls="theme_switch"
            aria-label="Toggle theme" aria-expanded={darkTheme} onClick={toggle}>
            <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                    <mask className="moon" id="moon-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <circle cx="24" cy="10" r="6" fill="black" />
                    </mask>
                    <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
                    <g className="sun-beams" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </g>
                </svg>
            </button>
            <div ref={overlay} id="theme_switch" className={`cc-themetoggle__overlay ${darkTheme ? '-open' : ''}`}></div>
        </>
    )
}
