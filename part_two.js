function createClass(className, superClassList){
    let newClass = {};
    newClass.className = className;
    newClass.superClasses = (superClassList != null)? superClassList : [];
    newClass.call = function (funcName, parameters) {
        let result = undefined;
        if (funcName in newClass){
            let attribute = this[funcName];
            if(typeof attribute === 'function') {
                return eval(attribute)(parameters);
            }
        }else if (this.superClasses != null){
            this.superClasses.forEach(function(clas){
                if (result === undefined){
                    result = clas.call(funcName, parameters);
                }
            });
        }
        return result;
    };
    newClass.new = function () {
        let newInstance = {};
        newInstance.__proto__ = newClass;
        return newInstance;
    };
    newClass.addSuperClass = function (newSuperClass) {
        for (let i = 0; i < this.superClasses.length; i++) {
            if (this === newSuperClass.superClasses[i]) {
                console.log("ERRROORRRRROOORRR!");
                return;
            }
        }
        this.superClasses.push(newSuperClass);
    }
    return newClass;
}

var class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function(arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);
console.log(result);

class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
class1 = createClass("Class1", [class0]);
class2 = createClass("Class2", []);
class3 = createClass("Class3", [class2, class1]);
obj3 = class3.new();
result = obj3.call("func", ["hello"]);
console.log(result);

class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var obj0 = class0.new();
result = obj0.call("func", ["hello"]);
console.log(result);

var class0 = createClass("Class 0", null);
var class1 = createClass("Class 1", [class0]);
var class2 = createClass("Class 2", [class1]);

class0.addSuperClass(class2);

