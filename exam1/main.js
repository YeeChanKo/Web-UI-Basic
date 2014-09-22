// [1] 장르 버튼 클릭시 드롭다운 보여주기

var isDropDownShown = false;
var genrebutton = document.getElementById("genre");
var genredropdown = document.getElementById("dropdown");

genrebutton.addEventListener("click",showDropDown,false);
document.body.addEventListener("click",hideDropDownForBody,false);

function showDropDown()
{
    if(isDropDownShown===false)
    {
        isDropDownShown = true;
        genredropdown.style.display = "block";
    }
    else
    {
        isDropDownShown = false;
        genredropdown.style.display = "none";
    }
}

function hideDropDownForBody(e)
{
    if(e.target.id==="genre"){}
    else
    {
        isDropDownShown = false;
        genredropdown.style.display = "none";
    }
}



// [2] 장르 선택시 책 바꿔주기

// to be complete

var sTemplate = "<li><div class='card_preview'><a id='book_image' style='background-image:url(<%=imgUrl%>);' href='<%=endPageLink%>'></a></div><div class='card_details'><div class='card_name'><%=title%></div><div class='card_author'><%=author%></div><div class='card_price'><span class='card_price_number'><%=price%></span></div></div></li>";                                                                                          
function makeBookElement(sTemplate, aBook){
    sTemplate = sTemplate.replace("<%=title%>",aBook.name);
    sTemplate = sTemplate.replace("<%=endPageLink%>",aBook.src);
    sTemplate = sTemplate.replace("<%=imgUrl%>",aBook.imgSrc);
    sTemplate = sTemplate.replace("<%=price%>",aBook.price);
    sTemplate = sTemplate.replace("<%=author%>",aBook.author);
    return sTemplate;
}

function shownewgenre(booklist)
{
    var result ="";
    booklist.forEach(function(item){result += makeBookElement(sTemplate, item);});

    var target = document.querySelector("#content .card_list ul");
    target.innerHTML = result;
}


var genreselect = document.getElementById("dropdown");
genreselect.addEventListener("click",handle,false);
function handle(e)
{
    if(e.target.textContent === "가족 / 관계")
    {
        shownewgenre(aBookList);
    }
    else if(e.target.textContent === "건강 / 웰빙")
    {
        shownewgenre(bBookList);
    }
}



// [3] 더보기 클릭시 책 더 보여주기

function see_more()
{
    var parent = document.getElementById("content");
    var child2 = document.getElementById("weekly_bestseller2");
    var child3 = document.getElementById("weekly_bestseller3");
    parent.removeChild(child2);
    parent.removeChild(child3);

    function showmore(booklist)
    {
        var result ="";
        booklist.forEach(function(item){result += makeBookElement(sTemplate, item);});

        var target = document.querySelector("#content .card_list ul");
        target.insertAdjacentHTML('beforeend',result);
    }
    document.querySelector("#weekly_bestseller1 .card_list ul").style.overflow = "initial";
}

var seemore1 = document.querySelector("#weekly_bestseller1 .see_more");
seemore1.addEventListener("click",see_more,false);




// [4] header 지나면 nav를 fixed로

document.addEventListener("scroll",init,false);
function init(e)
{
    var stickynav = document.querySelector("nav");
    var stickyaside = document.querySelector("aside");
    
    if(document.body.scrollTop>60)
    {
        stickynav.style.position = "fixed";
        stickyaside.style.position = "fixed";
        stickynav.style.top = "0px";
        stickyaside.style.top = "48px";
    }
    else if(document.body.scrollTop<108)
    {
        stickynav.style.position = "absolute";
        stickyaside.style.position = "absolute";
        stickynav.style.top = "initial";
        stickyaside.style.top = "108px";
    }
}




// [5] resize 시 더보기 버튼 위치 변화

window.addEventListener("load",onload,false);
window.addEventListener("resize",onresize,false);

// onload는 모두 여기에
function onload()
{
    seemore_pos_adjust();
    mobilecardlist();
}

// onresize는 모두 여기에
function onresize()
{
    seemore_pos_adjust();
    mobilecardlist();
}

function seemore_pos_adjust()
{
    var seemorelist = document.querySelectorAll(".see_more");
    for(var i =0; i < seemorelist.length; i++)
    {
        var list = seemorelist[i].parentElement.parentElement.children[1].children[0].children;
        var temp = 0;
        var result = 0;
        for(var j = 0; j < list.length; j++)
        {
            if(list[j].offsetLeft > temp)
            {
                temp = list[j].offsetLeft;
            }
            else
            {
                result = temp;
            }
        }
        seemorelist[i].style.left = result + list[0].offsetWidth - seemorelist[i].offsetWidth + "px";
    }
}


// [6] mobile version 카드 리스트 위치변화

function mobilecardlist()
{
    var cardcontent = document.getElementById("content");
    
    if(window.innerWidth <= 480 && window.innerWidth >= 360)
    {
        cardcontent.style.marginLeft = (window.innerWidth - 360)/2 +"px";
    }
}


// [7] Ajax로 데이터 받아오기

var url = "http://localhost:8080/GooglePlayBook/booklist/db_booklist1.json";
var request = new XMLHttpRequest();
request.open("GET", url, false);
request.send(null);
var result = request.responseText;
result = JSON.parse(result);
console.log("hohooho");