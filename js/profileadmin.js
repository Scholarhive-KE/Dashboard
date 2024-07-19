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

async function getProfile() {
  await fetchProfile();

  document.getElementById(
    "dashboardUsername"
  ).textContent = `${profileData.surname} ${profileData.other_names}`;
}

async function updateProfile(data) {
  try {
    const token = window.localStorage.getItem("token");
    const res = await fetch("http://192.168.235.177:5000/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status == 401) {
      return (window.location.href = "login.html");
    }
    const result = await res.json();
    if (result.status == "success") {
      await getProfile();
      alert("Profile Updated");
    } else {
      alert(result.data.message);
    }
    console.log(result);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".main-content section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", async function () {
  await fetchProfile();
  await getProfile();
});

document
  .querySelector('.sidebar a[href="#profile"]')
  .addEventListener("click", async function (event) {
    event.preventDefault();
    showSection("profile");
    populateProfileForm(profileData);
  });

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

document
  .getElementById("btn-update")
  .addEventListener("click", async function (event) {
    console.log("aa");
    event.preventDefault();

    const surname = document.getElementById("surname").value.trim();
    const otherNames = document.getElementById("otherNames").value.trim();
    const email = document.getElementById("email").value.trim();

    if (surname === "" || otherNames === "" || email === "") {
      return alert("Please fill in all the fields");
    }
    await updateProfile({ surname, otherNames, email });
    return;
  });
