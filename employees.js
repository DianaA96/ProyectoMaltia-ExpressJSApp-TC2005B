const express = require('express');
const router = express.Router();
const { Employee, Analyst } = require('./database');
const { Assessor } = require('./database');

// Endpoint para actualizar los datos de un analista
router.patch('/:idEmployee/analysts/:idAnalyst', async (req, res, next) => {
    const { idEmployee, idAnalyst } = req.params;
    const { employee, analyst } = req.body;

    try{
        let empleado = await Employee.findByPk(idEmployee)
        let analista = await Analyst.findByPk(idAnalyst)

        if(empleado && analista) {
            await empleado.update(employee)
            await analista.update(analyst)
            return res.status(200).json({
                empleadoActualizado: empleado,
                analistaActualizado: analista
            })
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "El empleado que intentas modificar no existe :("
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
    
    try {
        console.log(employee)
        await Employee.create(employee)
        let nuevoUsuario = Employee.findByPk(employee.idEmployee)
        console.log(nuevoUsuario)
        if(nuevoUsuario) {
            await Analyst.create(analyst)
            return res.status(201).json({empleado: employee, analista: analyst})
        }
    } catch(err) {
        next(err);
    }
})

// Endpoint para crear un asesor
router.post('/assessors', async (req, res, next) => {
    
    const { employee, assessor } = req.body
    
    try {
        console.log('Ya entré al try')
        console.log(employee)
        await Employee.create(employee)
        console.log('Ya creé al empleado')
        let nuevoUsuario = Employee.findByPk(employee.idEmployee)
        console.log(nuevoUsuario)
        if(nuevoUsuario) {
            await Assessor.create(assessor)
            return res.status(201).json({empleado: employee, asesor: assessor})
        }
    } catch(err) {
        next(err);
    }
})

// Endpoint para actualizar los datos de un asesor
router.patch('/:idEmployee', async (req, res, next) => {
    const { idEmployee } = req.params;
    const { employee } = req.body;

    try{
        let empleado = await Employee.findByPk(idEmployee)

        if(empleado) {
            await empleado.update(employee)
            return res.status(200).json({
                empleadoActualizado: empleado
            })
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "El empleado que intentas modificar no existe :("
                })
            }
        } catch(err) {
            next(err);
        }
    }
)

// Endpoint para mostrar los datos de un empleado que se desee eliminar
router.get('/:idEmployee', async (req, res, next) => {
    const { idEmployee } = req.params;

    Employee.findByPk(idEmployee) 
        .then ((empleado) => {
            const { idEmployee, nombre, apellidoPaterno, apellidoMaterno } = empleado;
            const datosEmpleado = { idEmployee, nombre, apellidoPaterno, apellidoMaterno }
            return res.status(200).json({datosEmpleado: datosEmpleado})
        }) .catch (
            (err) => next(err)
        )
    }
)

// Endpoint para eliminar los datos de un empleado que se desee eliminar
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
    }

    catch(err){
        next(err);
    }
    
})

// Endpoint para obtener los datos de todos los empleados
router.get('/', (req, res, next) => {
    Employee.findAll({attributes:
     ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'puesto']
    }) .then ((allEmployees) => {
            return res.status(200).json({empleados: allEmployees})
        }) .catch (
            (err) => next(err)
        )
})


module.exports = router