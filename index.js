const { getEmails } = require('./src/parseCSV');
const { getRandomId } = require('./src/utils');
const { saveToJSONFile, readFiles } = require('./src/filesAPI');
const { sendEmail } = require('./src/sendEmail/sendEmail');

const saveParsedEmails = async () => {
    const emails = await getEmails({ fileName: 'data.csv' });
    const normalizeEmails = emails.map(email => ({ email, status: 'pending', id: getRandomId() }));
    try {
        const savedMessage = await saveToJSONFile(normalizeEmails, 'parsedEmails.json');
        console.log(savedMessage);
        return normalizeEmails;
    }catch (e) {
        console.log(e);
    }
};

const delay = ms => new Promise((resolve) => setTimeout(() => resolve(true), ms));

const run = async () => {
    let emails;

    emails = readFiles('parsedEmails.json');
    if (!emails || !emails.length) {
        emails = await saveParsedEmails();
    }

    // for testing:
    // emails = [
    //     {
    //         email: 'vasilyuepavel@gmail.com'
    //     },
    //     {
    //         email: 'ekaterinavasilyeua@gmail.com'
    //     },
    // ];

    const sentEmails = await readFiles('sentEmails.json');
    const emailsToSave = [...sentEmails];

    console.log(emailsToSave)

    for (const { email } of emails) {
        if (!sentEmails.includes(email)) {
            try {
                await sendEmail(email);
                emailsToSave.push(email);
                console.log(`Отправлена анкета на ${email}`);

                await delay(1000);
            } catch (e) {
                await saveToJSONFile(emailsToSave, 'sentEmails.json');
                console.log('Ошибка в отправке письма, попробуйте позже');
                console.log(e.message);
            }
        }
    }
    await saveToJSONFile(emailsToSave, 'sentEmails.json');
};

run();
