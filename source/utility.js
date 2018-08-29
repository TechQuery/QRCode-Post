export function read(file) {

    const reader = new FileReader();

    return  new Promise((resolve, reject) => {

        reader.onload = () => resolve( reader.result );

        reader.onerror = reject;

        reader.readAsDataURL( file );
    });
}


export function imageOf(URI) {

    const image = new Image();

    return  new Promise((resolve, reject) => {

        image.onload = () => resolve( image ), image.onerror = reject;

        image.src = URI;
    });
}


export function QRCodeOf(raw) {

    const code = qrcode(0, 'H');

    code.addData( raw );

    code.make();

    return code.createDataURL();
}


export function squareOf(rect) {

    const size = [rect[1][0] - rect[0][0],  rect[1][1] - rect[0][1]];

    const square = [rect[0]];

    square[1] = (
        size[0] < size[1]
    ) ? [
        rect[1][0], rect[0][1] + size[0]
    ] : [
        rect[0][0] + size[1],  rect[1][1]
    ];

    return square;
}
