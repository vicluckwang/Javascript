/**
 * Created by wangvic on 2018/7/14.
 * 最小优先队列
 */

function MinPQ(compare = null) {
    this.pq = [];
    this.compare = compare;
    this.N = 0;
}

/**
 * 是否为空
 * @returns {boolean}
 */
MinPQ.prototype.isEmpty = function () {
    return this.N == 0;
};

/**
 * 队列长度
 * @returns {number}
 */
MinPQ.prototype.size = function () {
    return this.N;
};

/**
 * 加入队列
 * @param v
 */
MinPQ.prototype.insert = function (v) {
    this.pq[++this.N] = v;
    this._swim(this.N);
};

/**
 * 推出队列，返回最大（小）值
 * @returns {*}
 */
MinPQ.prototype.delMin = function () {
    var min = this.pq[1];
    this._exch(1, this.N--);
    this._sink(1);
    this.pq[this.N+1] = undefined;
    return min;
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
MinPQ.prototype._exch = function (i, j) {
    var t = this.pq[i]; this.pq[i] = this.pq[j]; this.pq[j] = t;
};

/**
 * 上浮
 * @param k
 */
MinPQ.prototype._swim = function (k) {
    while(k > 1 && this._greater(k >> 1, k)) {
        this._exch(k>>1, k);
        k >>= 1;
    }
};

/**
 * 下沉
 * @param k
 */
MinPQ.prototype._sink = function (k) {
    while(2*k <= this.N) {
        var j = 2*k;
        if(j < this.N && this._greater(j, j+1)) j++;
        if(!this._greater(k, j)) break;
        this._exch(k, j);
        k = j;
    }
};

/**
 * 是否大于
 * @param i
 * @param j
 * @return {boolean}
 * @private
 */
MinPQ.prototype._greater = function (i, j) {
    if(this.compare == null) {
        return this.pq[i] > this.pq[j];
    } else {
        return this.compare(this.pq[i], this.pq[j]) > 0;
    }
};

