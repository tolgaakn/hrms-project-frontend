import axios from "axios"

export default class CandidateEducationService{
    getCandidateExperiencesByCurriculumVitaeId(curriculumVitaeId){
        return axios.get("http://localhost:8080/api/candidateExperiences/getByCurriculumVitaeId?curriculumVitaeId=" + curriculumVitaeId)
    }
}