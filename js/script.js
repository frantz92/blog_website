'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /*  [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  //console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  let referenceLink = clickedElement.getAttribute('href');
  //console.log(referenceLink);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const choosenArticle = document.querySelector(referenceLink);
  //console.log(choosenArticle);

  /* [DONE] add class 'active' to the correct article */
  choosenArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  let html = '';
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  //console.log(titleList);
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log(optArticleSelector);
  //console.log(customSelector);
  for(let article of articles){
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    //console.log(articleId);
    /* [DONE] find the title element */
    /* [DONE] get the text from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log(optTitleListSelector);
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);
    /* [DONE] insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  //console.log(titleList);
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles){
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    let articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray){
      //console.log(tag);
      /* [DONE] generate HTML of the link */
      const tagHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      //console.log(tagHTML);
      /* [DONE] add generated code to html variable */
      html = html + tagHTML;
      //console.log(html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    //console.log(tagsWrapper);
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  //console.log('Tag clicked');
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  let href = clickedElement.getAttribute('href');
  //console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('.post-tags a.active');
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const sameTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
    for (let sameTag of sameTags){
    /* add class active */
    sameTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags .list a');
  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

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
