export default  class Drawer {

    constructor(canvas) {

        this.canvas = (canvas instanceof Element)  ?
            canvas  :  document.querySelector( canvas );

        this.context = this.canvas.getContext('2d');
    }

    draw(image, x, y, width, height) {

        this.context.drawImage(
            image,
            x || 0,
            y || 0,
            width || image.naturalWidth,
            height || image.naturalHeight
        );
    }

    drawBackground(image) {

        this.canvas.width = image.naturalWidth,
        this.canvas.height = image.naturalHeight;

        this.draw( image );
    }

    coordOf(event) {

        return [
            event.clientX - this.canvas.offsetLeft,
            event.clientY - this.canvas.offsetTop
        ];
    }

    clear() {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.canvas.width = this.canvas.height = 0;
    }
}
