import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36848013-2cc9692d3de991e0d783c21cd';

const END_PATH = 'image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async (searchQuery, page) => {
  try {
    const URL = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&${END_PATH}`;

    const data = await axios.get(URL);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const api = {
  fetchImages,
};
