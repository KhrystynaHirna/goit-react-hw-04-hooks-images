const API_KEY = "25789368-636c5d004c25f97cc91a0f5f4";
const BASE_URL = "https://pixabay.com/api/";
const parameters = 'image_type=photo&orientation=horizontal&per_page=12';
const url = `${BASE_URL}?key=${API_KEY}&${parameters}`;

export function ImagesService(input, page) {
  return fetch(`${url}&q=${input}&page=${page}`)
    .then(response => response.json())
    .then(data =>
      data.hits.reduce(
        (acc, key) => [
          ...acc,
          {
            id: key.id,
            webformatURL: key.webformatURL,
            largeImageURL: key.largeImageURL,
          },
        ],
        []
      )
    );
}

