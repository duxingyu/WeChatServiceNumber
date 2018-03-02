export let boutiqueTypeList = [{
        name: "热 销",
        selected: true,
        type: 'hot',
        isHot: true
    },
    {
        name: "早教机",
        selected: false,
        type: 'machine',
        isHot: false
    },
    {
        name: "字卡",
        selected: false,
        type: 'zika',
        isHot: false
    },
    {
        name: "绘 本",
        selected: false,
        type: 'book',
        isHot: false
    },
    {
        name: "全 部",
        selected: false,
        type: '',
        isHot: false
    },
]

export let courseTypeList = [{
        name: "认字",
        selected: true,
        type: ['rz'],
        isHot: false
    },
    {
        name: "拼音",
        selected: false,
        type: ['py'],
        isHot: false
    },
    {
        name: "数学",
        selected: false,
        type: ['ma'],
        isHot: false
    },
    {
        name: "英语",
        selected: false,
        type: ['en'],
        isHot: false
    },
    {
        name: "思维",
        selected: false,
        type: ['lo'],
        isHot: false
    },
    {
        name: "百科",
        selected: false,
        type: ['hi', 'ch', 'li', 'se', 'ge'],
        isHot: false
    },
    {
        name: "套餐",
        selected: false,
        type: "taocan",
        isHot: true
    },
]

export let couponType = [{
        name: "未使用",
        selected: true,
        type: 0,
        isHot: false
    },
    {
        name: "已使用",
        selected: false,
        type: 1,
        isHot: false
    },
    {
        name: "已过期",
        selected: false,
        type: -1,
        isHot: false
    },
]

//课程列表 
export function AddDate(list, classTypeList) {
    // let course = classTypeList[0]
    // let obj_buff = list[list.length - 1]
    // if (obj_buff.class_type == "ALL") {
    //     list.pop()
    // }

    // if (course == "rz" || course == "py") {
    //     list.push({
    //         good_id: "rzpyzk2",
    //         title: "认字·拼音·字卡套餐",
    //         price: 37900,
    //         original_price: 98900,
    //         buy_num: 0,
    //         is_buy: 0,
    //         class_type: "RZ",
    //         discount: "推荐",
    //         need_address: 1,
    //     })
    // } else if (course == "ma" || course == "lo") {
    //     list.push({
    //         good_id: "malo36",
    //         title: "数学·逻辑套餐",
    //         price: 33900,
    //         original_price: 72000,
    //         buy_num: 0,
    //         is_buy: 0,
    //         class_type: "MA",
    //         discount: "推荐",
    //         need_address: 0,
    //     })
    // }

    // list.push({
    //     good_id: "fjha36",
    //     title: "钜惠套餐1",
    //     price: 159800,
    //     original_price: 451800,
    //     buy_num: 0,
    //     is_buy: 0,
    //     class_type: "MA",
    //     discount: "推荐",
    //     need_address: 1,
    // })

    // list.push(obj_buff)
    return list
}

export function GetCourseBanner(classTypeList) {
    let typeStr = classTypeList.toString()
    if (/rz/.test(typeStr)) {
        return {
            good_id: 'vrz36',
            price: '18000',
            title: '全套认字'
        }
    } else if (/py/.test(typeStr)) {
        return {
            good_id: 'py18',
            price: '19900',
            title: '全套拼音'
        }
    } else if (/ma/.test(typeStr)) {
        return {
            good_id: 'vma36',
            price: '18000',
            title: '全套数学'
        }
    } else if (/en/.test(typeStr)) {
        return {
            good_id: 'ven36',
            price: '19900',
            title: '全套英语'
        }
    } else if (/lo/.test(typeStr)) {
        return {
            good_id: 'vlo36',
            price: '18000',
            title: '全套思维'
        }
    } else {
        return {
            good_id: 'qtbk',
            price: '29900',
            title: '全套百科'
        }
    }
}