class Calculate {
    /**
     * computeCount 计算投注注数
     * @param active [type:number 选中的号码数]
     * @param play_name [type:string 选中的玩法 'R2/R3...']
     */
    computeCount(active, play_name) {
        //count为计算后的注数
        let count = 0
        //play_list为所有玩法的一个数组 数据类型map，存在.has方法判断是否存在该玩法
        const exist = this.play_list.has(play_name)
        //选中了几个数字就生成一个对应长度的数组，并填充‘0’
        const arr = new Array(active).fill('0')
        if (exist && play_name.at(0) === 'R') {
            count = Calculate.combine(arr, play_name.split('')[1])
        }
        // console.log(count)
        return count
    }

    computeBonus(active, play_name) {
        const play = play_name.split('')
        const self = this
        let arr = new Array(play[1]).fill('0')
        let min, max
        if (play[0] === "R") {
            let min_active = 5 - (11 - active)
            if (min_active > 0) {
                if (min_active - play[1] >= 0) {
                    arr = new Array(min_active).fill(0)
                    min = Calculate.combine(arr, play[1] - 5)
                } else {
                    if (play[1] - 5 > 0 && active - play[1] >= 0) {
                        arr = new Array(active - 5).fill(0)
                        min = Calculate.combine(arr, play[1] - 5)
                    }
                }
            } else {
                min = active - play[1] > -1 ? 1 : 0
            }
            let max_active = Math.min(active, 5)
            if (play[1] - 5 > 0) {
                if (active - play[1] >= 0) {
                    arr = new Array(active - 5).fill(0)
                    max = Calculate.combine(arr, play[1] - 5)
                } else {
                    max = 0
                }
            } else if (play[1] - 5 < 0) {
                arr = new Array(Math.min(active, 5)).fill(0)
                max = Calculate.combine(arr, play[1])
            } else {
                max = 1
            }
        }
        return [min,max].map(item=>item*self.play_list.get(play_name).bonus)
    }

    //递归运算 计算注数组合
    /**
     * combin 算组合
     * @param arr 选中的数字 array
     * @param size 玩法 number
     * @returns {number}
     */
    static combine(arr, size) {
        let allResult = [];
        (function f(arr, size, result) {
            let arrLength = arr.length
            if (size > arrLength) {
                return
            } else if (size === arrLength) {
                allResult.push([].concat(result, arr))
            } else {
                for (let i = 0; i < arrLength; i++) {
                    let newResult = [].concat(result)
                    newResult.push(arr[i])
                    if (size === 1) {
                        allResult.push(newResult)
                    } else {
                        let newArr = [].concat(arr)
                        newArr.splice(0, i + 1)
                        f(newArr, size - 1, newResult)
                    }
                }
            }

        })(arr, size, [])
        return allResult.length
    }
}

// let c1 = new Calculate()
// c1.computeCount(8,'R3')

export default Calculate