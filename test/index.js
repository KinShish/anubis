const natural = require('natural'),
    porterStemmer = natural.PorterStemmerRu,
    restoredClassifier = natural.BayesClassifier.restore(require('./classifier.json'));
natural.PorterStemmerRu.attach();

const data=require('./data.json');
const text=data.text.split('\\n').join(' ');

data.test.forEach(t=>{
    const arrayKey=new Set(text.tokenizeAndStem());
    const arrayResult=restoredClassifier.getClassifications(t)
    const arrayCoeficient=[];
    let max=[];
    for(let a of arrayResult){
        if(a.label==='спам'){
            max.push(a);
            arrayCoeficient.push(a)
        }
    }
    arrayKey.forEach(k=>{
        for(let a of arrayResult){
            if(k===a.label){
                arrayCoeficient.push(a)
                if(a.value>max[max.length-1].value){max.push(a)}
            }
        }
    })
    console.log(max);

})


