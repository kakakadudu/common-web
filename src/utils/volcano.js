/*
 * @description:
 * @author: sleep
 * @Date: 2023-07-05 00:08:34
 * @LastEditors: FuGui 382431649@qq.com
 * @LastEditTime: 2023-08-31 12:03:49
 */
import TOS from '@volcengine/tos-sdk';
import * as imageConversion from 'image-conversion';
import { getHsyToken } from '@/api/login';
import { getEqualHeight, fileInfo } from './index';

const { data } = await getHsyToken();

let client; // 实例
let key = '';

const instanceHsy = async (bucket = 'cps-oss-public') => {
  const { AccessKeyId, SessionToken, SecretAccessKey } = data.Result.Credentials;
  client = new TOS({
    accessKeyId: AccessKeyId, // 临时密钥的 Access Key
    accessKeySecret: SecretAccessKey, // 临时密钥的 Secret Key
    stsToken: SessionToken, //从 STS 服务获取的安全令牌
    region: 'cn-beijing', // 所在地域
    bucket: bucket, //Bucket 名称。
  });
};

// 五位随机数
function randomString(e) {
  e = e || 32;
  var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = '';
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

/**
 * 普通上传 (图片)
 * @param {File} file
 * @param {Array} arrTmp 上传成功后返回的数据
 * @param {number} path 桶下的文件路径
 * @param {Object} compress 压缩
 * @returns
 */
const putImage = (file, arrTmp = [], path, compress = {
  isCompress: true,
  width: 720
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let compressFile = file;
      if (compress.isCompress) { // 是否压缩
        const { width, height } = await fileInfo(compressFile);
        const equalHeight = getEqualHeight({ width, height });
        compressFile = await imageConversion.compressAccurately(file,
          {
            size: 100,
            width: compress.width,
            height: equalHeight
          }
        )
      };
      // 压缩图片
      key = `${path}/${new Date().toLocaleDateString()}/${file.uid}_${randomString(5)}.jpg`;
      arrTmp.push({
        fileName: file.name,
        url: `https://dj.file.mapvideo.cn/${key}`,
        key,
      });
      const result = await client.putObject({
        key: key,
        body: compressFile,
      });
      resolve({ result, arrTmp });
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * 普通上传 (文件)
 * @param {File} file
 * @param {Array} arrTmp 上传成功后返回的数据
 * @param {number} path 桶下的文件路径
 * @returns
 */
const putFile = (file, arrTmp = [], path) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blob = new Blob([file], { type: file.type });
      const _suffix = "." + file.name.split('.').pop(); // 获取文件后缀
      const _name = file.name.split('.')[0]; // 获取文件名
      key = `${path}/${new Date().toLocaleDateString()}/${randomString(5) + "__" + _name}` + _suffix;
      arrTmp.push({
        fileName: key.match(/\/(.*?)\./)[1],
        url: `https://dj.file.mapvideo.cn/${key}`,
        key,
      });
      const result = await client.putObject({
        key: key,
        body: blob,
      });
      resolve({ result, arrTmp });
    } catch (e) {
      reject(e);
    }
  });
};

export { instanceHsy, putImage, putFile };
