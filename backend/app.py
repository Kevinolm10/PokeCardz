from flask import Flask, jsonify
from pokeApi import fetchPokeData


app = Flask(__name__)

@app.route("/<int:pokemon_id>")
def get_pokemon(pokemon_id):
    data = fetchPokeData(pokemon_id)
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)