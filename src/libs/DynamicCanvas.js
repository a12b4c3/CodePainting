class DynamicCanvas {
    _canvas;
    _context;
    _canvasWidth;
    _canvasHeight;

    constructor() {
        if (!DynamicCanvas.instance) {
            this._canvasWidth = parseInt(document.getElementById('canvas').getAttribute('width'))
            this._canvasHeight = parseInt(document.getElementById('canvas').getAttribute('height'));
            this._canvas = document.createElement('canvas');
            this._canvas.width = this._canvasWidth;
            this._canvas.height = this._canvasHeight;
            this._context = this._canvas.getContext('2d');
            DynamicCanvas.instance = this;
        }
        return DynamicCanvas.instance;
    }

    getDCanvas() {
        if (!DynamicCanvas.instance) {
            DynamicCanvas.instance = new DynamicCanvas();
        }
        return DynamicCanvas.instance;
    }

    getDContext() {
        if (!DynamicCanvas.instance) {
            DynamicCanvas.instance = new DynamicCanvas();
        }
        return DynamicCanvas.instance._context;
    }

    clearDContext() {
        this._context.clearRect(0,0,this._canvasWidth, this._canvasHeight);
    }

    mergeToCanvas(dstContext, xoffset, yoffset) {
        let x = 0;
        let y = 0;
        if (!xoffset===undefined) {x = xoffset;}
        if (!yoffset===undefined) {y= yoffset;}
        dstContext.drawImage(this._canvas, x, y);
    }

    cloneCanvas(oldCanvas) {
        let newCanvas = document.createElement('canvas');
        let newContext = newCanvas.getContext('2d');

        newCanvas.width = oldCanvas.width;
        newCanvas.height = oldCanvas.height;

        newContext.drawImage(oldCanvas, 0, 0);
        return newCanvas;
    }


}

const dynamicCanvas = new DynamicCanvas();
Object.freeze(dynamicCanvas);
export default dynamicCanvas;