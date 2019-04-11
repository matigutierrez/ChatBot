from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer


bot = ChatBot(
    "My ChatterBot",
    logic_adapters=[
        'chatterbot.logic.BestMatch'
    ]
)

trainer = ChatterBotCorpusTrainer(bot)

trainer.train(
    "chatterbot.corpus.spanish"
)

print('Type something to begin...')


while True:
    try:
        user_input = input()

        bot_response = bot.get_response(None)

        print(bot_response)

    # ctrl-c para salir
    except (KeyboardInterrupt, EOFError, SystemExit):
        break