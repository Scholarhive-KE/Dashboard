async function fetchProfile() {
  try {
    const token = window.localStorage.getItem("token");
    const res = await fetch("http://192.168.235.177:5000/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status == 401) {
      return (window.location.href = "login.html");
    }
    const result = await res.json();

    return result.data.profile;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function fetchAdminProfile() {
  try {
    const token = window.localStorage.getItem("token");
    const res = await fetch("http://192.168.235.177:5000/institution/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status == 401) {
      return (window.location.href = "login.html");
    }
    if (res.status == 404) {
      return (window.location.href = "nextpg.html");
    }
    const result = await res.json();

    return result.data.institution;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function getProfile() {
  const profile = await fetchProfile();
  const adminProfile = await fetchAdminProfile();
  console.log("profile", adminProfile);
  if (adminProfile.status !== "approved") {
    alert("Please wait for your institution to be approved.");
    return (window.location.href = "login.html");
  }
  document.getElementById("dashboardUsername").textContent = profile.surname;
  document.getElementById("dashboardInstitutions").textContent =
    adminProfile.name;
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
document.addEventListener("DOMContentLoaded", getProfile);

document
  .getElementById("btn-update")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const surname = document.getElementById("surname").value.trim();
    const otherNames = document.getElementById("otherNames").value.trim();
    const email = document.getElementById("email").value.trim();

    // const profileImageInput = document.getElementById("profilePictureInput");
    // const profileImageFile = profileImageInput.files[0];

    // if (firstName) {
    //   document.getElementById("dashboardUsername").textContent = firstName;
    // }
    // if (profileImageFile) {
    //   const reader = new FileReader();
    //   reader.onload = function (e) {
    //     document.getElementById("dashboardProfileImage").src = e.target.result;
    //   };
    //   reader.readAsDataURL(profileImageFile);
    // }
    if (surname === "" || otherNames === "" || email === "") {
      return alert("Please fill in all the fields");
    }
    await updateProfile({ surname, otherNames, email });
    return;
  });

function loadProfileImage(event) {
  const profileImage = document.getElementById("profileImage");
  profileImage.src = URL.createObjectURL(event.target.files[0]);
  profileImage.onload = function () {
    URL.revokeObjectURL(profileImage.src); // Free up memory
  };
}
