## 两数之和

思路1: 双循环，暴力解法
第一次接触题目，首先肯定是想到暴力解法，通过双循环遍历数组，找nums[i] + nums[j] === target。
时间复杂度: O(n^2)
空间复杂度: O(1)

```js
var twoSum = function(nums, target) {
    for(let i = 0, len = nums.length;i < len;i++){
        // 因为同一元素不允许重复出现，所以从i的下一位开始遍历
        for(let j = i + 1;j < len;j++) {
            if(nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    // 所有样例都是有返回结果的，这里无所谓
    return [-1, -1];
};
```

思路2: 一次循环，使用HashMap进行记录
通过HashMap，在循环的时候进行查找我们将HashMap的Key定位nums[i]，Value定义为i。
那么，每次循环到一个数的时候，我们就可以在HashMap中查找是否存在key === target - nums[i]，如果存在则可以直接返回对应的两个下标，否则，将当前的值记入到HashMap中。

时间复杂度：O(n)
空间复杂度：O(n)

```js
var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0, len = nums.length;i < len;i++) {
        if(map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i];
        }
        map.set(nums[i], i);
    }
    return [];
};
```

作者：jplusztx
链接：https://leetcode.cn/problems/two-sum/solution/javascript-by-jplusztx-fbb9/
来源：力扣（LeetCode）

## 寻找两个正序数组的中位数

给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。

示例 1：

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
示例 2：

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/median-of-two-sorted-arrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
// 初见
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let allNum = [...nums1,...nums2]
    allNum = allNum.sort(function(x,y){
        if(x > y){
            return -1
        }else if( x = y){
            return 0
        }else{
            return 1
        }
    })
    let length = allNum.length
    let result = length%2 === 0 ? (allNum[length/2 - 1] + allNum[length/2 ]) / 2 : allNum[Math.floor(length/2)]
    return result
};
```

```js
/**
 * 二分解法
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  // make sure to do binary search for shorten array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1]
  }
  const m = nums1.length
  const n = nums2.length
  let low = 0
  let high = m
  while(low <= high) {
    const i = low + Math.floor((high - low) / 2)
    const j = Math.floor((m + n + 1) / 2) - i

    const maxLeftA = i === 0 ? -Infinity : nums1[i-1]
    const minRightA = i === m ? Infinity : nums1[i]
    const maxLeftB = j === 0 ? -Infinity : nums2[j-1]
    const minRightB = j === n ? Infinity : nums2[j]

    if (maxLeftA <= minRightB && minRightA >= maxLeftB) {
      return (m + n) % 2 === 1
        ? Math.max(maxLeftA, maxLeftB)
        : (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2
    } else if (maxLeftA > minRightB) {
      high = i - 1
    } else {
      low = low + 1
    }
  }
};

// 作者：fe-lucifer
// 链接：https://leetcode.cn/problems/median-of-two-sorted-arrays/solution/er-fen-fa-duo-yu-yan-javajs4-xun-zhao-liang-ge-zhe/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## 最长回文子串

解题思路
两种情况
一种是回文子串长度为奇数（如aba，中心是b）
另一种回文子串长度为偶数（如abba，中心是b，b）

循环遍历字符串 对取到的每个值 都假设他可能成为最后的中心进行判断

```js
// 中心扩散法
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
        if (s.length<2){
            return s
        }
        let res = ''
        for (let i = 0; i < s.length; i++) {
            // 回文子串长度是奇数
            helper(i, i)
            // 回文子串长度是偶数
            helper(i, i + 1) 
        }

        function helper(m, n) {
            while (m >= 0 && n < s.length && s[m] == s[n]) {
                m--
                n++
            }
            // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
            // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
            if (n - m - 1 > res.length) {
                // slice也要取[m+1,n-1]这个区间 
                res = s.slice(m + 1, n)
            }
        }
        return res
};
```

作者：qing-chen-4a
链接：https://leetcode.cn/problems/longest-palindromic-substring/solution/chao-jian-dan-de-zhong-xin-kuo-san-fa-yi-qini/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。