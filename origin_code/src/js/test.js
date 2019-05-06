function Animal(name1,name2,name3){
    this.name1 = name1;
    this.name2 = name2;
    this.name3 = name3;
    this.showName = function(){
        console.log(this.name1,this.name2,this.name3);
    }
}

function Cat(name1,name2,name3){
    Animal.apply(this,[name1,name2,name3]);
}

var cat = new Cat("咕咕",11,22);
cat.showName();

/*call的用法*/
function Dog(name1,name2,name3){
    Animal.call(this,name1,name2,name3);
}

var dog = new Dog('汪汪',11,22)
dog.showName()

function log(){
    console.log.apply(console, arguments);
}
log(1);    //1
log(1,2,3,4);

function log2(){
    console.log.call(console, arguments);
}
log2(1);    //1
log2(1,2,3,4);