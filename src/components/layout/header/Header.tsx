import { Link } from "react-router-dom";
import './Header.scss';
import React, { useState } from "react";

const links = [
    //https://www.reddit.com/r/svg/comments/1cb2ppc/list_of_best_websites_for_downloading_free_svgs/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
    {
        name: 'Lucide',
        link: 'https://lucide.dev/icons'
    },
    {
        name: 'svgl - logos',
        link: 'https://svgl.app'
    },
    {
        name: 'Undraw',
        link: 'https://undraw.co'
    },
    {
        name: 'Tabler icons',
        link: 'https://tablericons.com/'
    },
    {
        name: 'Flowbite',
        link: 'https://flowbite.com/icons/'
    },
    {
        name: 'OpensourceSVGIcons',
        link: 'https://opensourcesvgicons.com/'
    },
    {
        name: 'Iconfinder',
        link: 'https://www.iconfinder.com/icons'
    },
    {
        name: 'SVG repo',
        link: 'https://www.svgrepo.com'
    },
    {
        name: 'SVG backgrounds',
        link: 'https://www.svgbackgrounds.com'
    },
    {
        name: 'UXwing',
        link: 'https://uxwing.com/'
    },
]

const applications = [
    // { "name": "background-image" },
    // { "name": "mask-image" },
    // { "name": "border-image" },
    // { "name": "content (in ::before and ::after)" },
    { "name": "cursor" },
    { "name": "list-style-image" },
    { "name": "clip-path" },
    { "name": "filter" },
    { "name": "shape-outside" },
    { "name": "mask" },
    { "name": "fill (in SVG)" },
    { "name": "stroke (in SVG)" },
    { "name": "image()" },
    { "name": "cross-fade()" },
    { "name": "image-set()" },
    { "name": "@import" },
    { "name": "offset-path" },
    { "name": "src (in @font-face for SVG fonts)" },
    { "name": "paint() (CSS Houdini, experimental)" }
  ];

export function Header() {
    const [openDetails, setOpenDetails] = useState<string | null>(null);

    /**Close the active details element if the other one is being opened */
    const handleToggle = (id: string) => {
        setOpenDetails((prev:string | null) => (prev === id ? null : id));
    };

    return (
        <header className="app-header__wrap">
            <div className="app-container">
                <div className="app-header__inner">
                    <Link to={'/'} className="app-header__title" aria-label='Home - Urlifysvg'>Urlifysvg</Link>
                    <div className="app-header__right">
                        <details className="app-info__details"
                            id="details-resources"
                            open={openDetails === 'details-resources'}
                            onToggle={() => handleToggle('details-resources')}>
                            <summary id="resources" title={'Resources'}>
                                <span className="sr-only">Resources</span>
                            </summary>
                            <div className="app-info__accordion">
                                <h3>Sites that offer free SVGs</h3>
                                <ul>
                                    {
                                        links.map((item)=>
                                            <li key={item.name}>
                                                <Link to={item.link} target="_blank" aria-label={item.name} title={item.name}>{item.name}</Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </details>
                        <details className="app-info__details"
                            id="details-info"
                            open={openDetails === 'details-info'}
                            onToggle={() => handleToggle('details-info')}>
                            <summary id="about" title={'About'}>
                                <span className="sr-only">About</span>
                            </summary>
                            <div className="app-info__accordion">
                                <h3>What is URLifySVG</h3>
                                <p>
                                    URLifySVG is a tool that can encode SVG to URL / decode URL back to SVG. 
                                    Encoded URL's can be used in <code>background-image</code>, <code>border-image</code>, <code>mask-image</code>, <code>content</code> etc.
                                    The tool uses browser's local storage to allow you to store and reuse valid conversions.
                                </p>
                                <p>
                                    Have any functional, ui/ux, accessibility requests ?
                                    <br/>
                                    Found bugs or facing conversion failures?
                                    <br/>
                                    Help the site improve by submitting issues in Github &#10084;
                                </p>
                                <p>     
                                    PS: Few lesser used applications include {
                                        applications.map((item, index)=>{
                                            return <React.Fragment key={item.name}>
                                                <code>{item.name}</code>{
                                                    index === applications.length - 1 ? '.' : ', '
                                                }    
                                            </React.Fragment>
                                        })
                                    }
                                </p> 
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </header>
    )
}
/**
 * Nucleo core icons
nappy
supa palette
 */