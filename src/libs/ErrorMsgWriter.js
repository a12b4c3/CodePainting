function _ThrowInvalidParameterError(element, invalidParam) {
    throw Error("Invalid " + element + "parameter -> " + invalidParam);
}

export function ThrowInvalidArtParameterError(invalidParam) {
    _ThrowInvalidParameterError("Art", invalidParam);
}

export function ThrowInvalidImgParameterError(invalidParam) {
    _ThrowInvalidParameterError("Img", invalidParam);
}

export function ThrowInvalidTextParameterError(invalidParam) {
    _ThrowInvalidParameterError("Text", invalidParam);
}