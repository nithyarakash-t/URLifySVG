import { Insert } from "../../functional/1-insert/Insert";
import { Encoded } from "../../functional/2-encoded/Encoded";
import { Readyforcss } from "../../functional/3-readyforcss/Readyforcss";
import { Demo } from "../../functional/4-demo/Demo";
import "./Grid.scss";

export function Grid() {
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
                    <Insert/>
                    <Encoded/>
                    <Readyforcss/>
                    <Demo/>
                </div>
            </div>
        </div>
    )
}