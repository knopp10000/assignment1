function myObject() {};

myObject.create = function(prototypes) {
    let newO = {};
    newO.__proto__ = myObject.prototype;
    if (prototypes != null)
        newO.prototypes = prototypes;
    else
        newO.prototypes = [];
    return newO;
};


myObject.prototype.addPrototype = function(prototypeToBe){
    for (let i = 0; i < prototypeToBe.prototypes.length; i++) {
        if (this === prototypeToBe.prototypes[i]) {
            console.log("ERRROORRRRROOORRR!");
            return;
        }
    }
    this.prototypes.push(prototypeToBe);
};


myObject.prototype.call = function (funcName, parameters) {
    let result = undefined;
    if (funcName in this){
        let attribute = this[funcName];
        if(typeof attribute === 'function') {
            return eval(attribute)(parameters);
        }
    }else if (this.prototypes != null){
        this.prototypes.forEach(function(prototype){
            if (result === undefined){
                result = prototype.call(funcName, parameters);
            }
        });
    }
    return result;
};

var obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", ["hello"]) ;
console.log("should print ’func0: hello’ ->", result);

obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
obj1 = myObject.create([obj0]);
obj2 = myObject.create([]);
obj3 = myObject.create([obj2, obj1]);
result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
result = obj0.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

var obj0 = myObject.create(null);
var obj1 = myObject.create([obj0]);
obj0.addPrototype(obj1);


