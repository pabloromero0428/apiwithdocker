const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conexion a base de datos exitosa");
    })
    .catch(err => {
        console.log("No se pudo establecer conexion con la base de datos", err);
        process.exit();
    });



require("./app/routes/user.routes")(app);


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Users API",
            description: "User api Class web",
            contact: {
                name: "Juan Pablo"
            },
            servers: ["http://localhost:8081"]
        }
    },
    apis: ["./app/routes/user.routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});