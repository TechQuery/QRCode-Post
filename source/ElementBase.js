export default  class ElementBase {

    constructor(root) {

        if (this.constructor === ElementBase)
            throw  new TypeError('"ElementBase" is an Abstract class');

        this.root = (root instanceof Element)  ?
            root  :  document.querySelector( root );
    }

    on(event, handler) {

        this.root.addEventListener(event, handler);

        return this;
    }
}
