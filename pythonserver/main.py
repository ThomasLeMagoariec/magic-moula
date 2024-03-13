from flask import Flask, request
import mysql.connector

cnx = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin",
    unix_socket="/var/run/mysqld/mysqld.sock"  
)
cursor = cnx.cursor()
cursor.execute("USE prod_magic_moula")

app = Flask(__name__)

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
    cursor.execute("SELECT * FROM usr_accounts")

    return cursor.fetchall()

@app.route("/create_account", methods=["POST"])
def create_account():
    data = request.form

    if not "password" in data: return "Password is required", 400
    if not "email" in data: return "Email is required", 400
    if not "name" in data: return "Name is required", 400
    if not "last_name" in data: return "Last Name is required", 400

    #! add account to database
    cursor.execute("INSERT INTO usr_accounts (name, last_name, email, password) VALUES (%s, %s, %s, %s)", (data["name"], data["last_name"], data["email"], data["password"]))

    cnx.commit()
    return "success", 200

@app.route("/login", methods=["POST"])
def login():
    data = request.form

    if not "password" in data: return "Password is required", 400
    if not "email" in data: return "Email is required", 400

    #! check if account exists in database
    cursor.execute("SELECT * FROM usr_accounts WHERE email=%s AND password=%s", (data["email"], data["password"]))
    res = cursor.fetchall()

    if len(res) == 0: return "Account not found", 404
    return str(res[0][0]), 200

@app.route("/update_user_info", methods=["POST"])
def update_user_info():
    data = request.form

    if not "id" in data: return "ID is required", 400

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
    data = request.form

    if not "id" in data: return "ID is required", 400

    cursor.execute("DELETE FROM usr_accounts WHERE id=%s", (data["id"],))
    cnx.commit()
    return "success", 200

@app.route('/get_user_info', methods=["GET"])
def get_user_info():
    data = request.form

    if not "id" in data: return "ID is required", 400

    cursor.execute("SELECT name, last_name, email FROM usr_accounts WHERE id=%s", (data["id"],))

    return str(cursor.fetchall()), 200

@app.route("/get_balance", methods=["GET"])
def get_balance():
    data = request.form

    if not "id" in data: return "ID is required", 400

    cursor.execute("SELECT balance FROM usr_accounts WHERE id=%s", (data["id"],))

    return str(cursor.fetchall()[0][0]), 200

@app.route("/update_balance", methods=["POST"])
def update_balance():
    data = request.form

    if not "id" in data: return "ID is required", 400
    if not "amount" in data: return "Amount is required", 400

    cursor.execute("UPDATE usr_accounts SET balance=%s WHERE id=%s", (data["amount"], data["id"]))

    cnx.commit()
    return "success", 200

@app.route("/transfer", methods=["POST"])
def transfer():
    data = request.form

    if not "from" in data: return "From (sender) is required", 400
    if not "to" in data: return "To (receiver) is required", 400
    if not "amount" in data: return "Amount is required", 400
    if not "category" in data: data["category"] = "general"
    if not "message" in data: data["message"] = "Transfer"

    cursor.execute("SELECT balance FROM usr_accounts WHERE id=%s", (data["to"],))
    recv_bal = cursor.fetchall()[0][0]
    
    cursor.execute("SELECT balance FROM usr_accounts WHERE id=%s", (data["from"],))
    sender_bal = cursor.fetchall()[0][0]

    if sender_bal < int(data["amount"]): return "Insufficient funds", 400

    cursor.execute("UPDATE usr_accounts SET balance=%s WHERE id=%s", (recv_bal + int(data["amount"]), data["to"]))
    cursor.execute("UPDATE usr_accounts SET balance=%s WHERE id=%s", (sender_bal - int(data["amount"]), data["from"]))

    cursor.execute("INSERT INTO transactions (sender_account_id, receiver_account_id, amount, category, message) VALUES (%s, %s, %s, %s, %s)", (data["from"], data["to"], data["amount"], data["category"], data["message"]))

    cnx.commit()

    return "success", 200

@app.route("/get_transactions", methods=["GET"])
def get_transactions():
    data = request.form

    if not "id" in data: return "ID is required", 400

    cursor.execute("SELECT * FROM transactions WHERE sender_account_id=%s OR receiver_account_id=%s", (data["id"], data["id"]))
    return str(cursor.fetchall()), 200

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
    cursor.close()
    cnx.close()