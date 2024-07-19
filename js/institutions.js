let inst = [];

async function fetchInstitutions() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://192.168.235.177:5000/institution", {
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
      inst = res.data.institutions;
      updateInstitutions();
    } else {
      alert(res.message);
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function populateInstitutions() {
  const instTableBody = document.querySelector("#instTable tbody");
  instTableBody.innerHTML = "";

  inst.forEach((instItem, index) => {
    console.log(instItem);
    const row = document.createElement("tr");

    row.innerHTML = `
                    <td>${instItem.name}</td>
                    <td>${instItem.website}</td>
                    <td>${instItem.status}</td>`;
    const actionsCell = row.insertCell(3);
    actionsCell.innerHTML = `   
              <div class="table-actions">
              ${
                instItem.status !== "approved"
                  ? `<button class="approve" onclick="approveInstitution(${index})">Approve</button>`
                  : ""
              }
              ${
                instItem.status !== "blocked"
                  ? ` <button class="block" onclick="blockInstitution(${index})"> Block</button>`
                  : ""
              }
                    
                   
                </div>
                `;
    instTableBody.appendChild(row);

    document.querySelectorAll(".main-content section").forEach((section) => {
      console.log("done");
      section.style.display = "none";
    });
    document.getElementById("inst").style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchInstitutions();
  document
    .querySelector('.sidebar a[href="#institution"]')
    .addEventListener("click", async function (event) {
      event.preventDefault();
      populateInstitutions();
    });
});

const updateInstitutions = () => {
  const allInst = inst.length;
  document.getElementById("totalInstitutions").textContent = allInst;
};

window.approveInstitution = async (index) => {
  try {
    const token = localStorage.getItem("token");
    const institution = inst[index];
    const response = await fetch(
      `http://192.168.235.177:5000/institution/${institution._id}/status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();
    console.log(res);
    if (res.status == "success") {
      inst[index] = res.data;
      const updTable = document.getElementById("instTable");
      const status = updTable.rows[index + 1].cells[2];
      status.textContent = "approved";
      updTable.rows[
        index + 1
      ].cells[3].innerHTML = `<button class="block" onclick="blockInstitution(${index})"> Block</button>`;
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

window.blockInstitution = async (index) => {
  try {
    const token = localStorage.getItem("token");
    const institution = inst[index];
    const response = await fetch(
      `http://192.168.235.177:5000/institution/${institution._id}/status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "blocked" }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();
    console.log(res);
    if (res.status == "success") {
      inst[index] = res.data;

      const updTable = document.getElementById("instTable");
      const status = updTable.rows[index + 1].cells[2];
      status.textContent = "blocked";
      updTable.rows[
        index + 1
      ].cells[3].innerHTML = `<button class="approve" onclick="approveInstitution(${index})">Approve</button>`;
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
