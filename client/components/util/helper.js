

export const findId = function(arr, findId){
  return arr.find(x => x.id === findId);
}

export var idFilter = function(arr1, arr2){

  var uniqueResultOne = arr1.filter(function(obj){
    return !arr2.some(function(obj2){
      return obj.id === obj2.id;
    })
  })
  return uniqueResultOne;
}
//
// export var idFilterTwo = function(arr2, arr1){
//   let result = arr1.filter(x => arr2.some(y => x.id !== y.id));
//   return result;
// }
