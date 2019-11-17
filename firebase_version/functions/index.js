const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const users = [
    {'id': '0',
     'Name': 'Donald Trump',
     'Balance': '50000',
     'Num_Funds': '3',
     'Next_Mile': '2020',
     'E': '4',
     'S':'4',
     'G':'4',
     'Strictness':'3',
     'FundsMatchOpinion': [],
     'Milestones':[]
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
     'FundsMatchOpinion': [],
     'Milestones':[]
     },

]

const FundList = [
      {'Name':'BlackRock Balanced Managed Fund','Ticker': 'FTSE','MSRating':3,'12mReturns':7,'TotRet':8,'Risk':4,'E':2,'S':2,'G':2},
      {'Name':'BlackRock I love Trees Fund','Ticker': 'SPY','MSRating':3,'12mReturns':4,'TotRet':5,'Risk':4,'E':7,'S':7,'G':7},
      {'Name':'BlackRock I love People Fund','Ticker': 'DJI','MSRating':2,'12mReturns':5,'TotRet':5,'Risk':4,'E':6,'S':6,'G':6}
      ]

exports.profile = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method === 'POST') {
  		var id = req.query.id
  		var content= req.body
  		for(i=0;i<users.length;i++){
  			if (id === users[i]['id']){
  			  users[i]['E'] = content['E']
  			  users[i]['S'] = content['S']
  			  users[i]['G'] = content['G']
  			}
  		}
      return res.status(200).json("Status: True")
    }
    else if(req.method === 'GET'){
      console.log(req.query.id)
      id = req.query.id
      content = req.body
      for(i=0;i<users.length;i++){
        if(id === users[i]['id']){
          return res.status(200).json(users[i])
        }
      }
    }
    else{
    	return res.status(401).json({
        	message: 'Not allowed'
      	})
    }
    }, (error) => {
      return res.status(error.code).json({
        message: `Something went wrong. ${error.message}`
      })
    })
  })

exports.GetFundsMatchOpinion = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method === 'GET'){
      var id = req.query.id
      var MatchFunds = []
      var E=0
      var S=0
      var G=0
      var Strictness=0
      for(i=0;i<users.length;i++){
        if(id === users[i]['id']){
          E = users[i]['E']
          S = users[i]['S']
          G = users[i]['G']
          Strictness = users[i]['Strictness']
        }
      }
      var MinE = E - Strictness
      var MinS = S - Strictness
      var MinG = G - Strictness
      for(i=0;i<FundList.length;i++){
        if ((FundList[i]['E'] >= MinE) && (FundList[i]['S'] >= MinS) && (FundList[i]['G'] >= MinG)){
          MatchFunds.push(FundList[i])
        }
      }
      users[id]['FundsMatchOpinion']=MatchFunds
      console.log(users)
      return res.status(200).json({'MatchFunds' : MatchFunds})
    }
    else{
      return res.status(401).json({
          message: 'Not allowed'
        })
    }
    }, (error) => {
      return res.status(error.code).json({
        message: `Something went wrong. ${error.message}`
      })
    })
  })

//What does this do?
exports.SetFundsMatchOpinion = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method === 'POST'){
      var id = req.query.id
      var content = req.body

      for(i=0;i<users.length;i++){
        if(id === users[i]['id']){
          users[i]['FundsMatchOpinion'] = content['FundsMatchOpinion']
        }
      }

      return res.status(200).json({'success' : true})
    }
    else{
      return res.status(401).json({
          message: 'Not allowed'
        })
    }
    }, (error) => {
      return res.status(error.code).json({
        message: `Something went wrong. ${error.message}`
      })
    })
  })

exports.SurveyResponses = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method === 'POST'){
      var id = req.query.id
      var content = req.body

      var E = 0
      var S = 0
      var G = 0
      //Q1: Do you think eough is being done to combat climate change? (Yes(0)/No(1))
      var e1 = content['1']
      //Q2: Do you think fossil fuels are neccessary in the 21st Century? (Yes(0)/No(1))
      var e2 = content['2']
      //Q3: Do you think all firms should be forced to be  carbon neutral? (Yes(0)/No(1))
      var e3 = content['3']
      //Q4: DO you think it should be mandatory for all companies to release gender pay gaps? (Yes(0)/No(1))
      var s1 = content['4']
      //Q5: Do you think more opportunities should be made for minorities? (Yes(0)/No(1))
      var s2 = content['5']
      //Q6: DO you think the company should reflect your personal values? (Yes(0)/No(1))
      var s3 = content['6']
      //Q7: Do you think there needs to be more regaulation on large companies?(Yes(1)/No(0))
      var g1 = content['7']
      //Q8: Do you believe that the free market is generally best for consumers?(Yes(0)/No(1))
      var g2 = content['8']
      //Q9: Should their be greater fines on comapnies who find tax loopholes>
      var g3 = content['9']

      E = (e1 + e2 + e3) / 3 *10
      S = (s1 + s2  + s3) /3 *10
      G = (g1 + g2  + g3) /3 *10

      for(i=0;i<users.length;i++){
        if(id === users[i]['id']){
          users[i]['E'] = E
          users[i]['S'] = S
          users[i]['G'] = G
        }
      }

      return res.status(200).json({'success' : true,"users":users})
    }
    else{
      return res.status(401).json({
          message: 'Not allowed'
        })
    }
    }, (error) => {
      return res.status(error.code).json({
        message: `Something went wrong. ${error.message}`
      })
    })
  })

exports.GetInterest = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method === 'POST'){
      var id = req.query.id
      var content = req.body

      var Interest_ret = 0

      for(i=0;i<100;i++){
        var Interest = i/1000
        var final = content['Initial']
        for(j=0;j<content['YTT'];j++){
         final = final*(1+Interest) + content['Cont']
        }

        if (final >= content['Target']){
          Interest_ret = Interest*100
          return res.status(200).json({'interest' : Interest_ret})         
        }

      }
      return res.status(200).json({'interest' : "Not possible."})
    }
    else{
      return res.status(401).json({
          message: 'Not allowed'
        })
    }
    }, (error) => {
      return res.status(error.code).json({
        message: `Something went wrong. ${error.message}`
      })
    })
  })

exports.GetFundsMatchReturns = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method === 'POST'){
      var MatchFunds = []
      var content = req.body
      var MaxPerms= content.perms
      var Interest=content.interest

      var id = req.query.id

      if (MaxPerms === 1){
        for (i=0;i<FundList.length;i++){
           if(FundList[i]['12mReturns'] >= Interest){
              MatchFunds.push(FundList[i])
           }
        }
      }

      if (MaxPerms === 2){
        for(i=0;i<FundList.length;i++){
           for(j=0;j<FundList.length;j++){
              if(i !== j){
                 if ( (FundList[i]['12mReturns']+FundList[j]['12mReturns'] ) /2 > Interest){
                    MatchFunds.push([FundList[i],FundList[j]])
                 }
              }
            }
          }
      }

      if (MaxPerms === 3){
        for(i=0;i<FundList.length;i++){
          for(j=0;j<FundList.length;j++){
            for(k=0;k<FundList.length;k++){
              if ((i !== j) && (j !== k) && (k !== i)){
                 if ((FundList[i]['12mReturns']+FundList[j]['12mReturns']+FundList[k]['12mReturns'])/3 > Interest){
                    MatchFunds.push([FundList[i],FundList[j],FundList[k]])
                 }
              }
            }
          }
        }
      }
        
      return res.status(200).json({'MatchFunds' : MatchFunds})
    }
    else{
      return res.status(401).json({
          message: 'Not allowed'
        })
    }
    }, (error) => {
      return res.status(error.code).json({
        message: `Something went wrong. ${error.message}`
      })
    })
  })

exports.AddMilestone = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method === 'POST'){
      var id = req.query.id
      var content = req.body

      users[id]['Milestones'].push({'name':content.name,'ytt':content.ytt,'cont':content.cont,'target':content.target,'funds':content.funds})

      return res.status(200).json({'result' : users[id]['Milestones']})
    }
    else{
      return res.status(401).json({
          message: 'Not allowed'
        })
    }
    }, (error) => {
      return res.status(error.code).json({
        message: `Something went wrong. ${error.message}`
      })
    })
  })

exports.getMilestones = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method === 'GET'){
      var id = req.query.id

      milestones=users[id]['Milestones']

      return res.status(200).json({'milestones' : users})
    }
    else{
      return res.status(401).json({
          message: 'Not allowed'
        })
    }
    }, (error) => {
      return res.status(error.code).json({
        message: `Something went wrong. ${error.message}`
      })
    })
  })
