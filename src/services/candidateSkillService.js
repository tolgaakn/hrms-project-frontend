import axios from "axios";

export default class CandidateSkillService{
    getCandidateSkillsByCurriculumVitaeId(curriculumVitaeId){
        return axios.get("http://localhost:8080/api/candidateSkills/getByCurriculumVitaesId?curriculumVitaeId=" + curriculumVitaeId)
    }

    add(values){
        return axios.post("http://localhost:8080/api/candidateSkills/add", values)
    }
}