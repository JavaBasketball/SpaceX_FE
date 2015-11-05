/*                 1. 扩展 Array 方法 extProc，可以实现如下效果：["kitty","puppy","swan","penguin","giraffe","penguin","swan","dolphin"] => ["swan","giraffe","dolphin","penguin","puppy","kitty"]
                根据数组中字符串的倒数第二个字符进行排序，且去除重复的部分。例：["kitty","puppy","swan","penguin","giraffe","penguin","swan","dolphin"].extProc() = ["swan","giraffe","dolphin","penguin","puppy","kitty"] */

                        
                        // 去掉重复
                        Array.prototype.removeDuplicate = function(){
                        	var result = []
                        	for (var i = 0; i < this.length; i++) {
								 if(result.indexOf(this[i]) == -1){
									 result.push(this[i]);
								 }
								
							}
                        	return result;
                        }
                        
                        // 截取倒数第二位，重新组装数组
                          var reverseSecond = function(array,flag){
                        	var secondArray = [];
                        	var firstStr = "";
                        	var secondStr = "";
                        	// 截取倒数第二位
                        	if(flag){
	                        	for (var i = 0; i < array.length; i++) {
	                        		firstStr = array[i].substr(0, array[i].length-2);
	                        		secondStr = array[i].substr(array[i].length-2);
	                        		secondArray[i] = secondStr + firstStr;
								}
                        	}
                        	// 截取顺数第二位
                        	else {
	                        	for (var i = 0; i < array.length; i++) {
	                        		firstStr = array[i].substr(0, 2);
	                        		secondStr = array[i].substr(2,array[i].length-1);
	                        		secondArray[i] = secondStr + firstStr;
								}
                        	}
                        	return secondArray;
                        }
                        
                        // 安排
                        Array.prototype.extProc = function(){
                        	// 去重
                        	var rdArray = this.removeDuplicate();
                        	// 截取倒数第二位
                        	var tempaArray = reverseSecond(rdArray, true);
                        	// 排序
                        	//tempaArray.sort();
                        	// 截取顺数第二位
                        	return reverseSecond(tempaArray.sort(),false);
                        	
//                        	return this.sort();
                        }
                        
                        
                        var initArr = ["kitty","puppy","swan","penguin","giraffe","penguin","swan","dolphin"];
                        var resultArr = initArr.extProc();
                        document.write("排序之前：" + initArr);
                        document.write("<br/>");
                        document.write("排序之后：" + resultArr);
//                        alert("排序之前：" + initArr + "/n 排序之后：" + resultArr);