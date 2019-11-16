# -*- coding: utf-8 -*-
"""
Created on Sat Nov 16 01:05:47 2019

@author: krish
"""
import statistics

#Name, MSRating, 12mReturns, TotRet, Risk (1-7), E, S, G,
Funds = [
      {'Name':'BlackRock Balanced Managed Fund','MSRating':3,'12mReturns':0.007,'TotRet':0.08,'Risk':4,'E':4,'S':4,'G':4},
      {'Name':'BlackRock I love Trees Fund','MSRating':3,'12mReturns':0.004,'TotRet':0.05,'Risk':4,'E':7,'S':3,'G':4},
      {'Name':'BlackRock I love Trees Fund','MSRating':2,'12mReturns':0.05,'TotRet':0.05,'Risk':4,'E':2,'S':6,'G':4}
      ]

#We get an array of THE PERSONS
#Min MSRating, Returns, Risk, E, S, G
Person = {'MSRating': 3, 'Returns': 0.02, 'Risk': 4, 'E': 4, 'S':4, 'G':4, 'Strictness': 2}

#Function which returns a list of fund positions which match the users opinions
def GetFundsMatchOpinion(D,FundList):
   MatchFunds = []
   MinE = D['E'] - D['Strictness']
   MinS = D['S'] - D['Strictness']
   MinG = D['G'] - D['Strictness']
   for i in range(len(FundList)):
      if ((FundList[i]['E'] >= MinE) and (FundList[i]['S'] >= MinS) and (FundList[i]['G'] >= MinG)):
         MatchFunds.append(FundList[i])
   return MatchFunds
         
      

def GetFundsMatchReturns(D,FundList, MaxPerms = 3):
   MatchFunds = []
   Interest = D['Returns']
   if (MaxPerms == 1):
      for i in range(len(FundList)):
         if FundList[i]['12mReturns'] >= Interest:
            MatchFunds.append(FundList[i])
   if (MaxPerms == 2):
      for i in range(len(FundList)):
         for j in range(len(FundList)):
            if i != j:
               if (statistics.mean([FundList[i]['12mReturns'], FundList[j]['12mReturns']) > Interest):
                  MatchFunds.append([FundList[i],FundList[j]])
   if (MaxPerms == 3):
      for i in range(len(FundList)):
         for j in range(len(FundList)):
            for k in range(len(FundList)):
               if (i != j) and (j != k) and (k != i):
                  if (statistics.mean([FundList[i]['12mReturns'], FundList[j]['12mReturns'], FundList[k]['12mReturns']) > Interest):
                     MatchFunds.append([FundList[i],FundList[j],FundList[k]])
      
   return MatchFunds


print(GetFundsMatchReturns(Person,Funds,1))