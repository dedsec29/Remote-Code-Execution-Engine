const amqp = require("amqplib");
const {
  url,
  exchangeName,
  queueName,
  bindingKey,
} = require("./config/rabbitmq");

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
      const data = JSON.parse(msg.content);
      console.log(data);
      channel.ack(msg);
    });
  } catch (e) {
    console.log(e.message);
  }
}

consumeMessage();
