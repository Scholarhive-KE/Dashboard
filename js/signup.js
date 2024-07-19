document
  .getElementById("signUpButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const surname = document.getElementById("surname").value;
    const otherNames = document.getElementById("otherNames").value;
    const confirmpassword = document.getElementById("confirmPassword").value;

    if (surname === "") {
      alert("Please enter your Surname.");
      return;
    }
    if (otherNames === "") {
      alert("Please enter other names.");
      return;
    }
    if (email === "") {
      alert("Email is required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password === "") {
      alert("Password is required.");
      return;
    }
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      alert(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a unique character."
      );
      return;
    }
    if (confirmpassword === "") {
      alert("Please enter to confirm your Password.");
      return;
    }
    if (password !== confirmpassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    register({
      email,
      password,
      surname,
      otherNames,
      confirmPassword: confirmpassword,
    });
  });

async function register(data) {
  try {
    const res = await fetch("http://192.168.235.177:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status === "success") {
      console.log(result);
      window.location.href = "login.html";
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error(err);
  }
}
