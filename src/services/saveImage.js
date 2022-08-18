const aws = require("aws-sdk");
const { accessKeyId, secretAccessKey } = require("../config");

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: "sa-east-1",
    ACL: "public-read"
})

const s3 = new aws.S3({ params: { Bucket: 'unesp-s-city' } });

export default async function uploadToS3(file) {
    const buffer = new Buffer.from(file, "base64");
    const name = "teste3123"
    const params = {
        Key: name,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };
    return await new Promise(function (resolve, reject) {
        s3.putObject(params, function (err, data) {
            if (err) {
                console.log(err);
                console.log('Error uploading data: ', params);
            } else {
                console.log('successfully uploaded the image!');
                resolve(JSON.stringify(data))

            }
        });
    });
}

