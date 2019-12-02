
function myObject() {};

myObject.create = function(prototypes) {
    console.log("dynamic call");
    newO = {};
    newO.__proto__ = myObject.prototype;
    newO.prototypes = prototypes;
    return newO;
};

myObject.prototype.call = function find(funcName, parameters) {
    this.prototypes.forEach(function(prototype){
        if(funcName in prototype){
            var attribute = prototype[funcName];
            if(typeof attribute === 'function'){
                finalFunc = eval(attribute)(parameters);
                return finalFunc;
            }
        }else if (prototype instanceof myObject){
           prototype.call(funcName, parameters);
        }
    }); return finalFunc;
    
};

var obj = myObject.create([]);
obj.func = function(arg) {return "func: " + arg;};
var obj1 = myObject.create([]);
obj1.func1 = function(arg) {return "func1: " + arg;};
var obj2 = myObject.create([obj1]);
obj2.func2 = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj2, obj]);

var test = obj2.call("func1", ["yeet"]);
var result = obj3.call("func1", ["yeet"]);

console.log(result);

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