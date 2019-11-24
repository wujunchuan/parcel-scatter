function test() {
  var result = [1, 2, 3, 4].map(x => {
    return x * 2;
  });
  console.log(result);
}

function test2() {
  var result = [[{ a: 1 }]].map(item => {
    item = [{ actor: "wujunchuan" }, ...item];
    return item;
  });
  console.log(result);
}

// test2();
// test2();
// test2();
// test2();
// test2();

function test3() {
  var list = [{ a: "wujunchuan" }, { b: "bbb" }, { b: "bbb" }];
  // var list = [1, 1, 2, 34];
  // let result = unique(list);
  let result = unique_(list);
  function unique(arr) {
    return Array.from(new Set(arr));
  }
  function unique_(arr) {
    const seen = new Map();
    return arr.filter(a => {
      a = JSON.stringify(a);
      return !seen.has(a) && seen.set(a, 1);
    });
  }
  console.log(result);
}

// test3();

/*
 * 在数组中去除重复项（）
 */
var distinct_arr_element = function(arr) {
  if (!arr) return null;
  var resultArr = [];
  arr.forEach(function(index, el) {
    var notExist = true;
    resultArr.forEach(function(i, element) {
      if (isObjectValueEqual(el, element)) {
        notExist = false;
        return false;
      }
    });
    if (notExist) resultArr.push(el);
  });
  return resultArr;
};
/*
 * 判断两个 Object 的值是否相等
 */
function isObjectValueEqual(a, b) {
  // Of course, we can do it use for in Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  // If number of properties is different, objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    // If values of same property are not equal, objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  // If we made it this far, objects are considered equivalent
  return true;
}

function test4() {
  var list = [{ a: "wujunchuan" }, { b: "bbb" }, { b: "bbb" }];
  var result = distinct_arr_element(list);
  console.log(result);
}
// test4();
