import { CommonEntity } from '@/common/entities/common.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity('student')
export class Student extends CommonEntity {
  @Column({
    comment: '昵称',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: '手机号',
    nullable: true,
  })
  tel: string;

  @Column({
    comment: '头像',
    nullable: true,
  })
  avatar: string;

  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '账户',
    nullable: true,
  })
  account: string;
}
