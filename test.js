// const csv = require('csv-parser');
// const fs = require('fs');
// var db = require("./models");
// let csvData = [];
// fs.createReadStream('DatafinitiElectronicsProductsPricingData.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     csvData.push(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//     db.item.bulkCreate(csvData).then(function(data){
//         // console.log(data[0]);
//     }).catch(err =>  console.log(err));
//   // db.item.create(csvData[0]).then(function(data){
//   //       console.log(data);
//   //   }).catch(err =>  console.log(err));
     
//   });

