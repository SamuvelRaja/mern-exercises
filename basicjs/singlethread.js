let sum = 0

for(i=0; i<1000000000;i++){
 sum++

}
/*this program explains the single threaded nature of javascript when you run this 
 code you can see one core of the cpu is utilized completely*/
console.log("sumgb", sum)