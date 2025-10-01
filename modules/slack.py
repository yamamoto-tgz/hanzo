import os

import requests


def test_auth():
    return requests.post(
        "https://slack.com/api/auth.test",
        data={"token": os.getenv("SLACK_USER_TOKEN")},
    ).json()


def get_conversations_list():
    return requests.post(
        "https://slack.com/api/conversations.list",
        data={"token": os.getenv("SLACK_USER_TOKEN")},
    ).json()


def get_conversations_history(channel_id):
    return requests.post(
        "https://slack.com/api/conversations.history",
        data={
            "token": os.getenv("SLACK_USER_TOKEN"),
            "channel": channel_id,
            "limit": 20,
        },
    ).json()
