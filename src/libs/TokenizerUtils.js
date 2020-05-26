class TokenizerUtils {
    static markAllLiterals(inputString, searchFor) {
        let re = new RegExp(searchFor, 'g');
        return inputString.replace(re, "_" + searchFor + "_");
    }

    static replaceAll(inputString, searchFor, replaceWith) {
        let re = new RegExp(searchFor, 'g');
        return inputString.replace(re, replaceWith);
    }
}

export default TokenizerUtils;