const natural = require('natural'),
    readline = require('readline'),
    porterStemmer = natural.PorterStemmerRu,
    classifier = new natural.BayesClassifier(porterStemmer);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const data=require("./localization.json");
natural.PorterStemmerRu.attach();

watch=(i)=>{
    if(data.comments[i]!==undefined){
        console.log(data.comments[i].comment)
        const arrayKey=data.comments[i].blogger_text.tokenizeAndStem();
        rl.question('релевантный?', function(answer){
            switch (answer){
                case '1':
                    arrayKey.forEach(k=>{
                        classifier.addDocument(data.comments[i].comment, k);
                    })
                    console.log('релевантно')
                    break;
                case '2':
                    console.log('не релевантно')
                    break;
                default:
                    classifier.addDocument(data.comments[i].comment, "спам");
                    console.log('спам')
                    break;
            }
            watch(i+1);
        })
    }else{
        classifier.train();
        classifier.save('classifier.json', function(err, classifier) {
            if(err){
                console.log(err)
            }else{
                console.log('Сохранили в файл')
            }
        });
    }
}
watch(0);




/*
data.good.forEach(g=>{
    arrayKey.forEach(k=>{
        classifier.addDocument(g, k);
    })
})
data.bad.forEach(g=>{
    classifier.addDocument(g, "спам");
})

classifier.train();

for (let i = 0; i < data.test.length; i++) {
    console.log(classifier.classify('i am short silver'));
    //console.log(data.test[i],classifier.getClassifications(data.test[i]));
};
 */

