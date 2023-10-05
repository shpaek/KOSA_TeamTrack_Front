const backURL = 'http://localhost:8888/KOSA_Project2'
const frontURL = 'http://localhost:5500/HTML'

$(()=>{
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')
    const noticeNo = urlParams.get('noticeNo')

    $.ajax({
        url: backURL+'/noticedetail',
        method : 'get',
        data : `teamNo=${teamNo}&noticeNo=${noticeNo}`,
        success: (responseJSONObj)=>{
            const noticeTitle = responseJSONObj.noticeTitle
            const noticeContent = responseJSONObj.noticeContent
            const regDate = responseJSONObj.regDate

            console.log(noticeTitle)
            console.log(noticeContent)
            console.log(regDate)

            $('div.titleline>h4').html(noticeTitle)
            $('div.titleline>span').text(regDate)
            $('div.content>p').html(noticeContent)
        },
        error:(jqXHR, textStatus)=>{
            alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
            console.log(jqXHR)
        }
    })
})