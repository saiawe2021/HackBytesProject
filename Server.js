
const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: "sk-proj-xHOQgq2cciPMvX7Q5WnxT3BlbkFJVSwuM1ixpNrMnfUXq3gM"
});
//let API_KEY = "AIzaSyA32Swkb_ID3NkXoPziqikdh7--Y4yVdhs";
const fs = require("fs");
const { homedir } = require('os'); 
var userInformation = {
  FitnessLevel:"",
  EnjoyedActivities:"",
  DislikedActivities:"",
  Height:"",
  Weight:"",
  Feedback:"",
  Feeling:"",
  Age:"",
}



async function runOrganize(activityNames) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  var input = "Format my day into a schedual with times as an array in JSON format with the following activities and add physical tasks for me based on my enjoyed activities that i enjoy: " 
  + activityNames + " dont duplicate items. User Fitnesss Level = " + userInformation.FitnessLevel 
  + ". EnjoyedActivities = " + userInformation.EnjoyedActivities + ". DislikedActivities "
   + userInformation.DislikedActivities + ". Age: " + userInformation.Age + " Some feedback about your scheduling: " + userInformation.Feedback;
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
    temperature: 0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  surveryresponse = completion.choices[0].message.content;
  console.log(surveryresponse);
  return surveryresponse;
}



app.use(express.static(path.join(__dirname, 'Static')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'LandingPage.html'));
});

app.get("/calendar", (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'Calendar.html'));
});

app.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'SignUp.html'));
});
/*
app.get('/AI', (req, res) => {
  res.send();
});

//get request
app.get('/api/AI', (req, res) => {
  const secondFunction = async () => {  
    const result = await run();
    res.json(result);
    return result;
  } 
  secondFunction();
})

// Serve start.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'start.html'));
});

// Serve index.html when the specific route is accessed
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'canvas.html'));
});

app.get('/wait', (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'WaitingSinglePlayer.html'));
});
*/

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.post("/post/survey", (req, res) => {
  userInformation.FitnessLevel = req.body.FitnessLevel;
  userInformation.EnjoyedActivities = req.body.EnjoyedActivities;
  userInformation.DislikedActivities = req.body.DislikedActivities;
  userInformation.Height = req.body.Height;
  userInformation.Weight = req.body.Weight;
  userInformation.Age = req.body.Age;
  console.log(userInformation);
});
/*
  data format
  body: {Feedback : $data}
*/
app.post("/post/feedback", (req, res) => {
  userInformation.Feedback = req.body.Feedback;
  console.log(userInformation);
});

/*
  data format
  body: {Feeling: $feeling
        Events: $Comma sepreated string that is a list of the events}
*/
app.post("/post/organize", (req, res) => {
  userInformation.Feeling = req.body.Feeling;
  console.log(req.body.Feeling);
  console.log(req.body.Events);
  const secondFunction = async () => {  
    const result = await runOrganize(req.body.Events);
    res.json(result);
    res.send();
    return result;
  } 
  secondFunction();
});
/*
//post request
app.post("/upload", jsonParser, (req, res) => {
  const imageData = req.body.imageData;
  const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFile('sketch.png', buffer, (err) => {
    if (err) {
        console.error('Error writing image:', err);
    } else {
        console.log('Image saved successfully');
    }
    const secondFunction = async () => {  
      const result = await run();
      res.json(result);
      return result;
    } 
    secondFunction();
});
});

app.post('/prompt', jsonParser, (req, res) => {
  currentPrompt = req.body.prompt; // Save the prompt from the request body
  res.sendStatus(200);
});

app.get('/prompt', (req, res) => {
  res.json({ prompt: currentPrompt });
});
*/

app.listen(3000, () => console.log('Example app is listening on port 3000.'));