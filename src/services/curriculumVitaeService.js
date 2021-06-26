import axios from "axios"

export default class CurriculumVitaeService{
    getCurriculumVitaes(){
        return axios.get("http://localhost:8080/api/curriculumVitaes/getall")
    }

    getCurriculumVitaesByCandidateId(candidateId){
        return axios.get("http://localhost:8080/api/curriculumVitaes/getByCandidateId?candidateId=" + candidateId)
    }

    getCurriculumVitaesById(id){
        return axios.get("http://localhost:8080/api/curriculumVitaes/getById?id=" + id)
    }

    add(values){
        return axios.post("http://localhost:8080/api/curriculumVitaes/add", values)
    }
}