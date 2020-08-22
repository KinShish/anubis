const Joi = require('@hapi/joi');

const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['ru'] });



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
                        const data=require('../../test/data.json');
                        //Временно не работает
                        //const text=data.text.split('\\n').join(' ');//убираем переходы на новую строку
                        let result={
                            NoN:{count:0,comments:[]},
                            None:{count:0,comments:[]},
                            Rel:{count:0,comments:[]},
                            Spam:{count:0,comments:[]}
                        }
                        manager.load('./src/classifier/web.json');
                        for(let c of data.test){
                            let response = await manager.process('ru', c);
                            result[response.intent].count++;
                            result[response.intent].comments.push(c);
                        }
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