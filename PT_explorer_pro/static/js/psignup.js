document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = document.querySelectorAll("input");
  const password = inputs[2].value;
  const confirmPassword = inputs[3].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  alert("Account created successfully!");
  // Later: send data to Django backend
});
