import ElementBase from './ElementBase';


export default  class Drawer extends ElementBase {

    constructor(canvas) {

        super( canvas ).context = this.root.getContext('2d');
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

        this.root.width = image.naturalWidth,
        this.root.height = image.naturalHeight;

        this.draw( image );
    }

    clear() {

        this.context.clearRect(0, 0, this.root.width, this.root.height);

        this.root.width = this.root.height = 0;
    }
}
