/**
 * Created by wangvic on 2018/7/14.
 */

function IndexMinPQ(maxN, compare = null) {
    this.compare = compare;
    this.N = 0;                     // number of elements on PQ
    this.pq = new Array[maxN+1];    // binary heap using 1-based indexing
    this.qp = new Array[maxN+1];    // inverse of pq - qp[pq[i]] = pq[qp[i]] = i
    this.keys = new Array[maxN+1];  // keys[i] = priority of i
    for(var i = 0; i < maxN+1; i++) {
        this.qp[i] = -1;
    }
}

IndexMinPQ.prototype.empty = function () {
    return this.N == 0;
};

IndexMinPQ.prototype.size = function () {
    return this.N;
};

IndexMinPQ.prototype.contains = function (i) {
    return this.qp[i] != -1;
};

IndexMinPQ.prototype.insert = function (i, key) {
    if(!this.contains(i)) {
        this.N++;
        this.qp[i] = this.N;
        this.pq[this.N] = i;
        this.keys[i] = key;
        this._swim(this.N);
    }
};

IndexMinPQ.prototype.minIndex = function () {
    if(this.N == 0) return -1;
    return this.pq[1];
};

IndexMinPQ.prototype.minKey = function () {
    if(this.N == 0) return null;
    return this.keys[this.pq[1]];
};

IndexMinPQ.prototype.delMin = function () {
    var min = this.pq[1];
    this._exch(1, this.N--);
    this._sink(1);

    this.qp[min] = -1;
    this.keys[min] = null;
    this.pq[this.N+1] = -1;
    return min;
};

IndexMinPQ.prototype.changeKey = function (i, key) {
    this.keys[i] = key;
    this._swim(this.qp[i]);
    this._sink(this.qp[i]);
};

IndexMinPQ.prototype.delete = function (i) {
    var index = this.qp[i];
    this._exch(index, this.N--);
    this._swim(index);
    this._sink(index);
    this.keys[i] = null;
    this.qp[i] = -1;
};

/**
 * Helper Functions
 */

/**
 * 交换元素
 * @param i
 * @param j
 */
IndexMinPQ.prototype._exch = function (i, j) {
    var t = this.pq[i]; this.pq[i] = this.pq[j]; this.pq[j] = t;
    this.qp[this.pq[i]] = i;
    this.qp[this.pq[j]] = j;
};

/**
 * 上浮
 * @param k
 */
IndexMinPQ.prototype._swim = function (k) {
    while(k > 1 && this._greater(k >> 1, k)) {
        this._exch(k>>1, k);
        k >>= 1;
    }
};

/**
 * 下沉
 * @param k
 */
IndexMinPQ.prototype._sink = function (k) {
    while(2*k <= this.N) {
        var j = 2*k;
        if(j < this.N && this._greater(j, j+1)) j++;
        if(!this._greater(k, j)) break;
        this._exch(k, j);
        k = j;
    }
};

IndexMinPQ.prototype._greater = function (i, j) {
    if(this.compare == null) {
        return this.keys[this.pq[i]] > this.keys[this.pq[j]];
    } else {
        return this.compare(this.keys[this.pq[i]], this.keys[this.pq[j]]) > 0;
    }
};