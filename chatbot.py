from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from flask import Flask, request
import json

app = Flask(__name__)

bot = ChatBot("My ChatterBot")

trainer = ChatterBotCorpusTrainer(bot)
trainer.train("chatterbot.corpus.spanish")

@app.route("/bot", methods=["GET", "POST"])
def get_bot_response():
    userText = request.form['msg']
    return json.dumps({"message": str(bot.get_response(userText))})

if __name__ == "__main__":
    app.run()