'use strict'

module.exports = (sentences) => {
  let result = {};
  for(let i=0; i < sentences.length; i += 1) {
    let s = sentences[i]
    // each sentence has a field, verb, value, and not property
    let value;
    switch(s.verb) {
      case "is":
        if(s.not) {
          value = {"$ne":s.value}
        }
        else {
          value = {"$eq":s.value}
        }
        break;
      case "has":
        if(s.not) {
          value = {"$regex":new RegExp('^((?!' + s.value + ').)*$', 'i')}
        }
        else {
          value = {"$regex":new RegExp(s.value, 'i')}
        }
        break;
      case ">":
        break;
      case "<":
        break;
    }
    result[s.field] = value
  }
  return result
}
