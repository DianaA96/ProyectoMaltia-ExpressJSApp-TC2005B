// Importamos Express, el Router y los modelos necesarios para las queries
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Employee, Analyst } = require('./database');
const { Assessor, Store } = require('./database');
const { Op } = require("sequelize");

// Endpoint para actualizar los datos de un analista
router.patch('/:idEmployee/analysts/', async (req, res, next) => {
    const { idEmployee } = req.params;
    const { employee, analyst } = req.body.body;

    try{
        let empleado = await Employee.findByPk(idEmployee)
        let analista = await Analyst.findByPk(idEmployee)

        if(empleado && analista) {
            await empleado.update(employee)
            await analista.update(analyst)

            let {
                idEmployee,
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                correoElectronico,
                numTelefono,
                puesto
            } = empleado

            let {
                idAnalyst,
                departamento
            } = analista

            return res.status(200).json({
                empleadoActualizado: {idEmployee, nombre, apellidoPaterno, apellidoMaterno, correoElectronico, numTelefono, puesto},
                analistaActualizado: {idAnalyst, departamento}
                })
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "El analista que intentas modificar no existe :("
                })
            }
        } catch(err) {
            next(err);
        }
    }
)

// Endpoint para crear un analista. Encripta contraseña y credenciales funcionan para iniciar sesión.
router.post('/analysts', async (req, res, next) => {
    
    const { employee, analyst } = req.body
    let empleadoAnalista =  employee
    empleadoAnalista.puesto = "Analista"
    
    try {

        let user = await Employee.findOne({
            where: {correoElectronico: employee.correoElectronico},
        })

        if(user) {
            return res.status(400).json({
                message: "Lo sentimos, la cuenta ya existe",
            })
        }

        let contrasenaNueva = await bcrypt.hash(empleadoAnalista.contrasena, 10)

        user = {...empleadoAnalista, contrasena: contrasenaNueva}

        await Employee.create(user)
        await Analyst.create({ 
            idAnalyst: employee.idEmployee,
            departamento: analyst.departamento
            })
        let {idEmployee, nombre, apellidoPaterno, apellidoMaterno, correoElectronico, numTelefono, puesto} = empleadoAnalista
        // return res.status(201).json({
        //     idEmployee, 
        //     nombre, 
        //     apellidoPaterno, 
        //     apellidoMaterno, 
        //     correoElectronico, 
        //     numTelefono, 
        //     puesto
        // })
        console.log("************USUARIO", user)
        const payload = {
            idEmployee: user.idEmployee,
        }
        jwt.sign(
            payload,
            process.env.AUTH_SECRET,
            { expiresIn: 10800 },
            (err, token) => {
                return res.status(201).json({
                    data: token,
                });
            }
        )
    } catch(err) {
        next(err);
        }
    }
)


// Endpoint para crear un asesor. Encripta contraseña y credenciales funcionan para iniciar sesión.
router.post('/assessors', async (req, res, next) => {
    
    const { employee } = req.body
    let empleadoAsesor =  employee
    empleadoAsesor.puesto = "Asesor"
    
    try {
        let user = await Employee.findOne({
            where: {correoElectronico: employee.correoElectronico},
        })

        if(user) {
            return res.status(400).json({
                message: "Lo sentimos, la cuenta ya existe",
            })
        }

        let contrasenaNueva = await bcrypt.hash(empleadoAsesor.contrasena, 10)

        user = {...empleadoAsesor, contrasena: contrasenaNueva}

        await Employee.create(user)
        await Assessor.create({ idAssessor: employee.idEmployee })
        // return res.status(201).json({employee: empleadoAsesor})

        console.log("************USUARIO", user)
        const payload = {
            idEmployee: user.idEmployee,
        }
        jwt.sign(
            payload,
            process.env.AUTH_SECRET,
            { expiresIn: 10800 },
            (err, token) => {
                return res.status(201).json({
                    data: token,
                });
            }
        )
    } 
    catch(err) {
        next(err);
        }
    }
)

// Endpoint para actualizar los datos de un asesor
router.patch('/:idEmployee/assessor', async (req, res, next) => {

    const { idEmployee } = req.params;
    const { employee } = req.body.body;

    try{
        let empleadoExiste = await Employee.findByPk(idEmployee)
        let empleadoEsAsesor = await Assessor.findByPk(idEmployee)
    
        if(empleadoExiste && empleadoEsAsesor) {
            await empleadoExiste.update(employee)
            await empleadoEsAsesor.update({idAssessor: employee.idEmployee})
            let {
                idEmployee,
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                correoElectronico,
                numTelefono,
                puesto,
            } = empleadoExiste
            return res.status(200).json({
                empleadoActualizado: {idEmployee, nombre, apellidoPaterno, apellidoMaterno, correoElectronico, numTelefono, puesto}
            })
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "El asesor que intentas modificar no existe :("
                })
            }
        } catch(err) {
            next(err);
        }
    }
)

// Endpoint para mostrar los datos de un analista que se desee editar 
router.get('/analyst', async(req, res, next) => {
    const { thisAnalyst: idEmployee } = req.query

    try {
        let datosEmpleado = await Employee.findAll({
            attributes:
                ['idEmployee', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'correoElectronico', 'numTelefono'],
            where: {
                idEmployee
            } 
        }) 
        let datosAnalista = await Analyst.findAll({
            attributes:
                ['departamento'],
            where: {
                idAnalyst: idEmployee
            }
        })

        if(datosEmpleado && datosAnalista) {
            return res.status(200).json({
                datosEmpleado: datosEmpleado[0],
                datosAnalista: datosAnalista[0]})
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "Lo sentimos, el analista no existe :("
            })
        } 
    } catch (err) {
        next(err)
        }
    }
)

// Endpoint para mostrar los datos de un asesor que se desee editar 
router.get('/assessor', async(req, res, next) => {

    const { thisAssessor: idEmployee } = req.query

    try {
        let datosEmpleado = await Employee.findAll({
            attributes:
                ['idEmployee', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'correoElectronico', 'numTelefono', 'puesto'],
            where: {
                idEmployee
            } 
        })

        let datosTienda = await Store.findAll({
            attributes:
                ['idStore','nombreTienda','tiendaAcro'],
            where: {
                idAssessor: idEmployee
            }
        })

        if(datosEmpleado && datosTienda) {
            return res.status(200).json({
                datosEmpleado: datosEmpleado[0], 
                datosTienda})
        } 
        else {
            return res.status(404).json({
                name: "Not Found",
                message: "Lo sentimos, el asesor no existe :("
                }
            )
        } 
    }   catch (err) {
            next(err)
        }
    }
)

// Endpoint para mostrar los datos de un empleado que se desee eliminar
router.get('/:idEmployee', (req, res, next) => {
    const { idEmployee } = req.params;

    Employee.findByPk(idEmployee) 
        .then ((empleado) => {
            if (empleado) {
                const { idEmployee, nombre, apellidoPaterno, apellidoMaterno } = empleado;
                const datosEmpleado = { idEmployee, nombre, apellidoPaterno, apellidoMaterno }
                return res.status(200).json({datosEmpleado: datosEmpleado})
            } else {
                return res.status(404).json({
                    name: "Not Found",
                    message: "El empleado que buscas no existe :("
                })
            }
        }) 
        .catch (
            (err) => next(err)
        )
    }
)

// Endpoint para eliminar los datos de un empleado
router.delete('/:idEmployee', async (req, res, next) => {

    const { idEmployee } = req.params;

    try {
        let empleado = await Employee.findByPk(idEmployee)
        if(empleado){
            await empleado.destroy()
            return res.status(200).json({
                empleadoEliminado: empleado
            })
        }
        else{
            return res.status(404).json({
                name: "Not found",
                message: "El empleado que intentas eliminar no existe :("
            })
        }
    } catch(err){
        next(err);
        }
    }  
)

// Endpoint para obtener los datos de todos los empleados
router.get('/', async (req, res, next) => {
    try {
        if(req.query.name){
            let empleados = await Employee.findAll({attributes:
                ['idEmployee','nombre', 'apellidoPaterno', 'apellidoMaterno', 'puesto'],  
                where: {[Op.or]: [
                            { 'nombre': { [Op.like]: '%' + req.query.name + '%' } },
                            { 'apellidoPaterno': { [Op.like]: '%' + req.query.name + '%' } }
                            ]
                },
                order: [['createdAt', 'DESC']] 
               }) 

            return res.status(200).json({empleados})
        }
        
        else{
            let empleados = await Employee.findAll({attributes:
                ['idEmployee','nombre', 'apellidoPaterno', 'apellidoMaterno', 'puesto'], 
                order: [['createdAt', 'DESC']]}) 
                
            return res.status(200).json({empleados})
        }
    } catch (error) {
        next(error)
    }

})


//Endpoint para crear un usuario con credenciales validas desde Insomnia
router.post('/signup', async(req, res, next)=> {
    const { body } = req.body;
    console.log("body", body)

    try {
        //Buscar al usuario para saber si es que ya está registrado
        let user = await Employee.findOne({
            where: {correoElectronico: body.correoElectronico},
        })

        
        if(user) {
            return res.status(400).json({
                message: "Lo sentimos, la cuenta ya existe",
            })
        }

        let contrasenaNueva = await bcrypt.hash(body.contrasena, 10)

        user = {...body, contrasena: contrasenaNueva}
        
        await Employee.create(user)

        console.log("************USUARIO", user)

        const payload = {
            idEmployee: user.idEmployee,
        }

        jwt.sign(
            payload,
            process.env.AUTH_SECRET,
            { expiresIn: 10800 },
            (err, token) => {
                return res.status(201).json({
                    data: token,
                });
            }
        )

    } catch(error) {
        next(error);
        }
})


//Endpoint para validar las credenciales con bcrypt
router.post('/login', async (req, res, next)=> {
    const { body } = req.body;

    try {
        const user = await Employee.findOne({
            where: {
                correoElectronico: body.correoElectronico,
            }
        })

        if (!user) {
            return res.status(401).json({
                data: 'Credenciales no válidas',
            })
        }

        const isMatch = await bcrypt.compare(
            body.contrasena,
            user.contrasena,
        )

        if (!isMatch) {
            return res.status(401).json({
                data: 'Credenciales no válidas',
            })
        }

        const payload = {
            idEmployee: user.idEmployee,
        }

        jwt.sign(
            payload,
            process.env.AUTH_SECRET,
            { expiresIn: 10800 },
            (err, token) => {
                console.log(token)
                return res.status(201).json({
                    data: token,
                });
            }
        )

    } catch (error) {
    
    }
})

// Se exporta el router
module.exports = router