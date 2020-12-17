#include<stdio.h>
#include<stdlib.h>
#include<string.h>
FILE *infile,*outfile;    /*定义全局变量*/
void Compress(char *infilename,char *outfilename);/*压缩函数*/
void Common(char *filename);/*打开失败的提示*/
void main(int argc,char *argv[])
{
 printf("rleys compress file\n");/*输入提示*/
 if(argc!=3)      /*判断输入的参数格式是否正确*/
 {
  printf("\n usage:rleys sourcefilename targetfilename\n");
  exit(0);/*退出程序*/
 } 
 printf("\n compression ...");
 Compress(argv[1],argv[2]);/*调用函数Compress()压缩数据*/
 fclose(infile);   /*关闭文件*/
 fclose(outfile);
}
void Common(char *filename)
{
 char tempspace[200];
 strcpy(tempspace,"\nUnable to open ");/*将字符串复制到数组tempspace内*/
 strcat(tempspace,filename);/*将字符串filename链接到字符串tempspace后面*/
 puts(tempspace);
 exit(1);   /*退出程序*/
}
void Compress(char *infilename,char *outfilename)/*压缩文件*/
{
 
 register int seq_len;
 char cur_char,cur_seq;
 if((infile=fopen(infilename,"rb"))==NULL)/*判断文件是否打开成功*/
  Common(infilename);
 if((outfile=fopen(outfilename,"wb"))==NULL)/*判断文件是否创建成功*/
  Common(outfilename);
 cur_char=fgetc(infile);   // 取得文件第一个字符
 cur_seq=cur_char;         // 将第一个字符赋值给seq
 seq_len=1;                // 字符连续出现次数，长度初始化为1
 while(!feof(infile))   /*进行压缩*/
 {
  cur_char=fgetc(infile);   // 取得文件的下一个字符
  if(cur_char==cur_seq)     // 文件上一个字符是否与当前字符相等
  {
   seq_len++;            // 相等则连续长度加一
  }
  else
  {
   fputc(seq_len,outfile);
   fputc(cur_seq,outfile); // 不相等，则输出连续的长度和对应字符
   cur_seq=cur_char;       // 将不相等的第一个字符赋值给seq，开始下次长度计算
   seq_len=1;              // 长度归于一
  }
 }
 
}
