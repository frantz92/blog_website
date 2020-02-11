'use strict';

/* Variables */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = '4',
  optCloudClassPrefix = 'tag-size-';

/* Title Click Handler */
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  let referenceLink = clickedElement.getAttribute('href');
  const choosenArticle = document.querySelector(referenceLink);
  choosenArticle.classList.add('active');
}

/* Title Generate */
function generateTitleLinks(customSelector = ''){
  let html = '';
  const titleList = document.querySelector(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();

/* Title Click Listener */
function titleClickListener() {
  const titleLinks = document.querySelectorAll('.titles a');
  for(let link of titleLinks){
    link.addEventListener('click', titleClickHandler);
  }
}

titleClickListener();

/* Tag Click Handler */
function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  let href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('.post-tags a.active');
  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
  }
  const sameTags = document.querySelectorAll('a[href="' + href + '"]');
  for (let sameTag of sameTags){
    sameTag.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
  titleClickListener();
}

/* Tag Calculate Class */
function calculateTagsClass(count, params){
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
  const resultTagsClass = optCloudClassPrefix + classNumber;
  return(resultTagsClass);
}

/* Tags Generate */
function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    let articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray){
      const tagHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      html = html + tagHTML;
      if(!Object.prototype.hasOwnProperty.call(allTags, tag)){
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;
  }
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';
  for(let tag in allTags){
    const tagLinkHTML = `<li><a class="${calculateTagsClass(allTags[tag], tagsParams)}" href="#tag-${tag}">${tag}</a></li>`;
    allTagsHTML += tagLinkHTML;
  }
  tagList.innerHTML = allTagsHTML;
}

calculateTagsParams();
generateTags();

/* Tag Click Listener */
const tagLinks = document.querySelectorAll('.post-tags .list a, .tags a');
for(let link of tagLinks){
  link.addEventListener('click', tagClickHandler);
}

/* Author Click Handler */
function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  let author = clickedElement.textContent;
  console.log(author);
  generateTitleLinks('[data-author="' + author + '"]');
  titleClickListener();
}

/* Author Generate */
function generateAuthor(){
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    let html = '';
    let articleAuthor = article.getAttribute('data-author');
    const authorHTML = `<p class="post-author">${articleAuthor}</p>`;
    html = html + authorHTML;
    authorWrapper.innerHTML = html;
  }
}

generateAuthor();

/* Author Click Listener */
const links = document.querySelectorAll(optArticleAuthorSelector);
for(let link of links){
  link.addEventListener('click', authorClickHandler);
}

/* Tags Params Calculate */
function calculateTagsParams(tags){
  const params = {max:0, min:999999};
  for (let tag in tags){
    if(params.max < tags[tag]){
      params.max = tags[tag];
    }
    if(params.min > tags[tag]){
      params.min = tags[tag];
    }
  }
  return params;
}
