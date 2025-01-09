import { releaseNotes } from '../release/release-notes';
import './Footer.scss';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className='app-footer__wrap'>
            <div className='app-container'>
                <div className='app-footer__inner'>
                    <a href='https://github.com/Nithyarakash-t/URLifySVG' target='_blank' title='View the Project on Github'>Project on Github</a>
                    <a href='https://github.com/yoksel/url-encoder/' target='_blank' aria-label='Inspired by this vanilla JS project from Yoksel'>Inspired from Yoksel</a>
                    <div className='app-footer__right'>
                        <Link to={'/releasenotes'} aria-label='Release Notes'>Release Notes</Link>
                        <p>version v{releaseNotes[0].version}</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}