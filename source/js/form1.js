(function() {
	var inputs = document.querySelectorAll(".page-form__input--control");
	var controls = document.querySelectorAll(".control-btn");
	var peopleNum = document.querySelectorAll(".page-form__input--num");
	var imageTemplate = document.querySelector("#image-template").innerHTML; 
	var form = document.querySelector(".page-form");
	var fileQueue = [];
	

	for (var i = 0; i < inputs.length; i++) {
    	inputs[i].value = 0;
    	inputs[i].addEventListener("change", function(event) {
    		if(!isNumeric(this.value)) {this.value = 0;}
    	});
  		}	
	

	for(var i = 0; i < controls.length; i++) {
		controls[i].addEventListener("click", function() {listenControls.call("", this)});
	}



	for(var i = 0; i < peopleNum.length; i++) {
			peopleNum[i].addEventListener("change",function(e) {
				onchangePeople(this);
			});
		}


	document.querySelector("#file-upload").addEventListener("change", function(event) {
		var files = this.files;

		if(!("FileReader" in window)) {
			return;
		}

		for(var i = 0; i < files.length; i++) {
			preview(files[i]);
		}

		this.value = "";
	});

	form.addEventListener("submit", function(event) {
		

		if(!("FormData" in window)) {
			return;
		}

		event.preventDefault();

		

		var data = new FormData(form);

		fileQueue.forEach(function(element) {
			data.append("files", element);
		});

		request(data);
	});

	function request(data) {
		var xhr = new XMLHttpRequest();

		xhr.open("post","/send?" + (new Date()).getTime());

		xhr.addEventListener("readystatechange", function() {
			if(xhr.readyState == 4) {
				console.log(xhr.responseText);
			}
		});

		xhr.send(data);

		for(var pair of data.entries()) {
			console.log(pair[0] + ", " + pair[1]);
		}

	}



	function preview(file) {
		
		var area = document.querySelector(".page-form__file-preview");

		if(file.type.match(/image/)) {
			var reader = new FileReader(file);
			
			reader.addEventListener("load", function(event) {

				var html = Mustache.render(imageTemplate,{
					"image": event.target.result,
					"name": file.name
				})

				var li = document.createElement("li");

				li.classList.add("page-form__file-item");
				li.innerHTML = html;
				area.appendChild(li);

				li.querySelector(".page-form__image-delete").addEventListener("click", function(event){
					event.preventDefault();
					removeImage(li);
					console.log(fileQueue);
				});

				fileQueue.push({
					"file": file,
					"li": li
				});
			});

			reader.readAsDataURL(file);
		}
	}

	function removeImage(li) {
		fileQueue = fileQueue.filter(function(element){
			return element.li != li;
		});

		li.parentNode.removeChild(li);
	}

	

	function listenControls(control) {
		var input = findSiblings(control,"page-form__input--control");

		if (control.classList.contains("control-btn--plus")) {
			input[0].value = +input[0].value + 1;
		}
		else if (control.classList.contains("control-btn--minus") && input[0].value > 0) {
			input[0].value = +input[0].value - 1;
		}

		if(Array.prototype.includes.call(peopleNum,input[0])) {
			onchangePeople(input[0]);
		}
	}


	function onchangePeople(input) {
		var value = +input.value;
		if(input.id == "number-of-kids") {
			var template = document.querySelector("#kid-info").innerHTML;
			var type = "kids"
			var list = document.querySelector(".guest-info--kids");
		}
		else if(input.id == "number-of-adults") {
			var template = document.querySelector("#adult-info").innerHTML;
			var type = "adults"
			var list = document.querySelector(".guest-info--adults");
		}

		var listItems = list.querySelectorAll(".guest-info__row");

		
		if(listItems.length < value) {

			for	(var i = 1; i <= (value - listItems.length); i++) {
				var li = document.createElement("li");
				li.classList.add("guest-info__row");
				var html = Mustache.render(template, {
					"index": listItems.length + i
				});
				li.innerHTML = html;

				list.appendChild(li);
			}
		}

		if(listItems.length > value) {
			for	(var i = value; i < listItems.length; i++) {
				console.log(listItems.length, value);
				list.removeChild(list.lastChild);
			}
		}
	}


	function findSiblings(origin, className) {
			return Array.prototype.filter.call(origin.parentNode.children, function(element) {
				if(className) {
					return (element !== origin) && element.classList.contains(className);
				}
				return element !== origin;				
			});		
	}

	function isNumeric(n) {
		return !isNaN(parseInt(n)) && isFinite(n);
	}

})();

