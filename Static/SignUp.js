const submitBtn = document.getElementById("submit-btn"),
     fitnessLevel = document.getElementById('fitness-level'),
     Age = document.getElementById('age'),
     Height = document.getElementById('height'),
     Weight = document.getElementById('weight'),
     EnjoyedActivities = document.getElementById('activities-enjoy'),
     DislikedActivities = document.getElementById('activities-dislike');

submitBtn.addEventListener("click", () => {
    var userInformation = {
        "FitnessLevel": fitnessLevel.value,
        "EnjoyedActivities": EnjoyedActivities.value,
        "DislikedActivities": DislikedActivities.value,
        "Height": Height.value,
        "Weight": Weight.value,
        "Age": Age.value
    };

    fetch("/post/survey", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInformation)
    })
});
