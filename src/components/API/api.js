import axios from 'axios';

const ServiceAPI = (q, page) => {
  const options = {
    params: {
      key: '26917292-505e6a50e4926f01f0d731ddc',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      q,
      page,
    },
  };

  return axios.get('https://pixabay.com/api/', options);
};

export { ServiceAPI };
