'use strict';

const path = require('path');
const uuidv4 = require('uuid').v4;
const cloudinary = require('cloudinary').v2;

const uploadFile = (
  files,
  allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'],
  directory = ''
) => {
  return new Promise((resolve, reject) => {
    // console.log(files);

    const { file } = files;
    const fileExtension = file.name.split('.').at(-1);

    // Validate file extension
    if (!allowedExtensions.includes(fileExtension))
      return reject(`File not allowed: '.${fileExtension}' isn't allowed!`);

    // Upload file
    const fileName = uuidv4() + '.' + fileExtension;
    const uploadPath = path.join(
      __dirname,
      './../uploads',
      directory,
      fileName
    );

    file.mv(uploadPath, err => {
      if (err) reject(err);
      resolve(fileName);
    });
  });
};

const uploadImgCloudinary = async (
  model,
  file,
  tempFilePath,
  allowedExtensions = ['png', 'jpg', 'jpeg', 'gif']
) => {
  // Validate file extension
  const fileExtension = file.name.split('.').at(-1);
  if (!allowedExtensions.includes(fileExtension))
    return reject(`File not allowed: '.${fileExtension}' isn't allowed!`);

  // Upload img
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.img = secure_url;

  await model.save();
};

module.exports = {
  uploadFile,
  uploadImgCloudinary,
};
