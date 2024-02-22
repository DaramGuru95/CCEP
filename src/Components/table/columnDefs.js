

export const commonColumns= [
    {
        field:'name',
        label:'NAME'
    }

]


export const supervisorColumns = [
    ...commonColumns,
    {
        field:'status',
        label:'Status'
    },
    {
        field:'total_talk_time',
        label:'TOTAL TALK TIME'
    },
    {
        field:'avg_hold_time',
        label:'AVG HOLD TIME'
    },
    {
        field:'feedback_score',
        label:'FEEDBACK SCORE'
    },
    {
        field:'no_of_conversations',
        label:'NO. OF CONVERSATIONS'
    }
]


export const agentColumns = [
    ...commonColumns,
    {
        field:'conversations',
        label:'CONVERSATIONS',
    },
    {
        field:'talk_time',
        label: 'TALK TIME',

    },
    {
        field:'hold_time',
        label:'HOLD TIME'
    },
    {
        field:'channel',
        label:'CHANNEL'
    },
    {
        field:'transcript_summary',
        label:'TRANSCRIPT/SUMMARY',
    }
];




