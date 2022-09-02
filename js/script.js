

const getAllCategoryNewsFromApi = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => processAllCategoryNews(data.data.news_category))
};
getAllCategoryNewsFromApi()

const processAllCategoryNews = (categories) => {
    const allCategoryNewsContainer = document.getElementById('all-category-news-container');

    categories.forEach(category => {
        const creatCategoryButton = document.createElement('button');
        creatCategoryButton.id = `${category.category_id}`;
        console.log(category)
        creatCategoryButton.innerHTML = `${category.category_name}`;
        allCategoryNewsContainer.appendChild(creatCategoryButton);
    });
    
};