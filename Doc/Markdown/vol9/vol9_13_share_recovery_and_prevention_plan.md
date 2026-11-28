# 13. 서비스 복구와 재발 방지 계획 공유하기 (Sharing Recovery and Prevention Plans)

## 학습 목표

- 과 ID · vol9-13
- 핵심 문법 · G12 상태 + G13 조건으로 복구 현황과 재발 방지 계획 공유하기
- 상황 검색어 · 복구 현황, 근본 원인, 재발 방지(prevention), 담당자와 기한, 고객 조치
- 말하기 목표 · 복구 상태와 근본 원인을 요약하고, 담당자와 기한이 붙은 재발 방지 조치를 설명하며, 고객이 해야 할 일과 다음 확인 시점을 정합니다.

## 기본 대화

A는 Pinecrest의 담당 리드 Maya이고, B는 Harbor Market 운영 책임자 Daniel입니다. 알림 장애 다음 날, 두 사람은 복구 결과와 재발 방지 계획을 확인합니다.

- **A** I want to share the recovery status and what we're changing.
  - 복구 현황과 저희가 바꾸는 내용을 공유하겠습니다.
- **B** Go ahead. / How long was the impact?
  - 말씀하세요. 영향은 얼마나 오래 갔나요?
- **A** Alerts were restored at 10:38, after forty-one minutes. / The backlog of 212 notifications was delivered by 11:15, / and no orders were lost.
  - 알림은 41분 만인 10시 38분에 복구되었습니다. 밀린 알림 212건은 11시 15분까지 전달되었고, 잃은 주문은 없습니다.
- **B** What caused it?
  - 원인이 무엇인가요?
- **A** A credential rotation on the push service broke authentication. / Our monitoring only checked whether the app was up, / not whether alerts were being delivered. / That gap is being fixed.
  - 푸시 서비스의 자격 증명 교체가 인증을 깨뜨렸습니다. 저희 모니터링은 앱이 살아 있는지만 확인했고, 알림이 실제로 전달되는지는 보지 않았습니다. 그 빈틈을 고치고 있습니다.
- **B** What exactly is being changed?
  - 구체적으로 무엇이 바뀌나요?
- **A** Delivery monitoring is being added by May 15, / a rotation checklist is being created by May 8, / and a failover drill is scheduled for June 5. / If delivery drops again, the new monitoring will page us within five minutes. / We also need your store contacts confirmed by Friday.
  - 전달 모니터링이 5월 15일까지 추가되고, 자격 증명 교체 체크리스트가 5월 8일까지 만들어지며, 장애 전환 훈련이 6월 5일로 예정되어 있습니다. 다시 전달이 끊기면 새 모니터링이 5분 안에 담당자를 호출합니다. 그리고 금요일까지 매장 연락처를 확인해 주셔야 합니다.
- **B** I'll confirm them. / Send me the incident report, / and we'll review progress at the May 15 checkpoint.
  - 확인하겠습니다. 장애 보고서를 보내 주시면 5월 15일 점검 회의에서 진행 상황을 검토하겠습니다.

## 핵심 문장

### 필수 표현

- I want to share the recovery status and what we're changing.
  - 복구 현황과 저희가 바꾸는 내용을 공유하겠습니다.
- Alerts were restored at 10:38, after forty-one minutes.
  - 알림은 41분 만인 10시 38분에 복구되었습니다.
- A credential rotation on the push service broke authentication.
  - 푸시 서비스의 자격 증명 교체가 인증을 깨뜨렸습니다.
- Our monitoring only checked whether the app was up.
  - 저희 모니터링은 앱이 살아 있는지만 확인했습니다.

### 확장 표현

- How long was the impact?
  - 영향은 얼마나 오래 갔나요?
- The backlog of 212 notifications was delivered by 11:15.
  - 밀린 알림 212건은 11시 15분까지 전달되었습니다.
- No orders were lost.
  - 잃은 주문은 없습니다.
- That gap is being fixed.
  - 그 빈틈을 고치고 있습니다.
- Delivery monitoring is being added by May 15.
  - 전달 모니터링이 5월 15일까지 추가됩니다.
- A failover drill is scheduled for June 5.
  - 장애 전환 훈련이 6월 5일로 예정되어 있습니다.
- We need your store contacts confirmed by Friday.
  - 금요일까지 매장 연락처를 확인해 주셔야 합니다.

## 문장 구조와 바꿔 말하기

- 대화 문장 · The backlog of 212 notifications was delivered by 11:15.
- 문장 구조 · `The backlog of 212 notifications`(주어) + `was delivered`(be + 과거분사) + `by 11:15`(완료 시점)
- 뜻과 어순 · G12에서 복구 결과는 `was restored`, `was delivered`처럼 과거 수동태로 끝난 일을 기록합니다. 여기서 `by 11:15`는 누가 했는지가 아니라 언제까지 끝났는지를 나타냅니다. 재발 방지 계획은 `is being added`, `is being created`, `is scheduled for`처럼 현재 진행이나 예정 상태로 말하고, G13으로 위험이 다시 생길 때의 자동 대응을 `If delivery drops again, the new monitoring will page us.`처럼 조건문으로 설명합니다. 고객 조치는 `We need ... confirmed by ...`로 분명히 요청합니다.
- 바꿔 말하기 · 복구 시점은 `The service was restored at 10:38.`, 진행 중인 조치는 `A checklist is being created by May 8.`, 조건부 대응은 `If delivery drops again, the failover will trigger automatically.`라고 해 보세요.

## 주요 단어와 표현

복구 결과와 근본 원인, 재발 방지 조치를 공유할 때 쓰는 표현을 정리합니다. 강세 표시 `ˈ`는 바로 뒤 음절을 강조한다는 뜻입니다.

### recovery

- 발음 (미국식 IPA) · /rɪˈkʌv.ɚ.i/
- 뜻 · 장애에서 정상 상태로 돌아오는 과정
- 예문 · I want to share the recovery status.
- 번역 · 복구 현황을 공유하겠습니다.

### restore

- 발음 (미국식 IPA) · /rɪˈstɔːr/
- 뜻 · 서비스를 다시 정상으로 되돌리다
- 예문 · Alerts were restored at 10:38.
- 번역 · 알림은 10시 38분에 복구되었습니다.

### backlog

- 발음 (미국식 IPA) · /ˈbæk.lɑːɡ/
- 뜻 · 밀려서 쌓인 처리 대기 건
- 예문 · The backlog of 212 notifications was delivered by 11:15.
- 번역 · 밀린 알림 212건은 11시 15분까지 전달되었습니다.

### authentication

- 발음 (미국식 IPA) · /ɔːˌθen.t̬ɪˈkeɪ.ʃən/
- 뜻 · 시스템이 사용자나 서비스를 확인하는 절차
- 예문 · A credential rotation broke authentication.
- 번역 · 자격 증명 교체가 인증을 깨뜨렸습니다.

### monitoring

- 발음 (미국식 IPA) · /ˈmɑː.nə.t̬ɚ.ɪŋ/
- 뜻 · 시스템 상태를 계속 지켜보는 일
- 예문 · Our monitoring only checked whether the app was up.
- 번역 · 저희 모니터링은 앱이 살아 있는지만 확인했습니다.

### gap

- 발음 (미국식 IPA) · /ɡæp/
- 뜻 · 갖춰지지 않아 비어 있는 부분
- 예문 · That monitoring gap is being fixed.
- 번역 · 그 모니터링 빈틈을 고치고 있습니다.

### rotation

- 발음 (미국식 IPA) · /roʊˈteɪ.ʃən/
- 뜻 · 인증 정보를 정기적으로 새것으로 바꾸는 일
- 예문 · A credential rotation on the push service broke authentication.
- 번역 · 푸시 서비스의 자격 증명 교체가 인증을 깨뜨렸습니다.

### checklist

- 발음 (미국식 IPA) · /ˈtʃek.lɪst/
- 뜻 · 빠뜨리지 않도록 항목을 적은 확인 목록
- 예문 · A rotation checklist is being created.
- 번역 · 교체 체크리스트가 만들어지고 있습니다.

### drill

- 발음 (미국식 IPA) · /drɪl/
- 뜻 · 실제 상황을 가정해 미리 해 보는 훈련
- 예문 · A failover drill is scheduled for June 5.
- 번역 · 장애 전환 훈련이 6월 5일로 예정되어 있습니다.

### prevention

- 발음 (미국식 IPA) · /prɪˈven.ʃən/
- 뜻 · 같은 문제가 다시 생기지 않게 막는 일
- 예문 · Prevention is the main topic of today's review.
- 번역 · 재발 방지가 오늘 검토의 핵심 주제입니다.

### incident report

- 발음 (미국식 IPA) · /ˈɪn.sə.dənt rɪˌpɔːrt/
- 뜻 · 장애의 원인과 조치를 정리한 문서
- 예문 · Send me the incident report.
- 번역 · 장애 보고서를 보내 주세요.

### progress

- 발음 (미국식 IPA) · /ˈprɑː.ɡres/
- 뜻 · 일이 나아가고 있는 정도
- 예문 · We'll review progress at the May 15 checkpoint.
- 번역 · 5월 15일 점검 회의에서 진행 상황을 검토하겠습니다.

### trigger

- 발음 (미국식 IPA) · /ˈtrɪɡ.ɚ/
- 뜻 · 정해진 조건에서 작동하게 하다
- 예문 · If delivery drops again, the failover will trigger automatically.
- 번역 · 다시 전달이 끊기면 장애 전환이 자동으로 작동합니다.

## 발음 포인트

`The backlog of 212 notifications was delivered by 11:15.`에서 `backlog of`는 `BACK-log-uv`, `notifications was`는 `no-tuh-fuh-KAY-shunz-wuz`, `delivered by`는 `di-LIV-erd-by`처럼 붙여 말합니다. `BACK-log`, `TWO-TWELVE`, `di-LIV-ered`, `ELEVEN-FIF-teen`을 강조해 복구 규모와 완료 시점을 분명히 하세요.

## 응용 대화

출시를 앞두고 고객이 같은 장애가 다시 생길 수 있는지 묻습니다. A는 Maya이고 B는 Daniel입니다. 두 사람은 출시 전에 끝나는 조치와 출시 후에 끝나는 조치를 구분하고, 상태 페이지를 추가하기로 합니다.

- **A** Before launch, I want to be clear about the remaining risk.
  - 출시 전에 남은 위험을 분명히 말씀드리고 싶습니다.
- **B** Please. / Could the same thing happen again on April 30?
  - 말씀하세요. 4월 30일에 같은 일이 다시 생길 수 있나요?
- **A** Honestly, the risk is lower but not zero. / The credential issue is fixed, / and delivery monitoring will be live before launch. / But the automatic failover won't be ready until June.
  - 솔직히 위험은 줄었지만 0은 아닙니다. 자격 증명 문제는 해결되었고, 전달 모니터링은 출시 전에 가동됩니다. 하지만 자동 장애 전환은 6월까지 준비되지 않습니다.
- **B** So if alerts fail on launch day, what happens?
  - 그럼 출시일에 알림이 실패하면 어떻게 되나요?
- **A** The new monitoring will page us within five minutes, / and we'll switch to email alerts manually. / That's why we're asking for store contacts now.
  - 새 모니터링이 5분 안에 담당자를 호출하고, 저희가 수동으로 이메일 알림으로 전환합니다. 그래서 지금 매장 연락처를 요청드리는 것입니다.
- **B** Do we need a public status page?
  - 공개 상태 페이지가 필요할까요?
- **A** I'd recommend a simple one. / It can be updated by your team or ours, / and it reduces the number of calls to stores. / If you approve it by April 25, it can be live for launch.
  - 간단한 페이지를 권합니다. 고객사 팀이나 저희가 업데이트할 수 있고, 매장에 걸려오는 전화를 줄여 줍니다. 4월 25일까지 승인해 주시면 출시에 맞춰 공개할 수 있습니다.
- **B** Let's do it. / I'll approve the page, / and we'll test the alert process on April 28.
  - 그렇게 하죠. 페이지를 승인하고, 4월 28일에 알림 절차를 시험하겠습니다.

재발 방지 계획은 무엇을 언제까지 누가 하는지까지 말해야 신뢰를 얻습니다. 출시 전에 끝나는 조치와 후속 조치를 구분하고, 남은 위험과 그때의 대응 절차를 함께 알려 주세요.

## 복습

1. 알림 장애는 얼마나 지속되었나요?
   - A. 5분
   - B. 21분
   - C. 41분
   - D. 90분
2. 근본 원인은 무엇인가요?
3. 재발 방지 조치 세 가지를 말해 보세요.
4. 고객이 해야 할 일은 무엇인가요?

### 정답과 예시 답변

- 1번 · C
- 2번 · 푸시 서비스의 자격 증명 교체로 인증이 깨졌고, 모니터링이 앱 가동만 확인해 빈틈이 있었습니다.
- 3번 · 전달 모니터링 추가(5월 15일), 교체 체크리스트 작성(5월 8일), 장애 전환 훈련(6월 5일)입니다.
- 4번 · 금요일까지 매장 연락처를 확인하고, 4월 25일까지 상태 페이지를 승인하는 일입니다.

## 듣고 답하기

### 1. 복구 결과와 영향 규모 설명하기

- 상대 음성 · How long was the impact?
- 힌트 · 41분 만에 복구되었고, 밀린 알림 212건이 11시 15분까지 전달되었으며, 잃은 주문은 없다고 말하세요.
- 예시 답변 · Alerts were restored at 10:38, after forty-one minutes. The backlog of 212 notifications was delivered by 11:15, and no orders were lost.
- 확인 · 지속 시간과 복구 규모, 피해 여부를 함께 말했나요?

### 2. 근본 원인과 빈틈 설명하기

- 상대 음성 · What caused it?
- 힌트 · 자격 증명 교체로 인증이 깨졌고, 모니터링이 앱 가동만 확인했다고 설명한 뒤 빈틈을 고치고 있다고 덧붙이세요.
- 예시 답변 · A credential rotation on the push service broke authentication. Our monitoring only checked whether the app was up, not whether alerts were delivered. That gap is being fixed.
- 확인 · 원인과 모니터링의 한계를 구분해 설명했나요?

### 3. 재발 방지 조치와 고객 조치 요청하기

- 상대 음성 · What exactly is being changed?
- 힌트 · 세 가지 조치와 기한을 말하고, 다시 끊길 때의 자동 대응과 고객이 확인할 연락처를 요청하세요.
- 예시 답변 · Delivery monitoring is being added by May 15, a rotation checklist is being created by May 8, and a failover drill is scheduled for June 5. If delivery drops again, the new monitoring will page us within five minutes. We need your store contacts confirmed by Friday.
- 확인 · 조치와 기한, 조건부 대응, 고객 조치를 모두 말했나요?
