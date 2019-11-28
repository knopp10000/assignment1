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
function myObject() {};
myObject.prototype.prototypes = [];

myObject.create = function(prototypes, name) {
    // this.prototype.prototypes = prototypes;
    // this.prototype.name = name;
    console.log("dynamic call");
    // myObject.prototype = obj;
    newO = {};
    newO.__proto__ = myObject.prototype;
    newO.prototypes = prototypes;
    newO.name = name;
    return newO;
};

myObject.prototype.call = function (funcName, parameters) {
    console.log("calling for " + funcName);
    //console.log("prototypes: " + this.name);
    this.prototypes.forEach(function(prototype){
        if(funcName in prototype){
            var attribute = prototype[funcName];
            if(typeof attribute === 'function'){
                return eval(attribute)(parameters);
                // return Function.call(attribute, parameters);
            }
        }else{
            console.log(funcName + " was not in " + this.name);
        }
    });
    console.log("function was not found")
    //return eval("this." + funcName + "(\"" + parameters + "\")");
    // var fn = window[funcName];
    // // is object a function?
    // if (typeof fn === "function"){
    //     return fn.apply(null, parameters);
    // }
};

kalle = myObject.create(null, "kalle");
oskar = myObject.create(null, "oskar");
console.log(myObject.prototype.isPrototypeOf(kalle));
console.log("kalle: " + kalle.name);
console.log("oskar: " + oskar.name);
console.log("kalle: " + kalle.name);

var obj2 = myObject.create([], "obj2");
obj2.func = function(arg) { return "func2: " + arg; };

var obj3 = myObject.create([obj2], "obj3")
var result = obj3.call("func", ["hejsan"])
console.log("result: " + result);

// myObject.create = function(obj) {
//     console.log("static call");
//     //myObject.prototype = obj;
//     obj.__proto__ = myObject.prototype;
//     return obj;
//     //     //myObject.prototype = obj;
//     //     newO = Object.create(obj);
//     //     newO.__proto__ = myObject.prototype;
//     //     return newO;
// }

// myObject.prototype.create = function(prototypes) {
//     console.log("prototype call");
//     var t = {};
//     t.__proto__ = this;
//     return t;
// }

// myObject.prototype.call = function(funcName, parameters) {
//     console.log("calling for " + funcName);
//     return Function.call(funcName, parameters);
// }

//test = new myObject().create({tail: 4, ears: 2});
// clyde = myObject.create({tail: 4, ears: 2});
// obj1 = myObject.create(null);
// fred = clyde.create();
//
// fred.tail = 10;
// console.log("clyde:" + clyde.tail);
// console.log("fred: " + fred.tail);


// var o = new myObject;
//
// var o2 = Object.create(o);
// console.log("o2: " + o2.hasOwnProperty())
// console.log(typeof o);
// console.log(o.__proto__)
// console.log(o.__proto__.__proto__)
//
// console.log(o.__proto__.__proto__.__proto__)


// var obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };
// console.log("print hejsan: " + obj0.call("func", "hejsan"))
//
// var obj1 = myObject.create([obj0]);
//
// var obj2 = myObject.create([]);
// obj2.func = function(arg) { return "func2: " + arg; };
//
// var obj3 = myObject.create([obj1, obj2]);
// var result = obj3.call("func", ["hello"]) ;
// console.log("should print ’func0: hello’ ->", result);


//var o2
//var o = myObject.create(null);
//System.console.log(o);