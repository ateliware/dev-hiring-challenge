import $ from "jquery";
import { SideNav } from "./sidenav";

document.addEventListener("turbolinks:load", function() {
  $("#layout-sidenav").each(function() {
    new SideNav(this, {
      orientation: $(this).hasClass("sidenav-horizontal") ? "horizontal" : "vertical"
    });
  });

  // Initialize sidenav togglers
  $("body").on("click", ".layout-sidenav-toggle", function(e) {
    e.preventDefault();
    window.layoutHelpers.toggleCollapsed();
    if (!window.layoutHelpers.isSmallScreen()) {
      try {
        localStorage.setItem("layoutCollapsed", String(window.layoutHelpers.isCollapsed()));
      } catch (e) {}
    }
  });
});
