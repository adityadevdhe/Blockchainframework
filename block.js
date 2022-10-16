const hextobinary=require("hex-to-binary");
const {genesis_data} =require("./config");
const {MINE_RATE}=require("./config");
const cryptoHash=require('./cryptohash');
class Block{
    constructor({timestamp,prevhash,hash,data,nonce,difficulty})
    {
        this.prevhash=prevhash;
        this.hash=hash;
        this.timestamp=timestamp;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;
    }
    static genesis(){
        return new this(genesis_data);
    }
    static mineblock({prevBlock,data}){
        let hash,timestamp;
        const prevhash=prevBlock.hash;
        let {difficulty}=prevBlock;
        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty=Block.adjustDifficulty({
                originalBlock:prevBlock,
                timestamp,
            });
            hash=cryptoHash(timestamp,prevhash,data,nonce,difficulty);
        }while(hextobinary(hash.substring(0,difficulty)!=='0'.repeat(difficulty)));
        return new this({
            timestamp,
            prevhash,
            data,
            difficulty,
            nonce,
            hash,
        });
    }
    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty}=originalBlock;
        if(difficulty < 1) return 1;
        const difference=timestamp-originalBlock.timestamp;
        if(difference > MINE_RATE) return difficulty- 1;
        return difficulty+ 1 ;
    }
}

const block1=new Block({
    hash:'0x123',
    prevhash:"0x1254",
    timestamp:'11/10/2022',
    data:"usbub",
});

/*const genesisb = Block.genesis();
console.log(genesisb);


const result=Block.mineblock({ prevBlock: block1,data:"ab"});
console.log(result)*/
module.exports=Block;