import { Router } from "express";
import {getEmployees,createEmployee,updateEmployee,deleteEmployee, getEmployeesById} from "../controllers/employees.controller.js";

const router = Router()

router.get('/employes',getEmployees)
router.get('/employes/:id',getEmployeesById)
router.post('/employes',createEmployee)
router.patch('/employes/:id',updateEmployee)
router.delete('/employes/:id',deleteEmployee)

export default router