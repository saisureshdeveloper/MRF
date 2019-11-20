'use strict'

function Lib1(){
	console.log("Constructing Lib1...");
}

Lib1.prototype.helloLib = function(){
	console.log("Hello Lib1");
};

Lib1.prototype.goodbyeLib = function(){
	console.log("Goodbye Lib1");
};

module.exports = Lib1;