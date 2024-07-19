document.addEventListener("DOMContentLoaded", function () {
  let profileData;

  async function fetchProfile() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://192.168.235.177:5000/profile", {
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
        profileData = res.data.profile;
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  document
    .querySelector('.sidebar a[href="#profile"]')
    .addEventListener("click", async function (event) {
      event.preventDefault();
      await fetchProfile();
      showSection("profile");
      populateProfileForm(profileData);
    });
});

function showSection(sectionId) {
  const sections = document.querySelectorAll(".main-content section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
}

function populateProfileForm(data) {
  console.log("datad", data);
  //   document.getElementById("institution").value = data.institution;
  document.getElementById("surname").value = data.surname;
  document.getElementById("otherNames").value = data.other_names;
  //   document.getElementById("websitelink").value = data.websitelink;
  //   document.getElementById("description").value = data.description;
  document.getElementById("email").value = data.email;
  //   document.getElementById("location").value = data.location;
  //   document.getElementById("dataImage").src = data.dataImage;
}
