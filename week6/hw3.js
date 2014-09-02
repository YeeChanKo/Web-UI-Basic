숙제1
-----------------------------------------------
var wrapdiv = document.getElementById("wrap");
var target = wrapdiv.children[0].children[2];
var newnode = document.createElement("li");
newnode.textContent = "쇼핑";
wrapdiv.children[0].insertBefore(newnode,target);

숙제2
-----------------------------------------------
var aBookList = [
    {
        id : "book-iLQ5BAAAQBAJ",
        name : "아서왕과 원탁의 기사들",
        imgSrc : "http://goo.gl/tfHw4e",
        src : "http://goo.gl/65Im7q",
        author : "토머스 불핀치",
        price : "₩9500"
    },
    {
        id : "book-jLQ5BADJFIEWL",
        name : "어린왕자",
        imgSrc : "http://goo.gl/pDXdVo",
        src : "http://goo.gl/aSvgGF",
        author : "앙투안 드 생텍쥐페리",
        price : "₩5000"
    }
];

var sTemplate = "<li><div class='card_preview'><a id='book_image' style='background-image:url(<%=imgUrl%>);' href='<%=endPageLink%>'></a></div><div class='card_details'><div class='card_name'><%=title%></div><div class='card_author'><%=author%></div><div class='card_price'><span class='card_price_number'><%=price%></span></div></div></li>";                                                                                          
function makeBookElement(sTemplate, aBook){
    sTemplate = sTemplate.replace("<%=title%>",aBook.name);
    sTemplate = sTemplate.replace("<%=endPageLink%>",aBook.src);
    sTemplate = sTemplate.replace("<%=imgUrl%>",aBook.imgSrc);
    sTemplate = sTemplate.replace("<%=price%>",aBook.price);
    sTemplate = sTemplate.replace("<%=author%>",aBook.author);
    return sTemplate;
}

function shownewgenre()
{
    var result ="";
    aBookList.forEach(function(item){result += makeBookElement(sTemplate, item);});

    var target = document.querySelector("#content .card_list ul");
    target.insertAdjacentHTML('afterbegin',result);
}


var genreselect = document.getElementById("dropdown");
genreselect.addEventListener("click",handle,false);
function handle(e)
{
    if(e.target.innerHTML === "가족 / 관계")
    {
        shownewgenre();
    }
}