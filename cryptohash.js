const crypto=require("crypto")

const cryptoHash=(...inputs)=>{
    const hash=crypto.createHash('sha256')
    hash.update(inputs.sort().join(''))//sort is used so that if we passed hello world or world hello both hash should be same.
    return hash.digest('hex');
}
result=cryptoHash("hello","worls");
module.exports=cryptoHash;
//console.log(result);