import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// list of all end points
export const addTodo = (data) => API.post('/api/todos/', data)
export const fetchTodos = (data) => API.get('/api/todos/')


export default API;