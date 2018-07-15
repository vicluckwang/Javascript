/**
 * Created by wangvic on 2018/7/14.
 * 最大优先队列
 */

function MaxPQ(compare = null) {
    this.pq = [];
    this.compare = compare;
    this.N = 0;
}

/**
 * 是否为空
 * @returns {boolean}
 */
MaxPQ.prototype.isEmpty = function () {
    return this.N == 0;
};

/**
 * 队列长度
 * @returns {number}
 */
MaxPQ.prototype.size = function () {
    return this.N;
};

/**
 * 加入队列
 * @param v
 */
MaxPQ.prototype.insert = function (v) {
    this.pq[++this.N] = v;
    this._swim(this.N);
};

/**
 * 推出队列，返回最大（小）值
 * @returns {*}
 */
MaxPQ.prototype.delMax = function () {
    var max = this.pq[1];
    this._exch(1, this.N--);
    this._sink(1);
    this.pq[this.N+1] = undefined;
    return max;
};

/////////////////////////////////////////////////
/**
 * Helper Functions
 */

/**
 * 交换元素
 * @param i
 * @param j
 */
MaxPQ.prototype._exch = function (i, j) {
    var t = this.pq[i]; this.pq[i] = this.pq[j]; this.pq[j] = t;
};

/**
 * 上浮
 * @param k
 */
MaxPQ.prototype._swim = function (k) {
    while(k > 1 && this._less(k >> 1, k)) {
        this._exch(k>>1, k);
        k >>= 1;
    }
};

/**
 * 下沉
 * @param k
 */
MaxPQ.prototype._sink = function (k) {
    while(2*k <= this.N) {
        var j = 2*k;
        if(j < this.N && this._less(j, j+1)) j++;
        if(!this._less(k, j)) break;
        this._exch(k, j);
        k = j;
    }
};

MaxPQ.prototype._less = function (i, j) {
    if(this.compare == null) {
        return this.pq[i] < this.pq[j];
    } else {
        return this.compare(this.pq[i], this.pq[j]) < 0;
    }
};