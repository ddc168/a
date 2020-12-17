#include<bits/stdc++.h>
#include<stdio.h>
#include<iostream>
#include<string.h>
using namespace std;
int main()
{
 string z;
 cin>>z;
// printf("%d", z);
 char a;
 a=z[0];
// printf("%d", a); 
 for(int q=0;q<z.size();q++)
 {
  int sum=0;
  for(int j=q;j<z.size();j++)
  {
   if(z[q]==z[j])
   sum++;
   else
   break;
  }
  q=q+sum-1;
  cout<<z[q]<<sum;
 }
}
