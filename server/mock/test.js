let ary=[{num:1},{num:2},{num:3}];

ary.find(item=>item.num==3).num=10;
console.log(ary);