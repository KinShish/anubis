const natural = require('natural'),
    readline = require('readline'),
    porterStemmer = natural.PorterStemmerRu,
    classifier = new natural.BayesClassifier(porterStemmer);

const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['ru'] });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const data=require("./comments/web.json");
//natural.PorterStemmerRu.attach();
watch=async ()=>{
    let result={
        NoN:{count:0,comments:[]},
        None:{count:0,comments:[]},
        Rel:{count:0,comments:[]},
        Spam:{count:0,comments:[]}
    }
    manager.load('./classifier/web.json');
    for(let c of data.comments){
        let response = await manager.process('ru', c.comment);
        result[response.intent].count++;
        result[response.intent].comments.push(c.comment);
    }
    console.log(result);
}
watch();

