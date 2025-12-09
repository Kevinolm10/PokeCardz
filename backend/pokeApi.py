import requests

def fetchPokeData(pokemon_id):
    try:
        response = requests.get(f"https://pokeapi.co/api/v2/pokemon/{pokemon_id}")
        response.raise_for_status()
        data = response.json()
        return data
    except Exception as error:
        return {"error": str(error)}

