function paw(a,b)
{
    if(b==0)
    {
        return 1;
    }
    else
    {
        return a * paw(a,b-1);
    }
}

// for 이용
var aMyBookList =[["생각버리기연습",12300],["자아의발견",9900],["하늘과바람과별과시",4000],["기획의정석",4000]];
var aList = getExpensiveBook(aMyBookList);

function getExpensiveBook(BookList)
{
    var NewList=[];
    for(var i = 0 ; i<BookList.length;i++)
    {
        if(BookList[i][1]>10000)
        {
            NewList[i] = BookList[i][0];
        }
    }
    return NewList;
    
    var result = BookList.filter(function(item){return item[1]>10000?item[0]:});
}

console.log(aList);

    
// filter, map 이용
var aMyBookList =[["생각버리기연습",12300],["자아의발견",9900],["하늘과바람과별과시",4000],["기획의정석",4000]];
var aList = getExpensiveBook(aMyBookList);

function getExpensiveBook(BookList)
{
    
    var result = BookList.filter(function(item) {
      if(item[1]>10000)
      {
          return item;
      }
    }).map(function(item){
        return item[0];
    });
    return result;
}

console.log(aList);
    
function _callback1(item)
    {
        
    }