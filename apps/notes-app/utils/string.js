var Utils = (function (u) {

    const titleCase = function titleCase(str) {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    };

    u.titleCase = titleCase;
    return u;


})(Utils || {});


module.exports = Utils;
