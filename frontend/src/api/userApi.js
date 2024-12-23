import axios from 'axios';
const register  = async (username, email, password) => {
    try {
        const response = await axios.post('http://localhost:8090/api/users/register', {"username": username, "email":email, "password":password },{withCredentials:true//set the cookies inside the user browser 
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8090/api/users/login', { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export { register, login };