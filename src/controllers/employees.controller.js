import { pool } from "../db.js";

export const getEmployees = async (rep,res) => {
    try {
        const [result] = await pool.query("SELECT * FROM employee")
        res.send({result})
    } catch (error) {
        res.status(500).json({
            message: "error"
        })
    }
}

export const getEmployeesById = async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT * FROM employee WHERE employee.id = ?',[req.params.id])
        if(result.length <= 0) {
            return res.status(404).json({
                message:"Employee not found"
            })
        }
        res.send({result})
    } catch (error) {
        res.status(500).json({
            message:"Error"
        })
    }
}

export const createEmployee = async (req,res)=> {
    try {
        const {name,salary} = req.body
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES(?,?)',[name,salary])    
        console.log(name);
        res.send({rows})
    } catch (error) {
        res.status(500).json({
            message:"Error"
        })
    }
}

export const updateEmployee = async (rep,res)=> {

    try {
        const {id} = rep.params    
        const {name,salary} = rep.body

        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE employee.id = ?',[name,salary,id])
        console.log(result);

        if(result.affectedRows === 0 ){
            return res.status(400).json({
                message:"Employee not found"
            })
        }
        const [user] = await pool.query("SELECT * FROM employee WHERE employee.id = ?",[id])
        res.send(user[0])
    } catch (error) {
        res.status(500).json({
            message:"Error"
        })
    }
}

export const deleteEmployee = async (rep,res)=>{

    try {
        const [result] = await pool.query('DELETE FROM employee WHERE employee.id = ?',[rep.params.id])
        if(result.affectedRows <= 0 ) {
            return res.status(404).json({message: "Employee not found"})
        }        
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            message:"Error"
        })
    }    
}