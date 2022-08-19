const aws = require("aws-sdk");
const { accessKeyId, secretAccessKey } = require("../config");
import uuid from 'react-native-uuid';


export default async function uploadToS3(file) {
    aws.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        region: "sa-east-1"
    })
    const s3 = new aws.S3({ params: { Bucket: 'unesp-s-city' } });
    const photo = await fetch(file)
    const photoBlob = await photo.blob();
    const filename = uuid.v4() + "_foto.jpeg"
    const params = {
        Key: 'images/' + filename,
        Body: photoBlob,
        ContentType: 'image/jpeg',
        ACL: 'public-read'
    };

    return await new Promise(function (resolve, reject) {
        s3.putObject(params, function (err, data) {
            if (err) {
                console.log(err);
                console.log('Error uploading data: ', err);
            } else {
                console.log('successfully uploaded the image!');
                resolve({ ...data, filename })
            }
        });
    });
}