const Joi = require('@hapi/joi'),
    natural = require('natural');
natural.PorterStemmerRu.attach();



exports.plugin = {
    name:'classifier',
    version:'0.0.1',
    register: async (server)=>{
        /*
            TODO BoB; Отобразить текст статьи
                temp= req.
         */
        server.route({
            method: 'GET',
            path: '/classifier/test',
            config:{
                async handler(req) {
                    try {
                        const webClassifier=require('../classifier/web.json');
                        const restoredClassifier = natural.BayesClassifier.restore(webClassifier);
                        const data=require('../../test/data.json');
                        //Временно не работает
                        //const text=data.text.split('\\n').join(' ');//убираем переходы на новую строку
                        const result=[]
                        data.test.forEach(t=>{
                            const type=restoredClassifier.classify(t)

                            result.push({type:type==="Rel"?1:(type==="NoN"?2:3),comment:t})
                        })
                        return {err:false,result}
                    }catch (e){
                        console.log(e)
                        return {err:true}
                    }
                },
                description: 'Тестовый анализ взятой публикации c инстограмма по тематике web',
                tags: ['api']
            }
        });

    }
};