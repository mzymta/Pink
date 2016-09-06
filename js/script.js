$( document ).ready(function() {
    $(".main-nav__toggle").on("click",function() {
      $(this).toggleClass("main-nav__toggle--close");
      $(".page-header__top").toggleClass("page-header__top--open");
      $(".main-nav__list").toggleClass("main-nav__list--open");
    })
});
