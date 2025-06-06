import axios from 'axios';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
const REGION = 'us-east-1';
const sesClient = new SESClient({ region: REGION });

export const handler = async (event) => {
  try {
    const orderId = event.Records[0].Sns.Message;

    // Send Email
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const recipient =
      response.data.order.fulfillments[0].shipment_details.recipient;
    const lineItems = response.data.order.line_items;
    const tender = response.data.order.tenders[0];
    // const totalMoney = response.data.order.total_money;
    // const placedAt = new Date(fulfillment.shipment_details.placed_at);
    const serviceCharge = {
      amount_money: {
        amount: 0,
      },
    };
    if (
      response.data.order.service_charges &&
      response.data.order.service_charges.length > 0
    ) {
      serviceCharge = response.data.order.service_charges[0];
    }

    let emailbody = `
<div>${recipient.display_name}</div>
<div>
  ${recipient.phone_number.slice(2)}<br />
  ${recipient.email_address}<br />
  ${recipient.address.address_line_1} ${recipient.address.address_line_2} ${
      recipient.address.locality
    } ${recipient.address.administrative_district_level_1} ${
      recipient.address.postal_code
    }
</div>
<br />
<div>`;
    lineItems.forEach((x) => {
      emailbody += `<div> ${x.quantity} x ${x.variation_name} ${x.name}</div>`;
    });
    emailbody += `
</div>
<br />
<div>`;
    switch (tender.note.slice(12)) {
      case 'pickup':
        emailbody += 'Pickup Order Selected';
        break;
      case 'local':
        emailbody += 'Local Delivery Selected';
        break;
      case 'national':
        emailbody += 'National Shipping Selected';
        break;
    }
    emailbody += `
</div>
<br />
<div>
Total: ${USDollar.format(tender.amount_money.amount / 100)}<br />
Delivery Fee: ${USDollar.format(serviceCharge.amount_money.amount / 100)}
</div>
<hr />
<div>
Square Order<br />
https://app.squareup.com/dashboard/orders/overview/${orderId}
</div>
<div>
Shipping Label<br />
https://mandismickles.com/confirmation?orderId=${orderId}&skipEmail=true
</div>
<hr />
<div>
<img src="https://assets.mandismickles.com/logos/logo.small.png" style="height:100px" />
</div>`;

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [process.env.RECIPIENT_EMAIL],
      },
      Message: {
        Body: {
          Html: { Data: emailbody },
        },
        Subject: { Data: `Bates Portfolio Message# ${tender.transaction_id}` },
      },
      Source: process.env.SENDER_EMAIL,
    });
    console.info('Sending', emailbody);

    await sesClient.send(command);
  } catch (error) {
    console.error(error);
  }
};
