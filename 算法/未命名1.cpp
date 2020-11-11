#include <stdio.h>
int main ()
{
   int a;
   scanf("%d",&a);
   if(a<=100&&a>=90){
   	printf("%s","A");};
	if(a<=89&&a>=80){
	printf("%s","B");};
   	if(a<=79&&a>=70){
   	printf("%s","C");};
   	if(a<=69&&a>=60){
   	printf("%s","D");};
   	if(a<=59&&a>=0){
   	printf("%s","E");};
   	if(a>100){
   	printf("%s","Score is error");};
}
