document
  .getElementById("institution-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("institution").value.trim();
    const description = document.getElementById("description").value.trim();
    const website = document.getElementById("websitelink").value.trim();

    if (!name || !description || !website) {
      alert("Please fill in all the fields.");
      return;
    }
    await createInstitution({ name, description, website });
  });

async function createInstitution(data) {
  const token = window.localStorage.getItem("token");
  const res = await fetch("http://192.168.235.177:5000/institution", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status == 401) {
    return;
  }

  if (res.status !== 200) {
    return alert("Failed to create institution.");
  }

  const result = await res.json();

  if (result.status == "success") {
    return (window.location.href = "dashboard.html");
  }
}
