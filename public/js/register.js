async function handleRegister(event) {
  event.preventDefault();
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    showAlert("Passwords do not match!", "error");
    return;
  }

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showAlert("Registration successful!", "success");
    } else {
      showAlert(data.message || "Registration failed", "error");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    showAlert("An error occurred. Please try again later.", "error");
  }
}

function showAlert(message, type) {
  const alertBox = document.createElement("div");
  alertBox.className = `alert ${type}`;
  alertBox.innerText = message;

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000); // הסרה אוטומטית לאחר 3 שניות
}

function handleGoogleRegister() {
  window.location.href = "/auth/google";
}
