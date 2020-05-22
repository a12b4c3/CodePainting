/* CLASS OVERVIEW
 * tokenzier is responsible for taking in a string input from the user and
 * converting it to a series of tokens, to be processed by the parsers.
 *
 * sample user input (names are inconsequential for tokenization):
     star(x=12323 y=32139 w=392 h=3299).repeathorizontally(spacing=932 repeat=20)
     background(color= cyan)
     img(name = "handwaving" size=20 scale=0.5 )
 */

export * from 'Tokenizer';

export default class Tokenizer {

    program: string;  // string
    literals: any; // List<String>
    tokens: any; // String[]
    currentToken: number; // int
    static theTokenizer: any; // Tokenizer

    constructor(input, literalsList) {
        this.literals = literalsList;
        this.program = input; // input string from user
        this.tokenize();
    }

    tokenize() {
        //0. Pick some RESERVEDWORD (string which never occurs in your input) : we'll use _
        //1. Read the whole program into a single string; kill the newlines
        let tokenizedProgram = this.program.replace("\n", "");
        console.log(tokenizedProgram);
        //2. Replace all constant literals with “RESERVEDWORD”<the literal>“RESERVEDWORD”
        for(let s of this.literals) {
            tokenizedProgram = tokenizedProgram.replace(s, "_" + s + "_");
            console.log(tokenizedProgram);
        }
        //3. Replace all “RESERVEDWORDRESERVEDWORD” with just “RESERVEDWORD”
        tokenizedProgram = tokenizedProgram.replace("__","_");
        console.log(tokenizedProgram);
        //4. Remove leading “_” character, then split on “_”
        if(tokenizedProgram.length() > 0 && tokenizedProgram.charAt(0) === '_') {
            tokenizedProgram = tokenizedProgram.substring(1); // without first character
        }
        this.tokens = tokenizedProgram.split("_");
        console.log(this.tokens);
        //5. Trim whitespace around tokens (unless you want it)
        for (let i = 0; i < this.tokens.length; i++) {
            this.tokens[i] = this.tokens[i].trim();
        }
        console.log(this.tokens);
    }

    checkNext() {
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
        let s = this.checkNext();
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