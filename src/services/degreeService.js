import axios from "axios";

export default class DegreeService{
    getDegrees(){
        return axios.get("http://localhost:8080/api/degrees/getall")
    }
}