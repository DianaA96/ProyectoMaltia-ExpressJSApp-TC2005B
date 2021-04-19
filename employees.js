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
                message: "El analista que intentas modificar no existe :("
                })
            }
        } catch(err) {
            next(err);
        }
    }
)

// Endpoint para crear un analista 
// (añadirá siempre el rol de analista, incluso si el usuario especifica un rol distinto)
router.post('/analysts', async (req, res, next) => {
    
    const { employee } = req.body
    let empleadoAnalista =  employee
    empleadoAnalista.puesto = "Analista"
    
    try {
        await Employee.create(empleadoAnalista)
        await Analyst.create({ idAnalyst: employee.idEmployee })
        return res.status(201).json({employee: empleadoAnalista})
    } catch(err) {
        next(err);
    }
})

// Endpoint para crear un asesor
// (añadirá siempre el rol de asesor, incluso si el usuario especifica un rol distinto)
router.post('/assessors', async (req, res, next) => {
    
    const { employee } = req.body
    let empleadoAsesor =  employee
    empleadoAsesor.puesto = "Asesor"
    
    try {
        // Consultar la conveniencia del condicional aquí
        // En ambos endpoints ya no es necesario el json con
        // el id del asesor/analista, el endpoint creará ambas instancias
        // con el mismo id.
        // Es necesario ver cómo lograr que ambos inserts se hagan
        // o ninguno xd. 
        await Employee.create(empleadoAsesor)
        await Assessor.create({ idAssessor: employee.idEmployee })
        return res.status(201).json({employee: empleadoAsesor})
    } catch(err) {
        next(err);
    }
})

// Endpoint para actualizar los datos de un asesor
router.patch('/:idEmployee', async (req, res, next) => {
    const { idEmployee } = req.params;
    const { employee } = req.body;

    try{
        //teníamos que verificar que existe en ambas tablas
        //para no modificar empleados que no sean asesores
        // y mantener la integridad de la bd.
        let empleadoExiste = await Employee.findByPk(idEmployee)
        let empleadoEsAsesor = await Asesor.findByPk(idEmployee)

        if(empleadoExiste && empleadoEsAsesor) {
            await empleadoExiste.update(employee)
            await empleadoEsAsesor.update({idAssessor: employee.idEmployee})
            return res.status(200).json({
                empleadoActualizado: empleadoExiste
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