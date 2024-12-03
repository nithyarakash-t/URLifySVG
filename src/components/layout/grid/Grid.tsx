import { useState } from "react";
import { Insert } from "../../functional/1-insert/Insert";
import { Encoded } from "../../functional/2-encoded/Encoded";
import { Readyforcss } from "../../functional/3-readyforcss/Readyforcss";
import { Demo } from "../../functional/4-demo/Demo";
import { addNameSpace, encodeSVG } from "./helpers";
import "./Grid.scss";

export function Grid() {
    const [encodeInput, setEncodeInput] = useState('');
    const [decodeInput, setDecodeInput] = useState('');

    const resultCss = encodeInput.length === 0 ? '' : `url("data:image/svg+xml,${decodeInput}")`;

    // useEffect(()=>{
    //    return () =>{
    //    }
    // }, [encodeInput, decodeInput])

    /**Encode - start*/
    function handleEncodeChange(input:string) {
        setEncodeInput(input);

        const namespaced = addNameSpace(input);
        const escaped = encodeSVG(namespaced);
        setDecodeInput(escaped);
    }
    /**Encode - end */

    /**Decode - start */
    function handleDecodeChange(input:string) {
        setDecodeInput(input);

        const value = input.trim()
        .replace(/background-image:\s{0,}url\(/, ``)
        .replace(/["']{0,}data:image\/svg\+xml,/, ``)
        .replace(/["']\);{0,}$/, ``);

        setEncodeInput(decodeURIComponent(value));
    }
    /**Decode - end */

    return (
        <div className="app-main__wrap">
            <div className="app-container">
                <div className="app-main__head">
                    {/* <div className="app-main__quoteselection" role="group" aria-labelledby="app_main_quoteselection_title">
                        <p id="app_main_quoteselection_title">External quotes:</p>

                        //change to radio
                        <a href="#" className="app-main__quotelink">single</a>
                        <a href="#" className="app-main__quotelink">double</a>
                    </div> */}
                </div>
                <div className="app-main__grid">
                    <Insert input={encodeInput} handlerFunction={handleEncodeChange}/>
                    <Encoded input={decodeInput} handlerFunction={handleDecodeChange}/>
                    <Readyforcss input={resultCss}/>
                    <Demo image={resultCss}/>
                </div>
            </div>
        </div>
    )
}
