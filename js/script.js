
//this arrow function for getting the information from all category news API 
const getAllCategoryNewsFromApi = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => processAllCategoryNews(data.data.news_category))
    .catch(error => {
      console.log(error)
    });
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
  // load spinner end
  loadingDisplay.classList.add('hidden');
};

// below line for load spinner section 
const loadingDisplay = document.getElementById('loading-display');

// this event handler for get and set category name and ID 
document.getElementById('all-category-news-container').addEventListener('click', function(event){
    getSngleCategoryNewsFromApi(event.target.id, event.target.innerText);
    // load spinner start 
    loadingDisplay.classList.remove('hidden');
});

//this arrow function for getting the information from single category news API
const getSngleCategoryNewsFromApi= (newsCategoryID, newsCategoryName) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${newsCategoryID}`)
    .then(res => res.json())
    .then(data => processSingleCategoryNews(data.data, newsCategoryName))
    .catch(error => {
      console.log(error)
    });
};

// this arrow function for process and set the data which got from single category news API
const processSingleCategoryNews = (singleCategory, newsCategoryName) => {
    // below section is sorting the news by total view count 
    singleCategory.sort((a, b) => {
    return b.total_view - a.total_view;
    });

    const singleNewsContainer = document.getElementById('single-news-container');
    singleNewsContainer.innerHTML = '';

    const newsCountDisplay = document.getElementById('news-count-display');
    newsCountDisplay.innerHTML = '';

    // below condition for category display validation 
    if(singleCategory.length > 0 && newsCategoryName){
      newsCountDisplay.innerText = `${singleCategory.length} items found for category ${newsCategoryName}`;
    }else{
      newsCountDisplay.innerText = `No items found for category ${newsCategoryName}`;
    };

    singleCategory.forEach(singleNews => {
      // destructuring object
        const {thumbnail_url, title, details, author, total_view, _id} = singleNews;
        console.log(singleNews)
        console.log(_id)
        const creatSingleNewsDiv = document.createElement('div');
        creatSingleNewsDiv.innerHTML = `
        <div class="card lg:card-side bg-white shadow-xl p-3 my-6">
        <figure><img src="${thumbnail_url? thumbnail_url : 'No data found'}" alt="Album"></figure>
        <div class="card-body">
          <h2 class="card-title">${title? title : 'No data found'}</h2>
          <p>${details.slice(0,400)}...</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div class="flex">
              <img class="w-12 rounded-full" src="${author.img? author.img : 'No data found'}" alt="">
              <div class="ml-2">
                <p class="font-semibold">${author.name? author.name : 'No data found'}</p>
                <p>${author.published_date? author.published_date : 'No data found'}</p>
              </div>
            </div>
            <div>
                <i class="fa-regular fa-eye"></i>
                <span class="ml-1 font-bold">${total_view? total_view : 'No data found'}</span>
            </div>
            <div>
                <i class="fa-solid fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
            <label for="${_id}" class="btn modal-button" onclick="getNewsDetailsFromApi('${_id}')">Details</label>
          </div>
        </div>
      </div>        
        `;
        singleNewsContainer.appendChild(creatSingleNewsDiv);
    });
    // load spinner end
    loadingDisplay.classList.add('hidden');
};

//this arrow function for getting the information from details news API
const getNewsDetailsFromApi = (gettingID) => {
  fetch(`https://openapi.programming-hero.com/api/news/${gettingID}`)
  .then(res => res.json())
  .then(data => processNewsDetailsInformation(data.data[0])).catch(error => {
    console.log(error)
  });

};

// this arrow function for process and set the data which got from details news API
const processNewsDetailsInformation = (newsDetails) => {
// destructuring object 
  const {author, details, rating, title, total_view, _id, category_id} = newsDetails;

  const getModalContainer = document.getElementById('modal-container');
  const creatModalSection = document.createElement('div');

  creatModalSection.innerHTML = `
  <input type="checkbox" id="${_id}" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative w-fit h-full">
      <label for="${_id}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="my-3 font-bold">Title: ${title? title : 'No data found'}</h3>
      <h3 class="my-2"><span class="font-semibold">Author Name:</span> ${author.name? author.name : 'No data found'}</h3>
      <h3 class="my-2"><span class="font-semibold">ID:</span> ${_id? _id : 'No data found'}</h3>
      <h3 class="my-2"><span class="font-semibold">Category ID:</span> ${category_id? category_id : 'No data found'}</h3>
      <p class="my-2"><span class="font-semibold">Published date:</span> ${author.published_date? author.published_date : 'No data found'}</p>
      <p class="my-2"><span class="font-semibold">Rating number:</span> ${rating.numbers? rating.numbers : 'No data found'}</p>
      <p class="my-2"><span class="font-semibold">Rating badge:</span> ${rating.badgers? rating.badgers : 'No data found'}</p>
      <p class="my-2"><span class="font-semibold"><span class="font-semibold">Total view:</span></span> ${total_view? total_view : 'No data found'}</p>
      <p class="my-2"><span class="font-semibold">Details:</span> ${details? details : 'No data found'}</p>      
    </div>
  </div>
  `;
  getModalContainer.appendChild(creatModalSection);
};
