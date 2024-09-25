document.getElementById("reminderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const day = document.getElementById("daySelect").value;
    const time = document.getElementById("timeSelect").value;
    const activity = document.getElementById("activitySelect").value;

    const [hours, minutes] = time.split(":").map(Number);
    const now = new Date();
    let reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    
    while (reminderTime.getDay() !== getDayNumber(day)) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeToReminder = reminderTime.getTime() - now.getTime();
    if (timeToReminder < 0) {
        document.getElementById("message").innerText = "Please select a future time.";
        return;
    }

    setTimeout(() => {
        document.getElementById("message").innerText = `Reminder: It's time for ${activity}!`;

        // Check if sound is ready and play the sound
        const sound = document.getElementById("alarmSound");
        if (sound) {
            console.log("Playing sound...");
            sound.play().catch(error => {
                console.log("Error playing sound:", error);
            });
        } else {
            console.log("Sound element not found.");
        }
    }, timeToReminder);

    document.getElementById("message").innerText = `Reminder set for ${activity} on ${day} at ${time}.`;
});

function getDayNumber(day) {
    const days = {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6
    };
    return days[day];
}
