docker build -t p1 ./p1/

docker run --name p1 -it --privileged=true -p 21:21 -p 22:22 -p 80:80 -p 3000:3000 -p 3001:3001 -p 4000:4000 -p 5000:5000 -p 5432:5432 -p 8000:8000 -p 8888:8888 -p 8889:8889 -p 27017:27017 -v c:\dockerShare:/dockerShare  p1 /bin/bash

