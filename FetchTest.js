
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
  FitnessLevel:"Excellent",
  EnjoyedActivities:"Running, biking, GYM",
  DislikedActivities:"Swimming, basketball",
  Height:"5'6",
  Weight:"160",
  Feedback:"",
  Feeling:"I am feeling good",
  Age:"my guy",
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

  runOrganize("School, Drive car, Play video games");