import $ from 'jquery'

class InterFace {
    /**
     * getOmit 获取往期遗漏的彩票号码
     * @param issue [当前期号 string]
     * @returns {Promise<any>}
     */
    getOmit(issue) {
        let self = this
        return new Promise(function (resolve) {
            // $.ajax({
            //     url: '/get/omit',
            //     data: issue,
            //     dataType: 'json',
            //     success: function (res) {
            //         self.setOmit(res.data)
            //         resolve.call(self,res)
            //     },
            //     error:function (err) {
            //         reject.call(err)
            //     }
            // })
            let res = {
                'data': ['01','05','07','08','11'],
                'issue':/[1-9]{8}/
            }
            self.setOmit(res.data)
            resolve.call(self,res)
        })
    }

    /**
     * getOpenCode 获取开奖号码
     * @param issue
     * @returns {Promise<any>}
     */
    getOpenCode(issue) {
        let self = this
        return new Promise(function (resolve) {
            // $.ajax({
            //     url: '/get/state',
            //     data: issue,
            //     dataType: 'json',
            //     success: function (res) {
            //         self.setOpenCode(res.data)
            //         resolve.call(self,res)
            //     },
            //     error:function (err) {
            //         reject.call(err)
            //     }
            // })
            let res = {
                'data': [/[1-3]/,/[4-5]/,/[6-7]/,/[8-9]/,/1[0-1]/]
            }
            self.setOpenCode(res.data)
            resolve.call(self,res)
        })
    }
    /**
     * getState 获取当前状态
     * @param issue [当前期号 string]
     * @returns {Promise<any>}
     */
    getState(issue) {
        let self = this
        return new Promise(function (resolve) {
            // $.ajax({
            //     url: '/get/state',
            //     data: issue,
            //     dataType: 'json',
            //     success: function (res) {
            //         resolve.call(self,res)
            //     },
            //     error:function (err) {
            //         reject.call(err)
            //     }
            // })
            let makeIssue=function(){
                let date = new Date();
                let first_issue_date=new Date();//第1期时间
                first_issue_date.setHours(9);
                first_issue_date.setMinutes(10);
                first_issue_date.setSeconds(0);
                let end_issue_date=new Date(first_issue_date.getTime()+77*10*60*1000);//截止时间，第78期


                let cur_issue,end_time,state; //当前期号，每一期的截止时间，状态

                // 正常销售
                if(date.getTime()-first_issue_date.getTime()>0&&date.getTime()-end_issue_date.getTime()<0){
                    let cur_issue_date=new Date();  //当前期号时间
                    cur_issue_date.setHours(9);
                    cur_issue_date.setMinutes(0);
                    cur_issue_date.setSeconds(0);
                    let minus_time=date.getTime()-cur_issue_date.getTime();  //剩余时间
                    let h=Math.ceil(minus_time/1000/60/10);
                    let end_date=new Date(cur_issue_date.getTime()+1000*60*10*h);
                    end_time=end_date.getTime(); //截止时间
                    //当前期号
                    cur_issue=[end_date.getFullYear(),('0'+(end_date.getMonth()+1)).slice(-2),('0'+end_date.getDate()).slice(-2),('0'+h).slice(-2)].join('');
                }else{
                    // 今天销售已截止
                    first_issue_date.setDate(first_issue_date.getDate()+1);
                    end_time=first_issue_date.getTime();
                    cur_issue=[first_issue_date.getFullYear(),('0'+(first_issue_date.getMonth()+1)).slice(-2),('0'+first_issue_date.getDate()).slice(-2),'01'].join('');
                }

                let cur_date=new Date();
                if(end_time-cur_date.getTime()>1000*60*2){  //每一期前8分钟销售
                    state='正在销售'
                }else{
                    state='开奖中'
                }
                return {
                    issue:cur_issue,
                    state:state,
                    end_time:end_time
                }
            }
            let end_time=makeIssue().end_time
            let issue=makeIssue().issue;
            let state=makeIssue().state;
            let data= [/[1-3]/,/[4-5]/,/[6-7]/,/[8-9]/,/1[0-1]/]
            let res = {
                issue:issue,
                data:data,
                state:state,
                end_time:end_time
            }
            resolve.call(self,res)
        })
    }

}

export default InterFace