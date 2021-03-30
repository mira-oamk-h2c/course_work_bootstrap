

$(document).ready(function () {

  // Quiz

  let total = 0;

  $(".form-check-input.quiz").click(function () {

    let nameAttr = $(this).attr("name");
    let choice = "[name=" + nameAttr + "]";
    let visible = "#" + nameAttr;

    // Disable radio buttons once one is selected
    $(choice).prop("disabled", true);

    // Show the correct answer and explanation
    $(visible).removeClass("not_visible");

    // Highlight the wrong or/and correct answer
    let answer = Number($(this).val());
    if (answer === 1) {
      $(this).parent().addClass("selected");
      total = total + 1;
    } else {
      $(this).parent().addClass("wrong");
      let correct = "[name=" + nameAttr + "][value=1]";
      $(correct).parent().addClass("right");
    }

    $("#result").html("Your result: " + total + "/5 correct answers!");

  });

  // BMI

  /**
  * Calculates the body mass index
  * @param {Number} weight   weight in kg
  * @param {Number} height   height in cm
  * @returns {Number}        body mass index
  */
  function getBMI(weight, height) {
    let result = (weight / Math.pow(height / 100, 2.5)) * 1.3;
    return result;
  }

  /**
  * 
  * @param {Number} value    person's height in cm
  * @param {Number} factor   18.5 >> lower bound, 24.9 >> upper bound
  * @returns {Number}        normal weight bound as integer
  */
  function getWeightLimit(value, factor) {
    let limit = (factor / 1.3) * Math.pow(value / 100, 2.5);
    limit = limit.toFixed(0);
    return limit;
  }

  /**
  * Check that all the input data is given
  * @returns {Boolean} true >> ok, false >> not ok
  */
  function validateInput(birthYear, weight, height, age) {

    if (birthYear === 0 || weight === 0 || height === 0) {
      $("#m_title").html("Oops, it seems you missed something!");
      $("#m_body").html("<p>" + "You need to fill all the fields:" + "</p>" +
        "<p>" + "Birth year, Weight, Height" + "</p>");
      let message = new bootstrap.Modal(document.getElementById("mymessage"),
        { backdrop: "static" }
      );
      message.show();
      return false;
    } else if (age < 20 || age > 60) {
      $("#m_title").html("Your age is not in the range.");
      $("#m_body").html("<p>" + "BMI results are valid for people from age 20 to 60." + "</p>");
      let message = new bootstrap.Modal(document.getElementById("mymessage"),
        { backdrop: "static" }
      );
      message.show();
      return true;
    } else {
      return true;
    }

  }

  $("#calculate_bmi").click(function () {

    // Read input data & define variables
    let birthYear = Number($("#birth_year").val());
    let weight = Number($("#weight").val());
    let height = Number($("#height").val());

    let year = new Date().getFullYear();
    let age = year - birthYear;

    // Validate input data and bring out notification modal if not correct

    if (validateInput(birthYear, weight, height, age) === false) {
      return;
    }

    // Handle correct input data
    let result = getBMI(weight, height);

    // Print to output element
    $("#result_bmi").html(result.toFixed(1));

    // Show explanation based on result (bmi)
    if (result < 17) {
      $("#bmi_expl_1").addClass("bg-info");
    } else if (result < 18.5) {
      $("#bmi_expl_2").addClass("bg-info");
    } else if (result < 25) {
      $("#bmi_expl_3").addClass("bg-info");
    } else if (result < 30) {
      $("#bmi_expl_4").addClass("bg-info");
    } else if (result < 40) {
      $("#bmi_expl_5").addClass("bg-info");
    } else if (result >= 40) {
      $("#bmi_expl_7").addClass("bg-info");
    }

  });

  // Show normal Weight Range if checkbox is selected

  $("#weight_range").click(function () {

    if ($(this).prop("checked") === true) {
      $(this).prop("checked", true);

      // Read input data
      let value = Number($("#height").val());

      // Handle input data
      let lower = getWeightLimit(value, 18.5);
      let upper = getWeightLimit(value, 24.9);

      // Print to output element
      $("#normal").html(lower + "–" + upper + " kg");


    } else $("#normal").html("");

  });

  // Select and empty all output elements with click on input element
  $(".bmi.form-control").focusin(function () {
    $(this).select();
    $("#result_bmi").html("");
    $("#normal").html("");
    $(".card-body").removeClass("bg-info");
    $("#weight_range").prop("checked", false);
  });


  // Waist Control

  $("#calculate_waist").click(function () {

    // Read input data
    let value = Number($("#waist").val());
    let gender = Number($("[name=flexRadioDefault]:checked").val());

    // Validate input data and bring out notification modal if not filled

    if (value === 0) {
      $("#m_title").html("Oops, it seems you missed something!");
      $("#m_body").html("<p>" + "You need to fill the field:" + "</p>" +
        "<p>" + "Waist" + "</p>");
      let message = new bootstrap.Modal(document.getElementById("mymessage"),
        { backdrop: "static" }
      );
      message.show();
      return;
    }

    // Handle correct data based on gender selection
    if (gender === 1) {
      if (value < 90) {
        $("#lg-item_1").addClass("bg-info");
      } else if (value <= 100) {
        $("#lg-item_2").addClass("bg-info");
      } else if (value > 100) {
        $("#lg-item_3").addClass("bg-info");
      }
    } else {
      if (value < 80) {
        $("#lg-item_1").addClass("bg-info");
      } else if (value <= 90) {
        $("#lg-item_2").addClass("bg-info");
      } else if (value > 90) {
        $("#lg-item_3").addClass("bg-info");
      }
    }
  });

  // Select all and empty li elements with click on input element "Waist"
  $("#waist").focusin(function () {
    $(this).select();
    $(".list-group-item").removeClass("bg-info");
  });

  // Focus on input element with click on radio button
  $("[name=flexRadioDefault]").click(function () {
    $("#waist").focus();
  });

  // Pop-overs
  let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  });


});

