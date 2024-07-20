
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
  "FitnessLevel":"",
  "EnjoyedActivities":"",
  "DislikedActivities":"",
  "Height":"",
  "Weight":"",
  "Feedback":"",
  "FeelingToday":"",
  "Age":"",
}



async function runOrganize(activityNames) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    input = "Format my day into a schedual with times as an array in JSON format with the following activities: " 
      + activityNames + " dont duplicate items. User Fitnesss Level = " + userInformation.FitnessLevel 
      + ". EnjoyedActivities = " + userInformation.EnjoyedActivities + ". DislikedActivities "
       + userInformation.DislikedActivities + ". Age: " + userInformation.;
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
  surveryresponse = JSON.parse(response.choices[0].message.content)["schedule"];
  console.log(surveryresponse);
  return surveryresponse;
}
/*
async function Promptrun() {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  const prompt = "Write A story from this image and the given prompt" ;

  const imageParts = [
    fileToGenerativePart("./sketch.png", "image/png"),
  ];
  

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}
*/

app.use(express.static(path.join(__dirname, 'Static')));
/*
app.use('/AI', (req, res, next) => {  // req: Request, Res: Result, next: to go to the next Middle ware 
  const secondFunction = async () => { // The Secondfunction is a wrapper functions what is a async function to is returns a promice, and it waits for the run fuction because the AI is not instant, and then sends it to the server. 
    const result = await run();
    
    res.send(result);
    next();
  }
  secondFunction();
});
*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'LandingPage.html'));
})

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'LandingPage.html'));
})
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
app.post("/post/survey", jsonParser, (req, res) => {
  userInformation.FitnessLevel = req.FitnessLevel;
  userInformation.DislikedActivities = req.DislikedActivities;
  userInformation.Height = req.Height;
  userInformation.Weight = req.Weight;
  userInformation.Age = req.Age;
  console.log(userInformation);

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