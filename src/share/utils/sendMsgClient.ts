import Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import { ACCESS_KEY_ID, ACCESS_KEY_SECRET } from 'src/common/constants/aliyun';

const config = new $OpenApi.Config({
  // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
  accessKeyId: ACCESS_KEY_ID,
  // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
  accessKeySecret: ACCESS_KEY_SECRET,
});
// Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
config.endpoint = `dysmsapi.aliyuncs.com`;

const msgClient = new Dysmsapi20170525(config);

export default msgClient;
