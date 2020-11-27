#include<bits/stdc++.h>
using namespace std;
struct Moon
{
	int num;
	double total_price;
	double price;
};
bool cmp(Moon a,Moon b)
{
	return a.price>b.price;
}
int main()
{
	int n;
	int all;
	Moon moon_cake[1010];
	cin>>n>>all;
	for(int i=0;i<n;i++)
		cin>>moon_cake[i].num;
	for(int i=0;i<n;i++)
	{
		cin>>moon_cake[i].total_price;
//		
		moon_cake[i].price=moon_cake[i].total_price*1.0/moon_cake[i].num;
	}
	
	sort(moon_cake,moon_cake+n,cmp);
	double profit =0;
	int j=0;
	while (all!=0&&j<n){
		if(all - moon_cake[j].num>0) {
			all =all-moon_cake[j].num;
			profit =profit+moon_cake[j].total_price;
		}
		else{
			profit += all * moon_cake[j].price;
			all = 0;
		}
		j++;
	}
	printf("%.2f\n",profit);
	return 0;
}
