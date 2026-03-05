import axios from "axios";


//calls springboot backend 
//Attach jwt automatically

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
});

// 🔐 Attach JWT automatically
axiosInstance.interceptors.request.use(//before sending request run some code Modify request if needed
  (config) => {
    const token = localStorage.getItem("token");//get token from local storage
    if (token) {  //if token exists
      config.headers.Authorization = `Bearer ${token}`; //add this header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;