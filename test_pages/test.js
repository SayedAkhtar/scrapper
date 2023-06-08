var mainBody = document.querySelector('main');
console.log(mainBody);

var children = mainBody.children;
do{
    child = children[0];
    children = children[0].children;
    if(child.src != undefined){
        console.log(child.src);
    }
    // console.log(child);
}while(children.length > 0);