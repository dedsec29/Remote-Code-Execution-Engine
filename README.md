This project aims to execute your code remotely, so that:

- You don't have to spend computation power of your pc. Instead, run the code on a remote server, saving you resources.
- You can execute code without damaging your pc if the code is malicious.
- You don't have to worry about security

Stack used:

- Docker
- Node.js
- RabbitMQ
- Express
- Amazon S3

How to setup:
In the root directory of the app, run the following commands -

- docker volume create shared
- docker build --no-cache -t rce/spawner worker/images/cpp
- docker-compose up --build

How to use:

- Send a post request to http://localhost:7000/api/submit with following attributes in the shown example:
  {
  "src": "https://rce-upload.s3.ap-south-1.amazonaws.com/hello.cpp",
  "stdin": "https://rce-upload.s3.ap-south-1.amazonaws.com/input.txt",
  "lang": "cpp"
  }

Notes:

- Currently only supports C++ files. Other languages to be added soon.
- Uploading output file generated to a datastore like S3 to be added soon.
- Memory limit 150MB
- Time limit to be added soon
