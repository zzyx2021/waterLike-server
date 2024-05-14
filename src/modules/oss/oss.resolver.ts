import { Query, Resolver } from '@nestjs/graphql';
import { OSSType } from './dto/dto.type';
import { OssService } from './oss.service';

@Resolver()
export class OSSResolver {
  constructor(private readonly OSSService: OssService) {}

  @Query(() => OSSType, { description: '获取OSS相关信息' })
  async getOSSInfo(): Promise<OSSType> {
    return await this.OSSService.getSignature();
  }
}
