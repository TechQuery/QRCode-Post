import { read, imageOf, QRCodeOf, squareOf } from './utility';

import Drawer from './Drawer';

import DragSelector from './DragSelector';


const drawer = new Drawer('canvas');

// Load image

const form = document.querySelector('form');

form.image.onchange = async function () {

    const image = this.files[0];

    if ( image )
        drawer.drawBackground(await imageOf(await read( image )));
    else
        drawer.clear(), form.reset();
};

// Select area

const output = document.querySelectorAll('form [readonly]');

const selector = new DragSelector(
    'canvas',
    coord  =>  output[0].value = coord,
    coord  =>  output[1].value = coord
);

// Print QRCode

form.onsubmit = async function (event) {

    event.preventDefault();

    const image = await imageOf( QRCodeOf( this.URL.value ) );

    if (selector.rect.length < 2)  return drawer.draw( image );

    const square = squareOf( selector.rect );

    drawer.draw(
        image,
        square[0][0],
        square[0][1],
        square[1][0] - square[0][0],
        square[1][1] - square[0][1]
    );
};

form.onreset = () => {

    drawer.clear(), selector.clear();

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

        form.start.value = selector.select(0, ...start.split(','));

        form.start.disabled = true;
    }

    if ( end ) {

        form.end.value = selector.select(1, ...end.split(','));

        form.end.disabled = true;
    }
})();
