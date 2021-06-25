import axios from "axios"

export default class ConfirmByEmployeeService{
    getConfirmsByEmployee(){
        return axios.get("http://localhost:8080/api/confirmbyemployees/getall")
    }
}