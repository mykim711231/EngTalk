# 12. 장애 상황을 고객에게 처음 알리기 (Telling the Client About an Incident First)

## 학습 목표

- 과 ID · vol9-12
- 핵심 문법 · G12 수동태로 장애의 확인된 사실과 영향 알리기
- 상황 검색어 · 장애 알림, 영향 범위, 확인된 사실, 조치 중, 미확인 사항, 다음 업데이트
- 말하기 목표 · 장애(outage)를 초기에 알리고, 확인된 사실과 영향, 현재 조치, 아직 모르는 점을 구분해 전한 뒤, 다음 업데이트 시점을 약속합니다.

## 기본 대화

A는 Pinecrest의 딜리버리 리드 Alex이고, B는 Harbor Market 운영 책임자 Daniel입니다. 파일럿 매장의 주문 알림이 지연되는 장애(incident)가 발생해 Alex가 먼저 연락합니다.

- **A** I'm calling because we have an issue with notifications. / I wanted you to hear it from us first.
  - 알림에 문제가 생겨 전화드렸습니다. 다른 곳에서 듣기 전에 저희가 먼저 알려 드리고 싶었습니다.
- **B** What's happening?
  - 무슨 일인가요?
- **A** Store alerts have been delayed since 9:57 this morning. / About a third of the pilot stores are affected. / Orders themselves are not affected.
  - 매장 알림이 오늘 오전 9시 57분부터 지연되고 있습니다. 파일럿 매장의 약 3분의 1이 영향을 받았습니다. 주문 자체는 영향이 없습니다.
- **B** Are we losing orders?
  - 주문을 잃고 있지는 않은가요?
- **A** No. / Orders are still being received and stored. / The delay is only in the alert that tells staff an order is ready.
  - 아닙니다. 주문은 계속 접수되고 저장되고 있습니다. 지연은 직원에게 주문 준비를 알리는 알림에만 있습니다.
- **B** What are you doing about it?
  - 어떻게 조치하고 있나요?
- **A** The issue has been escalated to the push provider, / and a failover to email alerts is being tested. / We don't know the root cause yet. / I'll call you at 10:45 either way, / and we're sending stores a manual workaround now.
  - 문제는 푸시 서비스 제공업체로 이관되었고, 이메일 알림으로 전환하는 대체 방식을 시험하고 있습니다. 근본 원인은 아직 모릅니다. 어느 쪽이든 10시 45분에 전화드리겠습니다. 지금 매장에는 수동 대체 절차를 보내고 있습니다.
- **B** Okay. / Can you confirm the stores are still getting orders? / And call me at 10:45 either way.
  - 알겠습니다. 매장이 계속 주문을 받고 있는지 확인해 주시겠어요? 그리고 어느 쪽이든 10시 45분에 전화해 주세요.

## 핵심 문장

### 필수 표현

- I wanted you to hear it from us first.
  - 다른 곳에서 듣기 전에 저희가 먼저 알려 드리고 싶었습니다.
- Store alerts have been delayed since 9:57 this morning.
  - 매장 알림이 오늘 오전 9시 57분부터 지연되고 있습니다.
- Orders themselves are not affected.
  - 주문 자체는 영향이 없습니다.
- We don't know the root cause yet.
  - 근본 원인은 아직 모릅니다.

### 확장 표현

- We have an issue with notifications.
  - 알림에 문제가 생겼습니다.
- About a third of the pilot stores are affected.
  - 파일럿 매장의 약 3분의 1이 영향을 받았습니다.
- Orders are still being received and stored.
  - 주문은 계속 접수되고 저장되고 있습니다.
- The issue has been escalated to the push provider.
  - 문제는 푸시 서비스 제공업체로 이관되었습니다.
- A failover to email alerts is being tested.
  - 이메일 알림으로 전환하는 대체 방식을 시험하고 있습니다.
- I'll call you at 10:45 either way.
  - 어느 쪽이든 10시 45분에 전화드리겠습니다.
- We're sending stores a manual workaround now.
  - 지금 매장에 수동 대체 절차를 보내고 있습니다.

## 문장 구조와 바꿔 말하기

- 대화 문장 · Store alerts have been delayed since 9:57 this morning.
- 문장 구조 · `Store alerts`(주어) + `have been delayed`(현재완료 수동) + `since 9:57 this morning`(시작 시점)
- 뜻과 어순 · G12로 장애를 알릴 때는 확인된 사실을 수동태로 먼저 말합니다. `have been delayed since ...`는 과거의 한 시점부터 지금까지 지연이 이어지고 있다는 뜻이고, `are not affected`는 현재 영향이 없다는 상태, `are being received`는 지금도 접수되고 있다는 진행 상태입니다. 조치가 끝난 것은 `has been escalated`, 진행 중인 조치는 `is being tested`로 구분합니다. 아직 모르는 것은 `We don't know ... yet`, 다음 약속은 `I'll call you at 10:45 either way`로 말합니다.
- 바꿔 말하기 · 조치가 이관된 상태는 `The issue has been escalated to the provider.`, 대체 절차가 진행 중이면 `A workaround is being sent to stores.`, 원인이 아직 확인되지 않았으면 `The cause has not been confirmed yet.`라고 해 보세요.

## 주요 단어와 표현

장애를 초기에 알리고 확인된 사실과 미확인 사항을 구분할 때 쓰는 표현을 정리합니다. 강세 표시 `ˈ`는 바로 뒤 음절을 강조한다는 뜻입니다.

### outage

- 발음 (미국식 IPA) · /ˈaʊ.t̬ɪdʒ/
- 뜻 · 서비스가 정상적으로 작동하지 않는 상태
- 예문 · The outage lasted forty-one minutes.
- 번역 · 장애는 41분 동안 이어졌습니다.

### incident

- 발음 (미국식 IPA) · /ˈɪn.sə.dənt/
- 뜻 · 서비스에 문제가 생긴 사건
- 예문 · We're treating this as a high-priority incident.
- 번역 · 이 건을 높은 우선순위의 장애로 다루고 있습니다.

### delay

- 발음 (미국식 IPA) · /dɪˈleɪ/
- 뜻 · 예정보다 늦어지는 것
- 예문 · Store alerts have been delayed since 9:57.
- 번역 · 매장 알림이 9시 57분부터 지연되고 있습니다.

### affected

- 발음 (미국식 IPA) · /əˈfek.tɪd/
- 뜻 · 문제의 영향을 받은
- 예문 · About a third of the pilot stores are affected.
- 번역 · 파일럿 매장의 약 3분의 1이 영향을 받았습니다.

### root cause

- 발음 (미국식 IPA) · /ˈruːt kɔːz/
- 뜻 · 문제가 생긴 근본 원인
- 예문 · We don't know the root cause yet.
- 번역 · 근본 원인은 아직 모릅니다.

### failover

- 발음 (미국식 IPA) · /ˈfeɪl.oʊ.vɚ/
- 뜻 · 한 경로가 실패할 때 다른 경로로 자동 전환하는 것
- 예문 · A failover to email alerts is being tested.
- 번역 · 이메일 알림으로 전환하는 대체 방식을 시험하고 있습니다.

### workaround

- 발음 (미국식 IPA) · /ˈwɝːk.ə.raʊnd/
- 뜻 · 정식 수정 전에 임시로 쓰는 우회 방법
- 예문 · We're sending stores a manual workaround.
- 번역 · 매장에 수동 대체 절차를 보내고 있습니다.

### escalate

- 발음 (미국식 IPA) · /ˈes.kə.leɪt/
- 뜻 · 더 높은 담당자나 우선순위로 올리다
- 예문 · The issue has been escalated to the push provider.
- 번역 · 문제는 푸시 서비스 제공업체로 이관되었습니다.

### alert

- 발음 (미국식 IPA) · /əˈlɝːt/
- 뜻 · 직원에게 알려 주는 알림
- 예문 · The alert tells staff an order is ready.
- 번역 · 그 알림은 직원에게 주문이 준비됐다고 알려 줍니다.

### pilot store

- 발음 (미국식 IPA) · /ˈpaɪ.lət stɔːr/
- 뜻 · 정식 출시 전에 먼저 시험 운영하는 매장
- 예문 · Five pilot stores are using the new system.
- 번역 · 다섯 개 파일럿 매장이 새 시스템을 사용하고 있습니다.

### scheduled

- 발음 (미국식 IPA) · /ˈskedʒ.uːld/
- 뜻 · 시각이 정해진
- 예문 · The next update is scheduled for 10:45.
- 번역 · 다음 업데이트는 10시 45분으로 예정되어 있습니다.

### confirm

- 발음 (미국식 IPA) · /kənˈfɝːm/
- 뜻 · 사실인지 확인하다
- 예문 · Can you confirm the stores are still getting orders?
- 번역 · 매장이 계속 주문을 받고 있는지 확인해 주시겠어요?

### manual

- 발음 (미국식 IPA) · /ˈmæn.ju.əl/
- 뜻 · 자동이 아니라 사람이 직접 하는
- 예문 · We're sending a manual workaround.
- 번역 · 수동 대체 절차를 보내고 있습니다.

## 발음 포인트

`Store alerts have been delayed since 9:57 this morning.`에서 `alerts have`는 `uh-LERTS-uv`, `been delayed`는 `bin-di-LAYD`, `since 9:57`은 `sins-NINE-fif-tee-SEV-en`처럼 붙여 말합니다. `LERTS`, `LAYD`, `NINE`, `SEV-en`을 강조해 무엇이 언제부터 지연됐는지 분명히 하세요.

## 응용 대화

고객사 마케팅 팀이 고객에게 공지할지 묻습니다. A는 Alex이고 B는 Daniel입니다. 두 사람은 확인된 사실만 담은 짧은 상태 안내와 승인 절차를 정합니다.

- **A** Your marketing team asked if they should post something to customers.
  - 마케팅 팀에서 고객에게 공지를 올려야 하는지 물었습니다.
- **B** Right. / What do you recommend?
  - 맞습니다. 어떻게 하는 게 좋을까요?
- **A** I'd wait until the cause is confirmed. / Right now, all we can say is that alerts are delayed, / and that orders are safe.
  - 원인이 확인될 때까지 기다리는 것을 권합니다. 지금 말할 수 있는 것은 알림이 지연되고 있고 주문은 안전하다는 것뿐입니다.
- **B** If we say nothing and customers notice, / that could look worse.
  - 아무 말도 하지 않는데 고객이 알아차리면 더 나빠 보일 수 있습니다.
- **A** That's a fair point. / We can publish a short status note now, / limited to confirmed facts, / and update it at 10:45.
  - 타당한 지적입니다. 지금 확인된 사실만 담은 짧은 상태 안내를 올리고, 10시 45분에 업데이트할 수 있습니다.
- **B** Who approves the wording?
  - 문구는 누가 승인하나요?
- **A** You do. / I'll send a draft in ten minutes, / and nothing is posted until you approve it. / If the fix lands earlier, we'll update the note right away.
  - 대니얼 쪽에서 승인하십니다. 10분 안에 초안을 보내고, 승인 전에는 아무것도 올리지 않겠습니다. 수정이 더 빨리 되면 안내문도 바로 업데이트하겠습니다.
- **B** Good. / Send the draft, / and I'll approve it before 10:30.
  - 좋습니다. 초안을 보내 주세요. 10시 30분 전에 승인하겠습니다.

장애를 알릴 때는 원인을 추정하지 말고 확인된 사실만 말합니다. 고객 공지는 "무엇이 지연되는지, 무엇은 안전한지, 다음 업데이트가 언제인지" 세 가지로 제한하면 혼란을 줄일 수 있습니다.

## 복습

1. 지연되고 있는 것은 무엇인가요?
   - A. 주문 접수
   - B. 매장 알림
   - C. 결제 승인
   - D. 앱 다운로드
2. 주문은 현재 어떤 상태인가요?
3. 아직 확인되지 않은 것은 무엇인가요?
4. 다음 업데이트 시점은 언제인가요?

### 정답과 예시 답변

- 1번 · B
- 2번 · 계속 정상적으로 접수되고 저장되고 있으며 영향이 없습니다.
- 3번 · 근본 원인입니다.
- 4번 · 10시 45분입니다.

## 듣고 답하기

### 1. 확인된 사실과 영향 알리기

- 상대 음성 · What's happening?
- 힌트 · 9시 57분부터 알림이 지연되고, 파일럿 매장 3분의 1이 영향을 받았으며, 주문은 영향이 없다고 말하세요.
- 예시 답변 · Store alerts have been delayed since 9:57. About a third of the pilot stores are affected, but orders themselves are not affected.
- 확인 · 지연 대상과 영향 범위, 안전한 부분을 구분했나요?

### 2. 조치와 미확인 사항 설명하기

- 상대 음성 · What are you doing about it?
- 힌트 · 제공업체로 이관했고 이메일 대체를 시험 중이며, 원인은 아직 모른다고 말한 뒤 다음 업데이트 시점을 약속하세요.
- 예시 답변 · The issue has been escalated to the push provider, and a failover to email alerts is being tested. We don't know the root cause yet. I'll call you at 10:45 either way.
- 확인 · 조치와 미확인 사항을 섞지 않고 다음 약속을 했나요?

### 3. 고객 공지 범위와 승인 확인하기

- 상대 음성 · If we say nothing and customers notice, that could look worse.
- 힌트 · 확인된 사실만 담은 짧은 상태 안내를 제안하고, 승인 전에는 게시하지 않는다고 확인하세요.
- 예시 답변 · That's a fair point. We can publish a short status note limited to confirmed facts, and nothing is posted until you approve it.
- 확인 · 공지 범위와 승인 절차를 함께 말했나요?
