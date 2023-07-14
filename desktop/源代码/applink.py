from flask import Flask
from plyer import notification
import threading

app = Flask('UAssist_Appink')


def get_applink(link):
    if link == 'uassist':
        print('由AppLink唤起的UAssist')
        notification.notify(title='UAssist 的唤起',
                            message='由 Applink 唤起的 UAssist 应用程序。')


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
    return '<img src="https://img1.imgtp.com/2023/07/14/YtqGMrAW.png" width="100%"></img>'


@app.route('/webapp/<appname>/<sys>/')
def webapp(appname, sys):
    if appname == 'upython':
        if sys == 'is_open':
            notification.notify(title='UAssist 正在协助 UPython 应用',
                                message='来自网页应用 UPython 的唤醒，系统将开始协助 UPython 进行操作。')
    return '<img src="https://img1.imgtp.com/2023/07/14/IFhJbYQ6.png" width="100%"></img>'
def run():
    Flask = threading.Thread(target=app.run, args=())
    Flask.start()
    Flask.join()
