'use strict'
const figlet = require('figlet');

function Advent(){
	figlet('Advent Business Solutions', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
}


 

module.exports = Advent();