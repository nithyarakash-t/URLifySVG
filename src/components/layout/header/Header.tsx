import { Link } from "react-router-dom";
import './Header.scss';

export function Header() {
    return (
        <header className="app-header__wrap">
            <div className="app-container">
                <div className="app-header__inner">
                    <Link to={'/'} className="app-header__title" aria-label='Home - Urlifysvg'>Urlifysvg</Link>
                </div>
            </div>
        </header>
    )
}