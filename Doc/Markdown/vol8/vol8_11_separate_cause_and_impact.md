# 11. 문제의 원인과 영향을 구분하기 (Separating Cause and Impact)

## 학습 목표

- 과 ID · vol8-11
- 핵심 문법 · G12 수동태로 원인과 영향 상태 구분하기
- 상황 검색어 · 장애 리뷰, 근본 원인, 증상, 업무 영향, 책임 묻지 않기
- 말하기 목표 · 장애의 근본 원인과 겉으로 드러난 증상, 업무 영향을 구분하고, 확인된 사실과 아직 모르는 것을 나누어 설명합니다.

## 기본 대화

A는 장애 대응 리드 Maya이고 B는 고객지원 리드 Daniel입니다. 두 사람은 25분간 결제 페이지가 멈춘 일을 검토하며 원인과 영향을 구분하고, 아직 확인되지 않은 부분을 정리합니다.

- **A** Thanks for joining the incident review. / The goal is to fix the process, not assign blame. / Let's separate the root cause, the symptoms, and the impact.
  - 장애 리뷰에 참석해 주셔서 감사합니다. 목적은 절차를 고치는 것이지 책임을 묻는 게 아닙니다. 근본 원인, 증상, 영향을 나누어 봅시다.
- **B** Good idea. / What do we know so far?
  - 좋은 생각입니다. 지금까지 확인된 게 무엇인가요?
- **A** The outage was caused by a database timeout. / That's the root cause we've confirmed.
  - 장애는 데이터베이스 타임아웃 때문에 발생했습니다. 그게 우리가 확인한 근본 원인입니다.
- **B** And what was the impact?
  - 영향은 무엇이었나요?
- **A** The checkout page was down for about twenty-five minutes. / Customer accounts were not affected.
  - 결제 페이지가 약 25분간 멈췄습니다. 고객 계정은 영향을 받지 않았어요.
- **B** Do we know how many orders were lost?
  - 주문이 얼마나 유실됐는지 아나요?
- **A** Not yet. / The order data is still being checked. / We should have a number by tomorrow.
  - 아직 모릅니다. 주문 데이터를 아직 확인 중입니다. 내일까지는 수치가 나올 거예요.
- **B** Understood. / So the cause is confirmed, but the impact is still being measured.
  - 알겠습니다. 그러면 원인은 확인됐지만 영향은 아직 측정 중이군요.

## 핵심 문장

### 필수 표현

- The outage was caused by a database timeout.
  - 장애는 데이터베이스 타임아웃 때문에 발생했습니다.
- Customer accounts were not affected.
  - 고객 계정은 영향을 받지 않았습니다.
- The order data is still being checked.
  - 주문 데이터는 아직 확인 중입니다.
- So the cause is confirmed, but the impact is still being measured.
  - 원인은 확인됐지만 영향은 아직 측정 중입니다.

### 확장 표현

- Thanks for joining the incident review.
  - 장애 리뷰에 참석해 주셔서 감사합니다.
- The goal is to fix the process, not assign blame.
  - 목적은 절차를 고치는 것이지 책임을 묻는 게 아닙니다.
- What do we know so far?
  - 지금까지 확인된 게 무엇인가요?
- That's the root cause we've confirmed.
  - 그게 우리가 확인한 근본 원인입니다.
- The checkout page was down for about twenty-five minutes.
  - 결제 페이지가 약 25분간 멈췄습니다.
- Do we know how many orders were lost?
  - 주문이 얼마나 유실됐는지 아나요?
- We should have a number by tomorrow.
  - 내일까지는 수치가 나올 겁니다.
- Understood.
  - 알겠습니다.

## 문장 구조와 바꿔 말하기

- 대화 문장 · The outage was caused by a database timeout.
- 문장 구조 · `The outage`(주어) + `was caused`(과거 수동태) + `by a database timeout`(원인)
- 뜻과 어순 · G12 수동태는 누가 했는지보다 원인과 결과 상태를 중심으로 말할 때 씁니다. `was caused by`는 원인을, `was down`은 서비스가 멈춘 상태, `were not affected`는 영향이 없었던 결과, `is still being checked`는 확인이 진행 중인 상태를 나타냅니다. 장애 리뷰에서는 행위자 대신 시스템과 절차를 주어로 두면 책임을 묻는 표현처럼 들리지 않습니다.
- 바꿔 말하기 · 고객 데이터가 바뀌지 않았다고 말할 때는 `No customer records were changed.`, 원인 조사가 진행 중이면 `The cause is still being investigated.`라고 해 보세요.

## 주요 단어와 표현

장애 리뷰에서 원인, 증상, 영향을 구분해 설명할 때 쓰는 표현을 정리합니다. 강세 표시 `ˈ`는 바로 뒤 음절을 강조한다는 뜻입니다.

### incident review

- 발음 (미국식 IPA) · /ˈɪn.sə.dənt rɪˈvjuː/
- 뜻 · 장애가 왜 일어났는지 검토하는 회의
- 예문 · Thanks for joining the incident review.
- 번역 · 장애 리뷰에 참석해 주셔서 감사합니다.

### root cause

- 발음 (미국식 IPA) · /ˈruːt kɔːz/
- 뜻 · 문제를 일으킨 근본 원인
- 예문 · The root cause is a database timeout.
- 번역 · 근본 원인은 데이터베이스 타임아웃입니다.

### symptom

- 발음 (미국식 IPA) · /ˈsɪmp.təm/
- 뜻 · 겉으로 드러난 문제 현상
- 예문 · The checkout error was a symptom, not the cause.
- 번역 · 결제 오류는 원인이 아니라 증상이었습니다.

### impact

- 발음 (미국식 IPA) · /ˈɪm.pækt/
- 뜻 · 고객이나 업무에 미친 영향
- 예문 · And what was the impact?
- 번역 · 영향은 무엇이었나요?

### outage

- 발음 (미국식 IPA) · /ˈaʊ.t̬ɪdʒ/
- 뜻 · 서비스가 멈춘 상태
- 예문 · The outage lasted twenty-five minutes.
- 번역 · 장애는 25분간 이어졌습니다.

### database timeout

- 발음 (미국식 IPA) · /ˈdeɪ.t̬ə.beɪs ˈtaɪm.aʊt/
- 뜻 · 데이터베이스 응답이 늦어 연결이 끊기는 것
- 예문 · The outage was caused by a database timeout.
- 번역 · 장애는 데이터베이스 타임아웃 때문에 발생했습니다.

### affected

- 발음 (미국식 IPA) · /əˈfek.tɪd/
- 뜻 · 영향을 받은
- 예문 · Customer accounts were not affected.
- 번역 · 고객 계정은 영향을 받지 않았습니다.

### order data

- 발음 (미국식 IPA) · /ˈɔːr.dɚ ˌdeɪ.t̬ə/
- 뜻 · 주문 기록과 관련된 데이터
- 예문 · The order data is still being checked.
- 번역 · 주문 데이터는 아직 확인 중입니다.

### measure

- 발음 (미국식 IPA) · /ˈmeʒ.ɚ/
- 뜻 · 수치로 확인하다
- 예문 · The impact is still being measured.
- 번역 · 영향은 아직 측정 중입니다.

### permissions error

- 발음 (미국식 IPA) · /pɚˈmɪʃ.ənz ˈer.ɚ/
- 뜻 · 접근 권한 설정이 잘못된 오류
- 예문 · The sync was stopped by a permissions error.
- 번역 · 동기화는 권한 오류로 멈췄습니다.

### limited to

- 발음 (미국식 IPA) · /ˈlɪm.ə.t̬ɪd tuː/
- 뜻 · 특정 범위에만 국한된
- 예문 · The issue was limited to internal reports.
- 번역 · 문제는 내부 보고서에만 국한됐습니다.

### regenerate

- 발음 (미국식 IPA) · /ˌriːˈdʒen.ə.reɪt/
- 뜻 · 데이터나 문서를 다시 생성하다
- 예문 · The reports are being regenerated.
- 번역 · 보고서는 다시 생성되고 있습니다.

### assign blame

- 발음 (미국식 IPA) · /əˌsaɪn ˈbleɪm/
- 뜻 · 책임을 특정 사람에게 돌리다
- 예문 · The goal is to fix the process, not assign blame.
- 번역 · 목적은 절차를 고치는 것이지 책임을 묻는 게 아닙니다.

### process

- 발음 (미국식 IPA) · /ˈprɑː.ses/
- 뜻 · 일이 처리되는 절차
- 예문 · We're reviewing the process.
- 번역 · 절차를 검토하고 있습니다.

## 발음 포인트

`The outage was caused by a database timeout.`에서 `caused by`는 `cawzd-bai`, `database timeout`은 `DAY-ta-base-TIME-out`처럼 붙여 말합니다. `OUT-ij`와 `ROOT CAUSE`를 또렷하게 강조해 무엇이 원인인지 분명히 하세요.

## 응용 대화

A는 데이터 운영 리드 Jisoo이고 B는 재무 담당 Daniel입니다. 아침 보고서 동기화 오류를 검토하며 원인과 영향을 구분하고, 고객 데이터는 바뀌지 않았다는 점을 확인합니다.

- **A** Let's review the reporting issue from this morning. / The goal is to understand what happened, not who missed it.
  - 오늘 아침 보고서 문제를 검토하죠. 목적은 무슨 일이 있었는지 이해하는 것이지 누가 놓쳤는지를 따지는 게 아닙니다.
- **B** Agreed. / What's the confirmed cause?
  - 동의합니다. 확인된 원인은 무엇인가요?
- **A** The daily sync was stopped by a permissions error. / It's been fixed.
  - 일일 동기화가 권한 오류로 멈췄습니다. 수정은 끝났어요.
- **B** Was any customer data affected?
  - 고객 데이터가 영향을 받았나요?
- **A** No. / The issue was limited to internal reports, / and no customer records were changed.
  - 아니요. 문제는 내부 보고서에만 국한됐고, 고객 기록은 바뀌지 않았습니다.
- **B** Do we know how many reports were delayed?
  - 보고서가 몇 개나 지연됐는지 아나요?
- **A** About twelve. / They're being regenerated now, / and all of them should be ready by noon.
  - 열두 개 정도입니다. 지금 다시 생성 중이고, 모두 정오까지 준비될 겁니다.
- **B** Good. / So the cause is fixed, but the full impact is still being confirmed.
  - 좋습니다. 그러면 원인은 해결됐지만 전체 영향은 아직 확인 중이군요.

장애 리뷰에서는 `was caused by`로 원인을, `was limited to`로 영향 범위를, `is still being checked`로 아직 모르는 부분을 구분하면 책임을 묻지 않고 사실만 정리할 수 있습니다.

## 복습

1. 확인된 근본 원인은 무엇인가요?
   - A. 데이터베이스 타임아웃
   - B. 결제 페이지 삭제
   - C. 고객 계정 오류
   - D. 직원의 실수
2. 고객 계정은 영향을 받았나요?
3. 아직 확인되지 않은 것은 무엇인가요?
4. 이 리뷰의 목적은 무엇인가요?

### 정답과 예시 답변

- 1번 · A
- 2번 · 아닙니다. 고객 계정은 영향을 받지 않았습니다.
- 3번 · 유실된 주문 수입니다. 주문 데이터를 아직 확인 중입니다.
- 4번 · 절차를 고치는 것이며, 책임을 묻는 것이 아닙니다.

## 듣고 답하기

### 1. 원인과 영향을 구분해 말하기

- 상대 음성 · What do we know so far?
- 힌트 · 데이터베이스 타임아웃이 원인이고, 결제 페이지가 25분간 멈췄지만 고객 계정은 영향받지 않았다고 말하세요.
- 예시 답변 · The outage was caused by a database timeout. The checkout page was down for about twenty-five minutes, but customer accounts were not affected.
- 확인 · 원인과 영향을 구분했나요?

### 2. 아직 모르는 것을 솔직히 말하기

- 상대 음성 · Do we know how many orders were lost?
- 힌트 · 아직 확인 중이고 내일까지 수치를 알 수 있다고 말하세요.
- 예시 답변 · Not yet. The order data is still being checked. We should have a number by tomorrow.
- 확인 · 확인된 것과 아직 모르는 것을 구분했나요?

### 3. 책임보다 절차에 초점 맞추기

- 상대 음성 · Who missed the alert?
- 힌트 · 누구의 실수인지보다 절차를 고치는 것이 목적이라고 정중히 말하세요.
- 예시 답변 · The goal is to fix the process, not assign blame. Let's review how the alert was handled.
- 확인 · 비난 없이 절차 개선에 초점을 맞췄나요?
