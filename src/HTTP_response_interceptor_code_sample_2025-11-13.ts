import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && response.data.success === false) {
      return Promise.reject(new Error(response.data.message || 'Request failed'));
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.error('Unauthorized access');
      // window.location.href = '/login'; // Uncomment for redirection
    }
    return Promise.reject(error);
  }
);

interface Data {
  id: number;
  name: string;
}

async function fetchData(id: number): Promise<Data> {
  try {
    const response = await axiosInstance.get<Data>(`/data/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

// Example usage:
// fetchData(1)
//   .then(data => console.log('Data:', data))
//   .catch(error => console.error('Error:', error));