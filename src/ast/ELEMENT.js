
import ART from "./ART.js";
import IMG from "./IMG.js";
import TEXT from "./TEXT.js";
import BACKGROUND from "./BACKGROUND.js";



class ELEMENT{
    getELE(element) {
        if(element === "art"){
            return new ART();
        } else if(element === "img"){
            return new IMG();
        } else if (element === "text"){
            return new TEXT();
        } else if (element === "background") {
            return new BACKGROUND();
        } else {
            throw new Error("invalid inputs " + element);
        }
    }
}

export default ELEMENT;