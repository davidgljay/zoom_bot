const functions = require('firebase-functions');



/* 
This function expects three kinds of events:

1. A participant.joined event for when a participant joins a meeting.
2. A meeting.created event for when a meeting is created.
3. A meeting.updated event for when a meeting is updated.

Data formats for each event type are at the bottom of this file.

*/

exports.receiveEvent = functions.https.onRequest((req, res) => {
    console.log('Received data:', req.body);
    const data = req.body;
    const eventType = data.event;
    if (eventType === 'participant.joined') {
        handleParticipantJoined(data);
    } else if (eventType === 'meeting.created' || eventType === 'meeting.updated') {
        handleMeetingCreatedOrUpdated(data);
    }
    res.status(200).send('Data received');
});

function handleParticipantJoined(data) {
    const meetingId = data.payload.object.id;
    const email = data.payload.object.participant.email;
    console.log('Participant joined:', data);
} 

function handleMeetingCreatedOrUpdated(data) {
    const meetingId = data.payload.object.id;
    const meetingName = data.payload.object.topic;
    const startTime = data.payload.object.start_time;
    const link = data.payload.object.join_url;
    console.log('Meeting created:', data);
}

/*

It expects data of the following formats:

Participant joined:
{
  "event": "…",
  "event_ts": 1,
  "payload": {
    "account_id": "…",
    "object": {
      "id": "…",
      "uuid": "…",
      "host_id": "…",
      "topic": "…",
      "type": 0,
      "start_time": "…",
      "timezone": "…",
      "duration": 1,
      "participant": {
        "user_id": "…",
        "user_name": "…",
        "id": "…",
        "participant_uuid": "…",
        "join_time": "2024-10-24T22:22:23.436Z",
        "email": "hello@example.com",
        "registrant_id": "…",
        "participant_user_id": "…",
        "customer_key": "…",
        "phone_number": "8615250064084"
      }
    }
  }
}

Meeting.created:
{
  "event": "…",
  "event_ts": 1,
  "payload": {
    "account_id": "…",
    "operator": "hello@example.com",
    "operator_id": "…",
    "operation": "all",
    "object": {
      "uuid": "…",
      "id": 1,
      "host_id": "…",
      "topic": "…",
      "type": 0,
      "start_time": "2024-10-24T22:22:23.436Z",
      "duration": 1,
      "timezone": "…",
      "join_url": "…",
      "password": "…",
      "pmi": "…",
      "occurrences": [
        {
          "occurrence_id": "…",
          "start_time": "2024-10-24T22:22:23.436Z",
          "duration": 1,
          "status": "available",
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      ],
      "settings": {
        "use_pmi": true,
        "alternative_hosts": "…",
        "meeting_invitees": [
          {
            "email": "hello@example.com"
          }
        ],
        "join_before_host": true,
        "jbh_time": 0,
        "ANY_ADDITIONAL_PROPERTY": "anything"
      },
      "recurrence": {
        "type": 1,
        "repeat_interval": 1,
        "weekly_days": "…",
        "monthly_day": 1,
        "monthly_week_day": 1,
        "end_times": 1,
        "end_date_time": "2024-10-24T22:22:23.436Z",
        "monthly_week": -1,
        "ANY_ADDITIONAL_PROPERTY": "anything"
      },
      "tracking_fields": [
        {
          "field": "…",
          "value": "…",
          "visible": true,
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      ],
      "ANY_ADDITIONAL_PROPERTY": "anything"
    },
    "ANY_ADDITIONAL_PROPERTY": "anything"
  },
  "ANY_ADDITIONAL_PROPERTY": "anything"
}

Meeting.updated:
{
  "event": "…",
  "event_ts": 1,
  "payload": {
    "account_id": "…",
    "operator": "hello@example.com",
    "operator_id": "…",
    "scope": "single",
    "object": {
      "id": 1,
      "uuid": "…",
      "host_id": "…",
      "topic": "…",
      "type": 0,
      "start_time": "2024-10-24T22:22:23.436Z",
      "duration": 1,
      "timezone": "…",
      "join_url": "…",
      "password": "…",
      "agenda": "…",
      "registration_url": "…",
      "occurrences": [
        {
          "occurrence_id": "…",
          "start_time": "2024-10-24T22:22:23.436Z",
          "duration": 1,
          "status": "available",
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      ],
      "settings": {
        "host_video": true,
        "participant_video": true,
        "join_before_host": true,
        "jbh_time": 0,
        "mute_upon_entry": true,
        "audio": "telephony",
        "auto_recording": "local",
        "use_pmi": true,
        "waiting_room": true,
        "watermark": true,
        "enforce_login": true,
        "enforce_login_domains": "…",
        "approval_type": 0,
        "registration_type": 1,
        "alternative_hosts": "…",
        "meeting_authentication": true,
        "authentication_option": "…",
        "authentication_name": "…",
        "authentication_domains": "…",
        "meeting_invitees": [
          {
            "email": "hello@example.com"
          }
        ],
        "language_interpretation": {
          "enable": true,
          "interpreters": [
            {
              "email": "hello@example.com",
              "languages": "…"
            }
          ]
        },
        "sign_language_interpretation": {
          "enable": true,
          "interpreters": [
            {
              "email": "hello@example.com",
              "sign_language": "…"
            }
          ]
        },
        "continuous_meeting_chat": {
          "enable": true,
          "auto_add_invited_external_users": true,
          "auto_add_meeting_participants": true
        },
        "auto_start_meeting_summary": true,
        "auto_start_ai_companion_questions": true,
        "ANY_ADDITIONAL_PROPERTY": "anything"
      },
      "recurrence": {
        "type": 1,
        "repeat_interval": 1,
        "weekly_days": "1",
        "monthly_day": 1,
        "monthly_week_day": 1,
        "end_times": 1,
        "end_date_time": "2024-10-24T22:22:23.436Z",
        "monthly_week": -1,
        "ANY_ADDITIONAL_PROPERTY": "anything"
      },
      "tracking_fields": [
        {
          "field": "…",
          "value": "…",
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      ],
      "ANY_ADDITIONAL_PROPERTY": "anything"
    },
    "time_stamp": 1,
    "old_object": {
      "id": 1,
      "uuid": "…",
      "host_id": "…",
      "topic": "…",
      "type": 0,
      "start_time": "2024-10-24T22:22:23.436Z",
      "duration": 1,
      "timezone": "…",
      "join_url": "…",
      "password": "…",
      "agenda": "…",
      "registration_url": "…",
      "occurrences": [
        {
          "occurrence_id": "…",
          "start_time": "2024-10-24T22:22:23.436Z",
          "duration": 1,
          "status": "available",
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      ],
      "settings": {
        "host_video": true,
        "participant_video": true,
        "join_before_host": true,
        "jbh_time": 0,
        "mute_upon_entry": true,
        "audio": "telephony",
        "auto_recording": "local",
        "use_pmi": true,
        "waiting_room": true,
        "watermark": true,
        "enforce_login": true,
        "enforce_login_domains": "…",
        "approval_type": 0,
        "registration_type": 1,
        "alternative_hosts": "…",
        "meeting_authentication": true,
        "authentication_option": "…",
        "authentication_name": "…",
        "authentication_domains": "…",
        "meeting_invitees": [
          {
            "email": "hello@example.com"
          }
        ],
        "language_interpretation": {
          "enable": true,
          "interpreters": [
            {
              "email": "hello@example.com",
              "languages": "…"
            }
          ]
        },
        "sign_language_interpretation": {
          "enable": true,
          "interpreters": [
            {
              "email": "hello@example.com",
              "sign_language": "…"
            }
          ]
        },
        "continuous_meeting_chat": {
          "enable": true,
          "auto_add_invited_external_users": true,
          "auto_add_meeting_participants": true
        },
        "auto_start_meeting_summary": true,
        "auto_start_ai_companion_questions": true,
        "ANY_ADDITIONAL_PROPERTY": "anything"
      },
      "recurrence": {
        "type": 1,
        "repeat_interval": 1,
        "weekly_days": "1",
        "monthly_day": 1,
        "monthly_week_day": 1,
        "end_times": 1,
        "end_date_time": "2024-10-24T22:22:23.436Z",
        "monthly_week": -1,
        "ANY_ADDITIONAL_PROPERTY": "anything"
      },
      "tracking_fields": [
        {
          "field": "…",
          "value": "…",
          "ANY_ADDITIONAL_PROPERTY": "anything"
        }
      ],
      "ANY_ADDITIONAL_PROPERTY": "anything"
    },
    "ANY_ADDITIONAL_PROPERTY": "anything"
  },
  "ANY_ADDITIONAL_PROPERTY": "anything"
}

*/