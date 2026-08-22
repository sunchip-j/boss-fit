# Modified Baumann Skin Type

Modified Baumann Skin Type 설문 MVP입니다.

## 정책

- 로그인과 회원가입 없이 설문을 진행합니다.
- 정적 JSON 데이터와 클라이언트 계산만으로 동작합니다.
- 사용자 응답은 서버에 저장하지 않습니다.

## 기술 스택

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## 주요 라우트

| 경로 | 설명 |
|------|------|
| `/` | 피부 타입 설문 시작 |
| `/test` | 33문항 설문 진행 |
| `/result?type=...` | 클라이언트 계산 결과 |

## 프로젝트 구조

```
app/
  page.tsx                 # 설문 시작
  test/page.tsx            # 질문 진행
  result/page.tsx          # 쿼리 기반 결과

features/
  skin-type/
    components/            # 설문 UI
    data/
      questions.json       # 33문항 정적 데이터
      results.json         # 16개 결과 타입
    calculate.ts           # 점수 계산
    types.ts
```

## 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인합니다.

## 환경변수와 DB

현재 MVP는 환경변수, DB, API Route Handler가 필요 없습니다.

## 설문 동작 방식

1. `/`에서 설문을 시작합니다.
2. `/test`에서 33개 문항을 클라이언트 상태로 진행합니다.
3. 각 선택지의 `score`를 영역별로 합산합니다.
4. D/O, S/R, P/N, W/T 네 축을 판정하고 4글자 타입을 만듭니다.
5. 결과는 서버 저장 없이 `/result` 쿼리스트링으로 표시합니다.

## 설문 구성

- Dry/Oily: 6문항
- Sensitive/Resistant: 9문항
- Pigmented/Nonpigmented: 7문항
- Wrinkled/Tight: 11문항
- 총 33문항

선택지 기본 점수는 1번=1, 2번=2, 3번=3, 4번=4, 5번=2.5입니다.

## 외부 인프라

GitHub 저장소명, Vercel 프로젝트명, 배포 도메인은 코드 변경과 별도로 유지될 수 있습니다.
