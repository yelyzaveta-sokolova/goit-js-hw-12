// У файлі pixabay-api.js зберігай функції для HTTP-запитів.

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32552782-0d4c86680018457e820f20492';

export async function getPictures(name, page = 1, perPage = 15) {
  if (name.includes(' ')) {
    name = name.replace(/\s+/g, '+');
  }

  const searchParams = new URLSearchParams({
    key: KEY,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.statusText);
  }
}