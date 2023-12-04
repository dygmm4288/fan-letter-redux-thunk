# 내일 배움 캠프 개인 과제 : 팬 래터 홈페이지

리액트로 만든 걸그룹 에스파 팬 레터함

# 주요 기능

- react-router-dom을 이용한 SPA (Home, Detail)
- Home 페이지 : 각 멤버별 응원 메시지 작성, 간단한 팬래터 확인 가능
- Detail 페이지 : 각 팬레터 내용을 수정 및 삭제할 수 있는 페이지

# 추가 구현 사항

- Redux, redux toolkit을 이용한 전역 상태 관리, redux-thunk를 이용한 비동기 동작 구현
- 인증 서버를 통한 로그인 / 회원가입 구현
- 회원 프로필 정보 및 변경 기능 제공
- json 서버를 통한 팬래터 CRUD 비동기 구현
- 커스텀 모달 및 react-toastify를 이용한 알림창 구현

# 구현 시 주요 고려 사항
- 비로그인 시 router에서 분기 처리 통해 인증된 사용자가 아니라면 로그인 페이지 이동
- 로그인 / 회원가입 오류 시  react-toastify를 통한 에러 메시지 제공
- json server crud 구현
- 회원 프로필 정보 변경 시 해당 회원이 작성한 팬래터도 연동하여 변경
- 로그인 / 회원가입 시 유효성 검사 후 버튼 활성하
- json server crud 시 access token을 이용한 인가 확인 작업 수행 후 crud 실행
  * axios interceptor 이용
  * access token 만료된 유저인 경우 crud 이용하지 못하게 구현
