class TreeNode{
  constructor(val, left, right){
    this.val = val
    this.left = left
    this.right = right
  }
}
/**
 * 
 * @param {*} arr 
 * @returns root
 */
const arrayToTree = (arr) => {
  if(!arr.length) return null;
  const nodes = arr.map((value) => ({ value, left: null, right: null }));
  for (let i = 0; i < nodes.length; i++) {
    const leftIndex = 2 * i + 1;
    const rightIndex = 2 * i + 2;
    if (leftIndex < nodes.length && nodes[leftIndex].value !== null) nodes[i].left = nodes[leftIndex];
    if (rightIndex < nodes.length && nodes[rightIndex].value !== null) nodes[i].right = nodes[rightIndex];
  }
  return nodes[0]; // 返回根节点
}
export {TreeNode, arrayToTree}
