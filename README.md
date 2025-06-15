## Description

triplej-be 레포지토리는 MVC 패턴을 따라 구성되었기 때문에 controller-service-repository 구조를 따릅니다. 
- `app.controller.ts`
- `app.service.ts`
- `*.repository.ts`

주요 기능은 아래와 같습니다. 
- pickin' 지수 산출
- 자기소개서 첨삭
- 채용공고 조회
- 지원 현황 조회

**Swagger Docs** 또는 `app.controller.ts` 내용을 기반으로, 각 API 별 호출 url을 확인할 수 있습니다. 


## How to Install

```bash
$ npm install
```

## How to Build

```bash
$ nest build
```

## How to Test

### 1. set up database.config.ts

```typescript
// database.config.ts 파일 내용을 아래 내용으로 대체하세요

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: 'triplej-rds.cjm2ekqqs3gt.ap-northeast-2.rds.amazonaws.com',
  port: 5432,
  username: 'triplej',
  password: 'triplej2525!',
  database: 'triplej',
  entities: [__dirname + '/../module/entity/*.entity{.ts,.js}'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
});
```

database 연결에 앞서, 인바운드 규칙에 접속을 위한 ip를 추가해야 합니다.

하지만 원활한 테스트를 위해, 6/22까지는 모든 ip에서 접속 가능하도록 설정하였습니다. 

### 2. start the triplej-be server
```bash
$ nest start
```

서버는 3000번 port에서 실행됩니다. 

그리고 `{base_url}/api-docs`에서 Swagger Docs를 확인할 수 있습니다. ex. `http://localhost:3000/api-docs`
