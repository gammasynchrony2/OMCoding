const companies = [
    {name: "Company One", category: "Finance", start: 1981, end: 2003},
    {name: "Company Two", category: "Retail", start: 1992, end: 2008},
    {name: "Company Three", category: "Auto", start: 1999, end: 2007},
    {name: "Company Four", category: "Retail", start: 1989, end: 2010},
    {name: "Company Five", category: "Technology", start: 2009, end: 2014},
    {name: "Company Six", category: "Finance", start: 1987, end: 2010},
    {name: "Company Seven", category: "Auto", start: 1986, end: 1996},
    {name: "Company Eight", category: "Technology", start: 2011, end: 2016},
    {name: "Company Nine", category: "Retail", start: 1981, end: 1989}
  ];
  
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

// Return the sum of all start dates
// Use chained functions
// Using arrow functions

const sumStarts = companies
  .map(company => company.start)
  .reduce((accum, iter) => accum + iter,0);

// Using standard function notation

// const sumStarts = companies
//   .map(function(company){
//     return company.start;
//   })
//   .reduce(function(accum, iter) {
//     return accum + iter;
//   })

console.log(sumStarts);

// Return the sum of all values in the ages array
// Using an arrow function

// const allAges = ages.reduce((accum, iter) => accum + iter);

// Use standard function notation

// const allAges = ages.reduce(function(accum, iter) {
//   return accum + iter;
// }, 0);

//console.log(allAges);

// Return an array for all companies with category "Auto"
// Use an arrow function

//const autoCompanies = companies.filter(company => company.category == "Auto");

// Use standard function notation

// const autoCompanies = companies.filter(function(company){
//   if(company.category == "Auto") {
//     return true;
//   }
// })

//console.log(autoCompanies);
