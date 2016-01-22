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
                        
                        
                        var indexData = {
                        		  "custid": "1",
                        		  "addresses": [
                        		    {
                        		      "addressType": "P",
                        		      "address1": ""
                        		    },
                        		    {
                        		      "addressType": "M"
                        		    }
                        		  ],
                        		  "personalDetails": {
                        		    "title": "",
                        		    "name": ""       
                        		  }
                        		}
                        
                        var db;
                        var request = window.indexedDB.open("newDatabase", 1);
                        request.onupgradeneeded = function(event) {
                         var db = event.target.result;
                                var objectStore = db.createObjectStore("customers",{keyPath: "isbn"});
                                for (var i in indexData) {
                                        objectStore.add({i:indexData[i],isbn: i});      
                                }

                        }
                        
                        
/*                        window.onbeforeunload = closingCode;
                        function closingCode(){
                        	
                        	if(window.event.clientX > 0 && window.event.clientY < 0){
                        	
                        	// do something...
                        	localStorage.clear();
                	    	sessionStorage.clear();
                           return null;
                           }
                        }*/
                        
                        
                        window.onbeforeunload = function (e)
                        {

                            e = e || window.event;
                            var y = e.pageY || e.clientY;
                            if (y < 0){
                            return "Do You really Want to Close the window ?"
                            }
                            else {
                            return "Refreshing this page can result in data loss."; 
                            }

                          }
                        
                        
 /*                       window.addEventListener("beforeunload", function (e) {
                            var confirmationMessage = "\o/";
                            alert("exit");
                        	localStorage.clear();
                	    	sessionStorage.clear();
                            (e || window.event).returnValue = null; //Gecko + IE
                            return null;                            //Webkit, Safari, Chrome
                        });*/
                        
                        
/*                        var tryingToReload = false;
                        window.onbeforeunload = function(e) //on before unload
                        {
                        	alert(navigator.appName);
                        if (!e) //Firefox and Safari gets argument directly.
                        {
                        e = window.event; // this is for IE
                        }

                        if (e.clientY != undefined && e.clientY < 0) // clicked on the close button for IE
                        {
                        tryingToReload = false;
                        }

                        if (e.clientY != undefined && (e.clientY > 100 && e.clientY < 140)) // select close from context menu from the right click on title bar on IE
                        {
                        tryingToReload = false;
                        }

                        if (tryingToReload) //user hasn't clicked on X close button or hasn't selected close from context menu
                        {
                        tryingToReload = false;
                        return "warning message goes here";
                        }
                        }*/
                        
                        
                        
                        
                        