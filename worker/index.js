require("dotenv").config();
const amqp = require("amqplib");
const { downloadFromS3AndWrite } = require("./utils/s3");
const extensions = require("./utils/extensions");

const {
  url,
  exchangeName,
  queueName,
  bindingKey,
} = require("./config/rabbitmq");

// 1. Get data from buffer of message
// 2. Download from s3 and save locally
// 3. Build and Run docker container
// 4. Upload output to s3
// 5. Save {submission id, aws-link}
// 6. Remove container

async function consumeMessage() {
  try {
    // set up
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "direct");
    const q = await channel.assertQueue(queueName);
    await channel.bindQueue(q.queue, exchangeName, bindingKey);
    // consume
    channel.consume(q.queue, async (msg) => {
      try {
        console.log("Consuming sirrr");
        // Step 1
        const data = JSON.parse(msg.content);
        // Step 2
        const src_location = `./images/${data.lang}/code.${
          extensions[data.lang]
        }`;
        const input_location = `./images/${data.lang}/input.txt`;
        const success2a = await downloadFromS3AndWrite(data.src, src_location);
        const success2b = await downloadFromS3AndWrite(
          data.input,
          input_location
        );
        if (!success2a || !success2b)
          throw "Download and Saving from s3 unsuccessful";
        // Step 3

        channel.ack(msg);
      } catch (e) {
        console.log(e.message);
      }
    });
  } catch (e) {
    console.log(e.message);
  }
}

consumeMessage();
