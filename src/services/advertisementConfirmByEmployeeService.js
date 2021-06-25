import axios from "axios";

export default class AdvertisementConfirmByEmployeeService{
    getJobAdvertisementConfirmRequests(){
        return axios.get("http://localhost:8080/api/advertisementConfirmsByEmployees/getJobAdvertisementConfirmRequests")
    }

    confirmAdvertisement(advertisementId, employeeId){
        return axios.get("http://localhost:8080/api/advertisementConfirmsByEmployees/activateAdvertisement?advertisementId="+ advertisementId +"&employeeId=" + employeeId)
    }
}