// Utility

function read(file) {

    const reader = new FileReader();
    
    return  new Promise((resolve, reject) => {
        
        reader.onload = () => resolve( reader.result );
        
        reader.onerror = reject;
        
        reader.readAsDataURL( file );
    });
}

function imageOf(URI) {
    
    const image = new Image();
    
    return  new Promise((resolve, reject) => {
        
        image.onload = () => resolve( image ), image.onerror = reject;
        
        image.src = URI;
    });
}

function QRCodeOf(raw) {

    const code = qrcode(0, 'H');
    
    code.addData( raw );

    code.make();

    return code.createDataURL();
}

function squareOf(rect) {
    
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

// Canvas

const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d'), offset = canvas.getBoundingClientRect();

function drawBackground(image) {

    canvas.width = image.naturalWidth, canvas.height = image.naturalHeight;

    context.drawImage(image, 0, 0);
}

function coordOf(event) {
    
    return [
        event.clientX - offset.left,
        event.clientY - offset.top
    ];
}

// Load image

document.querySelector('input[type="file"]').onchange = async function () {

    drawBackground(await imageOf(await read( this.files[0] )))
};

// Select area

const output = document.querySelectorAll('form [readonly]'), rect = [ ];

canvas.onmousedown = event => {
    
    output[0].value = rect[0] = coordOf( event );
    
    rect[1] = null;
};

canvas.onmouseup = canvas.onmouseout = event => {
    
    if (rect[0] && !rect[1])
        output[1].value = rect[1] = coordOf( event );
};

// Print QRCode

const form = document.querySelector('form'),
      input = document.querySelector('input[type="url"]');

form.onsubmit = async event => {
    
    event.preventDefault();
    
    const image = await imageOf( QRCodeOf( input.value ) );
    
    if (rect.length < 2)  return context.drawImage(image, 0, 0);
    
    const square = squareOf( rect );

    context.drawImage(
        image,
        square[0][0],
        square[0][1],
        square[1][0] - square[0][0],
        square[1][1] - square[0][1]
    );
};

form.onreset = () => {
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    rect.length = canvas.width = canvas.height = 0;
};