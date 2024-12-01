import { useState } from "react";
import "./Demo.scss";

export function Demo() {
    const [background, setBackground] = useState('#fff');

    function changeBackground(color:string) {
        setBackground(color)
    }
    
    return (
        <section className="app-group" aria-labelledby="section_demo_title">
        <div className="app-group__head">
            <h2 className="app-group__title" id="section_demo_title">Demo:</h2>
            <fieldset className="app-demo__btnswrap" role="group">
                <legend>Background:</legend>

                <label className="app-demo__radio">
                    <input type="radio" name="app_demo_background" id="white" checked={background==='#fff'}
                    onChange={()=>changeBackground('#fff')}/>
                    <span className="sr-only">White</span>
                </label>
                <label className="app-demo__radio">
                    <input type="radio" name="app_demo_background" id="silver" checked={background==='#c0c0c0'}
                    onChange={()=>changeBackground('#c0c0c0')}/>
                    <span className="sr-only">Silver</span>
                </label>
                <label className="app-demo__radio">
                    <input type="radio" name="app_demo_background" id="black" checked={background==='#000'}
                    onChange={()=>changeBackground('#000')}/>
                    <span className="sr-only">Black</span>
                </label>
            </fieldset>
        </div>
        <div className="app-group__body">
            <div className="app-demo__block" style={{backgroundColor: background}}></div>
        </div>
    </section>
    )
}