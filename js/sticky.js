// sticky.js
export function stickyfunction() {
  var menu = document.getElementById("menu");
  var sticky = menu.offsetTop;

  window.onscroll = function() {
    if (window.pageYOffset >= sticky) {
      menu.classList.add("sticky");
    } else {
      menu.classList.remove("sticky");
    }
  };
}