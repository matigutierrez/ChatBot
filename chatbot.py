from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer


bot = ChatBot(
    "My ChatterBot"
)

trainer = ChatterBotCorpusTrainer(bot)

trainer.train(
    "./Trainer-spanish/ai.corpus.json",
    "./Trainer-spanish/botprofile.corpus.json",
    "./Trainer-spanish/computers.corpus.json",
    "./Trainer-spanish/conversaciones.corpus.json",
    "./Trainer-spanish/emotion.corpus.json"
)

print('Type something to begin...')


while True:
    try:
        user_input = input()

        bot_response = bot.get_response(user_input)

        print(bot_response)

    # ctrl-c para salir
    except (KeyboardInterrupt, EOFError, SystemExit):
        break