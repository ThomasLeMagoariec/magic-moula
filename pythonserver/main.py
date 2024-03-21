from flask import Flask, request
import jwt
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os
import time

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

public_key = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz3z3z3z3z3z3z3z3z3z3\n"

"""
! API Endpoints

* Create Account
* Login
* Update User Info
* Delete User
* Get Account Info
* Get Account Balance
* Update Account Balance
* Transfer from account to another
* Get Account Transactions

"""


@app.route('/')
def index():
    data = jwt.decode(request.headers["authorization"], key=public_key, algorithms="HS256")

    return "Hello, " + data["name"] + " " + data["last_name"]



@app.route("/create_account", methods=["POST"])
def create_account():
    data = request.json

    if not "password" in data: return "Password is required", 400
    if not "email" in data: return "Email is required", 400
    if not "name" in data: return "Name is required", 400
    if not "last_name" in data: return "Last Name is required", 400
    
    # Check if email already exists in the database
    cursor.execute("SELECT * FROM usr_accounts WHERE email=%s", (data["email"],))
    res = cursor.fetchall()

    if len(res) > 0: return "Email already exists", 400
    
    # Add account to database
    cursor.execute("INSERT INTO usr_accounts (name, last_name, email, password) VALUES (%s, %s, %s, %s)", (data["name"], data["last_name"], data["email"], data["password"]))

    cnx.commit()
    return "success", 200

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    if not "password" in data: return "Password is required", 400
    if not "email" in data: return "Email is required", 400

    #! check if account exists in database
    cursor.execute("SELECT * FROM usr_accounts WHERE email=%s AND password=%s", (data["email"], data["password"]))
    res = cursor.fetchall()

    if len(res) == 0: return "Account not found", 404

    token = jwt.encode({"id": res[0][0], "name": res[0][1], "last_name": res[0][2], "email": res[0][3], "password": res[0][4]}, key=public_key, algorithm="HS256")
    return {"token": token}, 200

@app.route("/update_user_info", methods=["POST"])
def update_user_info():
    data = request.json
    
    id_ = jwt.decode(request.headers["authorization"], key=public_key, algorithms="HS256")["id"]

    if not id_: return "ID is required", 400


    #! update user info

    if "name" in data:
        cursor.execute("UPDATE usr_accounts SET name=%s WHERE id=%s", (data["name"], data["id"]))
    elif "last_name" in data:
        cursor.execute("UPDATE usr_accounts SET last_name=%s WHERE id=%s", (data["last_name"], data["id"]))
    elif "email" in data:
        cursor.execute("UPDATE usr_accounts SET email=%s WHERE id=%s", (data["email"], data["id"]))
    elif "password" in data:
        cursor.execute("UPDATE usr_accounts SET password=%s WHERE id=%s", (data["password"], data["id"]))
    else:
        return "No data to update", 400
    
    cnx.commit()
    return "success", 200

@app.route("/delete_user", methods=["DELETE"])
def delete_user():
    id_ = jwt.decode(request.headers["authorization"], key=public_key, algorithms="HS256").get("id")

    if not id_: return "ID is required", 400

    cursor.execute("DELETE FROM usr_accounts WHERE id=%s", (id_,))
    cnx.commit()
    return "success", 200

@app.route('/get_user_info', methods=["GET"])
def get_user_info():
    id_ = jwt.decode(request.headers["authorization"], key=public_key, algorithms="HS256").get("id")

    if not id_: return "ID is required", 400

    cursor.execute("SELECT name, last_name, email, balance FROM usr_accounts WHERE id=%s", (id_,))

    res = cursor.fetchall()[0]

    return {"name": res[0], "last_name": res[1], "email": res[2], "balance": res[3]}, 200

@app.route("/get_balance", methods=["GET"])
def get_balance():
    id_ = jwt.decode(request.headers["authorization"], key=public_key, algorithms="HS256").get("id")

    if not id_: return "ID is required", 400

    cursor.execute("SELECT balance FROM usr_accounts WHERE id=%s", (id_,))


    time.sleep(1)
    return str(cursor.fetchall()[0][0]), 200

@app.route("/update_balance", methods=["POST"])
def update_balance():
    data = request.json

    if not "id" in data: return "ID is required", 400
    if not "amount" in data: return "Amount is required", 400

    cursor.execute("UPDATE usr_accounts SET balance=%s WHERE id=%s", (data["amount"], data["id"]))

    cnx.commit()
    return "success", 200

@app.route("/transfer", methods=["POST"])
def transfer():
    data = request.json

    if not "from" in data: return "From (sender) is required", 400
    if not "to" in data: return "To (receiver) is required", 400
    if not "amount" in data: return "Amount is required", 400
    if not "category" in data: data["category"] = "general"
    if not "message" in data: data["message"] = "Transfer"

    cursor.execute("SELECT balance FROM usr_accounts WHERE id=%s", (data["to"],))
    recv_bal = cursor.fetchall()[0][0]
    if recv_bal == None: recv_bal = 0
    
    cursor.execute("SELECT balance FROM usr_accounts WHERE id=%s", (data["from"],))
    sender_bal = cursor.fetchall()[0][0]

    if sender_bal < int(data["amount"]) and data["from"] != 1: return "Insufficient funds", 400

    cursor.execute("UPDATE usr_accounts SET balance=%s WHERE id=%s", (recv_bal + int(data["amount"]), data["to"]))
    if data["from"] != 1: cursor.execute("UPDATE usr_accounts SET balance=%s WHERE id=%s", (sender_bal - int(data["amount"]), data["from"]))

    cursor.execute("INSERT INTO transactions (sender_account_id, receiver_account_id, amount, category, message) VALUES (%s, %s, %s, %s, %s)", (data["from"], data["to"], data["amount"], data["category"], data["message"]))

    cnx.commit()

    return "success", 200

@app.route("/get_transactions", methods=["GET"])
def get_transactions():
    id_ = jwt.decode(request.headers["authorization"], key=public_key, algorithms="HS256").get("id")

    if not id_: return "ID is required", 400

    cursor.execute("SELECT * FROM transactions WHERE sender_account_id=%s OR receiver_account_id=%s", (id_, id_))
    return str(cursor.fetchall()), 200

@app.route("/get_recent_transactions")
def get_recent_transactions():
    id_ = jwt.decode(request.headers["authorization"], key=public_key, algorithms="HS256").get("id")

    if not id_: return "ID is required", 400

    cursor.execute("SELECT * FROM transactions WHERE sender_account_id=%s OR receiver_account_id=%s ORDER BY id LIMIT 10", (id_, id_))
    
    transactions = []
    res = cursor.fetchall()
    for x in res:
        transactions.append(x)

    return transactions, 200

@app.route("/get_admin_data")
def get_admin_data():
    cursor.execute("SELECT * FROM usr_accounts")
    res = cursor.fetchall()

    return {"data": res}, 200

@app.route("/total_money")
def total_money():
    cursor.execute("SELECT SUM(balance) FROM usr_accounts")
    res = cursor.fetchall()

    return {"total": res[0][0]}, 200

if __name__ == '__main__':
    load_dotenv()

    cnx = mysql.connector.connect(
        host=os.environ["DB_HOST"],
        user="root",
        password=os.environ["DB_PWD"],
        unix_socket="/var/run/mysqld/mysqld.sock"  
    )
    # cnx = mysql.connector.connect(host='localhost',database='magicmoula',user='root')
    cursor = cnx.cursor()
    cursor.execute("USE prod_magic_moula")

    app.run(host="0.0.0.0", debug=True)
    cursor.close()
    cnx.close()