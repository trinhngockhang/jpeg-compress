const fs = require('fs');
const Jimp = require('jimp');
const util = require('util');
var dct = require('dct')

const readFile = util.promisify(fs.readFile);

const genListArray = (image) => {
    const { width, height } = image.bitmap;
    console.log({width}, {height});
    const redListArr = [];
    const blueListArr = [];
    const greenListArr = [];
    const listArr = [];
    const maxNumberWidth = Math.floor(width / 8) + 1;
    const maxNumberHeight = Math.floor(height / 8) + 1;
    // so mang tao dc
    const numberArr = maxNumberHeight * maxNumberWidth;
    for(let n = 0; n < numberArr; n++){
        let redArr = [];
        let blueArr = [];
        let greenArr = [];
      // so thu tu cua mang trong 1 hang hoac cot 
      for(let i = 0; i<= 7; i++ ){
        const heightNumber = n % maxNumberWidth;
        const widthNumber = Math.floor(n / maxNumberWidth);
        for(let j = 0; j<= 7; j++){
          // widthIndex = 0;  
          // check neu nam ngoai pham vi
          if(8 * widthNumber + i + 1> height || 8 * heightNumber + j + 1> width){
            redArr.push(0);
            greenArr.push(0);
            blueArr.push(0);
          }else{
            const decimalColor = image.getPixelIndex(8 * widthNumber + i , 8 * heightNumber + j);
            const rgbColor = intToRGB(decimalColor);
            redArr.push(rgbColor.r);
            greenArr.push(rgbColor.g);
            blueArr.push(rgbColor.b);
          }
        }
        // array.push(widthArr);
      }
      redListArr.push(redArr);
      blueListArr.push(blueArr);
      greenListArr.push(greenArr);
    }
    return {
      redListArr,
      blueListArr,
      greenListArr
    };
};

const dctTransform = (array = []) => {

};

const quantumlization = (listArr) => {
  // tru 128
  let downRed = downSample(listArr.redListArr);
  let downBlue = downSample(listArr.blueListArr);
  console.log(downBlue[23]);
  let downGreen = downSample(listArr.greenListArr);
  return {
    redQuantumArr: downRed.map((data) => dct(data)),  
    blueQuantumArr: downBlue.map((data) => dct(data)),  
    greenQuantumArr: downGreen.map((data) => dct(data)), 
  }
}

const downSample = (arr) => {
  return arr.map((subArr) => {
    return subArr.map(data => data - 128); 
  })
}

const entropyEncode = (array = []) => {

};

const boostrap = () => {
    return new Promise(async (res, rej) => {
      const image = await Jimp.read('./example.jpg');
      // tra ve object chua 3 mang redListArr,blueListArr,greenListArr
      let listArray = genListArray(image);
      console.log(listArray.blueListArr[23]);
      // tra ve object chua 3 mang redQuantumArr,blueQuantumArr,greenQuantumArr
      let quantumArr = quantumlization(listArray);
      console.log(quantumArr.blueQuantumArr[23]);
      // listArray = listArray.map((data) => dct(data));
    })
}

const intToRGB = function (a){
  var r = a >> 16;
  var g = a - (r << 16) >> 8;
  var b = a - (r << 16) - (g << 8);
  return {
    r,
    g,
    b
  }
}
// chung minh tinh dung dan cua ham intToRbg
//console.log(intToRGB(84660));
boostrap();
