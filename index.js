const fs = require('fs');
const Jimp = require('jimp');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const listArray = (array = [], width, height) => {
    for(let i =0; i<= width; i++ ){
        
    }
};

const dct = (array = []) => {

};

const quantumlization = (array = []) => {
    const quantumArr = [

    ];
}

const entropyEncode = (array = []) => {

};

const boostrap = () => {
    return new Promise(async (res, rej) => {
      const image = await Jimp.read('./dmhoang.png');
      console.log(image.bitmap);
    })
}

boostrap();