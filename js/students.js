let students = [];

async function fetchStudents() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://192.168.235.177:5000/students", {
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
      students = res.data;
      updateStudents();
    } else {
      alert(res.message);
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function populateStudents() {
  const userTableBody = document.querySelector("#studentTable tbody");
  userTableBody.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${student.profile.other_names}</td>
                    <td>${student.profile.surname}</td>
                    <td>${student.citizenship}</td>
                    <td>${student.educationLevel}</td>
                    <td>${student.status}</td>
                `;
    userTableBody.appendChild(row);
  });

  document.querySelectorAll(".main-content section").forEach((section) => {
    console.log("done");
    section.style.display = "none";
  });
  document.getElementById("student").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  fetchStudents();
  document
    .querySelector('.sidebar a[href="#students"]')
    .addEventListener("click", function (event) {
      event.preventDefault();
      populateStudents();
    });
});
const updateStudents = () => {
  const allStud = students.length;
  document.getElementById("totalStudents").textContent = allStud;
};
