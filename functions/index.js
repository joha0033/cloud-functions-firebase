const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Austin!!");
//  console.log('hey, love wire');
// });

exports.sanitizePost = functions.database
  .ref('/posts/{pushId}')
  .onWrite(event => {
    const post = event.data.val()
    if(post.sanitized == true){
      return
    }
    console.log('Sanitizing new post', event.params.pushId);
    console.log(post);
    post.sanitized = true
    post.title = sanitize(post.title)
    post.body = sanitize(post.body)
    return event.data.ref.set(post)
  })

  function sanitize(s){
    var sanitizedText = s
    sanitizedText = sanitizedText.replace(/\bstupid\b/ig, 'wonderful')
    return sanitizedText
  }
