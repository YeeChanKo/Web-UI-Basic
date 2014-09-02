var aMyBookList =[["생각버리기연습",12300],["자아의발견",9900],["하늘과바람과별과시",4000],["기획의정석",4000]];
var aList = getExpensiveBook(aMyBookList);

function getExpensiveBook(BookList)
{
    var _callback1 = function(item)
    {
        return item[1] >= 10000;
    }

    var _callback2 = function(item)
    {
        return item[0];
    }
    return result = BookList.filter(_callback1).map(_callback2);
}

console.log(aList);