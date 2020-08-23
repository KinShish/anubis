const Joi = require('@hapi/joi');

const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['ru'] });

exports.plugin = {
    name:'classifier',
    version:'0.0.1',
    register: async (server)=>{
        /*
            TODO BoB; Тестовый запрос собранный руками для проверки
         */
        server.route({
            method: 'GET',
            path: '/classifier/test',
            config:{
                async handler(req) {
                    try {
                        const data=require('../../test/katyaKlap.json');
                        //Временно не работает
                        //const text=data.text.split('\\n').join(' ');//убираем переходы на новую строку
                        let result={
                            NoN:{count:0,comments:[]},
                            None:{count:0,comments:[]},
                            Rel:{count:0,comments:[]},
                            Spam:{count:0,comments:[]}
                        }
                        manager.load('./src/classifier/tehn.json');
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
                description: 'Тестовый запрос собранный руками для проверки',
                tags: ['api']
            }
        });
        /*
            TODO BoB; Запрос на проверку коментариев заданной тиватикой
         */
        server.route({
            method: 'POST',
            path: '/classifier/{temp}',
            config:{
                async handler(req) {
                    try {
                        const temp=req.params.temp;
                        const comments=req.payload.comments;
                        //Временно не работает
                        //const text=data.text.split('\\n').join(' ');//убираем переходы на новую строку
                        let result={
                            NoN:{count:0,comments:[]},
                            None:{count:0,comments:[]},
                            Rel:{count:0,comments:[]},
                            Spam:{count:0,comments:[]}
                        }
                        manager.load('./src/classifier/'+temp+'.json');
                        for(let c of comments){
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
                description: 'Тестовый запрос собранный руками для проверки',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        temp: Joi.string().min(1).max(10).default('web')
                    }),
                    payload:Joi.object({
                        comments: Joi.any(),
                    })
                }
            }
        });


    }
};
