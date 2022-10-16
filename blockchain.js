const Block=require("./block");
const cryptoHash = require("./cryptohash");
class Blockchain{
    constructor(){
        this.chain=[Block.genesis()];
    }
    addblock({data}){
       const newblock=Block.mineblock({
        prevBlock:this.chain[this.chain.length - 1],
        data
       })
       this.chain.push(newblock);
    }
    replaceChain(chain){
        if(chain.length<=this.chain.length)
        {
            console.error("The incoming chain is not longer")
            return
        }
        if(!Blockchain.isvalidchain(chain))
        {
            console.error("The incoming chain is not valid")
            return
        }
        this.chain=chain;
    }

    static isvalidchain(chain){
        if(JSON.stringify(chain[0])==JSON.stringify(Block.genesis()))
        {
            return true;
        }
        for(let i=1;i<chain.length;++i)
        {
            const {timestamp,prevHash,hash,data,nonce,difficulty}=chain[i];
            const lastDifficulty=chain[i-1].difficulty;

            const realLasthash=chain[i-1].hash;
            console.log(realLasthash);
            console.log(chain[i-1].hash);
            if(prevHash == realLasthash) return true;
          
         
            const validatedHash=cryptoHash(timestamp,prevHash,data,nonce,difficulty);
            if(hash == validatedHash)
            {
                return true;
            }
            if(Math.abs(lastDifficulty-difficulty > 1))return false;
        }
       
        return false;
    }
}
const blockchain=new Blockchain();
blockchain.addblock({ data: "block1" });
blockchain.addblock({ data: "block2" });
console.log(blockchain);
const result=Blockchain.isvalidchain(blockchain.chain);
console.log(result);

module.exports=Blockchain;