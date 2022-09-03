
//this arrow function for getting the information from all category news API 
const getAllCategoryNewsFromApi = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => processAllCategoryNews(data.data.news_category))
};
getAllCategoryNewsFromApi()

// this arrow function for process and set the data which got from all category news API 
const processAllCategoryNews = (categories) => {
    const allCategoryNewsContainer = document.getElementById('all-category-news-container');

    categories.forEach(category => {
        const creatCategoryButton = document.createElement('button');
        creatCategoryButton.id = `${category.category_id}`;
        creatCategoryButton.classList.add('mx-2');
        // console.log(category)
        creatCategoryButton.innerHTML = `${category.category_name}`;
        allCategoryNewsContainer.appendChild(creatCategoryButton);
    });
};

// this event handler for get and set category name and ID 
document.getElementById('all-category-news-container').addEventListener('click', function(event){
    getSngleCategoryNewsFromApi(event.target.id, event.target.innerText)
});

//this arrow function for getting the information from single category news API
const getSngleCategoryNewsFromApi= (newsCategoryID, newsCategoryName) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${newsCategoryID}`)
    .then(res => res.json())
    .then(data => processSingleCategoryNews(data.data, newsCategoryName))
};
// getSngleCategoryNewsFromApi();
// this arrow function for process and set the data which got from single category news API
const processSingleCategoryNews = (singleCategory, newsCategoryName) => {

    const singleNewsContainer = document.getElementById('single-news-container');
    singleNewsContainer.innerHTML = '';

    const newsCountDisplay = document.getElementById('news-count-display');
    newsCountDisplay.innerHTML = '';

    if(singleCategory.length > 0 && newsCategoryName){
      newsCountDisplay.innerText = `${singleCategory.length} items found for category ${newsCategoryName}`;
    }else{
      newsCountDisplay.innerText = `No items found for category ${newsCategoryName}`;
    };

    singleCategory.forEach(singleNews => {
        const {thumbnail_url, title, details, author, total_view} = singleNews;
        console.log(singleNews)
        const creatSingleNewsDiv = document.createElement('div');
        creatSingleNewsDiv.innerHTML = `
        <div class="card lg:card-side bg-white shadow-xl p-3 my-6">
        <figure><img src="${thumbnail_url}" alt="Album"></figure>
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p>${details.slice(0,400)}...</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div class="flex">
              <img class="w-12 rounded-full" src="${author.img}" alt="">
              <div class="ml-2">
                <p class="font-semibold">${author.name}</p>
                <p>${author.published_date}</p>
              </div>
            </div>
            <div>
                <i class="fa-regular fa-eye"></i>
                <span class="ml-1 font-bold">${total_view}</span>
            </div>
            <div>
                <i class="fa-solid fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
            <button class="btn btn-primary">Details</button>
          </div>
        </div>
      </div>        
        `;
        singleNewsContainer.appendChild(creatSingleNewsDiv);
    });
    
};