'use strict'

function Lib2(){
	console.log("Constructing Lib2...");
}

Lib2.prototype.helloLib = function(){
	console.log("Hello Lib2");
};

Lib2.prototype.goodbyeLib = function(){
	console.log("Goodbye Lib2");
};

module.exports = Lib2;