import axios from "axios";

class TaskService {

    static key = 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c';

    static baseURL = 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io';

    static getTasks() {
        return axios.get(`${this.baseURL}/get`, {
            headers: {
                'X-Api-Key': this.key,
            }
        });
    }

    static updateTask(id : string) {
        return axios.patch(`${this.baseURL}/patch/${id}`, {
            isComplete: true,
        }, {
            headers: {
                'X-Api-Key': this.key,
            }
        });
    }
}

export default TaskService;