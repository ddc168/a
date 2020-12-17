#include<stdio.h>
#include<iostream>
#include<string.h>
char a[100];
int i;
int q;
int z;
int k;
int main()
{
	scanf("%s", a);
z=a[0];
q=1;
k=0;
i=strlen(a);
	for(;i!=0;i--);
	{
	if(a[q]==z){
	z=a[q];
	k+=1;
	printf("%d", k);
		
	}
		
		
		
		
	}
	
	
	
	
	return 0;
}
