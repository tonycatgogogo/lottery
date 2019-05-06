class Timer {
    countDown(end,update,handler) {
        const now = new Date().getTime()
        const self = this
        if(now-end){
            handler.call(self)
        }else{
            let last_time = end - now
            const time_d = 1000*60*60*24
            const time_h = 1000*60*60
            const time_m = 1000*60
            const time_s = 1000
            let time = []
            let d = Math.floor(last_time/time_d)
            let h = Math.floor((last_time-d*time_d)/time_h)
            let m = Math.floor((last_time-d*time_d-h*time_h)/time_m)
            let s = Math.floor((last_time-d*time_d-h*time_h-m*time_m)/time_s)
            if(s>0){
                time.unshift(`<em>${s}</em>秒`)
            }
            if(time.length||m>0){
                time.unshift(`<em>${m}</em>分`)
            }
            if(time.length||h>0){
                time.unshift(`<em>${h}</em>时`)
            }
            if(time.length||d>0){
                time.unshift(`<em>${d}</em>天`)
            }
            self.last_time = time.join('')
            update.call(self,time.join(''))
            //轮询 每一秒查询一次
            setTimeout(function () {
                self.countDown(end,update,handler)
            },1000)
        }

    }
}
export default Timer