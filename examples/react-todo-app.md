# 사용 예시: React + TypeScript Todo 앱

## 사용자 요청
> "React와 TypeScript로 Todo 앱을 만들고 싶어요. 로컬 스토리지 저장, 드래그앤드롭 정렬 기능이 필요합니다."

---

### 🔷 1단계: Sam의 구조 분석
- **목표**: CRUD + 영속성 + 정렬 인터랙션을 갖춘 Todo 앱
- **범위**: 단일 페이지 앱, 프론트엔드 전용 (백엔드·로그인 없음)
- **컨텍스트**: 새 프로젝트, 기존 코드 없음
- **구조**: 컴포넌트 기반, 상태 관리 필요
- **가정사항**: 단일 사용자, 단일 목록, 데스크톱·모바일 브라우저 모두 지원

### 🔶 2단계: Jenny의 기술적 강화
- React 18 + TypeScript 5 + Vite 5
- 상태 관리: `useReducer` + 커스텀 훅 `useLocalStorage`
- 드래그앤드롭: `@dnd-kit/core`, `@dnd-kit/sortable` (react-beautiful-dnd는 유지보수 중단)
- 스타일: CSS Modules
- 테스트: Vitest + React Testing Library

### 🔹 3단계: Will의 최종 검토
- `Todo` 타입 정의를 명시해 모호성 제거
- localStorage 파싱 실패·용량 초과 시 처리 추가
- 접근성(a11y): 키보드 드래그 정렬, 레이블 추가
- 완료 기준과 실행 명령을 명시해 에이전트형 도구가 스스로 검증 가능하도록 함

---

## 📋 최종 프롬프트

```
## 🎯 작업 목표
React 18 + TypeScript로 할 일 추가/수정/삭제/완료 표시, localStorage 영속화, 드래그앤드롭 정렬을 지원하는 Todo 앱을 새로 만들어 주세요.

## 📋 배경 컨텍스트
- 새 프로젝트이며 기존 코드는 없습니다.
- 백엔드 없이 브라우저에서만 동작합니다. 단일 사용자, 단일 목록입니다.

## 🔧 기술 스택
- 언어: TypeScript 5 (strict 모드)
- 프레임워크: React 18, 빌드 도구 Vite 5
- 주요 라이브러리: @dnd-kit/core, @dnd-kit/sortable
- 테스트: Vitest, @testing-library/react, @testing-library/user-event
- 스타일: CSS Modules

## 📝 상세 요구사항
### 필수 요구사항
1. 데이터 타입:
   type Todo = { id: string; title: string; completed: boolean; createdAt: number };
   id는 crypto.randomUUID()로 생성합니다.
2. 할 일 추가(빈 문자열·공백만 입력 시 추가 안 함, 앞뒤 공백 제거), 제목 인라인 수정, 삭제, 완료 토글.
3. 상태는 useReducer로 관리하고, 액션은 ADD | UPDATE | DELETE | TOGGLE | REORDER 로 정의합니다.
4. 상태 변경 시 localStorage 키 "todos:v1"에 저장하고, 앱 시작 시 복원합니다.
5. @dnd-kit/sortable로 목록 순서를 드래그로 바꿀 수 있고, 바뀐 순서도 저장됩니다.

### 선택적 요구사항
1. 필터: 전체 / 진행 중 / 완료
2. 완료 항목 일괄 삭제 버튼

## ⚠️ 제약사항 및 주의사항
- localStorage 데이터가 손상되었거나 파싱에 실패하면 앱이 깨지지 않고 빈 목록으로 시작하며 console.warn을 남깁니다.
- 저장 실패(QuotaExceededError)는 사용자에게 짧은 안내 메시지로 표시합니다.
- any 타입 사용 금지. react-beautiful-dnd 사용 금지(유지보수 중단).
- 접근성: 입력창 label 제공, 버튼에 aria-label, dnd-kit KeyboardSensor로 키보드 정렬 지원.

## 📐 코드 스타일 가이드
- 네이밍: 컴포넌트 PascalCase, 훅은 useXxx, 그 외 camelCase
- 파일 구조:
  src/
    components/ (TodoInput, TodoList, TodoItem)
    hooks/ (useLocalStorage.ts)
    state/ (todoReducer.ts)
    types.ts
    App.tsx
- 주석: 왜 그렇게 했는지가 드러나지 않는 부분에만 짧게

## 🧪 테스트 요구사항
- todoReducer의 모든 액션 단위 테스트
- useLocalStorage: 정상 복원, 손상된 데이터 처리
- 컴포넌트 테스트: 추가 → 완료 토글 → 삭제 흐름

## 🪜 작업 순서
1. Vite React-TS 템플릿으로 프로젝트 생성 및 의존성 설치
2. types.ts, todoReducer.ts 작성 및 리듀서 테스트
3. useLocalStorage 훅 작성 및 테스트
4. 컴포넌트 구현 및 드래그앤드롭 연결
5. 컴포넌트 테스트 작성, 전체 테스트·빌드 실행

## ✅ 완료 기준
- npm run build, npm test 가 모두 오류 없이 통과
- 새로고침 후에도 할 일과 순서가 유지됨
- 마우스와 키보드 모두로 순서 변경 가능

## 📤 예상 출력 형식
- 위 파일 구조대로 생성된 소스 코드
- README.md에 설치·실행·테스트 명령 정리
```

---

## 🔁 다음 단계 제안 (Will)
- "필터 기능과 완료 항목 일괄 삭제를 추가하고 관련 테스트를 작성해 주세요."
- "다크 모드를 prefers-color-scheme 기반으로 추가해 주세요."
- 결과가 기대와 다르면: 어떤 동작이 어떻게 다른지(재현 단계 + 기대 결과 + 실제 결과)를 그대로 코딩 AI에 전달하세요.
