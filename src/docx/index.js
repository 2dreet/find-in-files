
const fs = require('fs');
const path = '/home/jose/Downloads/docx/doc1/';
const filesFinded = [];
const officeParser = require('officeparser');

const readDocx = (fileName) => {
  return new Promise((res, err) => {
    try { 
      officeParser.parseOffice(fileName, function(data, err){
        let ret = false;
        if(data && data.includes('2021') && data.includes('5°'))
        {
          ret = true;
          console.log(fileName);
          // console.log(data);
        } 

        res(ret);
      })
    } catch(err){
      res(false);
    }
  })
}

const processFile = async (fileName) => {
  if(fileName.substring(fileName.length-4, fileName.length) == 'docx'){
    const res = await readDocx(`${path}${fileName}`);
    if(res) {
      filesFinded.push(fileName);
    }
  }
}

fs.readdirSync(path).forEach(async (file) => {
    await processFile(file);
});

