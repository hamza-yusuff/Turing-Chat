import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch';



const InstantCaesarShift = function (message, shift) {
  // Wrap the shift
  if (shift < 0) {
    return InstantCaesarShift(message, shift + 26);
  }

  // Make an output variable
  var encryption = "";

  // Go through each character
  for (var i = 0; i < message.length; i++) {
    // Get the character we'll be appending
    var char = message[i];

    // If it's a letter...
    if (char.match(/[a-z]/i)) {
      // Get its code
      var code = message.charCodeAt(i);

      // Uppercase letters
      if (code >= 65 && code <= 90) {
        char =  String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }

      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }

    // Append
    encryption += char;
  }

  // All done!
  return encryption;
};

const indexVal = function(array, k){
  for (var i =0; i<array.length; ++i){
    if (array[i] === k){
      return i;
    }
  }
  return -1;
}

const uniqueVal = function(str, num){
  var alpha = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  var output = '';
  var i=0;

  if (num===1){
    
    while (output.length !== 1 && i<str.length){
      if (indexVal(alpha,str[i])=== -1){
        return parseInt(str[i]);
      }
      i+=1;
    }
  }
  else {

    while (output.length !== num && i<str.length){
      output+=str[i];
      i+=1;
    }
    return output;
  }

  return "NONE";

};

const Extract = (message,key) => {
    const url = `https://97i6zt.deta.dev/cryptodom/aes/encrypt/`;
    const { loading, products } = useFetch(url, message,key)
    console.log(products)
    return products;
}
// userid = bpS8PsHp4iduY53WWRnVIaqjRLI3
// 2.3937835114194714e+31

const Encrypt = ({message, ID, algo}) => {

    if (!algo){
      var key = uniqueVal(ID,1)
    }
    else {
      var key = uniqueVal(ID,16);
    }
    if (key==="NONE"){
        key = 13;
    }

  return (
    <h4>{algo ? Extract(message,key): InstantCaesarShift(message,key)}</h4>
  )
}

export default Encrypt;