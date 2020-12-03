#include<bits/stdc++.h>
using namespace std;
int main(){
	char c;
	string str;
	stack<string>st;
	while(cin>>str)
	{
		st.push(str);
		if((c=getchar())=='\n')break;
	}
	cout<<st.top();
	st.pop();
	while(!st.empty())
	{
		cout<<" "<<st.top();
		st.pop();
	}
	getchar();
	return 0;
}
