const child1 = {
    vaule: 2,
    left: null,
    right: null
}
const child3 = {
    vaule: 2,
    left: null,
    right: null
}
const root = {
    value: 1,
    left: child1,
    right: child3
}

function change(root){
    // root = {...root, highlight: true}
    Object.assign(root, {highlight: true})
}
change(root);
console.log(root)