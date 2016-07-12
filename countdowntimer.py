from __future__ import print_function
import datetime
import time

def countdown(t):
    while t:
        mins, secs = divmod(t, 60)
        timeformat = '{:02d}:{:02d}'.format(mins, secs)
        print(timeformat, end='\r')
        time.sleep(1)
        t -= 1
while True:
	now = datetime.datetime.now()
	currentTime = str(now).split(" ")
	if currentTime[1] < '15:42:00':
		#nothing
		print('The time is ' + currentTime[1])
		print('It is not lunch yet.')
	elif '15:42:00' in currentTime[1]:
		countdown(60)
	else:
		print('The time is ' + currentTime[1])
		print('Lunch is over!')
		exit()
	time.sleep(1)