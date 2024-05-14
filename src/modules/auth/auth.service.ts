import { Injectable } from '@nestjs/common';
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
import getRandomCode from 'src/share/utils';
import {
  ACCESS_KEY_ID,
  ACCESS_KEY_SECRET,
  SIGN_NAME,
  TEMPLATE_CODE,
} from 'src/common/constants/aliyun';
import { UserService } from '../user/user.service';
import { Result } from 'src/common/dto/result.type';
import { SUCCESS, UPDATE_ERROR } from 'src/common/constants/code';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  //send sms code
  async sendSMSCodeMsg(tel: string): Promise<Result> {
    const code = getRandomCode();
    const config = new $OpenApi.Config({
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
      accessKeyId: ACCESS_KEY_ID,
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
      accessKeySecret: ACCESS_KEY_SECRET,
    });
    // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
    config.endpoint = `dysmsapi.aliyuncs.com`;
    const client = new Dysmsapi20170525(config);
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: SIGN_NAME,
      templateCode: TEMPLATE_CODE,
      phoneNumbers: tel,
      templateParam: `{\"code\":\"${code}\"}`,
    });
    const runtime = new $Util.RuntimeOptions({});

    try {
      // 复制代码运行请自行打印 API 的返回值
      await client.sendSmsWithOptions(sendSmsRequest, runtime);
      const user = await this.userService.findByTel(tel);
      if (user) {
        const result = await this.userService.updateCode(user.id, code);
        if (result) {
          return {
            code: SUCCESS,
            message: 'ok',
          };
        } else
          return {
            code: UPDATE_ERROR,
            message: '更新code失败',
          };
      }
      const result = await this.userService.create({
        tel,
        code,
        codeCreateTimeAt: new Date(),
      });
      if (result) {
        return {
          code: SUCCESS,
          message: 'ok',
        };
      } else
        return {
          code: UPDATE_ERROR,
          message: '新建账号失败',
        };
    } catch (error) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      // 错误 message
      console.log(error.message);
      // 诊断地址
      console.log(error.data['Recommend']);
    }
  }
}
