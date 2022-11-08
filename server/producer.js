const amqp = require("amqplib");
const { url, exchangeName } = require("./config/rabbitmq");

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

class Producer {
  channel;

  async createChannel() {
    const connection = await amqp.connect(url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    await this.channel.assertExchange(exchangeName, "direct");
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );

    console.log(
      `The new ${routingKey} submit request is sent to exchange ${exchangeName}`
    );
  }
}

module.exports = Producer;
