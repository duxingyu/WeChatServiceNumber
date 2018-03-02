export let CourseIntrList = [
    //
    {
        name: "麦田认字",
        icon: require("@image/courseintr/courselist_ic_rz.png"),
        classTypeList: ["rz"],
        classId: 102000000,
        classType: "rz",
        isBaike: false,
        des: "【麦田认字】系统化和螺旋式上升的大纲体系<br/>每天10分钟,轻松学1500个汉字!"
    },
    {
        name: "麦田拼音",
        icon: require("@image/courseintr/courselist_ic_py.png"),
        classTypeList: ["py"],
        classId: 111000000,
        classType: "py",
        isBaike: false,
        des: "【麦田拼音】专门为3-7岁小朋友设计拼音启蒙课程<br/>每天10分钟,30天学会拼音!"
    },
    {
        name: "麦田英语",
        icon: require("@image/courseintr/courselist_ic_en.png"),
        classTypeList: ["en"],
        classId: 101000000,
        classType: "en",
        isBaike: false,
        des: "【麦田英语】以教会孩子实用英语口语为设计目标<br/>每天10分钟,轻松说英语!"
    },
    {
        name: "麦田数学",
        icon: require("@image/courseintr/courselist_ic_ma.png"),
        classTypeList: ["ma"],
        classId: 105000000,
        classType: "ma",
        isBaike: false,
        des: "【麦田数学】培养孩子学习数学的兴趣,开阔孩子思维<br/>专注3-8岁儿童数学思维训练!"
    },
    {
        name: "麦田思维",
        icon: require("@image/courseintr/courselist_ic_lo.png"),
        classTypeList: ["lo"],
        classId: 103000000,
        classType: "lo",
        isBaike: false,
        des: "【麦田思维】训练孩子综合思维能力<br/>专注3-8岁儿童思维逻辑训练!"
    },
    {
        name: "生活礼仪",
        icon: require("@image/courseintr/courselist_ic_li.png"),
        classTypeList: ["hi", "li", "ge", "se", "ch"],
        classId: 105000000,
        classType: "li",
        isBaike: true,
        des: ""
    },
    {
        name: "麦田国学",
        icon: require("@image/courseintr/courselist_ic_ch.png"),
        classTypeList: ["hi", "li", "ge", "se", "ch"],
        classId: 106000000,
        classType: "ch",
        isBaike: true,
        des: ""
    },
    {
        name: "科学探索",
        icon: require("@image/courseintr/courselist_ic_se.png"),
        classTypeList: ["hi", "li", "ge", "se", "ch"],
        classId: 107000000,
        classType: "se",
        isBaike: true,
        des: ""
    },
    {
        name: "环球地理",
        icon: require("@image/courseintr/courselist_ic_ge.png"),
        classTypeList: ["hi", "li", "ge", "se", "ch"],
        classId: 108000000,
        classType: "ge",
        isBaike: true,
        des: ""
    },
    {
        name: "历史时光机",
        icon: require("@image/courseintr/courselist_ic_hi.png"),
        classTypeList: ["hi", "li", "ge", "se", "ch"],
        classId: 109000000,
        classType: "hi",
        isBaike: true,
        des: ""
    },
]

//解析知识点
export function ParsePoints(point, classType) {
    var TypeTemplates = {
        "rz": [
            //
            {
                name: "学习汉字",
                type: 102000001,
                content: []
            },
            {
                name: "学习词语",
                type: 102000002,
                content: []
            }
        ],
        "en": [
            //
            {
                name: "单词",
                type: 101000001,
                content: []
            },
            {
                name: "句式",
                type: 101000002,
                content: []
            },
            {
                name: "对话",
                type: 101000003,
                content: []
            }
        ],
    }
    var TypeTemplate = TypeTemplates[classType]
    for (var i = 0; i < point.length; i++) {
        for (var j = 0; j < TypeTemplate.length; j++) {
            if (TypeTemplate[j].type == point[i].pointType) {
                TypeTemplate[j].content.push(point[i])
            }
        }
    }
    return TypeTemplate
}