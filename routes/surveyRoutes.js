const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

// Create new survey and send out to big list of recipients
module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body);
    res.send({});
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // get the title, subject, body, and recipients from the request body
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      // split the comma sepearated string, map over each email
      // and return an array of objects setting email: email
      // .trim() to cut out any trailing or leading white spaces
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // send email with entire survey object
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);

    } catch(error) {
      res.status(422).send(error);
    }

  });
};