import requests
import os

token = "2f292bd6-2c59-47eb-a8e6-5a0bd2938aff"
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
project_id = "efbc6f0d-73ac-404e-98c6-fb54be5961e1"

q_env = f"""
query {{
  environments(projectId: "{project_id}") {{
    edges {{
      node {{
        id
        name
      }}
    }}
  }}
}}
"""
res = requests.post("https://backboard.railway.app/graphql/v2", json={"query": q_env}, headers=headers).json()
envs = res.get("data", {}).get("environments", {}).get("edges", [])
if not envs:
    print("No environments found")
    exit(1)

env_id = envs[0]["node"]["id"]
print(f"Env ID: {env_id}")

q_vars = f"""
query {{
  variables(projectId: "{project_id}", environmentId: "{env_id}")
}}
"""
res_vars = requests.post("https://backboard.railway.app/graphql/v2", json={"query": q_vars}, headers=headers).json()
variables = res_vars.get("data", {}).get("variables", {})
db_url = variables.get("DATABASE_URL")
if db_url:
    print(f"DATABASE_URL found")
    with open(".env", "w") as f:
        f.write(f"DATABASE_URL={db_url}\n")
    print("Written to .env")
else:
    print("DATABASE_URL not found in variables")
