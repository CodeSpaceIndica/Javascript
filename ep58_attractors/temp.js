let mX = -999;
let mY = -999;
let mZ = -999;
let miX = 999;
let miY = 999;
let miZ = 999;


if(x > mX) {
    mX = x;
}
if(y > mY) {
    mY = y;
}
if(z > mZ) {
    mZ = z;
}
if(x < miX) {
    miX = x;
}
if(y < miY) {
    miY = y;
}
if(z < miZ) {
    miZ = z;
}

console.log(miX, miY, miZ);
console.log(mX, mY, mZ);