let users = [];

async function fetchUsers() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://192.168.235.177:5000/institution/admin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();
    console.log(res);
    if (res.status == "success") {
      users = res.data.institutionAdmins;
    } else {
      alert(res.message);
    }

    document.getElementById("institutionAdmins").textContent = users.length;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function populateUsers() {
  const userTableBody = document.querySelector("#userTable tbody");
  userTableBody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${user.profile.surname} ${user.profile.other_names}</td>
                    <td>${user.profile.email}</td>
                `;
    userTableBody.appendChild(row);
  });
  document.querySelectorAll(".main-content section").forEach((section) => {
    console.log("done");
    section.style.display = "none";
  });
  document.getElementById("users").style.display = "block";
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchUsers();
  document
    .querySelector('.sidebar a[href="#users"]')
    .addEventListener("click", function (event) {
      event.preventDefault();
      populateUsers();
    });
});

function showForm(formId) {
  document.getElementById(formId).style.display = "block";
}

document
  .getElementById("addAdminForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const adminEmail = document.getElementById("adminEmail").value;

    if (!adminEmail) {
      alert("Fill in the email");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(adminEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    const token = localStorage.getItem("token");
    const res = await fetch("http://192.168.235.177:5000/institution/admin", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: adminEmail }),
    });
    const result = await res.json();
    if (result.status == "success") {
      alert("Institution Admin Added");
    } else {
      alert(result.message);
    }
  });

function addAdmin() {
  showForm("addAdminForm");
}
