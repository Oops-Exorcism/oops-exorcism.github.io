// Submits the signup form to Kit without leaving the page.
// If the request can't be made from here, falls back to a normal form post.
(function () {
  var form = document.getElementById("signup");
  var status = document.getElementById("status");
  var button = form.querySelector("button");

  function show(message, isError) {
    status.textContent = message;
    status.className = isError ? "status error" : "status";
  }

  form.addEventListener("submit", function (event) {
    if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
      event.preventDefault();
      show("Signup isn't connected yet. Please check back soon.", true);
      return;
    }

    event.preventDefault();
    button.disabled = true;
    show("Sending…", false);

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Bad response");
        form.reset();
        show("Almost done! Check your inbox and confirm your email.", false);
      })
      .catch(function () {
        form.submit();
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
