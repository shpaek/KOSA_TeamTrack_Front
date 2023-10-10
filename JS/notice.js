
$(()=>{
    const backURL = 'http://localhost:8888/KOSA_Project2'
    const frontURL = 'http://localhost:5500/HTML'
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')

    function ajaxHandler(method, u, target) {
        if (method == 'GET') {
            target.load(u, function (response, status, xhr) {
                if (status == "error") {
                    alert(xhr.status + xhr.statusText)
                }
            })
        }
    }

    $.ajax({
        url: backURL+'/mainnotice',
        method : 'get',
        data : `teamNo=${teamNo}`,
        success: (responseJSONObj)=>{
            $('div.main_topline>span[name=noticeNo]').show()
            if(responseJSONObj.memStatus == 0){
                $('div.main_topline>button[name=cancel]').hide()
                $('div.notice>div.write>button').hide()
            }
            if(responseJSONObj.notice == null){
                $('div.mainnotice').hide()
            }else{
                const noticeNo = responseJSONObj.notice.noticeNo
                const noticeTitle = responseJSONObj.notice.noticeTitle
                const regDate = responseJSONObj.notice.regDate
                const noticeContent = responseJSONObj.notice.noticeContent

                $('div.main_topline>span[name=noticeNo]').text(noticeNo)
                $('div.main_topline>a').html(noticeTitle)
                $('div.main_topline>span[name=date]').text(regDate)
                $('div.main_contentline>p').html(noticeContent)

                $('div.main_topline>span[name=noticeNo]').hide()
            }
        },
        error:(jqXHR, textStatus)=>{
            alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
            console.log(jqXHR)
        }
    })

    //---- 메인공지 제목 클릭했을 때 발생할 이벤트 ----

    $('div.main_topline>a').on('click',(e)=>{ 
        const noticeNo = $('div.main_topline>span[name=noticeNo]').text()
        location.href = `${frontURL}/noticedetail.html?teamNo=${teamNo}&noticeNo=${noticeNo}`
    })


    //---- 공지 내리기 버튼 눌렀을 때 발생할 이벤트 ----
    $('div.main_topline>button[name=cancel]').on('click',(e)=>{ 
        $('div.main_topline>span[name=noticeNo]').show()
        const noticeNo = $('div.main_topline>span[name=noticeNo]').text()
        $('div.main_topline>span[name=noticeNo]').hide()

        $.ajax({
            url: backURL+'/setmainnotice',
            method : 'get',
            data : `teamNo=${teamNo}&noticeNo=${noticeNo}&mainStatus=0`,
            success: (responseJSONObj)=>{
                if(responseJSONObj.status==1){
                    location.href=`${frontURL}/notice.html?teamNo=${teamNo}`
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

    function ajaxHandler2(cp){
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: backURL+'/noticelist',
            method : 'get',
            data : `currentPage=${cp}&teamNo=${teamNo}`,
            success: (responseJSONObj)=>{
                const noticeList = responseJSONObj.list

                const $originTrObj = $('div.noticelist>table>thead>tr')
                const $tbodyObj = $('div.noticelist>table>tbody')

                $tbodyObj.empty()

                $(noticeList).each((index, p)=>{
                    const $copyTrObj = $originTrObj.clone()
                    $copyTrObj.empty()
                    
                    const $noticeNoObj = `<td>${p.noticeNo}</td>`
                    $copyTrObj.append($noticeNoObj)

                    const $noticeTitleObj = `<td class="notice_title"><a href='#' 
                    onclick="location.href = \`${frontURL}/noticedetail.html?teamNo=${teamNo}&noticeNo=${p.noticeNo}\`">
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
    ajaxHandler2(1)

    $('div.notice>div.pagegroup').on('click','span',(e)=>{ 
        const pg = $(e.target).attr('class')
        const currentPage = pg.substr(2)
        ajaxHandler2(currentPage)
    }) 

    //---- 작성 버튼 클릭했을 때 발생할 이벤트 ----
    $('div.notice>div.write>div.writebutton>button').on('click',(e)=>{
        location.href=`${frontURL}/writenotice.html?teamNo=${teamNo}`
    })
})