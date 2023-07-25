initBattery();


function initBattery() {
    const batteryLiquid = document.querySelector(".Bliquid"); 
        // Select the element with the class "Bliquid" and store it in the variable "batteryLiquid."

    const batteryStatus = document.querySelector(".Bstatus");
        // Select the element with the class "Bstatus" and store it in the variable "batteryStatus."

    const Bpercentage = document.querySelector(".Bpercentage");
        // Select the element with the class "Bpercentage" and store it in the variable "Bpercentage."

    navigator.getBattery().then((batt) => {
            // Get the battery status using the Navigator API's getBattery() method.

        updateBattery = () => {
                    // Define an updateBattery function that will update 
                    //the battery-related elements' content and styles.

            let level = Math.floor(batt.level * 100);            // Calculate the battery level as a percentage and store it in the "level" variable.

            Bpercentage.innerHTML = level + "%";             // Update the content of the element with class "Bpercentage" to display the battery level percentage.

            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`;            // Adjust the height of the "Bliquid" element (battery indicator) based on the battery level percentage.

                        // Update the battery status text and icons based on the battery level and charging status.

            if (level == 100) {
                batteryStatus.innerHTML = `Battery Full <i class="ri-battery-2-fill green-color"></i>`;
                batteryLiquid.style.height = "103%";
            } else if (level <= 20 & !batt.charging) {
                batteryStatus.innerHTML = `Low Charge <i class="ri-plug-line animated-red animated-red"></i>`;
            } else if (batt.charging) {
                batteryStatus.innerHTML = `Charging ... <i class="ri-flashlight-line animated-green"></i>`;
            } else {
                batteryStatus.innerHTML = "";
            }

                        // Apply appropriate color gradients to the "Bliquid" element based on the battery level.

            if (level <= 20) {
                batteryLiquid.classList.add("gradient-color-red");
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-yellow");
            } else if (level <= 48) {
                batteryLiquid.classList.add("gradient-color-orange");
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-red", "gradient-color-yellow");
            } else if (level <= 80) {
                batteryLiquid.classList.add("gradient-color-yellow");
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-red");
            } else {
                batteryLiquid.classList.add("gradient-color-green");
                batteryLiquid.classList.remove("gradient-color-red", "gradient-color-orange", "gradient-color-yellow");
            }
        }

                // Call the updateBattery function immediately to initialize the battery display.

        updateBattery();

                // Add event listeners to the battery object to update the battery display when charging status changes.

        batt.addEventListener("chargingchange", () => { updateBattery() });

                // Add event listeners to the battery object to update the battery display when battery level changes.

        batt.addEventListener("levelchange", () => { updateBattery });
    })
}
