const MINE_RATE=1000;// 1s=1000ms
const INITIAL_DIFFICULTY=2;
const genesis_data={
    timestamp:'1',
    prevhash:'0x000',
    hash:'0x123',
    difficulty:INITIAL_DIFFICULTY,
    nonce:0,
    data:[],
};
module.exports={genesis_data,MINE_RATE};