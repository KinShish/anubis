const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['ru'] });


const data=require("./comments/tehn.json");
watch=async ()=>{
    let result={
        NoN:{count:0,comments:[]},
        None:{count:0,comments:[]},
        Rel:{count:0,comments:[]},
        Spam:{count:0,comments:[]}
    }
    manager.load('./classifier/tehn.json');
    for(let c of data.comments){
        let response = await manager.process('ru', c.comment);
        result[response.intent].count++;
        result[response.intent].comments.push(c.comment);
    }
    console.log(result);
}
watch();

