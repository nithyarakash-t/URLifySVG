import './Footer.scss';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className='app-footer__wrap'>
            <div className='app-container'>
                <div className='app-footer__inner'>
                    <a href='https://github.com/Nithyarakash-t/URLifySVG' target='_blank' aria-label='Project on Github' title='Project on Github'>Project on Github</a>
                    <div className='app-footer__right'>
                        <Link to={'/releasenotes'} aria-label='Release Notes'>Release Notes</Link>
                        <p>version v1.0</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}