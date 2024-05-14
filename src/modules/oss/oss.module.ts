import { Module } from '@nestjs/common';
import { OSSResolver } from './oss.resolver';
import { OssService } from './oss.service';

@Module({
  imports: [],
  providers: [OSSResolver, OssService],
  exports: [],
})
export class OSSModule {}
