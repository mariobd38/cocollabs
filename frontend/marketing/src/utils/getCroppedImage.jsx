export const getCroppedImage = (imageSrc, cropAreaPixels) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous"; // Avoid CORS issues
        image.src = imageSrc;

        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = cropAreaPixels.width;
            canvas.height = cropAreaPixels.height;

            ctx.drawImage(
                image,
                cropAreaPixels.x,
                cropAreaPixels.y,
                cropAreaPixels.width,
                cropAreaPixels.height,
                0,
                0,
                cropAreaPixels.width,
                cropAreaPixels.height
            );

            // Convert canvas to a Base64 image
            const croppedImage = canvas.toDataURL("image/jpeg");
            resolve(croppedImage);
        };

        image.onerror = (error) => reject(error);
    });
};
