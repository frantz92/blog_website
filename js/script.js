'use strict';

/* Variables */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = '4',
  optCloudClassPrefix = 'tag-size-';
  //optTagsListSelector = '.tags.list';

/* Title Click Handler */
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  let referenceLink = clickedElement.getAttribute('href');
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const choosenArticle = document.querySelector(referenceLink);
  /* [DONE] add class 'active' to the correct article */
  choosenArticle.classList.add('active');
}

/* Title Generate Links */
function generateTitleLinks(customSelector = ''){
  let html = '';
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    /* [DONE] get the text from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
    /* [DONE] insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();

/* Title Click Event */
const titleLinks = document.querySelectorAll('.titles a');
for(let link of titleLinks){
  link.addEventListener('click', titleClickHandler);
}

/* Tag Click Handler */
function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  let href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('.post-tags a.active');
  /* [DONE] START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* [DONE] remove class active */
    activeTag.classList.remove('active');
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const sameTags = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
  for (let sameTag of sameTags){
    /* [DONE] add class active */
    sameTag.classList.add('active');
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

/* Tag Calculate Class */
function calculateTagsClass(count, params){
  //console.log(params);
  //console.log(count);
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
  const resultTagsClass = optCloudClassPrefix + classNumber;
  return(resultTagsClass);
}

/* Tags Generate */
function generateTags(){
  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles){
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    let articleTags = article.getAttribute('data-tags');
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /* [DONE] generate HTML of the link */
      const tagHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      /* [DONE] add generated code to html variable */
      html = html + tagHTML;
      /* [DONE] check if this link is NOT already in allTags */
      if(!Object.prototype.hasOwnProperty.call(allTags, tag)){
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }
  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  //console.log('1: ', tagList);                                                  //Dlaczego pokazuje finalną listę już przy pierwszym wywołaniu? Wypełnienie jest dopiero w 141 linii.
  const tagsParams = calculateTagsParams(allTags);
  //console.log('tagsParams:', tagsParams);
  /* [DONE] create variable for all links HTML code */
  let allTagsHTML = '';
  //console.log('2: ', allTagsHTML);
  /* [DONE] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [DONE] generate code of a link and add it to allTagsHTML */
    //console.log('3: ', tag);
    //console.log('4: ', allTags[tag]);
    const tagLinkHTML = `<li><a class="${calculateTagsClass(allTags[tag], tagsParams)}" href="#tag-${tag}">${tag}</a></li>`;
    console.log('tagLinkHTML: ', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
    //allTagsHTML += tag + '(' + allTags[tag] + ')\n';                          //żadnego <p> czy coś? To jak to jest zapisane w HTML, żeby się odwołaś w CSS? Dlaczego nie działa '\n'?
    //console.log('5: ', allTagsHTML);
  }
  /* [IN PROGRESS] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}                                                                               //Dlaczego mam na końcu listę tekstu a nie linków (niebieskie, podkreślone)?

calculateTagsParams();
generateTags();

/* Tag Click Listener */
const tagLinks = document.querySelectorAll('.post-tags .list a');
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

/* [IN PROGRESS] Tags Params Calculate */
function calculateTagsParams(tags){
  const params = {max:0, min:999999};
  for (let tag in tags){
    // console.log(tag + ' is used ' + tags[tag] + ' times');
    if(params.max < tags[tag]){
      params.max = tags[tag];
    }
    if(params.min > tags[tag]){
      params.min = tags[tag];
    }
  }
  return params;
}
