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

const data=require("./data/tehn.json");
//natural.PorterStemmerRu.attach();

watch=async (i)=>{
    if(data.comments[i]!==undefined){
        console.log(data.comments[i].comment)
        rl.question('релевантный?', function(answer){
            switch (answer){
                case '1':
                    //classifier.addDocument(data.comments[i].comment, "Rel");
                    manager.addDocument('ru', data.comments[i].comment, 'Rel');
                    console.log('релевантно')
                    break;
                case '2':
                    //classifier.addDocument(data.comments[i].comment, "NoN");
                    manager.addDocument('ru', data.comments[i].comment, 'NoN');
                    console.log('не релевантно')
                    break;
                default:
                    //classifier.addDocument(data.comments[i].comment, "спам");
                    manager.addDocument('ru', data.comments[i].comment, 'Spam');
                    console.log('спам')
                    break;
            }
            watch(i+1);
        })
    }else{
        await manager.train();
        manager.save('classifierNew.json');
        //classifier.train();
        /*const response = await manager.process('ru', 'Юла');
        console.log(response);
        const response = await manager.process('ru', 'В XSpace. К Илону Маску.');
        console.log(response);
        const response = await manager.process('ru', 'Авито вообще бомбить ческая компания');
        console.log(response);
        const response = await manager.process('ru', 'Присоединяйтесь 🧓🏼👴🏼 сделаем чуть - чуть добра!');
        console.log(response);
        const response = await manager.process('ru', 'mail.ru group');
        console.log(response);
        classifier.save('classifier.json', function(err, classifier) {
            if(err){
                console.log(err)
            }else{
                console.log('Сохранили в файл')
            }
        });
        */

    }
}
watch(0);



