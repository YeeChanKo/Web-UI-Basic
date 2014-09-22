// [1] 장르 버튼 클릭시 드롭다운 보여주기

var isDropDownShown = false; // 필요한 전역변수

function showDropDown()
{
    var genreDropDown = document.getElementById("dropdown");
    if(isDropDownShown===false)
    {
        isDropDownShown = true;
        genreDropDown.style.display = "block";
    }
    else
    {
        isDropDownShown = false;
        genreDropDown.style.display = "none";
    }
}

function hideDropDown(e)
{
    var genreDropDown = document.getElementById("dropdown");
    if(e.target.id!=="genre")
    {
        isDropDownShown = false;
        genreDropDown.style.display = "none";
    }
}

var genreButton = document.getElementById("genre");
genreButton.addEventListener("click",showDropDown,false);
document.body.addEventListener("click",hideDropDown,false);



// [2] 장르 선택시 Ajax로 데이터 받아와서 책 바꿔주기

//AJAX 받아올때 문제있음
//var ajaxResult = null; // ajax 통신은 비동기적이기 때문에 return을 할 수가 없다. 성공시 여기에 값을 쓸 수 있게 한다. 필요한 전역변수.
//근데 안 받아진다... 이거 해결 어떻게 하나. 여기서 ajax 기다리게
// ajaxResult가 제대로 바뀌는 데는 시간이 걸리기 때문에 기다려야 함.

function ajaxRequestAndParse(url)
{
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
//    request.onreadystatechange = function()
//    {
//        if(request.readyState === 4 && request.status === 200)
//        {
//            ajaxResult = request.responseText;
//            ajaxResult = JSON.parse(ajaxResult);
//        }
//    }
    var ajaxResult = request.responseText;
    ajaxResult = JSON.parse(ajaxResult);
    return ajaxResult;
}

function makeBookElement(aBook){
    var sTemplate = "<li><div class='card_preview'><a id='book_image' style='background-image:url(<%=imgUrl%>);' href='<%=endPageLink%>'></a></div><div class='card_details'><div class='card_name'><%=title%></div><div class='card_author'><%=author%></div><div class='card_price'><span class='card_price_number'><%=price%></span></div></div></li>";
    sTemplate = sTemplate.replace("<%=title%>",aBook.name);
    sTemplate = sTemplate.replace("<%=endPageLink%>",aBook.src);
    sTemplate = sTemplate.replace("<%=imgUrl%>",aBook.imgSrc);
    sTemplate = sTemplate.replace("<%=price%>",aBook.price);
    sTemplate = sTemplate.replace("<%=author%>",aBook.author);
    return sTemplate;
}

function loadBookList(booklist_number) // String 값 반환함
{
    var url = "http://localhost:8080/GooglePlayBook/booklist/db_booklist" + booklist_number + ".json"; 
    var list_result = ajaxRequestAndParse(url);
    var html_result ="";
    list_result.forEach(function(item){html_result += makeBookElement(item);});
    return html_result;
}

function selectNewGenre(e)
{
    var target = document.querySelector("#content .card_list ul");
    
    if(e.target === e.target.parentElement.children.item(0))
    {
        target.innerHTML = loadBookList("1"); // Replace BookList
    }
    else if(e.target === e.target.parentElement.children.item(1))
    {
        target.innerHTML = loadBookList("2");
    }
    seemorePosAdjust();
}

var genreSelect = document.getElementById("dropdown");
genreSelect.addEventListener("click", selectNewGenre, false);



// [3] 더보기 클릭시 책 더 보여주기

function showMore() // 범용적으로 동작하게 바꾸기, selectNewGenre랑 비슷하게 만들면 됨.
{
    var parent = document.getElementById("content");
    var child2 = document.getElementById("weekly_bestseller2");
    var child3 = document.getElementById("weekly_bestseller3");
    parent.removeChild(child2);
    parent.removeChild(child3);

    var target = document.querySelector("#weekly_bestseller1 .card_list ul");
    target.innerHTML += loadBookList("1");
    target.style.overflow = "initial";
    seemorePosAdjust();
}

var seeMore = document.querySelector("#weekly_bestseller1 .see_more");
seeMore.addEventListener("click",showMore,false);




// [4] header 지나면 nav를 fixed로

function stickyNav(e)
{
    var stickynav = document.querySelector("nav");
    var stickyaside = document.querySelector("aside");

    if(document.body.scrollTop>60)
    {
        setCSS(stickynav, {"position" : "fixed", "top" : "0px"});
        setCSS(stickyaside, {"position" : "fixed", "top" : "48px"});
    }
    else if(document.body.scrollTop<108)
    {
        setCSS(stickynav, {"position" : "absolute", "top" : "initial"});
        setCSS(stickyaside, {"position" : "absolute", "top" : "108px"});
    }
}

function setCSS(targetElement, targetCSS) // targetCSS는 object
{
    for (var key in targetCSS)
    {
        eval("targetElement.style." + key + " = \"" + targetCSS[key] + "\";");
        // "key" -> key, "targetCSS[key]" -> value
        // 결과적으로 예를 들어 targetElement.style.position = "fixed"; 와 같은 형태가 됨
    }
}

document.addEventListener("scroll",stickyNav,false);



// [5] resize 시 더보기 버튼 위치 변화

function seemorePosAdjust()
{
    var seemorelist = document.querySelectorAll(".see_more");
    for(var i =0; i < seemorelist.length; i++)
    {
        var list = seemorelist[i].parentElement.parentElement.children[1].children[0].children;
        var temp = 0;
        for(var j = 0; j < list.length; j++) // offsetLeft가 가장 큰, 즉 가장 오른쪽에 있는 bookcard 구하기
        {
            if(list[j].offsetLeft > temp)
            {
                temp = list[j].offsetLeft;
            }
        }
        seemorelist[i].style.left = temp + list[0].offsetWidth - seemorelist[i].offsetWidth + "px";
    }
}


// [6] mobile version 카드 리스트 위치변화

function mobilecardlistPosAdjust()
{
    var cardcontent = document.getElementById("content");

    if(window.innerWidth <= 480 && window.innerWidth >= 350)
    {
        cardcontent.style.marginLeft = (window.innerWidth - 350)/2 +"px";
    }
}



window.addEventListener("load",onload,false);
window.addEventListener("resize",onresize,false);

// onload는 모두 여기에
function onload()
{
    seemorePosAdjust();
    mobilecardlistPosAdjust();
    checkMobileWidthAndSet();
}

// onresize는 모두 여기에
function onresize()
{
    seemorePosAdjust();
    mobilecardlistPosAdjust();
    checkMobileWidthAndSet();
}



// [7] mobile version 좌우 터치시 책내용 바꿔주기 (미완성)

var x_beforeTouch = 0;
var x_afterTouch = 0;

function checkMobileWidthAndSet()
{
    if(window.innerWidth <= 480)
    {
        // 터치 핸들러 추가
    }
    else
    {
        // 터치 핸들러 제거
    }
}

function cardListTouchStart(e)
{
    console.log(event.touches);
    console.log(event.changedTouches);
    console.log(event.targetTouches);
}

var targetList = document.querySelector(".card_list");
targetList.addEventListener("touchstart",cardListTouchStart,false);