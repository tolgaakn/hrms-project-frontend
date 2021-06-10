import axios from "axios"

export default class ConfirmByEmployee{
    getConfirmsByEmployee(){
        return axios.get("http://localhost:8080/api/confirmbyemployees/getall")
    }
}