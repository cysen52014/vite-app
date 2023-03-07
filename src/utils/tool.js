/*-工具类-*/
export default class Tool {
    // 过滤空值
    static filterParams(params) {
      if (params.length) {
        return;
      } else {
        const p = {};
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const el = params[key];
            if (el !== "") {
              p[key] = el;
            }
          }
        }
        return p;
      }
    }
  
    // arrayToTree
  //   static arrayToTree(data, pid){
  //     var pos = {};
  //     var tree = [];
  //     var i = 0;
  
  //     while (data.length > 0) {
  //       if (data[i].pid * 1 === 0) {
  //         tree.push(data[i]);
  //         pos[data[i].id * 1] = [tree.length - 1];
  //         data.splice(i, 1);
  //         i--;
  //       } else {
  //         var posArr = pos[data[i].pid * 1];
  //         if (posArr != undefined) {
  //           var obj = tree[posArr[0]];
  //           for (var j = 1; j < posArr.length; j++) {
  //             obj = obj.children[posArr[j]];
  //           }
  //           obj.children = obj.children ? obj.children : [];
  //           obj.children.push(data[i]);
  //           pos[data[i].id * 1] = posArr.concat([obj.children.length - 1]);
  //           data.splice(i, 1);
  //           i--;
  //         }
  //       }
  //       i++;
  //       if (i > data.length - 1) {
  //         i = 0;
  //       }
  //     }
  //     return tree;
  //   };
  
  static arrayToTree(data, pid) {
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
        if (String(data[i].pid) === String(pid)) {
          const obj = data[i];
          obj.key = data[i].id;
          temp = this.arrayToTree(data, data[i].id);
          if (temp.length > 0) {
            obj.father = true;
            obj.children = temp;
          }
          tree.push(obj);
        }
      }
      return tree;
    };
  
    // json对象排序
    static compare(arr, key) {
      return arr.sort(function (a, b) {
        var value1 = a[key];
        var value2 = b[key];
        return value1 - value2;
      });
    }
    static download(content, fileName) {
      const blob = new Blob([content]);
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      const filename = fileName + ".xlsx";
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
  