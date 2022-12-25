import os
import sys

for i in range(int(sys.argv[1])):
    os.system("service tor reload")
    os.system("service tor restart")
    os.system("sudo -u username python3 testBNB.py")
    print("current attempt: ", i)
    
