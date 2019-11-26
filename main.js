/*
function myObject() {
    this.__proto__.create = function(prototypeN) {
        myObject.prototype = prototypeN;
        return myObject();
    }
    this.test = 5;
}
myObject.prototype.create = function (prototypeN) {
    myObject.prototype = prototypeN;
    return myObject();
}
*/

function myObject() {
    this.muaw = true;
    myObject.create = function(obj) {
        console.log("dynamic call");
        //myObject.prototype = obj;
        obj.__proto__ = myObject.prototype;
        return obj;
    }

}
myObject.create = function(obj) {
    console.log("static call");
    //myObject.prototype = obj;
    obj.__proto__ = myObject.prototype;
    return obj;
}

myObject.prototype.create = function(prototypes) {
    console.log("prototype call");
    var t = {};
    t.__proto__ = this;
    return t;
}

test = new myObject().create({tail: 4, ears: 2});
clyde = myObject.create({tail: 4, ears: 2});
fred = clyde.create();

fred.tail = 10;
console.log("clyde:" + clyde.tail);
console.log("fred: " + fred.tail);


// var o = new myObject;
//
// var o2 = Object.create(o);
// console.log("o2: " + o2.hasOwnProperty())
// console.log(typeof o);
// console.log(o.__proto__)
// console.log(o.__proto__.__proto__)
//
// console.log(o.__proto__.__proto__.__proto__)
// //var obj0 = o.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };

//var o2
//var o = myObject.create(null);
//System.console.log(o);