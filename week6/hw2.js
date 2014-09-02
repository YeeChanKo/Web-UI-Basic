숙제1
-----------------------------------------------
function get_li_print_classname()
{
    var ele = document.getElementsByTagName("li");
    for(var i = 0; i < ele.length; i++)
    {
        console.log(ele[i].className);
    }
}


숙제2
-----------------------------------------------
function get_noneclass_elements_length()
{
    var ele = document.querySelectorAll('*:not([class])');
    console.log(ele.length);
}

숙제3
-----------------------------------------------
var ele = document.querySelector('header');
function alertHeaderArea()
{
    alert("header영역입니다");
}
ele.addEventListener("click",alertHeaderArea,false);