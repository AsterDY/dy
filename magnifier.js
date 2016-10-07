/**
 放大镜插件
 	 作者：dy 
 初始化参数：
 	放大显示区域高（200px）；
 	放大显示区域宽（200px);
 	放大倍数（2倍）；
 	图片容器（null）；
 	图片src路径（null）
 **/
(function(win){
	//设置默认参数
	var defaults = {
		"height":200,
		"width":200,
		"zoom":2.0,
		"container":null,
		"image":null
	}
	
	//定义类构造函数magnifier
	var magnifier = function(options){
		//传入默认设置参数
		this.settings = defaults;
		//合并用户设置参数
		if(options){
				this.settings["height"] = options.hasOwnProperty("height") ? options["height"] : defaults["height"];
				this.settings["width"] = options.hasOwnProperty("width") ? options["width"] : defaults["width"];
				this.settings["zoom"] = options.hasOwnProperty("zoom") ? options["zoom"] : defaults["zoom"];
				this.settings["container"] = options.hasOwnProperty("container") ? options["container"] : defaults["container"];
				this.settings["image"] = options.hasOwnProperty("image") ? options["image"] : defaults["image"];
			//alert(this.settings["height"]+this.settings["width"]+this.settings["zoom"]+this.settings["container"]+this.settings["image"]);
		}
		this.init();
	}
	
	magnifier.prototype = {
		//插件初始化函数
		init:function(){
			//获取显示所需环境元素
			if(this.settings["container"] != null && this.settings["image"] != null){
				this.con = document.getElementById("picture");
				this.can = this.createCan(this.con);
				this.ctx = this.can.getContext("2d");
				this.img = this.createImg(this.settings["image"]);	
			}
			
		},
		//绘图canvas容器生成函数
		createCan:function(con){
			var can = document.createElement("canvas");
			can.width = this.settings["width"];
			can.height = this.settings["height"];
			can.style.position = "absolute";
			can.style.display = "none";
			con.appendChild(can);
			return can;
		},
		//放大原图获取函数
		createImg:function(image){
			var img = document.createElement("img");
			img.src = image;	
			return img;
		},
		//类调用方法open()
		open:function(){
			var self = this;
			if(self.can != null && self.con != null && self.ctx != null && self.img != null){
				//计算放大半径及比例
				var zoom = self.settings["zoom"];
				var rX = self.can.width*0.5/zoom, rY = self.can.height*0.5/zoom;
				var oWidth = self.img.width, oHeight = self.img.height;
				var ratioX = oWidth/self.con.offsetWidth, ratioY = oHeight/self.con.offsetHeight;
				alert(zoom+" "+rX+" "+oWidth+" "+ratioX);
				//注册图片容器的mousemove事件
				self.con.onmousemove = function(e){
					//计算鼠标相对图片位置
					var x = e.clientX, y = e.clientY;
					var xOff = x-(this.offsetLeft)+document.body.scrollLeft, yOff = y-(this.offsetTop)+document.body.scrollTop;
					if(xOff>rX && xOff<self.con.offsetWidth-rX && yOff>rY && yOff<self.con.offsetHeight-rY){
						//移动显示canvas位置并绘制截图
						self.can.style.top = yOff+"px"; self.can.style.left = xOff+"px";
						self.ctx.drawImage(self.img,(xOff-rX)*ratioX,(yOff-rY)*ratioY,rX*2*ratioX,rY*2*ratioY,0,0,self.can.width,self.can.height);
						//显示canvas
						self.can.style.display = "block";
					}else{
						//隐藏canvas
						self.can.style.display = "none";
					}
				};
				//注册图片容器的mouseleave事件
				self.con.onmouseleave = function(e){
					self.can.style.display = "none";
				}
			}
		},
		//类调用方法close（）
		close:function(){
			this.can.style.display = "none";
			this.con.onmousemove = null;
		},
		//类调用方法destory()
		destory:function(){
			this.close();
			this.settings = null;
			this.con = this.can = this.ctx = this.img = null;
		}
	}
	
	//向window对象注册类构造函数Magnifier（）
 	win.Magnifier = function(options){
 		return new magnifier(options);
 	}

})(window);




