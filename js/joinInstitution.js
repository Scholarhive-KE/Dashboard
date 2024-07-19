document
  .getElementById("joinInstitution")
  .addEventListener("click", function () {
    // Create the popup overlay
    const popupOverlay = document.createElement("div");
    popupOverlay.setAttribute("id", "popupOverlay");
    popupOverlay.style.position = "fixed";
    popupOverlay.style.top = "0";
    popupOverlay.style.left = "0";
    popupOverlay.style.width = "100%";
    popupOverlay.style.height = "100%";
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    popupOverlay.style.display = "flex";
    popupOverlay.style.justifyContent = "center";
    popupOverlay.style.alignItems = "center";
    popupOverlay.style.zIndex = "1000";

    // Create the popup container
    const popupContainer = document.createElement("div");
    popupContainer.style.backgroundColor = "white";
    popupContainer.style.padding = "20px";
    popupContainer.style.borderRadius = "10px";
    popupContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    popupContainer.style.textAlign = "center";

    // Create the popup message
    const popupMessage = document.createElement("p");
    popupMessage.textContent = "Contact your Institution Administrator.";

    // Append the message to the popup container
    popupContainer.appendChild(popupMessage);

    // Append the popup container to the overlay
    popupOverlay.appendChild(popupContainer);

    // Append the overlay to the body
    document.body.appendChild(popupOverlay);

    // Set a timeout to remove the popup after 2 seconds
    setTimeout(function () {
      document.body.removeChild(popupOverlay);
      return (window.location.href = "login.html");
    }, 2000);
  });
