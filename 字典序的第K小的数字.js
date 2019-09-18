/**
 *  题目： 给定整数n和k，找到1到n中字典序第k小的数字
 * 
 * 注意： 1 <= k <= n <= 10∧10
 * 
 * 输入 n: 13 k:2
 * 
 * 输出  10
 * 

 *这里需要转变一下思路  我们说的前缀就是我们最后求的值
 * 解释：字典序排列是[1,10,11,12,13,2,3,4,5,6,7,8,9]
 * 1.怎么确定一个前缀下所有子节点的个数？
 * 2.如果第k个数在当前的前缀下，怎么继续往下面的子节点找？   prefix *= 10;
 * 3.如果第k个数不在当前的前缀，即当前的前缀比较小，如何扩大前缀，增大寻找的范围？prefix += 10
 */


/**
 * @description  获取一个前缀下所有子节点的个数
 * @param {*} prefix 当前前缀
 * @param {*} n 最大上限值
 * 
 */
function getCount(prefix, n) {
    let cur = prefix;
    let next = prefix + 1;//下一个前缀
    let count = 0;
    //当前的前缀当然不能大于上界
    while (cur <= n) {
        count += Math.min(n + 1, next) - cur;//下一个前缀的起点减去当前前缀的起点
        cur *= 10;
        next *= 10;
        // 如果说刚刚prefix是1，next是2，那么现在分别变成10和20
        // 1为前缀的子节点增加10个，十叉树增加一层, 变成了两层

        // 如果说现在prefix是10，next是20，那么现在分别变成100和200，
        // 1为前缀的子节点增加100个，十叉树又增加了一层，变成了三层
    }
    return count
}


/**
 * 
 * @param {*} n 给出的上限值
 * @param {*} k 第几小的数
 */
function findKthNumber(n, k) {
    let p = 1;      //作为一个指针，指向当前所在位置，当p==k时，也就是到了排位第k的数
    let prefix = 1;//前缀
    while (p < k) {
        let count = getCount(prefix, n);//获得当前前缀下所有子节点的个数和
        if (p + count > k) { //第k个数在当前前缀下
            prefix *= 10;
            p++; //把指针指向了第一个子节点的位置，比如11乘10后变成110，指针从11指向了110
        } else if (p + count <= k) { //第k个数不在当前前缀下
            prefix++;
            p += count;//注意这里的操作，把指针指向了下一前缀的起点
        }
    }
    return prefix;
}