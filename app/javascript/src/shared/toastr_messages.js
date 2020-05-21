import $ from "jquery";
import toastr from 'toastr'
import "toastr/build/toastr.min.css";


toastr.options = ({
  "closeButton": false,
  "debug": false,
  "positionClass": "toast-top-right",
  "progressBar": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1500",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
});


document.addEventListener("turbolinks:load", function () {
  if ($("#toastr-success").length) {
    toastr.success($("#toastr-success").data("message"), "Sucesso!");
  }

  if ($("#toastr-error").length) {
    toastr.error($("#toastr-error").data("message"), "Erro!");
  }
});
