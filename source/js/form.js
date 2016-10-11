(function() {
  var inputs = document.querySelectorAll(".page-form__input--control");
  var controls = document.querySelectorAll(".control-btn");
  var form = document.querySelector(".page-form");
  var fileQueue = [];

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = 0;
  }

  for (var i = 0; i < controls.length; i++) {
    controls[i].addEventListener("click", listenControls);
  }

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", function() {
      if (!isNumeric(this.value)) {
        this.value = 0;
      }
    });
  }


  form.addEventListener("submit", function(event) {
    if (!("FormData" in window)) {
      return;
    }
    event.preventDefault();

    var data = new FormData(form);
    
    request(data, function(response) {
      console.log(response);
    });
  });


  form.querySelector("#file-upload").addEventListener("change", function() {
    var files = this.files;

    for (var i = 0; i < files.length; i++) {
      preview(files[i]);
    }

    this.value = "";
  });

  function preview(file) {
    var area = form.querySelector(".page-form__file-preview");

    if (file.type.match(/image.*/)) {
      var reader = new FileReader();

      reader.addEventListener("load", function(event) {
        var img = document.createElement("img");
        img.src = event.target.result;
        img.alt = file.name;

        area.appendChild(img);
        fileQueue.push({
          file: file,
          img: img
        })
      });

      reader.readAsDataURL(file);
    }
  }

  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/send?" + (new Date()).getTime());

    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });
    
		xhr.send(data);
  }

  function listenControls(event) {
    var input = findSiblings(this, "page-form__input--control");

    event.preventDefault();
    if (this.classList.contains("control-btn--plus")) {
      for (var i = 0; i < input.length; i++) {
        if (isNumeric(input[i].value)) {
          input[i].value = +input[i].value + 1;
        }
      }
    } else if (this.classList.contains("control-btn--minus")) {
      for (var i = 0; i < input.length; i++) {
        if (isNumeric(input[i].value) && (+input[i].value > 0)) {
          input[i].value = +input[i].value - 1;
        }
      }
    }
  }

  function findSiblings(elem, cls) {
    var siblings = elem.parentNode.children;
    var result = [];

    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i].classList.contains(cls)) {
        result.push(siblings[i]);
      }
    }
    return result;
  }

  function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
  }



})();
