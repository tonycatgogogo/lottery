import 'babel-polyfill'
import Base from './lottery/base'
import Calculate from './lottery/calculate'
import Interface from './lottery/interface'
import Timer from './lottery/timer'
import $ from 'jquery'

//深拷贝

const copyProperties=function (target,source) {
    for(let key of Reflect.ownKeys(source)){
        if(key!=='constructor'&&key!=='prototype'&&key!=='name'){
            let dest = Object.getOwnPropertyDescriptor(source,key)
            Object.defineProperty(target,key,dest)
        }
    }
}
//实现类的多重继承
const mix=function (...mixins) {
    class Mix{}
    for(let mixin of mixins){
        copyProperties(Mix,mixin)
        copyProperties(Mix.prototype,mixin.prototype)
    }
    return Mix
}

class Lottery extends mix(Base,Interface,Calculate,Timer){
    constructor(name='syy',cname='11选5',issue='**',state='**'){
        super()
        this.name=name;
        this.cname=cname;
        this.issue=issue;
        this.state=state;
        this.el='';
        this.omit=new Map();
        this.open_code=new Set();  //开奖号码
        this.open_code_list=new Set(); //开奖记录
        this.play_list=new Map();
        this.number=new Set();  //奖号
        this.issue_el='#curr_issue';
        this.countdown_el='#countdown'; //倒计时的选择器
        this.state_el='.state_el'; //状态的选择器
        this.cart_el='.codelist'; //购物车的选择器
        this.omit_el=''; //遗漏
        this.cur_play='r5'; //当前的默认玩法
        this.initPlayList();
        this.initNumber();
        this.updateState(); //更新状态
        this.initEvent();
    }
    //状态更新
    updateState(){
        let self = this
        this.getState().then(function (result) {
            self.issue = result.issue
            console.log(self.issue)
            self.end_time = result.end_time
            self.state = result.state
            $(self.issue_el).text(result.issue)
            self.countDown(result.end_time,function (time) {
                $(self.countdown_el).html(time)
            },function () {
                setTimeout(function () {
                    self.updateState()
                    self.getOmit(self.issue)
                    self.getOpenCode(self.issue)
                },500)
            })
        })
    }
    initEvent(){
        let self = this
        $('#plays').on('click','li',self.changePlayNav.bind(self))
        $('.boll-list').on('click','.btn-boll',self.toggleCodeActive.bind(self))
        $('#confirm_sel_code').on('click',self.addCode.bind(self))
        $('.dxjo').on('click','li',self.assistHandle.bind(self))
        $('.qkmethod').on('click','.btn-middle',self.getRandomCode.bind(self))
    }
}

export default Lottery