'use strict';
/*-------------------------------------------------------Code Options Section */
/* Handlebars */
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#author-list-link').innerHTML),
};
/* Variables */
const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  authorListSelector: '.authors',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  cloudClassCount: '4',
  cloudClassPrefix: 'tag-size-',
};
/*-------------------------------------------------------------Titles Section */
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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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
/*---------------------------------------------------------------Tags Section */
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
      //const tagHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      const tagHTMLData = {id: tag};
      const tagHTML = templates.tagLink(tagHTMLData);
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
  const allTagsData = {tags: []};
  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagsClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * opts.cloudClassCount + 1 );
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
/*------------------------------------------------------------Authors Section */
/* Author Click Handler */
function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  let author = clickedElement.textContent;
  console.log(author);//confirmation of removing the error
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
    const authorHTMLData = {id: articleAuthor};
    const authorHTML = templates.authorLink(authorHTMLData);
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
  const allAuthorsData = {tags: []};
  for(let articleAuthor in allAuthors){
    allAuthorsData.tags.push({
      name: articleAuthor,
      count: allAuthors[articleAuthor],
    });
  }
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
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
