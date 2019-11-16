# -*- coding: utf-8 -*-
"""
UserInfo
Balance
Number of Funds
Next Milestone
"""


from flask import Flask, request,jsonify

app = Flask(__name__)
app.config["DEBUG"] = True
users = [
    {'id': '0',
     'Name': 'Donald Trump',
     'Balance': '50000',
     'Num_Funds': '3',
     'Next_Mile': '2020',
     'E': '4',
     'S':'4',
     'G':'4'
     },
    {'id': '1',
     'Name': 'Bernie Sanders ',
     'Balance': '40000',
     'Num_Funds': '2',
     'Next_Mile': '2020',
     'E': '5',
     'S':'6',
     'G':'7'
     },

]

@app.route('/')
def index():
  return 'Server Works!'

#adding variables
@app.route('/allinfo', methods=['GET'])
def allinfo():
  #returns the username
  return jsonify(users)

@app.route('/profile', methods=['GET', 'POST'])
def add_message():
    if request.method == 'POST':
        id = request.args.get('id')
        content = request.get_json(silent=False)
        for i in range(len(users)):
            if id == users[i]['id']:
                users[i]['E'] = content['E']
                users[i]['S'] = content['S']
                users[i]['G'] = content['G']
        resp = jsonify(success=True)
        return resp
    else:
        id = request.args.get('id')
        content = request.get_json(silent=False)
        for i in range(len(books)):
            if id == books[i]['id']:
                return jsonify(books[i])
