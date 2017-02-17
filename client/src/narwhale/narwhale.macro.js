(function(root) {
    /**
     * @constant
     * @type Number
     */
    root.INVALID_INDEX = -1;
    
    /**
     * PI is the ratio of a circle's circumference to its diameter.
     * @constant
     * @type Number
     */
    root.PI = Math.PI;
    
    /**
     * @constant
     * @type Number
     */
    root.FLT_MAX = parseFloat('3.402823466e+38F');
    
    /**
     * @constant
     * @type Number
     */
    root.FLT_MIN = parseFloat("1.175494351e-38F");

    /**
     * @constant
     * @type Number
     */
    root.FLT_EPSILON = 0.0000001192092896;
    
    /**
     * @constant
     * @type Number
     */
    root.RAD = root.PI / 180;
    
    /**
     * @constant
     * @type Number
     */
    root.DEG = 180 / root.PI;
    
    /**
     * maximum unsigned int value
     * @constant
     * @type Number
     */
    root.UINT_MAX = 0xffffffff;

    /**
     * <p>
     *     Linear interpolation between 2 numbers, the ratio sets how much it is biased to each end
     * </p>
     * @param {Number} a number A
     * @param {Number} b number B
     * @param {Number} r ratio between 0 and 1
     * @function
     * @example
     * root.lerp(2,10,0.5)//returns 6<br/>
     * root.lerp(2,10,0.2)//returns 3.6
     */
    root.lerp = function (a, b, r) {
        return a + (b - a) * r;
    };
    
    /**
     * get a random number from 0 to 0xffffff
     * @function
     * @returns {number}
     */
    root.rand = function () {
        return Math.random() * 0xffffff;
    };
    
    /**
     * returns a random float between -1 and 1
     * @return {Number}
     * @function
     */
    root.randomMinus1To1 = function () {
        return (Math.random() - 0.5) * 2;
    };
    
    /**
     * returns a random float between 0 and 1
     * @return {Number}
     * @function
     */
    root.random0To1 = Math.random;
    
    /**
     * converts degrees to radians
     * @param {Number} angle
     * @return {Number}
     * @function
     */
    root.degreesToRadians = function (angle) {
        return angle * root.RAD;
    };
    
    /**
     * converts radians to degrees
     * @param {Number} angle
     * @return {Number}
     * @function
     */
    root.radiansToDegrees = function (angle) {
        return angle * root.DEG;
    };
    /**
     * converts radians to degrees
     * @param {Number} angle
     * @return {Number}
     * @function
     */
    root.radiansToDegress = function (angle) {
        return angle * root.DEG;
    };
}(Narwhale));