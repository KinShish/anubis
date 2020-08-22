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
            if(answer==='1'){
                arrayKey.forEach(k=>{
                    classifier.addDocument(data.comments[i].comment, k);
                })
                console.log('да')
                watch(i+1);
            }else{
                classifier.addDocument(data.comments[i].comment, "спам");
                console.log('нет')
                watch(i+1);
            }
        })
    }
}
watch(0);

classifier.train();


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
classifier.save('classifier.json', function(err, classifier) {
    // the classifier is saved to the classifier.json file!
});

 */

