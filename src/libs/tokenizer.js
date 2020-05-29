// Acknowledgment: referred from the Tokenizer code from class
/* CLASS OVERVIEW
 * tokenzier is responsible for taking in a string input from the user and
 * converting it to a series of tokens, to be processed by the parsers.
 *
 * sample user input (names are inconsequential for tokenization):
     star(x=12323 y=32139 w=392 h=3299).repeathorizontally(spacing=932 repeat=20)
     background(color= cyan)
     img(name = "handwaving" size=20 scale=0.5 )
 */

import TokenizerUtils from "./TokenizerUtils.js";

class Tokenizer {

    program;  // string
    literals; // List<String>
    tokens; // String[]
    currentToken; // int
    static theTokenizer; // Tokenizer

    constructor(input, literalsList) {
        this.currentToken = 0;
        this.literals = literalsList;
        this.program = input; // input string from user
        this._tokenize();
    }

    _tokenize() {
        //0. Pick some RESERVEDWORD (string which never occurs in your input) : we'll use _
        //1. Read the whole program into a single string; kill the newlines
        // keeping newlines.
        // let tokenizedProgram = this.program;
        let tokenizedProgram = TokenizerUtils.replaceAll(this.program, "\n", "@");
        console.log(tokenizedProgram);
        //2. Replace all constant literals with “RESERVEDWORD”<the literal>“RESERVEDWORD”
        for(let s of this.literals) {
            tokenizedProgram = TokenizerUtils.markAllLiteral(tokenizedProgram, s);
            console.log(tokenizedProgram);
        }
        //3. Replace all “RESERVEDWORDRESERVEDWORD” with just “RESERVEDWORD”
        tokenizedProgram = tokenizedProgram.replace(/ /g, "");
        tokenizedProgram = tokenizedProgram.replace(/\\/g, "");
        tokenizedProgram = tokenizedProgram.replace(/@{1,}/g, "@");
        // tokenizedProgram = TokenizerUtils.replaceAll(tokenizedProgram, "__","_");
        tokenizedProgram = tokenizedProgram.replace(/_{1,}/g, "_");
        console.log(tokenizedProgram);
        //4. Remove leading “_” character, then split on “_”
        if(tokenizedProgram.length > 0 && tokenizedProgram.charAt(0) === '_') {
            tokenizedProgram = tokenizedProgram.substring(1, tokenizedProgram.length-1); // without first character
        }
        this.tokens = tokenizedProgram.split("_");
        console.log(this.tokens);
        //5. Trim whitespace around tokens (unless you want it)
        for (let i = 0; i < this.tokens.length; i++) {
            this.tokens[i] = this.tokens[i].trim();
        }
        //6. add a line terminator for the last line
        this.tokens.push("@");
        console.log(this.tokens);
    }

    _checkNext() {
        let token = "";
        if (this.currentToken < this.tokens.length){
            token = this.tokens[this.currentToken];
        }
        else
            token = "NO_MORE_TOKENS";
        return token;
    }

    getNext() {
        let token = "";
        if (this.currentToken < this.tokens.length){
            token = this.tokens[this.currentToken];
            this.currentToken ++;
        }
        else
            token = "UNDEFINED TOKEN";
        return token;
    }

    checkToken(regexp) {
        let s = this._checkNext();
        console.log("comparing: |" + s + "|  to  |" + regexp + "|");
        return s === regexp;
    }

    getAndCheckNext(regexp) {
        let s = this.getNext();
        if (s !== regexp) {
            throw new Error("Unexpected next token for Parsing! Expected something matching: " + regexp + " but got: " + s);
        }
        console.log("matched: " + s + "  to  " + regexp);
        return s;
    }

    moreTokens() {
        return this.currentToken < this.tokens.length;
    }

    static makeTokenizer(filename, literals) {
        if (this.theTokenizer === undefined){
            this.theTokenizer = new Tokenizer(filename,literals);
        }
    }

    static getTokenizer() {
        return this.theTokenizer;
    }

}

export default Tokenizer;