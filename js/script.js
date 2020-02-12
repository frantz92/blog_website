'use strict';
                                              /* Code Options Section */
/* Variables */
const opts = {
  tagSizes: {
    count: 4,   // nie działa opts.tagSizes.count w 117 linii
    cloudClassPrefix: 'tag-size-',
  },

  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  authorListSelector: '.authors',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',

};
                                              /* Titles Section */
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
  const titleList = document.querySelector(opts.titleListSelector);
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);
  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
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
                                              /* Tags Section */
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
/* Tags Generate */
function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(opts.articleSelector);
  for (let article of articles){
    const tagsWrapper = article.querySelector(opts.articleTagsSelector);
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
generateTags();
/* Tag Click Listener */
function tagClickListener() {
  const tagLinks = document.querySelectorAll('.post-tags .list a, .tags a');
  for(let link of tagLinks){
    link.addEventListener('click', tagClickHandler);
  }
}
tagClickListener();
/* Tag Calculate Class */
function calculateTagsClass(count, params) {
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * opts.tagSizes.count + 1 );   // nie działa opts.tagSizes.count
  const resultTagsClass = opts.cloudClassPrefix + classNumber;
  return(resultTagsClass);
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
calculateTagsParams();
                                              /* Authors Section */
/* Author Click Handler */
function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  let author = clickedElement.textContent;
  console.log(author);
  const listAuthorName = author.split(' ');
  generateTitleLinks('[data-author="' + listAuthorName[0] + (' ') + listAuthorName[1] + '"]');
  titleClickListener();
}
/* Author Generate */
function generateAuthor(){
  let allAuthors = {};
  const articles = document.querySelectorAll(opts.articleSelector);
  for (let article of articles){
    const authorWrapper = article.querySelector(opts.articleAuthorSelector);
    let html = '';
    let articleAuthor = article.getAttribute('data-author');
    const authorHTML = `<p class="post-author">${articleAuthor}</p>`;
    html = html + authorHTML;
    if(!Object.prototype.hasOwnProperty.call(allAuthors, articleAuthor)){
      allAuthors[articleAuthor] = 1;
    }
    else {
      allAuthors[articleAuthor]++;
    }
    authorWrapper.innerHTML = html;
  }
  const authorList = document.querySelector(opts.authorListSelector);
  let allAuthorsHTML = '';
  for(let articleAuthor in allAuthors){
    const authorLinkHTML = `<li><a class="author-name">${articleAuthor} (${allAuthors[articleAuthor]})</a></li>`;
    allAuthorsHTML += authorLinkHTML;
  }
  authorList.innerHTML = allAuthorsHTML;
}
generateAuthor();
/* Author Click Listener */
function authorClickListener() {
  const links = document.querySelectorAll('.post-author, .authors a');
  for(let link of links){
    link.addEventListener('click', authorClickHandler);
  }
}
authorClickListener();
