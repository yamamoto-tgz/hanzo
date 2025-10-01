from flask import Flask, jsonify, render_template

import modules.slack as slack

app = Flask(__name__)


@app.route("/")
def index():
    team = slack.test_auth()["team"]
    channels = slack.get_conversations_list()["channels"]
    return render_template("index.html", team=team, channels=sorted(channels, key=lambda c: c["name"]))


@app.route("/<channel_id>/messages")
def get_messages(channel_id):
    messages = slack.get_conversations_history(channel_id)["messages"]
    return jsonify(messages)
