const http = require('http');
const prompt = require('prompt');

prompt.start();

function getRequestOptions(path, method, data) {
    return {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    };
}

function getInput(question) {
    return new Promise((resolve, reject) => {
        prompt.get([question], (err, result) => {
            if (err) reject(err);
            resolve(result[question]);
        });
    });
}

async function request(options, data = '') {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            console.log(`Status: ${res.statusCode}`);
            res.setEncoding('utf8');
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                resolve(responseBody);
            });
        });

        req.on('error', (error) => {
            console.error(error);
            reject();
        });

        req.write(data);
        req.end();
    });
}

async function createIssue() {
    const title = await getInput('Title');
    const description = await getInput('Description');
    const data = JSON.stringify({ title, description });
    const options = getRequestOptions('/issues', 'POST', data);
    await request(options, data);
}

async function readIssues() {
    const options = getRequestOptions('/issues', 'GET', '');
    const result = await request(options);
    console.log(result);
}

async function updateIssue() {
    const id = await getInput('Issue ID');
    const title = await getInput('New Title');
    const description = await getInput('New Description');
    const data = JSON.stringify({ title, description });

    const options = getRequestOptions(`/issues/${id}`, 'PUT', data);
    await request(options, data);
}

async function deleteIssue() {
    const id = await getInput('Issue ID to Delete');
    const options = getRequestOptions(`/issues/${id}`, 'DELETE', '');
    await request(options);
}

async function main() {
    console.log("Choose an operation:\n1: Create Issue\n2: Read Issues\n3: Update Issue\n4: Delete Issue");
    const choice = await getInput('Choice');

    switch (choice) {
        case '1':
            await createIssue();
            break;
        case '2':
            await readIssues();
            break;
        case '3':
            await updateIssue();
            break;
        case '4':
            await deleteIssue();
            break;
        default:
            console.log('Invalid choice');
            break;
    }
}

main();