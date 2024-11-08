class TreeNode{
  // 值，左结点，右结点
  constructor(value, left, right){
    this.value = value
    this.left = left
    this.right = right
  }
}
/**
 * 从数组形式到链表形式
 * @param {*} arr 合法的数组形式
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

const findAncestors = (root, x, ancestors = []) => {
  // 如果树为空，直接返回
  if (root === null) {
    return false;
  }
  let left = findAncestors(root.left, x, ancestors)
  let right = findAncestors(root.right, x, ancestors)
  // 在左右左子树查找
  if (left || right) {
    Object.assign(root, {highlight: true})
    ancestors.push(root.value);
    return true;
  }
  // 如果找到目标结点，返回true
  if (root.value === x){
    Object.assign(root, {highlight: true})
    ancestors.push(root.value)
    return true;
  }
  // 如果在左右子树都没有找到目标结点，返回false
  return false;
}
export {TreeNode, arrayToTree, findAncestors}