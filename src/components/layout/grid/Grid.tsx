import { useEffect, useState } from "react";
import { Insert } from "../../functional/1-insert/Insert";
import { Encoded } from "../../functional/2-encoded/Encoded";
import { Readyforcss } from "../../functional/3-readyforcss/Readyforcss";
import { Demo } from "../../functional/4-demo/Demo";
import "./Grid.scss";

const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

export function Grid() {
    const [encodeInput, setEncodeInput] = useState('');
    // const [decodeInput, setDecodeInput] = useState('');

    const namespaced = addNameSpace(encodeInput);
    const escaped = encodeSVG(namespaced);
    const decodeInput = escaped;
    const resultCss = encodeInput.length === 0 ? '' : `url("data:image/svg+xml,${escaped}")`;

    useEffect(()=>{
       return () =>{

       }
    }, [encodeInput])

    /**Encode - start*/
    function handleEncodeChange(input:string) {
        setEncodeInput(input);
    }
    /**Encode - end */

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
                    <Encoded input={decodeInput}/>
                    <Readyforcss input={resultCss}/>
                    <Demo image={resultCss}/>
                </div>
            </div>
        </div>
    )
}

function addNameSpace (data:string) {
    if (data.indexOf(`http://www.w3.org/2000/svg`) < 0) {
      data = data.replace(/<svg/g, `<svg xmlns='http://www.w3.org/2000/svg'`);
    }
  
    return data;
}

function encodeSVG (data:string) {
    // Use single quotes instead of double to avoid encoding.
    data = data.replace(/"/g, `'`);
    // if (externalQuotesValue === `double`) {
    //   data = data.replace(/"/g, `'`);
    // } else {
    //   data = data.replace(/'/g, `"`);
    // }
  
    data = data.replace(/>\s{1,}</g, `><`);
    data = data.replace(/\s{2,}/g, ` `);

    // Using encodeURIComponent() as replacement function
    // allows to keep result code readable
    return data.replace(symbols, encodeURIComponent);
  }