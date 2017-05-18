angular.module('myApp', ['ngRoute'])
//对于路由切换显示的页面，我们一般把他单独的保存为模板
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/home', {
			//template/templateUrl(相对地址)
			templateUrl: 'template/home.html',
			//给每一个模板指定一个控制器
			controller: 'homeCtrl'
		})
		.when('/flower', {
			templateUrl: 'template/flower.html',
			controller: 'flowerCtrl'
		})
		.when('/flower/aiqingxianhua', {
			templateUrl: 'template/flower/aiqingxianhua.html',
			controller: 'aiqingCtrl'
		})
		.when('/yongshenghua', {
			templateUrl: 'template/yongsheng_box.html',
			controller: 'yshCtrl'
		})
		.when('/yongshenghua/yongshenghuahe', {
			templateUrl: 'template/yongsheng/yongshenghuahe.html',
			controller: 'yshhCtrl'
		})
		.when('/yongshenghua/juxingmeigui', {
			templateUrl: 'template/yongsheng/juxingmeigui.html',
			controller: 'jxmgCtrl'
		})
		.when('/yongshenghua/xunyicaohuahe', {
			templateUrl: 'template/yongsheng/xunyicaohuahe.html',
			controller: 'xychhCtrl'
		})
		.when('/yongshenghua/yongshengpinghua', {
			templateUrl: 'template/yongsheng/yongshengpinghua.html',
			controller: 'ysphCtrl'
		})
		.when('/yongshenghua/teseyongshenghua', {
			templateUrl: 'template/yongsheng/teseyongshenghua.html',
			controller: 'tsyshCtrl'
		})
		.when('/cake', {
			templateUrl: 'template/cake.html',
			controller: 'cakeCtrl'
		})
		.when('/gifts', {
			templateUrl: 'template/gifts.html',
			controller: 'giftsCtrl'
		})
		.when('/chocolates', {
			templateUrl: 'template/chocolates.html',
			controller: 'chocolatesCtrl'
		})
		.when('/huayu', {
			templateUrl: 'template/huayu.html',
			controller: 'huayuCtrl'
		})
		.when('/cart', {
			templateUrl: 'template/cart.html',
			controller: 'cartCtrl'
		})
		.when('/dingdan', {
			templateUrl: 'template/dingdan.html',
			controller: 'ddCtrl'
		})
		.when('/pro_detail/:index', {
			templateUrl: 'template/pro_detail.html',
			controller: 'detailCtrl'
		})
		//用来给她设置默认
		.otherwise('/home')
}])
//购物车 加
.directive('myAdds', function() {
	return {
		link: function(scope, element, attr) {
			element.click(function() {
				var This = this
				angular.forEach(scope.dataList, function(data, index, array) {
					if(attr.items == data.items) {
						data.PAmount = parseInt(data.PAmount) + 1;
						scope.allPrices();
						scope.$apply() //刷新视图
					}
				});
			});
		}
	}
})
//购物车 减
.directive('myMinus', function() {
	return {
		link: function(scope, element, attr) {
			element.click(function() {
				var This = this
				angular.forEach(scope.dataList, function(data, index, array) {

					if(attr.items == data.items) {

						if(data.PAmount <= 1) {

							if(confirm('是否删除该产品')) {
								data.PAmount = 0;
								$(This).siblings('input').val(0);
								scope.allPrices();
								scope.$apply();
								//delete array[index];
								scope.dataList.splice(index, 1)
								$(This).parents('tr').remove();
								$.cookie("PId", null, {
								path: '/'
							});
							}
						} else {
							data.PAmount = parseInt(data.PAmount) - 1;
						};
						scope.allPrices();
						scope.$apply();
					}
				});
			});
		}
	}
})
//购物车 删
.directive('delete', function() {
	return {
		link: function(scope, element, attr) {
			element.click(function() {
				var This = this
				angular.forEach(scope.dataList, function(data, index, array) {
					if(attr.items == data.items) {
						if(confirm('是否删除该产品')) {
							data.PAmount = 0;
							$(This).siblings('input').val(0);
							scope.allPrices();
							scope.$apply();
							//delete array[index];
							scope.dataList.splice(index, 1)
							$(This).parents('tr').remove();
							$.cookie("PId", null, {
								path: '/'
							});
						}
					}
				});
			});
		}
	}
})
//全选，全不选
.directive('allOrcan', function() {
	return function(scope, element, attr) {
		element.click(function() {
			var isCheck = $(this).find('input').prop('checked');
			if(isCheck) {
				$('input[type=checkbox]').prop('checked', true);
			} else {
				$('input[type=checkbox]').not($('input[type=checkbox]').eq(0)).prop('checked', false);
			}
			angular.forEach(scope.dataList, function(data, index, array) {
				data.Bol = isCheck;
			})
			scope.allPrices();
			scope.$apply();
		})
	}
})
//单选
.directive('oneCheck', function() {
	return function(scope, element, attr) {
		element.click(function() {
			var This = this
			angular.forEach(scope.dataList, function(data, index, array) {
				if(attr.items == data.items) {
					var isCheck = $(This).prop('checked');
					data.Bol = isCheck;
					scope.allPrices();
					scope.$apply();
				}
			})
		});
	}
})
.controller('myController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
	$scope.dlzhuangtai = "请登录";
	$scope.searchTextFunc = function() {
		$(".search_box").show();
		var str = "爱情鲜花";
		var str1 = "特色永生花";
		if(str.indexOf($scope.searchText) != -1) {
			console.log(111);
			$(".btn_wrap a").attr("href", "#/flower/aiqingxianhua");
		} else if(str1.indexOf($scope.searchText) != -1) {
			console.log(111);
			$(".btn_wrap a").attr("href", "#/yongshenghua/teseyongshenghua");
		} else {
			$(".search_box p").show();
		}
	}
	$scope.alluserdata = [];
	$scope.$broadcast('alldata', {
		message: $scope.alluserdata
	});
	$scope.$on('onedata', function(event, args) {
		$scope.message = args.message;
		console.log($scope.message);
		$scope.alluserdata.push($scope.message);
		console.log($scope.alluserdata)
	});
	$scope.$on('phonenumber', function(event, args) {
		$scope.dlzhuangtai = args.message;
		console.log($scope.dlzhuangtai);
		$rootScope.dlzhuangtai = $scope.dlzhuangtai;
	});
}])
.controller('homeCtrl', ['$scope', function($scope) {}])
.controller('flowerCtrl', ['$scope', function($scope) {}])
.controller('aiqingCtrl', ['$scope', "$http", function($scope, $http) {
	$http.get('main.json').success(function(data) {
		$scope.listDate = data.aiqingxianhua;
		console.log($scope.listDate);
	});
}])
.controller('yshCtrl', ['$scope', function($scope) {}])
.controller('yshhCtrl', ['$scope', function($scope) {}])
.controller('jxmgCtrl', ['$scope', function($scope) {}])
.controller('xychhCtrl', ['$scope', function($scope) {}])
.controller('ysphCtrl', ['$scope', function($scope) {}])
.controller('tsyshCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('main.json').success(function(data) {
		$scope.listDate = data.teseyongshenghua;
		console.log($scope.listDate);
	});
}])
.controller('cakeCtrl', ['$scope', function($scope) {}])
.controller('giftsCtrl', ['$scope', function($scope) {}])
.controller('chocolatesCtrl', ['$scope', function($scope) {}])
.controller('huayuCtrl', ['$scope', function($scope) {}])
.controller('ddCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
	//首先判断用户是谁 ,如果没有  提示请登录
	//		$scope.$on('ccc', function(event, args) {
	//			$scope.user = args.message;
	//			console.log($scope.dlzhuangtai);
	//		});
	$scope.user = $rootScope.dlzhuangtai;
	console.log($scope.user);
	//如果存在  请求json
	if($scope.user) {
		$http.get('dingdan.json').success(function(data) {
			//遍历json  找到和用户名匹配的信息
			console.log(data)
			angular.forEach(data, function(val, key) {
				if(key == $scope.user) {
					$scope.listDate = val;
					console.log($scope.listDate)
				}
			})
		});
	}
}])
.controller('cartCtrl', ['$scope', function($scope) {
	$scope.dataList = eval('(' + $.cookie("PId") + ')');
	console.log($scope.dataList);
	//总价格的计算
	$scope.allPrices = function() {
		$scope.allprice = 0;
		angular.forEach($scope.dataList, function(data, index, array) {
			data.price = data.PAmount * data.PPrice;
			if(data.PBol == true) {
				$scope.allprice += parseInt(data.price);
			}
		})
		return $scope.allprice;
	};
	$scope.allPrices();

	//当购物车里没有东西的时候
	if(!$scope.dataList){
		$(".nothing").show();
		$("#table").hide();
		$(".tijiao").hide();
	}
	
}])
.controller('detailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
	//	对应的商品详情页
	//$routeParams----路由参数
	console.log($routeParams); // {index: "1"}
	console.log($routeParams.index); //当前商品的id
	//获取json 遍历获取id值	
	$http.get('main.json').success(function(data) {
		$scope.allDate = data;
		console.log($scope.allDate);
		angular.forEach($scope.allDate, function(val, key) {
			angular.forEach(val, function(val, key) {
				if(val.id == $routeParams.index) {
					$scope.detailData = val;
				}
			})
		})
		console.log($scope.detailData);
		$scope.deImgDate = $scope.detailData.product_img;
		console.log($scope.deImgDate)
	});
	// 点击加入购物车的方法
	$scope.tocart = function() {
		$PBol = 'false'; // 布尔值
		$PImg = $scope.detailData.imgPic; // 商品的图片
		$PTitle = $scope.detailData.title; // 商品名称
		$PPrice = $scope.detailData.price02; // 会员价
		$PAmount = 1;
		$jsonStr = "[{'PBol':'" + $PBol + "','PImg':'" + $PImg + "','PTitle':'" + $PTitle + "','PPrice':'" + $PPrice + "','PAmount':'" + $PAmount + "'}]";
		var date = new Date();
		date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
		$.cookie('PId', $jsonStr, {
			path: '/',
			expires: date
		});
		//		alert($.cookie('PId'));
	}
}])
.controller('dlCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.userdata = {};
	var phonename = getCookieWithKey("phonename");
	var passwd = getCookieWithKey("passwd");
	if(phonename) {
		$scope.userdata.phonenumber = phonename;
		$scope.userdata.password = passwd;
	}
	//提供一个key就去现有的cookie中寻找与key对应的value并且返回
	function getCookieWithKey(mKey) {
		if(document.cookie.length == 0) {
			return "";
		}
		//cookie 拆分时分号+空格
		var arr = decodeURIComponent(document.cookie).split("; ");
		for(var i = 0; i < arr.length; i++) {
			var subArr = arr[i].split("=");
			if(mKey == subArr[0]) {
				return subArr[1]; //subArr
			}
		}
		return "";
	}

	//删除cookie
	function removeCookie(mKey) {
		var d = new Date();
		var cookies = encodeURIComponent(mKey) + "=0;" + "expires=" + d;
		document.cookie = cookies;
	}

	$scope.submitForm = function() {
		console.log($scope.userdata);
		if($scope.dlForm.$invalid) {
			alert('请检查您的信息')
		} else if($scope.userdata.password) {
			$http.get('user.json').success(function(data) {
				$scope.userlistDate = data;
				//遍历user.json  
				var keepGoing = true;
				angular.forEach($scope.userlistDate, function(val, key) {
					if(keepGoing) {
						//val是一个人的数据  判断输入框中的phonenumber和json里的phonenumber是否一样
						if($scope.userdata.phonenumber == val.phonenumber) {
							//phonenumber一致，判断密码是否一致
							if(keepGoing) {
								if($scope.userdata.password != val.password) {
									alert("密码错误！");
								} else {
									$(".zhezhao_box").hide();
									$(".denglu_box").hide();
									alert("登陆成功！");
									//如果记住密码被选中  添加cookie
									if($(".checkbox_mm").is(':checked')) {
										var d = new Date;
										d.setDate(d.getDate() + 10);
										setCookie("phonename", $scope.userdata.phonenumber);
										setCookie("passwd", $scope.userdata.password);
									}

									function setCookie(mKey, mValue, mExpires) {
										var cookieStr = "";
										//键值对
										if(mKey && mValue) {
											cookieStr = cookieStr + encodeURIComponent(mKey) + '=' + encodeURIComponent(mValue);
										}
										//时间
										if(mExpires instanceof Date) {
											cookieStr = cookieStr + ";expires=" + mExpires;
										}
										document.cookie = cookieStr;
										return document.cookie;
									}
									//如果记住密码被选中  添加cookie-------end
									$scope.$emit('phonenumber', {
										message: $scope.userdata.phonenumber
									});
								}
								keepGoing = false;
							}
						} else {
							alert("该用户不存在！");
							keepGoing = false;
						}
					}
				})
				console.log($scope.userlistDate);
			});
		}
	}
}])
.controller('zcCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.userdata = {};
	$scope.$on('alldata', function(event, args) {
		$scope.message = args.message;
		console.log("这是所有的用户信息" + $scope.message);
	});
	$scope.submitForm = function() {
		console.log($scope.userdata);
		if($scope.zcForm.$invalid) {
			alert('请检查您的信息')
		} else { //判断是否用户名已存在
			$http.get('user.json').success(function(data) {
				$scope.userlistDate = data;
				var keepGoing = true;
				angular.forEach($scope.userlistDate, function(val, key) {
					if(keepGoing) {
						if(val.phonenumber != $scope.userdata.phonenumber) {

							alert("注册成功");
							$(".zhezhao_box").hide();
							$(".zhuce_box").hide();
							keepGoing = false;

						} else {
							alert("用户名已存在！");
							keepGoing = false;

						}
					}

				})
				console.log($scope.userlistDate);
			});
		}
		$scope.$emit('onedata', {
			message: $scope.userdata
		});
	}
}])
.directive('compare', function() {
	var o = {};
	o.strict = 'AE';
	o.scope = {
		orgText: '=compare'
	}
	o.require = 'ngModel';
	o.link = function(scope, elem, att, con) {
		con.$validators.compare = function(v) {
			return v == scope.orgText;
		}
		scope.$watch('orgText', function() {
			con.$validate();
		});
	}
	return o;
});