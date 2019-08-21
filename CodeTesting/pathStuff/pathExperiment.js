var path = require('path');

cleanPath = path.normalize('/this//is/a/something/../././path');
console.log(cleanPath);
// "something" went away because the double dots immediately backed out of it

// path.join() combines a series of directories into a single path
// works with whatever the directory limiter is for your operating system
longPath = path.join('this', 'is', '/a/', 'path');
console.log(longPath);

// path.resolve() essentially combines normalize() and join()
// takes a series of strings and simulates cd-ind between them
resPath = path.resolve('/this', 'is/what', '../.', 'a', 'path');
console.log(resPath);

// path.absolute() tells you whether or not a path is absolute
isAbs = path.isAbsolute('/yes');
notAbs = path.isAbsolute('yes');
console.log(isAbs, notAbs);

// path.relative() tells you the relation between two paths
relPath = path.relative('/this/is/a/', '/path');
console.log(relPath);

// path.dirname() takes a path string as input and gives you the path to the current directory
dirPath = path.dirname('/this/is/a/path'); // interprets "path" as a file
console.log(dirPath);

// path.basename() takes a path string as an input and gives you the base file from that path
// complements the function of path.dirname()
basePath = path.basename('/this/is/a/path.txt');
console.log(basePath);
// you can pass a string of the extension as a second argument and path.basename() will remove it

// path.extname takes the name of a file as an argument and returns the extension
pathExt = path.extname('path.txt');
console.log(pathExt);

// path.sep returns whatever the path delimiter is for the current OS
console.log(path.sep);

// path.sep therefore allows you to split up a path using an OS-independent command
fullPath = "this/is/a/path";
console.log(fullPath);
splitPath = fullPath.split(path.sep);
console.log(splitPath);

// path.parse will break a path into pieces and return them as an object
parsedPath = path.parse('/this/is/a/path.txt')
console.log(parsedPath);

// path.format does the reverse
//      takes an object of path properties and returns a full path
formattedPath = path.format(parsedPath);
console.log(formattedPath);