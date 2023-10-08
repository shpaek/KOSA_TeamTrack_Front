const backURL = 'http://localhost:8888/KOSA_Project2'
const frontURL = 'http://localhost:5500/HTML'

$(()=>{
    const urlParams = new URL(location.href).searchParams

    $.ajax({
        url: backURL+'/mainnotice',
        method : 'get',
        data : `teamNo=9999`,
        success: (responseJSONObj)=>{
            if(responseJSONObj == null){
                $('div.mainnotice').hide()
            }else{
                const noticeNo = responseJSONObj.noticeNo
                const noticeTitle = responseJSONObj.noticeTitle
                const regDate = responseJSONObj.regDate
                const noticeContent = responseJSONObj.noticeContent

                $('div.mainnotice>span[name=noticeNo]').text(noticeNo)
                $('div.mainnotice>a').html(noticeTitle)
                $('div.mainnotice>span[name=date]').text(regDate)
                $('div.mainnotice>p').html(noticeContent)

            }
        },
        error:(jqXHR, textStatus)=>{
            alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
            console.log(jqXHR)
        }
    })

    $('div.mainnotice>button[name=cancel]').on('click',(e)=>{ 
        const noticeNo = $('div.mainnotice>span[name=noticeNo]').text()

        $.ajax({
            url: backURL+'/setmainnotice',
            method : 'get',
            data : `teamNo=9999&noticeNo=${noticeNo}&mainStatus=0`,
            success: (responseJSONObj)=>{
                if(responseJSONObj.status==1){
                    location.href = `${frontURL}/notice.html?teamNo=9999`
                }else{
                    alert(responseJSONObj.msg)
                }
            },
            error:(jqXHR, textStatus)=>{
                alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                console.log(jqXHR)
            }
        })
    }) 

    function ajaxHandler(cp){
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: backURL+'/noticelist',
            method : 'get',
            data : `currentPage=${cp}&teamNo=9999`,
            success: (responseJSONObj)=>{
                const noticeList = responseJSONObj.list

                const $originTrObj = $('div.notice>div.noticelist>table>thead>tr')
                const $tbodyObj = $('div.notice>div.noticelist>table>tbody')

                $tbodyObj.empty()

                $(noticeList).each((index, p)=>{
                    const $copyTrObj = $originTrObj.clone()
                    $copyTrObj.empty()
                    
                    const $noticeNoObj = `<td>${p.noticeNo}</td>`
                    $copyTrObj.append($noticeNoObj)

                    const $noticeTitleObj = `<td class="notice_title"><a href="#" 
                                                onclick="location.href='${frontURL}/noticedetail.html?teamNo=9999&noticeNo=${p.noticeNo}'">
                                                ${p.noticeTitle}</a></td>`
                    $copyTrObj.append($noticeTitleObj)

                    const $regDateObj = `<td>${p.regDate}</td>`
                    $copyTrObj.append($regDateObj)
                    
                    $tbodyObj.append($copyTrObj)
                })


                const $divPageGroup = $('div.notice>div.pagegroup')
                $divPageGroup.empty() 

                const startPage = responseJSONObj.startPage //시작페이지
                const endPage = responseJSONObj.endPage //끝페이지

                if(startPage>1){
                    let page = `[<span class="pg${startPage-1}">PREV</span>]&nbsp;&nbsp;&nbsp;`
                    $divPageGroup.html($divPageGroup.html()+page)
                }
                for(let i = startPage; i<=endPage; i++){
                    let page=`[<span class="pg${i}">${i}</span>]&nbsp;&nbsp;&nbsp;`
                    $divPageGroup.html($divPageGroup.html()+page)
                }
                if(endPage!=responseJSONObj.totalPage){
                    let page=`[<span class="pg${endPage+1}">NEXT</span>]`
                    $divPageGroup.html($divPageGroup.html()+page)
                }
            },
            error:(jqXHR, textStatus)=>{
                alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                console.log(jqXHR)
            }
        })
    }
    ajaxHandler(1)

    $('div.notice>div.pagegroup').on('click','span',(e)=>{ 
        const pg = $(e.target).attr('class')
        const currentPage = pg.substr(2)
        ajaxHandler(currentPage)
    }) 

    $('div.notice>div.write>button').on('click',(e)=>{
        location.href = `${frontURL}/writenotice.html?teamNo=9999`
    })
})