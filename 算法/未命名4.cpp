#include<stdio.h>
#include<stdlib.h>
#include<string.h>
FILE *infile,*outfile;    /*����ȫ�ֱ���*/
void Compress(char *infilename,char *outfilename);/*ѹ������*/
void Common(char *filename);/*��ʧ�ܵ���ʾ*/
void main(int argc,char *argv[])
{
 printf("rleys compress file\n");/*������ʾ*/
 if(argc!=3)      /*�ж�����Ĳ�����ʽ�Ƿ���ȷ*/
 {
  printf("\n usage:rleys sourcefilename targetfilename\n");
  exit(0);/*�˳�����*/
 } 
 printf("\n compression ...");
 Compress(argv[1],argv[2]);/*���ú���Compress()ѹ������*/
 fclose(infile);   /*�ر��ļ�*/
 fclose(outfile);
}
void Common(char *filename)
{
 char tempspace[200];
 strcpy(tempspace,"\nUnable to open ");/*���ַ������Ƶ�����tempspace��*/
 strcat(tempspace,filename);/*���ַ���filename���ӵ��ַ���tempspace����*/
 puts(tempspace);
 exit(1);   /*�˳�����*/
}
void Compress(char *infilename,char *outfilename)/*ѹ���ļ�*/
{
 
 register int seq_len;
 char cur_char,cur_seq;
 if((infile=fopen(infilename,"rb"))==NULL)/*�ж��ļ��Ƿ�򿪳ɹ�*/
  Common(infilename);
 if((outfile=fopen(outfilename,"wb"))==NULL)/*�ж��ļ��Ƿ񴴽��ɹ�*/
  Common(outfilename);
 cur_char=fgetc(infile);   // ȡ���ļ���һ���ַ�
 cur_seq=cur_char;         // ����һ���ַ���ֵ��seq
 seq_len=1;                // �ַ��������ִ��������ȳ�ʼ��Ϊ1
 while(!feof(infile))   /*����ѹ��*/
 {
  cur_char=fgetc(infile);   // ȡ���ļ�����һ���ַ�
  if(cur_char==cur_seq)     // �ļ���һ���ַ��Ƿ��뵱ǰ�ַ����
  {
   seq_len++;            // ������������ȼ�һ
  }
  else
  {
   fputc(seq_len,outfile);
   fputc(cur_seq,outfile); // ����ȣ�����������ĳ��ȺͶ�Ӧ�ַ�
   cur_seq=cur_char;       // ������ȵĵ�һ���ַ���ֵ��seq����ʼ�´γ��ȼ���
   seq_len=1;              // ���ȹ���һ
  }
 }
 
}
