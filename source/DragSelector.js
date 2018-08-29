import ElementBase from './ElementBase';


export default  class DragSelector extends ElementBase {

    constructor(image, onStart, onEnd) {

        super( image ).rect = [ ];

        const endBack = event => {

            if (this.rect[0] && !this.rect[1])
                onEnd(this.rect[1] = this.coordOf( event ));
        };

        this.on('mousedown',  event => {

            onStart(this.rect[0] = this.coordOf( event ));

            this.rect[1] = null;

        }).on('mouseup', endBack).on('mouseout', endBack);
    }

    coordOf(event) {

        return [
            event.clientX - this.root.offsetLeft,
            event.clientY - this.root.offsetTop
        ];
    }

    clear() {  this.rect.length = 0;  }

    select(type, x, y) {  return this.rect[type] = [+x, +y];  }
}
