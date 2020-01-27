var Rando = (function (r) {
    /* module for custom random functions */


    var Choice = function (arr) {
        /* accepts an array (arr) of items.
        returns a random choice from that array */
        this.len = arr.length;
        this.arr = arr;
        return this;
    };

    Choice.prototype.get = function () {
        let current = Math.floor(this.len * Math.random());
        return this.arr[current];
    };

    Choice.prototype.list = function () {
        console.log(this.arr);
        return this.arr;
    }

    // public
    r.Choice = Choice;

    return r;
})(Rando || {});

// if(module) {
//     module.exports = Rando;
// }