exports.turn = function() {
    return 360;  
};

exports.radius = function() {
    return 6371;
};

exports.diameter = function() {
    return this.radius() * 2;  
};