import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://newsapi.org',
    headers: {
        'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY
    },
    params: {
        'country':'in',
    },
});

const getNewsHeadlines = (page: number | null = null, pageSize: number | null = null, searchNews: string | null = null) =>
instance({
    'method':'GET',
    'url':`/v2/top-headlines`,
    'params': {
        'pageSize': pageSize,
        'page': page,
        'q': searchNews
    },
})

export {
    getNewsHeadlines
}
    
