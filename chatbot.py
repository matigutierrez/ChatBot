from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from flask import Flask, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

bot = ChatBot("My ChatterBot")

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
    return json.dumps({"author": "bot", "message": str(bot.get_response(userText))})

if __name__ == "__main__":
    app.run()

