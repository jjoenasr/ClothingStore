import axiosInstance from "./apiservice";

export const register = async (first_name: string, last_name: string, email: string, phone:string, password: string) => {
    try {
      const response = await axiosInstance.post(`/api/v1/users/`, { first_name, last_name, email, phone, password });
      return response.data;
    } catch (error) {
      console.error('Error registering new user:', error);
      throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(`/api/v1/login/`, {email, password});
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getProfile = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
};
