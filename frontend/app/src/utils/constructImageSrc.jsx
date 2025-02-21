function constructImageSrc (base64Data, type) {
    return `data:${type};base64,${base64Data}`;
}

export {constructImageSrc};

