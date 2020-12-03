#include "stdio.h"
#include "string.h"
#include <stdlib.h>
int main(void){
int x;
int z=0;
char n[105];
char a[2];
scanf("%s",&n);
for(x=0; x<strlen(n); x++){
z += atoi(strncpy(a,n+x,1));
}
printf("The result is %d.\n",z);
return 0;
}
