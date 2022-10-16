const redis =require("redis");
const CHANNELS={
    TEST:'TEST',
    BLOCKCHAIN:'BLOCKCHAIN'
}

class PubSub{
    constructor({blockchain}){
        this.blockchain=blockchain;
        this.publisher=redis.createClient();
        this.subscriber=redis.createClient();
        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
        this.subscriber.on('message',(channel,message)=>{this.handlemessage(channel,message)});
        
    }
    handlemessage(channel,message){
        console.log(`Message received.channel ${channel} Message: ${message}`);
        const parsemessage=JSON.parse(message);
        if(channel===CHANNELS.BLOCKCHAIN)
        {
            this.blockchain.replaceChain(parsemessage);
        }
    }
    publish({channel,message})
    {
        this.publisher.publish(channel,message);
    }
    broadcastChain(){
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain),
        });
    }
}
/*const checkPubSub=new PubSub();
setTimeout(
    ()=>checkPubSub.publisher.publish(channels.TEST,"Hellloo"),
     1000
);*/
module.exports=PubSub;