import { JSDOM } from "jsdom";

const  { window } = new JSDOM(

    (
    <div>
        <button id="button-clicker">Click !!!</button>
        <div id="counter">0</div>
    </div>
    )

);

global.document = window.document;