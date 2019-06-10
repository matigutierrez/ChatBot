from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from flask import Flask, request
import json

app = Flask(__name__)

bot = ChatBot(
    "My ChatterBot",
    logic_adapters=[
        'chatterbot.logic.BestMatch'
    ])

trainer = ChatterBotCorpusTrainer(bot)

trainer.train(
    "./Trainer-spanish/ai.corpus.json",
    "./Trainer-spanish/botprofile.corpus.json",
    "./Trainer-spanish/computers.corpus.json",
    "./Trainer-spanish/conversaciones.corpus.json",
    "./Trainer-spanish/emotion.corpus.json",
    "./Trainer-spanish/dci.corpus.json"
)

@app.route("/bot", methods=["POST"])
def get_bot_response():
    userText = request.form['msg']
    return json.dumps({"message": str(bot.get_response(userText))})

if __name__ == "__main__":
    app.run()

