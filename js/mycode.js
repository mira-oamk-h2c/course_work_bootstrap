
$(document).ready(function () {

  $(".form-check-input").click(function () {

    let nameAttr = $(this).attr("name");

    let choice = "[name=" + nameAttr + "]";

    let visible = "#" + nameAttr;



    $(choice).prop("disabled", true);

    $(visible).removeClass("not_visible");

   
    let answer = Number($(this).val());

    if (answer === 1) {

      $(this).parent().addClass("selected");

    } else {
      $(this).parent().addClass("wrong");

      let correct = "[name=" + nameAttr + "][value=1]";

      $(correct).parent().addClass("right");

    }

  });

















});