const http = require('http');
const prompt = require('prompt');

prompt.start();

function getInput(question) {
  return new Promise((resolve, reject) => {
    prompt.get([question], (err, result) => {
      if (err) reject(err);
      resolve(result[question]);
    });
  });
}

async function createIssue() {
  const title = await getInput('Title');
  const description = await getInput('Description');
  
  const data = JSON.stringify({ title, description });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/issues',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

createIssue();