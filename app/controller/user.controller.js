const db = require("../models");
const User = db.user;


exports.create = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Los datos no se pudieron ingresar verifique los campos!"
        });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    user.save(user)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al almacenar un usuario"
            });
        });
};


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condicion = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    User.find(condicion).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al buscar usuarios"
        });
    });

};

exports.deleteAll = (req, res) => {
    User.deleteMany({}).then(data => {
        res.status(200).send({
            message: `${data.deletedCount} usuarios eliminados satisfactoriamente`
        })
    }).catch(err => {
        res.status(500).send({
            message: "Los usuarios no se pudieron eliminar"
        });
    });
};


exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Los datos no se pudieron actualizar!"
        });
    }

    User.updateOne({ name: req.params.name }, { $set: req.body }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `No se pudo actualizar el usuario =${name}. Por favor verifique y vuelva a realizar la acción!`
                });
            } else res.status(200).send({ message: "Usuario actualizado satisfactoriamente" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el usuario " + name
            });
        });
};