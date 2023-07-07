from flask import Flask
from plyer import notification
import threading

app = Flask('UAssist_Appink')


def task(link: dict):
    print('收到核准请求，正在核准。')
    if link.get('link') == '/applink/':
        re = input('''有应用唤起了 UAssist 应用，请核准：
请回复(Y/N)：''')
        if re == 'Y':
            print('您已核准此请求，请稍等。')
        else:
            print('此请求已被拒绝。')


@app.route('/applink/<link>/')
def applink(link):
    notification.notify(title='UAssist 的新打开请求',
                        message='有应用程序正在申请打开 UAssist 应用，请打开 UAssist 以核准。')
    Thread = threading.Thread(target=task, args=({'link': '/applink/', 'app': link},))
    Thread.start()
    return '正在打开 UAssist 客户端，请打开 UAssist 以核准。'


def run():
    Flask = threading.Thread(target=app.run, args=())
    Flask.start()
    Flask.join()
