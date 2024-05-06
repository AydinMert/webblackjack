    $(document).ready(function() {
      $("#headerContainer").load("components/header.html");
      $("#tablecontainer").load("components/blackjackTable.html");

      var formChips = `
      <div class="form-chips">
          <img class="form-chip" src="/assets/images/chip.png" alt="">
          <img class="form-chip" src="/assets/images/chip.png" alt="">
          <!-- <img class="cross" src="/assets/images/cross.svg" alt=""> -->
          <div class="cross">
              <div></div>
              <div></div>
          </div>
      </div>
      `;

      $(document).on("click", "#formButton", function () {
        console.log("tıklandı");
        $("#formButton").prop("disabled", true);

        $.get("http://localhost:3000/login", function (html) {
          $("#formContainer").append(formChips);
          $("#formContainer").append(html);
          $("#formContainer").css("display", "flex");
        }).fail(function (error) {
          console.error("Error:", error);
        });
      });

      $(document).on("click", ".cross", function () {
        $("#formButton").prop("disabled", false);
        $("#formContainer").empty();
        $("#formContainer").css("display", "none");
      });

      $(document).on("click", "#register", function () {
        console.log("reg");

        $("#formContainer").empty();

        $.get("http://localhost:3000/register", function (html) {
          $("#formContainer").append(formChips);
          $("#formContainer").append(html);
          $("#formContainer").css("display", "flex");
        }).fail(function (error) {
          console.error("Error:", error);
        });
      });
    });

    