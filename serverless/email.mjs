import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
const REGION = 'us-east-1';
const sesClient = new SESClient({ region: REGION });

export const handler = async (event, _context, callback) => {
  try {
    const body = JSON.parse(event.body);
    const emailbody = `
    <div>
      ${body.name}<br />
      ${body.email}<br />
      ${body.phone}<br />
      ${body.message}
    </div>`;

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [process.env.RECIPIENT_EMAIL],
      },
      Message: {
        Body: {
          Html: { Data: emailbody },
        },
        Subject: { Data: 'Bates Portfolio Message' },
      },
      Source: process.env.SENDER_EMAIL,
    });
    console.info('Sending', emailbody);

    await sesClient.send(command);

    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': 'https://bates-solutions.com',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Content-Type': 'text/html',
      },
      isBase64Encoded: false,
    });
    return;
  } catch (error) {
    console.error(error);
  }
};
