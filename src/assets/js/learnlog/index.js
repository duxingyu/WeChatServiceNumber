import { CopyObject } from "@common"

export let TabsTypeList = [{
        name: "认字",
        select: false,
        type: "RZ",
        classTypeList: ["rz"],
        isOpen: false,
        classId: 102000000
    },
    {
        name: "拼音",
        select: false,
        type: "PY",
        classTypeList: ["py"],
        isOpen: false,
        classId: 111000000
    },
    {
        name: "英语",
        select: false,
        type: "EN",
        classTypeList: ["en"],
        isOpen: false,
        classId: 101000000
    },
    {
        name: "数学",
        select: false,
        type: "MA",
        classTypeList: ["ma"],
        isOpen: false,
        classId: 104000000
    },
    {
        name: "思维",
        select: false,
        type: "LO",
        classTypeList: ["lo"],
        isOpen: false,
        classId: 103000000
    },
]

export let AppUsingNum = {
    "RZ": {
        name: "认字",
    },
    "PY": {
        name: "拼音",
    },
    "EN": {
        name: "英语",
    },
    "MA": {
        name: "数学",
    },
    "LO": {
        name: "思维",
    },
    "BAIKE": {
        name: "百科",
    },
}

export let LearningSummary = {
    "rzVO": {
        knowledge: {
            wordCount: {
                value: 0,
                name: "掌握汉字"
            },
            senCount: {
                value: 0,
                name: "掌握词语"
            }
        },
        stuScorePercent: 0,
        Learned: {
            value: 0,
            name: "已学知识点"
        },
        killOther: 0,
        stuDays: 0,
    },
    "pyVO": {
        knowledge: {
            ym: {
                value: 0,
                name: "掌握韵母"
            },
            sm: {
                value: 0,
                name: "掌握声母"
            },
            zt: {
                value: 0,
                name: "整体拼读"
            },
        },
        stuScorePercent: 0,
        Learned: {
            value: 0,
            name: "已学拼音"
        },
        killOther: 0,
        stuDays: 0,
    },
    "enVO": {
        knowledge: {
            wordCount: {
                value: 0,
                name: "掌握单词"
            },
            senCount: {
                value: 0,
                name: "掌握句式"
            },
        },
        stuScorePercent: 0,
        Learned: {
            value: 0,
            name: "已学单词"
        },
        killOther: 0,
        stuDays: 0,
    },
    "maClassVO": {
        knowledge: {
            stuCount: {
                value: 0,
                name: "掌握知识点"
            },
        },
        stuScorePercent: 0,
        Learned: {
            value: 0,
            name: "已学知识点"
        },
        killOther: 0,
        stuDays: 0,
    },
    "loClassVO": {
        knowledge: {
            stuCount: {
                value: 0,
                name: "掌握知识点"
            },
        },
        stuScorePercent: 0,
        Learned: {
            value: 0,
            name: "已学知识点"
        },
        killOther: 0,
        stuDays: 0,
    }
}



export function ParseStuKnowledge(arr, type) {
    let StuKnowledge = {
        "RZ": [
            //
            {
                name: "汉字",
                type: 1,
                wordCardsType: 0,
                content: []
            },
            {
                name: "词语",
                type: 0,
                wordCardsType: 1,
                content: []
            }
        ],
        "PY": [
            //
            {
                name: "拼音",
                type: 1,
                wordCardsType: 1,
                content: []
            },
            {
                name: "整体拼读",
                type: 0,
                wordCardsType: 1,
                content: []
            }
        ],
        "EN": [
            //
            {
                name: "单词",
                type: 1,
                wordCardsType: 2,
                content: []
            },
            {
                name: "句式",
                type: 0,
                wordCardsType: 2,
                content: []
            },
        ],
        "MA": [
            //
            {
                name: "知识点",
                type: null,
                wordCardsType: 2,
                content: []
            },
        ],
        "LO": [
            //
            {
                name: "知识点",
                type: null,
                wordCardsType: 2,
                content: []
            },
        ],
    }
    let knowledge = StuKnowledge[type]
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < knowledge.length; j++) {
            if (knowledge[j].type == arr[i].type) {
                knowledge[j].content.push(arr[i])
            }
        }
    }
    return knowledge
}

export function GetLearnlogType(ClassId) {
    for (var i = 0; i < TabsTypeList.length; i++) {
        if (TabsTypeList[i].classId == ClassId) {
            return TabsTypeList[i].type
        }
    }
    return "PY"
}

export let DailyPushTabsOptions = {
    allUserClassCount: [
        { studyClassVO: { className: "EN", isStudy: 1 } },
        { studyClassVO: { className: "RZ", isStudy: 1 } },
        { studyClassVO: { className: "LO", isStudy: 1 } },
        { studyClassVO: { className: "MA", isStudy: 1 } },
        { studyClassVO: { className: "PY", isStudy: 1 } },
    ],
}