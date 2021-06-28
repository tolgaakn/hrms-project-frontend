import axios from "axios"

export default class CandidateLanguageService{
    getCandidateLanguagesByCurriculumVitaeId(curriculumVitaeId){
        return axios.get("http://localhost:8080/api/candidateLanguages/getByCurriculumVitaesId?curriculumVitaeId=" + curriculumVitaeId)
    }

    add(values){
        return axios.post("http://localhost:8080/api/candidateLanguages/add", values)
    }
}