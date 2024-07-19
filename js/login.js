document
  .getElementById("loginButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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

    // Making the API call
    fetch("http://192.168.235.177:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => {
        console.log(response);
        if (response.status == 401) {
          alert("Invalid email or password.");
        }
        response.json().then((res) => {
          console.log(res);
          if (res.status !== "success") {
            return alert("Login failed: " + res.message);
          }
          localStorage.setItem("token", res.data.token);
          if (res.data.user.role == "user") {
            return (window.location.href = "nextpg.html");
          }
          if (res.data.user.role == "admin") {
            return (window.location.href = "institutionadmin.html");
          }
          if (res.data.user.role !== "institutionAdmin") {
            return alert("You are not an institution admin.");
          }

          window.location.href = "dashboard.html";
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  });
