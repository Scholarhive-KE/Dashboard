document.addEventListener("DOMContentLoaded", async function () {
  let scholarships = [];
  let courses = [];

  function showSection(sectionId) {
    const sections = document.querySelectorAll(".main-content section");
    sections.forEach((section) => {
      section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
  }

  async function fetchScholarships() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://192.168.235.177:5000/scholarships", {
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
        scholarships = res.data.scholarships;
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  async function updateScholarship(id, data) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://192.168.235.177:5000/scholarships/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      if (res.status == "success") {
        return res.data.scholarship;
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("There was a problem with the post operation:", error);
    }
  }

  async function createScholarship(data) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://192.168.235.177:5000/scholarships`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      if (res.status == "success") {
        return res.data.scholarship;
      } else {
        alert(res.message);
      }
      console.log(res);
    } catch (error) {
      console.error("There was a problem with the post operation:", error);
    }
  }

  async function fetchCourses() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://192.168.235.177:5000/courses", {
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
        courses = res.data.courses;
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  await fetchScholarships();
  updateScholarshipCount();

  // Event listener to show the scholarships section
  document
    .querySelector('.sidebar a[href="#scholarships"]')
    .addEventListener("click", async function (event) {
      event.preventDefault();
      showSection("scholarships");
      populateScholarshipTable();
      await fetchCourses();
    });

  // Function to populate the scholarship table
  function populateScholarshipTable() {
    const tbody = document
      .getElementById("scholarshipTable")
      .getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    scholarships.forEach((scholarship, index) => {
      const row = tbody.insertRow();
      row.insertCell(0).textContent = scholarship.name;
      row.insertCell(1).textContent = scholarship.courseInterest.name;
      row.insertCell(2).textContent = scholarship.levelOfEducation;
      row.insertCell(3).textContent = scholarship.type;
      row.insertCell(4).textContent = `ksh ${scholarship.awardAmount}`;
      row.insertCell(5).textContent = new Date(
        scholarship.deadline
      ).toLocaleDateString();
      const actionsCell = row.insertCell(6);
      actionsCell.innerHTML = `
                <div class="table-actions">
                <a href="https://${scholarship.applicationLink}" class="norm" >Apply</a>
                    <button class="edit" onclick="editScholarship(${index})">Edit</button>
                    <button class="delete" onclick="deleteScholarship(${index})">Delete</button>
                </div>
            `;
    });
  }

  // Event listener for the scholarship form submission
  document
    .getElementById("scholarshipForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const scholarshipName = document.getElementById("scholarshipName").value;
      const scholarshipDescription = document.getElementById(
        "scholarshipDescription"
      ).value;
      const scholarshipType = document.getElementById("scholarshipType").value;
      const scholarshipApplicationLink =
        document.getElementById("scholarshipLink").value;
      const scholarshipAmount =
        document.getElementById("scholarshipAmount").value;
      const scholarshipCourse =
        document.getElementById("scholarshipCourse").value;
      const scholarshipEducation = document.getElementById(
        "scholarshipEducation"
      ).value;
      const scholarshipDeadline = document.getElementById(
        "scholarshipDeadline"
      ).value;

      if (
        scholarshipName.trim() === "" ||
        scholarshipDescription.trim() === "" ||
        scholarshipAmount.trim() === "" ||
        scholarshipCourse.trim() === "" ||
        scholarshipEducation.trim() === "" ||
        scholarshipDeadline.trim() === "" ||
        scholarshipApplicationLink.trim() === ""
      ) {
        alert(
          "Please fill in all required fields: Scholarship Name,Description,Course, Amount, and Deadline"
        );
        return;
      }
      const scholarshipData = {
        name: scholarshipName,
        description: scholarshipDescription,
        awardAmount: scholarshipAmount,
        courseInterest: scholarshipCourse,
        levelOfEducation: scholarshipEducation,
        deadline: scholarshipDeadline,
        type: scholarshipType,
        applicationLink: scholarshipApplicationLink,
      };
      if (
        document.getElementById("scholarshipForm").dataset.editing === "true"
      ) {
        const editingIndex =
          document.getElementById("scholarshipForm").dataset.index;

        const updatedDoc = await updateScholarship(
          scholarships[editingIndex]._id,
          scholarshipData
        );

        scholarships[editingIndex] = updatedDoc;
        
        document.getElementById("scholarshipForm").dataset.editing = "false";
        document.getElementById("scholarshipForm").dataset.index = "";
      } else {
        const newDoc = await createScholarship(scholarshipData);
        scholarships.push(newDoc);
        updateScholarshipCount()
      }

      populateScholarshipTable();
      document.getElementById("scholarshipForm").reset();
      hideForm("addScholarshipForm");

      showNotification("Scholarship added successfully!", "blue");
    });

  // Function to show a form
  function showForm(formId) {
    document.getElementById(formId).style.display = "block";
  }

  // Function to hide a form
  function hideForm(formId) {
    document.getElementById(formId).style.display = "none";
    document.getElementById("scholarshipForm").reset();
    document.getElementById("scholarshipForm").dataset.editing = "false";
    document.getElementById("scholarshipForm").dataset.index = "";
  }

  // Function to update scholarship count
  function updateScholarshipCount() {
    const totalScholarships = scholarships.length;
    document.getElementById("totalScholarships").textContent =
      totalScholarships;
    document.getElementById("activeScholarships").textContent =
      totalScholarships;
  }

  // Function to edit a scholarship
  window.editScholarship = function (index) {
    const scholarship = scholarships[index];
    console.log(scholarship);
    document.getElementById("scholarshipName").value = scholarship.name;
    document.getElementById("scholarshipDescription").value =
      scholarship.description;
    document.getElementById("scholarshipAmount").value =
      scholarship.awardAmount;
    document.getElementById("scholarshipDescription").value =
      scholarship.description;
    document.getElementById("scholarshipLink").value =
      scholarship.applicationLink;
    document.getElementById("scholarshipType").value = scholarship.type;
    const deadlineDate = new Date(scholarship.deadline);
    const year = deadlineDate.getFullYear();
    const month = String(deadlineDate.getMonth() + 1).padStart(2, "0");
    const day = String(deadlineDate.getDate()).padStart(2, "0");
    const formattedDeadline = `${day}-${month}-${year}`;
    document.getElementById("scholarshipDeadline").value = formattedDeadline;

    const selectCourse = document.getElementById("scholarshipCourse");
    if (selectCourse.options.length == 0) {
      courses.forEach((course) => {
        const option = document.createElement("option");
        option.value = course._id;
        option.textContent = course.name;
        selectCourse.appendChild(option);
      });
    }
    showForm("addScholarshipForm");
    selectCourse.value = scholarship.courseInterest._id;
    document.getElementById("scholarshipForm").dataset.editing = "true";
    document.getElementById("scholarshipForm").dataset.index = index;
  };

  // Function to delete a scholarship
  window.deleteScholarship = function (index) {
    fetch(`http://192.168.235.177:5000/scholarships/${scholarships[index]._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        scholarships.splice(index, 1);
        populateScholarshipTable();
        updateScholarshipCount()
      })
      .catch((error) => {
        console.error("There was a problem with the delete operation:", error);
      });
  };

  document.getElementById("addFormBtn").addEventListener("click", function () {
    const selectCourse = document.getElementById("scholarshipCourse");
    if (selectCourse.options.length == 0) {
      courses.forEach((course) => {
        const option = document.createElement("option");
        option.value = course._id;
        option.textContent = course.name;
        selectCourse.appendChild(option);
      });
    }
    showForm("addScholarshipForm");
  });

  // Function to show a notification
  function showNotification(message, color) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.backgroundColor = color;
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.position = "fixed";
    notification.style.bottom = "40px";
    notification.style.right = "40px";
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 1500);
  }
});
