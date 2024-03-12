from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route("/create_account", methods=["POST"])
def create_account():
    data = request.form

    if not "password" in data: return "Password is required", 400
    if not "email" in data: return "Email is required", 400
    if not "name" in data: return "Name is required", 400

    #! add account to database

    return "success", 200

@app.route("/login", methods=["POST"])
def login():
    data = request.form

    if not "password" in data: return "Password is required", 400
    if not "email" in data: return "Email is required", 400

    #! check if account exists in database

    return "success", 200

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")