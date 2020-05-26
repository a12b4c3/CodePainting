class TokenizerUtils {
    /* param:
     *  inputString (String): the string to perform regex search on
     *  searchFor (String): the string to look for
     * returns:
     *  a new string where all searchFor elements are prefix and postfixed
     *  with underscores.
     */
    static markAllLiteral(inputString, searchFor) {
        let re = new RegExp(searchFor, 'g');
        return inputString.replace(re, "_" + searchFor + "_");
    }

    static replaceAll(inputString, searchFor, replaceWith) {
        let re = new RegExp(searchFor, 'g');
        return inputString.replace(re, replaceWith);
    }
}

export default TokenizerUtils;