/**
 * Created by wangvic on 2018/6/19.
 * 多维数组实现
 *
 * usage: var ndarr = new NDArray([3, 3, 3, 3]);
 *
 * todo: 实现类似numpy.ndarray
 */

function makeArray(arr, shape, depth) {
    depth = depth || 0;
    for(var i = 0; i < shape[depth]; i++) {
        if(depth == shape.length-1) {
            arr[i] = undefined;
        } else {
            arr[i] = new Array(shape[depth+1]);
            makeArray(arr[i], shape, depth+1);
        }
    }
}

function inheritPrototype(subType, superType) {
    var prototype = Object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function NDArray(shape) {
    makeArray(this, shape);
    this.shape = shape;
};
inheritPrototype(NDArray, Array);

NDArray.prototype.ndim = function () {
    return this.shape.length;
};

NDArray.prototype.size = function () {
    var prod = 1;
    for(var i = 0; i < this.shape.length; i++)
        prod *= this.shape[i];
    return prod;
};

NDArray.prototype.T = function () {
    //
};