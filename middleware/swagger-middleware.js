var swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const pkage = require(path.join(__dirname, '../../../package.json'));
const config = require('config');
// swagger definition

function execute(opts) {
    return function(req, resp, next){
        var swaggerDefinition = {
            info: {
                title: pkage.name,
                version: pkage.version,
                description: pkage.description,
            },
            host: opts.host+':'+config.get('PORT') || '3000',
            basePath: '/',
        };
        console.log(opts.routes);
        // options for the swagger docs
        var options = {
            // import swaggerDefinitions
            swaggerDefinition: swaggerDefinition,
            // path to the API docs
            apis: [opts.routes],
        };
        // initialize swagger-jsdoc
        var swaggerSpec = swaggerJSDoc(options);
    
        req.app.get('/swagger.json', function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });
        
        next();
    }
   
}


module.exports = execute;
