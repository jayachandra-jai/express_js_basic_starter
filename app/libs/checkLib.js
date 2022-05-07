'use srict'

let trim = (x) => {
  let value = String(x)
  return value.replace(/^\s+|\s+$/gm, '')
}
let isEmpty = (value) => {
  if (value === null || value === undefined || trim(value) === '' || value.length === 0) {
    return true
  } else {
    return false
  }
}

let validateArrayValues = (givenArray)=>{
  
  let findNull = givenArray.indexOf(null)
  let findUndefined = givenArray.indexOf(undefined)
  let findEmpty = givenArray.indexOf("")
  if(findNull== -1 && findUndefined==-1 && findEmpty ==-1){
    console.log("all values okay")
    return true
  }
  else{
    return false
  }


}// end validateArrayValues

/**
 * exporting functions.
 */
module.exports = {
  isEmpty,
  trim,
  validateArrayValues
}
