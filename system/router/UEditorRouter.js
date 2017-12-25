module.exports = {
    prefix: '/ueditor',
    routes: {
        '/' : async function(ctx){
            if(ctx.query.action =='config'){
                ctx.useOriginResponseBody = true;
                ctx.response.redirect('/ueditor/config.json')
            }
        }
    }
};