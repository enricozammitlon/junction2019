# -*- coding: utf-8 -*-
#Create program to calculate return

#Input is 
#number of years to target
YTT = 5
#Cash value at at target
Target = 25000
#Initial input
Initial = 5000
#Amount inputted per year
Cont = 1000
#Interest rate
Interest = 0.02
#Volatility rate
def GetYTT(Target, Initial, Cont, Interest):
   total = Initial
   Years = 0
   while total < Target:
      total = total + Cont + total*(1 + Interest)
      Years += 1
   return Years

def GetTarget(YTT,Initial,Cont, Interest):
   final = Initial
   for i in range(YTT):
      final = final*(1+Interest) + Cont
   return final

def GetInitial(YTT,Target,Cont, Interest):
   Initial = Target
   for i in range(YTT):
      Initial = (Initial - Cont)/(1+Interest)
      
def GetInterest(YTT,Target, Initial, Cont):
   for i in range(100):
      Interest = i/1000
      final = Initial
      for j in range(YTT):
         final = final*(1+Interest) + Cont
      if final >= Target:
         return Interest
   return None
         

def GetUnkown(YTT,Target,Initial, Cont, Interest):
   if YTT == None:
      return GetYTT(Target,Initial, Cont, Interest)
   if Target == None:
      return GetTarget(YTT,Initial,Cont, Interest)
   if Initial == None:
      return GetInitial(YTT,Target, Cont, Interest)
   if Interest == None:
      return GetInterest(YTT,Target, Initial, Cont)
      

