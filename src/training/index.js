const natural = require('natural'),
    readline = require('readline'),
    porterStemmer = natural.PorterStemmerRu,
    classifier = new natural.BayesClassifier(porterStemmer);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const data=require("./data/localization.json");
natural.PorterStemmerRu.attach();

watch=(i)=>{
    if(data.comments[i]!==undefined){
        console.log(data.comments[i].comment)
        const arrayKey=new Set(data.comments[i].blogger_text.split('\\n').join(' ').tokenizeAndStem());
        rl.question('релевантный?', function(answer){
            switch (answer){
                case '1':
                    classifier.addDocument(data.comments[i].comment, "Rel");
                    console.log('релевантно')
                    break;
                case '2':
                    classifier.addDocument(data.comments[i].comment, "NoN");
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
