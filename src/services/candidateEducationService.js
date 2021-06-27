import axios from "axios"

export default class CandidateEducationService{
    getCandidateEducationsByCurriculumVitaeId(curriculumVitaeId){
        return axios.get("http://localhost:8080/api/candidateEducations/getByCurriculumVitaeId?curriculumVitaeId=" + curriculumVitaeId)
    }

    add(values){
        return axios.post("http://localhost:8080/api/candidateEducations/add", values)
    }
}