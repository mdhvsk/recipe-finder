import axios from 'axios'

const API_URL = 'http://localhost:3001/trial'; // Change to match your API endpoint

export const fetchRecipes = async (ingredients: string[]) => {
    try {
        const response = await axios.post(API_URL, { ingredients });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

export const getTrial = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (e) {
        console.error('Error fetching trial get', e)
        throw e
    }
}