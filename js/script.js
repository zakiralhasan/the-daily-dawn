

const getAllCategoryNewsFromApi = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => processAllCategoryNews(data.data.news_category))
};
getAllCategoryNewsFromApi()

