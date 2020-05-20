const user = require('../controller/user.controller');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

module.exports = function(app) {


    var router = require('express').Router();


    /**
     * @swagger
     * /user:
     *    post:
     *      tags:
     *        - user 
     *      summary: Crea usuario.
     *      consumes:
     *        - application/json
     *      parameters:
     *        - in: body
     *          name: user
     *          description: Crea usuario.
     *          schema:
     *            type: object
     *            required: 
     *              - name
     *              - username
     *              - email
     *              - password
     *            properties:
     *              name: 
     *               type: string 
     *              userName:
     *               type: string
     *              email:
     *                type: string
     *              password:
     *                type: string
     *      responses:
     *        201:
     *          description: Created
     */
    router.post('/user', user.create);

    /**
     * @swagger
     * /user:
     *      get:
     *          tags:
     *              - user
     *          summary: Retorna todos los usuarios.
     *          description: Retorna todos los usuarios
     *          produces:
     *           - application/json     *          
     *          responses:
     *              200:
     *                   description: Responde un Json con los usuarios
     */
    router.get('/user', user.findAll);



    /**
     * @swagger
     * /user/:name :
     *    put:
     *      tags:
     *        - user
     *      summary: Actualizar usuario.
     *      consumes:
     *        - application/json
     *      parameters:
     *        - in: body
     *          name: user
     *          description: Actualizar usuario.
     *          schema:
     *            type: object
     *            required: 
     *              - name
     *              - username
     *              - email
     *              - password
     *            properties:
     *              name: 
     *               type: string 
     *              userName:
     *               type: string
     *              email:
     *                type: string
     *              password:
     *                type: string
     *      responses:
     *        201:
     *          description: Actualizacón
     */
    router.put("/user/:name", user.update);



    /**
     * @swagger
     * /user:
     *      delete:
     *          tags:
     *              - user
     *          summary: Elimina todos los usuarios.
     *          description: Elimina todos los usuarios
     *          produces:
     *           - application/json
     *          responses:
     *              200:
     *                   description: Responde un Json con la cantidad de usuarios eliminados
     */
    router.delete('/user', user.deleteAll);

    router.get("/", (req, res) => {
        res.json({ message: "Bienvenido a la app register user" });
    });

    //Ruta predeterminada
    app.use('/', router);

}