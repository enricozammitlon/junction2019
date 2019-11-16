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
     'G':'4',
     'Strictness':'0',
     'FundsMatchOpinion': []
     },
    {'id': '1',
     'Name': 'Bernie Sanders ',
     'Balance': '40000',
     'Num_Funds': '2',
     'Next_Mile': '2020',
     'E': '5',
     'S':'6',
     'G':'7',
     'Strictness':'2',
     'FundsMatchOpinion': []
     },

]

Funds = [
      {'Name':'BlackRock Balanced Managed Fund','Ticker': 'FTSE','MSRating':3,'12mReturns':0.007,'TotRet':0.08,'Risk':4,'E':4,'S':4,'G':4},
      {'Name':'BlackRock I love Trees Fund','Ticker': 'SPY','MSRating':3,'12mReturns':0.004,'TotRet':0.05,'Risk':4,'E':7,'S':3,'G':4},
      {'Name':'BlackRock I love Trees Fund','Ticker': 'DJI','MSRating':2,'12mReturns':0.05,'TotRet':0.05,'Risk':4,'E':2,'S':6,'G':4}
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

@app.route('/GetFundsMatchOpinion', methods=['GET'])
def GetFundsMatchOpinion():
   id = request.args.get('id')
   MatchFunds = []
   for i in range(len(users)):
      if id == users[i]['id']:
          E = users[i]['E']
          S = users[i]['S']
          G = users[i]['G']
          Strictness = users[i]['Strictness']
   MinE = E - Strictness
   MinS = S - Strictness
   MinG = G - Strictness
   for i in range(len(FundList)):
      if ((FundList[i]['E'] >= MinE) and (FundList[i]['S'] >= MinS) and (FundList[i]['G'] >= MinG)):
         MatchFunds.append(FundList[i])
   return jsonify({'MatchFunds' : MatchFunds})

@app.route('/SetFundsMatchOpinion', methods=['POST'])
def SetFundsMatchOpinion():
    id = request.args.get('id')
    content = request.get_json(silent=False)
    for i in range(len(users)):
        if id == users[i]['id']:
            users[i]['FundsMatchOpinion'] = content['FundsMatchOpinion']
    resp = jsonify(success=True)
return resp

@app.route('/SurveyResponses', methods=['POST'])
def SurveyResponses():
    id = request.args.get('id')
    content = request.get_json(silent=False)
    E = 0
    S = 0
    G = 0
    #Q1: Do you think eough is being done to combat climate change? (Yes(0)/No(1))
    e1 = content['1']
    #Q2: Do you think fossil fuels are neccessary in the 21st Century? (Yes(0)/No(1))
    e2 = content['2']
    #Q3: Do you think all firms should be forced to be  carbon neutral? (Yes(0)/No(1))
    e3 = content['3']
    #Q4: DO you think it should be mandatory for all companies to release gender pay gaps? (Yes(0)/No(1))
    s1 = content['4']
    #Q5: Do you think more opportunities should be made for minorities? (Yes(0)/No(1))
    s2 = content['5']
    #Q6: DO you think the company should reflect your personal values? (Yes(0)/No(1))
    s3 = content['6']
    #Q7: Do you think there needs to be more regaulation on large companies?(Yes(1)/No(0))
    g1 = content['7']
    #Q8: Do you believe that the free market is generally best for consumers?(Yes(0)/No(1))
    g2 = content['8']
    #Q9: Should their be greater fines on comapnies who find tax loopholes>
    g3 = content['9']

    E = (e1 + e2 + e3) / 3 * 10
    S = (s1 + s2  + s3) /3 * 10
    G = (g1 + g2  + g3) /3 * 10
    for i in range(len(users)):
        if id == users[i]['id']:
            users[i]['E'] = E
            users[i]['S'] = S
            users[i]['G'] = G
    resp = jsonify(success=True)
return resp
