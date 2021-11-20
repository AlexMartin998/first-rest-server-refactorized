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

module.exports = {
  uploadFile,
};
