# 16. 인수 테스트와 승인 조건 합의하기 (Agreeing on Acceptance Tests and Approval)

## 학습 목표

- 과 ID · vol9-16
- 핵심 문법 · G13 조건과 합의로 인수 기준과 승인 절차 정하기
- 상황 검색어 · 인수 테스트, 합격 기준, 테스트 담당, 증빙 자료, 결함 처리, 승인 기한
- 말하기 목표 · 인수 테스트의 합격 기준과 담당, 필요한 증빙을 합의하고, 결함 처리와 재시험 절차를 정한 뒤, 최종 결제 전 승인 기한을 확인합니다.

## 기본 대화

A는 Pinecrest의 담당 리드 Maya이고, B는 Harbor Market 운영 책임자 Daniel입니다. 4월 30일 출시를 앞두고 인수 테스트의 합격 기준과 승인 절차를 합의합니다.

- **A** Before we start acceptance testing, / I'd like to agree on the pass criteria and the process.
  - 인수 테스트를 시작하기 전에 합격 기준과 절차를 합의하고 싶습니다.
- **B** Good. / What counts as a pass?
  - 좋습니다. 무엇을 합격으로 보나요?
- **A** Four things. / Two hundred test orders across the five pilot stores, / ninety-nine percent of alerts within two minutes, / a ninety-eight percent payment success rate, / and no critical defects.
  - 네 가지입니다. 파일럿 매장 다섯 곳에서 테스트 주문 200건, 알림의 99퍼센트가 2분 이내 도착, 결제 성공률 98퍼센트, 그리고 치명적 결함이 없어야 합니다.
- **B** Who runs the tests?
  - 테스트는 누가 진행하나요?
- **A** Your store staff place the orders, / and our QA team checks the logs. / We'd run it together over three days, April 20 to 22.
  - 매장 직원이 주문을 넣고, 저희 QA 팀이 기록을 확인합니다. 4월 20일부터 22일까지 사흘간 함께 진행하겠습니다.
- **B** What evidence do you need from us?
  - 저희에게서 어떤 증빙이 필요한가요?
- **A** A signed test sheet from each store, / screenshots of the dashboard, / and the order IDs you used. / If a critical defect appears, / we fix it within two business days and retest. / If everything passes, we'd ask for written sign-off by April 28.
  - 매장별 서명된 테스트 시트, 대시보드 화면 캡처, 사용한 주문 번호가 필요합니다. 치명적 결함이 나오면 영업일 기준 이틀 안에 고치고 다시 테스트합니다. 모두 통과하면 4월 28일까지 서면 승인을 요청드리겠습니다.
- **B** That works. / Send the test plan today, / and we'll confirm the store testers by Monday.
  - 좋습니다. 오늘 테스트 계획을 보내 주시고, 월요일까지 매장 테스트 담당자를 확정하겠습니다.

## 핵심 문장

### 필수 표현

- Before we start acceptance testing, I'd like to agree on the pass criteria and the process.
  - 인수 테스트를 시작하기 전에 합격 기준과 절차를 합의하고 싶습니다.
- What counts as a pass?
  - 무엇을 합격으로 보나요?
- We'd run it together over three days, April 20 to 22.
  - 4월 20일부터 22일까지 사흘간 함께 진행하겠습니다.
- If a critical defect appears, we fix it within two business days and retest.
  - 치명적 결함이 나오면 영업일 기준 이틀 안에 고치고 다시 테스트합니다.

### 확장 표현

- Two hundred test orders across the five pilot stores.
  - 파일럿 매장 다섯 곳에서 테스트 주문 200건입니다.
- Ninety-nine percent of alerts within two minutes.
  - 알림의 99퍼센트가 2분 이내 도착해야 합니다.
- A ninety-eight percent payment success rate, and no critical defects.
  - 결제 성공률 98퍼센트, 그리고 치명적 결함이 없어야 합니다.
- Your store staff place the orders, and our QA team checks the logs.
  - 매장 직원이 주문을 넣고, 저희 QA 팀이 기록을 확인합니다.
- A signed test sheet from each store.
  - 매장별 서명된 테스트 시트입니다.
- If everything passes, we'd ask for written sign-off by April 28.
  - 모두 통과하면 4월 28일까지 서면 승인을 요청드리겠습니다.
- Send the test plan today, and we'll confirm the store testers by Monday.
  - 오늘 테스트 계획을 보내 주세요, 월요일까지 매장 테스트 담당자를 확정하겠습니다.

## 문장 구조와 바꿔 말하기

- 대화 문장 · If a critical defect appears, we fix it within two business days and retest.
- 문장 구조 · `If`(조건) + `a critical defect appears`(조건절) + `we`(주어) + `fix`(동사) + `it`(목적어) + `within two business days`(기한) + `and retest`(동사)
- 뜻과 어순 · G13에서 인수 절차는 조건과 결과를 짝지어 정합니다. `If a critical defect appears, we fix it ...`는 결함이 생길 때의 처리 기한을 정하고, `If everything passes, we'd ask for written sign-off by April 28`은 승인 조건을 정합니다. `within two business days`는 기한, `counts as a pass`는 합격의 정의, `sign-off`는 최종 승인을 뜻합니다. 최종 결제는 `as long as`나 `unless`로 조건을 붙여 확인합니다.
- 바꿔 말하기 · 결함 처리 조건을 바꿀 때는 `If the payment test fails, we'll retest within one week.`, 결제 조건은 `We can release the final payment as long as all critical defects are closed.`, 승인 지연은 `Unless the sign-off is in by April 28, the launch moves.`라고 해 보세요.

## 주요 단어와 표현

인수 테스트의 합격 기준과 승인 절차를 합의할 때 쓰는 표현을 정리합니다. 강세 표시 `ˈ`는 바로 뒤 음절을 강조한다는 뜻입니다.

### acceptance testing

- 발음 (미국식 IPA) · /əkˈsep.təns ˌtes.tɪŋ/
- 뜻 · 고객이 결과물을 받아들일 수 있는지 확인하는 시험
- 예문 · Before we start acceptance testing, I'd like to agree on the criteria.
- 번역 · 인수 테스트를 시작하기 전에 기준을 합의하고 싶습니다.

### pass criteria

- 발음 (미국식 IPA) · /ˈpæs kraɪˈtɪr.i.ə/
- 뜻 · 합격으로 인정하는 조건
- 예문 · I'd like to agree on the pass criteria.
- 번역 · 합격 기준을 합의하고 싶습니다.

### test order

- 발음 (미국식 IPA) · /ˈtest ˌɔːr.dɚ/
- 뜻 · 시험을 위해 실제로 넣어 보는 주문
- 예문 · Two hundred test orders across five stores.
- 번역 · 다섯 매장에서 테스트 주문 200건입니다.

### critical defect

- 발음 (미국식 IPA) · /ˈkrɪt̬.ɪ.kəl ˈdiː.fekt/
- 뜻 · 서비스 사용을 막는 심각한 결함
- 예문 · If a critical defect appears, we fix it within two business days.
- 번역 · 치명적 결함이 나오면 영업일 기준 이틀 안에 고칩니다.

### success rate

- 발음 (미국식 IPA) · /səkˈses reɪt/
- 뜻 · 시도 중 성공한 비율
- 예문 · A ninety-eight percent payment success rate is required.
- 번역 · 결제 성공률 98퍼센트가 필요합니다.

### sign-off

- 발음 (미국식 IPA) · /ˈsaɪn.ɑːf/
- 뜻 · 검토를 마치고 주는 최종 승인
- 예문 · We'd ask for written sign-off by April 28.
- 번역 · 4월 28일까지 서면 승인을 요청드리겠습니다.

### test sheet

- 발음 (미국식 IPA) · /ˈtest ʃiːt/
- 뜻 · 테스트 항목과 결과를 적는 확인서
- 예문 · We need a signed test sheet from each store.
- 번역 · 매장별 서명된 테스트 시트가 필요합니다.

### dashboard

- 발음 (미국식 IPA) · /ˈdæʃ.bɔːrd/
- 뜻 · 주요 지표를 한눈에 보여 주는 화면
- 예문 · Please send screenshots of the dashboard.
- 번역 · 대시보드 화면 캡처를 보내 주세요.

### order ID

- 발음 (미국식 IPA) · /ˈɔːr.dɚ ˌaɪˈdiː/
- 뜻 · 주문마다 붙는 고유 번호
- 예문 · Include the order IDs you used.
- 번역 · 사용한 주문 번호를 포함해 주세요.

### retest

- 발음 (미국식 IPA) · /ˌriːˈtest/
- 뜻 · 수정 뒤 같은 항목을 다시 시험하다
- 예문 · We fix it and retest.
- 번역 · 고친 뒤 다시 테스트합니다.

### tester

- 발음 (미국식 IPA) · /ˈtes.tɚ/
- 뜻 · 테스트를 진행하는 사람
- 예문 · We'll confirm the store testers by Monday.
- 번역 · 월요일까지 매장 테스트 담당자를 확정하겠습니다.

### evidence

- 발음 (미국식 IPA) · /ˈev.ə.dəns/
- 뜻 · 결과를 뒷받침하는 자료
- 예문 · What evidence do you need from us?
- 번역 · 저희에게서 어떤 증빙이 필요한가요?

### business day

- 발음 (미국식 IPA) · /ˈbɪz.nɪs deɪ/
- 뜻 · 주말과 휴일을 뺀 근무일
- 예문 · We fix it within two business days.
- 번역 · 영업일 기준 이틀 안에 고칩니다.

## 발음 포인트

`If a critical defect appears, we fix it within two business days and retest.`에서 `fix it`은 `FIK-sit`, `within two`는 `wi-THIN-too`처럼 붙여 말합니다. `CRIT-i-cal`, `DE-fect`, `TWO`, `FIX`, `RE-test`를 강조해 처리 기한과 조치를 분명히 하세요.

## 응용 대화

12번 매장의 와이파이가 다음 주까지 복구되지 않습니다. A는 Maya이고 B는 Daniel입니다. 두 사람은 네 매장은 실제로, 한 매장은 시뮬레이션으로 시험하는 대체안을 합의합니다.

- **A** Store 12 just told us their Wi-Fi won't be back until next week.
  - 12번 매장에서 와이파이가 다음 주까지 복구되지 않는다고 방금 알려 왔습니다.
- **B** That's one of our five test stores. / Can we still finish acceptance on time?
  - 우리 다섯 테스트 매장 중 하나네요. 그래도 인수 테스트를 제때 마칠 수 있나요?
- **A** We can, if we test four stores live / and run store 12 in a simulated environment. / The results would be marked as simulated.
  - 네 매장은 실제로 시험하고 12번 매장은 시뮬레이션 환경에서 진행하면 가능합니다. 결과에는 시뮬레이션이라고 표시됩니다.
- **B** Would that delay the sign-off?
  - 그러면 승인이 늦어지나요?
- **A** Not if the simulated tests pass. / But your operations lead would need to approve that substitution in writing.
  - 시뮬레이션 테스트가 통과하면 늦어지지 않습니다. 다만 운영 책임자가 그 대체를 서면으로 승인해야 합니다.
- **B** I can get that today. / What happens if store 12 fails when it's back online?
  - 오늘 받아 오겠습니다. 12번 매장이 다시 연결된 뒤 실패하면 어떻게 되나요?
- **A** Then it's treated as a defect. / If it's critical, we fix it and retest within two business days. / If it's minor, we log it and fix it in the first support window.
  - 결함으로 처리합니다. 치명적이면 영업일 기준 이틀 안에 고치고 다시 테스트합니다. 경미하면 기록해 두고 첫 지원 기간에 고칩니다.
- **B** Understood. / I'll send the written approval today, / and we'll keep the April 28 sign-off.
  - 알겠습니다. 오늘 서면 승인을 보내고, 4월 28일 승인 일정은 유지하겠습니다.

인수 조건을 바꿔야 할 때는 대체 방법과 그 결과가 어떻게 표시되는지 먼저 합의합니다. 예외는 서면 승인으로 남기고, 나중에 발견된 결함이 어느 절차로 처리되는지도 함께 정하세요.

## 복습

1. 합격 기준에 포함되지 않는 것을 고르세요.
   - A. 테스트 주문 200건
   - B. 2분 이내 알림 99퍼센트
   - C. 결제 성공률 98퍼센트
   - D. 모든 주문을 전화로 접수
2. 테스트는 누가 어떻게 진행하나요?
3. 치명적 결함이 나오면 어떻게 처리하나요?
4. 승인 기한은 언제인가요?

### 정답과 예시 답변

- 1번 · D
- 2번 · 매장 직원이 주문을 넣고 QA 팀이 기록을 확인하며, 4월 20일부터 22일까지 사흘간 함께 진행합니다.
- 3번 · 영업일 기준 이틀 안에 고치고 다시 테스트합니다.
- 4번 · 4월 28일까지 서면 승인을 받습니다.

## 듣고 답하기

### 1. 합격 기준 설명하기

- 상대 음성 · What counts as a pass?
- 힌트 · 테스트 주문 200건, 알림 99퍼센트 2분 이내, 결제 성공률 98퍼센트, 치명적 결함 없음의 네 기준을 말하세요.
- 예시 답변 · Two hundred test orders across five stores, ninety-nine percent of alerts within two minutes, a ninety-eight percent payment success rate, and no critical defects.
- 확인 · 기준을 숫자와 함께 빠짐없이 말했나요?

### 2. 담당과 증빙 확인하기

- 상대 음성 · Who runs the tests?
- 힌트 · 매장 직원과 QA의 역할을 나누고, 사흘 일정과 필요한 증빙을 설명하세요.
- 예시 답변 · Your store staff place the orders, and our QA team checks the logs. We'd run it together over three days, April 20 to 22. We need a signed test sheet, dashboard screenshots, and the order IDs.
- 확인 · 역할과 일정, 증빙을 함께 말했나요?

### 3. 결함 처리와 승인 조건 합의하기

- 상대 음성 · What happens if a critical defect appears?
- 힌트 · 영업일 이틀 안에 고치고 재시험한다고 말하고, 모두 통과할 때의 승인 기한을 확인하세요.
- 예시 답변 · If a critical defect appears, we fix it within two business days and retest. If everything passes, we'd ask for written sign-off by April 28.
- 확인 · 결함 처리와 승인 조건을 조건문으로 말했나요?
