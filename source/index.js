import { read, imageOf, QRCodeOf, squareOf } from './utility';

import Drawer from './Drawer';


const drawer = new Drawer('canvas');

// Load image

const form = document.querySelector('form');

form.image.onchange = async function () {

    const image = this.files[0];

    if ( image )
        drawer.drawBackground(await imageOf(await read( image )));
    else
        drawer.clear();
};

// Select area

const output = document.querySelectorAll('form [readonly]'), rect = [ ];

drawer.canvas.onmousedown = event => {

    rect[0] = output[0].value = drawer.coordOf( event );

    rect[1] = null;
};

drawer.canvas.onmouseup = drawer.canvas.onmouseout = event => {

    if (rect[0] && !rect[1])
        rect[1] = output[1].value = drawer.coordOf( event );
};

// Print QRCode

form.onsubmit = async function (event) {

    event.preventDefault();

    const image = await imageOf( QRCodeOf( this.URL.value ) );

    if (rect.length < 2)  return drawer.draw( image );

    const square = squareOf( rect );

    drawer.draw(
        image,
        square[0][0],
        square[0][1],
        square[1][0] - square[0][0],
        square[1][1] - square[0][1]
    );
};

form.onreset = () => {

    drawer.clear();

    rect.length = 0;

    for (let field  of  Array.from( form.elements ))  field.disabled = false;
};

// Preset parameters

(async () => {

    const parameter = new URLSearchParams( location.search );

    const image = parameter.get('image'),
          start = parameter.get('start'),
          end = parameter.get('end');

    if ( image ) {

        drawer.drawBackground(await imageOf( image ));

        form.image.disabled = true;
    }

    if ( start ) {

        form.start.value = rect[0] = start.split(',');

        rect[0][0] = +rect[0][0],  rect[0][1] = +rect[0][1];

        form.start.disabled = true;
    }

    if ( end ) {

        form.end.value = rect[1] = end.split(',');

        rect[1][0] = +rect[1][0],  rect[1][1] = +rect[1][1];

        form.end.disabled = true;
    }
})();
