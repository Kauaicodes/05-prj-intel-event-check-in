//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//Track attendance
let count = parseInt(localStorage.getItem("totalAttendance")) || 0;
const maxCount = 50;
let waterCount = parseInt(localStorage.getItem("waterCount")) || 0;
let zeroCount = parseInt(localStorage.getItem("zeroCount")) || 0;
let renewablesCount = parseInt(localStorage.getItem("renewablesCount")) || 0;

//Display saved counts
document.getElementById("attendeeCount").textContent = count;
document.getElementById("waterCount").textContent = waterCount;
document.getElementById("zeroCount").textContent = zeroCount;
document.getElementById("powerCount").textContent = renewablesCount;

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  //Display greeting
  const greeting = document.getElementById("greeting");
  greeting.textContent = `Welcome, ${name}! You're checked in with ${teamName}.`;
  console.log(name, teamName);

  //Increment count
  count++;
  localStorage.setItem("totalAttendance", count);
  document.getElementById("attendeeCount").textContent = count;

  console.log("Total check-ins:", count);

  //Update total attendance
  document.getElementById("attendeeCount").textContent = count;

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100, 100) + "%";
  document.getElementById("progressBar").style.width = percentage;
  console.log(`progress: ${percentage}`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Check if attendance goal has been reached
  if (count >= maxCount) {
    const water = parseInt(document.getElementById("waterCount").textContent);
    const zero = parseInt(document.getElementById("zeroCount").textContent);
    const renewables = parseInt(
      document.getElementById("powerCount").textContent,
    );

    let winningTeam = "";

    if (water >= zero && water >= renewables) {
      winningTeam = "Team Water Wise";
    } else if (zero >= water && zero >= renewables) {
      winningTeam = "Team Net Zero";
    } else {
      winningTeam = "Team Renewables";
    }

    document.getElementById("celebration").style.display = "block";

    document.getElementById("celebration").textContent =
      `🎉 Goal reached! Congratulations ${winningTeam}! You had the most check-ins!`;
  }
  //Save team count
  localStorage.setItem(team + "Count", teamCounter.textContent);

  //Show welcome message
  const message = `Welcome, ${name} from ${teamName}`;
  console.log(message);
// Add attendee to attendee list
const attendeeList = document.getElementById("attendeeList");

const attendeeItem = document.createElement("div");
attendeeItem.classList.add("attendee-item");

attendeeItem.innerHTML = `
  <span class="attendee-name">${name}</span>
  <span class="attendee-team">${teamName}</span>
`;

attendeeList.appendChild(attendeeItem);

  form.reset();
});
