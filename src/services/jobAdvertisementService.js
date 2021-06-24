import axios from "axios"

export default class JobAdvertisementService{
    getJobAdvertisements(){
        return axios.get("http://localhost:8080/api/jobadvertisements/getAllSortedAscByIsActive")
    }

    getJobAdvertisementsByJobPositionAndCity(jobPositionId, cityId){
        return axios.get("http://localhost:8080/api/jobadvertisements/getJobAdvertisementDetailsByJobPositionIdAndCityId?cityId=" + cityId + "&jobPositionId=" + jobPositionId)
    }

    getById(advertisementId){
        return axios.get("http://localhost:8080/api/jobadvertisements/getJobAdvertisementDetailsById?advertisementId=" + advertisementId)
    }

    add(values){
        return axios.post("http://localhost:8080/api/jobadvertisements/add", values)
    }
}