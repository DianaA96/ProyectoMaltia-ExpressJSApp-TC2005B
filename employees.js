// Importamos Express, el Router y los modelos necesarios para las queries
const express = require('express');
const router = express.Router();
const { Employee, Analyst } = require('./database');
const { Assessor, Store } = require('./database');

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

// Endpoint para crear un analista 
router.post('/analysts', async (req, res, next) => {
    
    const { employee, analyst } = req.body
    let empleadoAnalista =  employee
    empleadoAnalista.puesto = "Analista"
    
    try {
        await Employee.create(empleadoAnalista)
        await Analyst.create({ 
            idAnalyst: employee.idEmployee,
            departamento: analyst.departamento
            })
        let {idEmployee, nombre, apellidoPaterno, apellidoMaterno, correoElectronico, numTelefono, puesto} = empleadoAnalista
        return res.status(201).json({
            idEmployee, 
            nombre, 
            apellidoPaterno, 
            apellidoMaterno, 
            correoElectronico, 
            numTelefono, 
            puesto
        })
    } catch(err) {
        next(err);
        }
    }
)

// Endpoint para crear un asesor 
router.post('/assessors', async (req, res, next) => {
    
    const { employee } = req.body
    let empleadoAsesor =  employee
    empleadoAsesor.puesto = "Asesor"
    
    try {
        await Employee.create(empleadoAsesor)
        await Assessor.create({ idAssessor: employee.idEmployee })
        return res.status(201).json({employee: empleadoAsesor})
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
router.get('/', (req, res, next) => {
    Employee.findAll({attributes:
    ['idEmployee','nombre', 'apellidoPaterno', 'apellidoMaterno', 'puesto']}) 
    .then ((allEmployees) => {
            return res.status(200).json({empleados: allEmployees})
            }) 
    .catch (
        (err) => next(err)
        )
    }
)

// Se exporta el router
module.exports = router