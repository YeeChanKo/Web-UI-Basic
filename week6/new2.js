var aBookList = [

    {

        id : "book-iLQ5BAAAQBAJ",

        name : "아서왕과 원탁의 기사들",

        imgSrc : "http://goo.gl/tfHw4e",

        src : "http://goo.gl/65Im7q",

        author : "토머스 불핀치"

    },

    {

        id : "book-jLQ5BADJFIEWL",

        name : "어린왕자",

        imgSrc : "http://goo.gl/pDXdVo",

        src : "http://goo.gl/aSvgGF",

        author : "앙투안 드 생텍쥐페리"

    }

];

var sTemplate = "<h2><%=title%></h2><div><a href='<%=endPageLink%>'><img src='<%=imgUrl%>'></a></div>"
makeBookElement(sTemplate, aBookList); 
// “<h2>어린왕자</h2><div><a href='http://goo.gl/aSvgGF'><img src='http://goo.gl/pDXdVo'></a></div>"



var aBookList = [
    {
        id : "book-iLQ5BAAAQBAJ",
        name : "아서왕과 원탁의 기사들",
        imgSrc : "http://goo.gl/tfHw4e",
        src : "http://goo.gl/65Im7q",
        author : "토머스 불핀치"
    },
    {
        id : "book-jLQ5BADJFIEWL",
        name : "어린왕자",
        imgSrc : "http://goo.gl/pDXdVo",
        src : "http://goo.gl/aSvgGF",
        author : "앙투안 드 생텍쥐페리"
    }
];

var sTemplate = "<h2><%=title%></h2><div><a href='<%=endPageLink%>'><img src='<%=imgUrl%>'></a></div>";

function makeBookElement(sTemplate, aBook){
    sTemplate = sTemplate.replace("<%=title%>",aBook.name);
    sTemplate = sTemplate.replace("<%=endPageLink%>",aBook.src);
    sTemplate = sTemplate.replace("<%=imgUrl%>",aBook.imgSrc);
    return sTemplate;
}

var result ="";
aBookList.forEach(function(item)
                  {
                      result += makeBookElement(sTemplate, item);
                  });

result;