
$(()=>{
    // const backURL = 'http://192.168.1.20:8888/teamtrack'
    // const frontURL = 'http://192.168.1.20:5500/HTML'
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')
    const loginedId = sessionStorage.getItem("loginedId")

    $.ajax({
        url: backURL+'/mainnotice',
        method : 'get',
        data : `teamNo=${teamNo}&loginedId=${loginedId}`,
        success: (responseJSONObj)=>{
            //alert(responseJSONObj.memStatus)
            if(responseJSONObj.memStatus == '0'){
                //alert('여기까지 와요')
                $('div.main_topline>div.rightspace>button[name=cancel]').hide()
                $('div.writebutton>button').hide()
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
                $('div.rightspace>span[name=date]').text(regDate)
                $('div.main_contentline>p').html(noticeContent)

            }
        },
        error:(jqXHR, textStatus)=>{
            
        }
    })

    //---- 메인공지 제목 클릭했을 때 발생할 이벤트 ----

    $('div.main_topline>a').on('click',(e)=>{ 
        const noticeNo = $('div.main_topline>span[name=noticeNo]').text()
        location.href = `${frontURL}/noticedetail.html?teamNo=${teamNo}&noticeNo=${noticeNo}`
    })


    //---- 공지 내리기 버튼 눌렀을 때 발생할 이벤트 ----
    $('div.rightspace>button[name=cancel]').on('click',(e)=>{ 
        $('div.main_topline>span[name=noticeNo]').show()
        const noticeNo = $('div.main_topline>span[name=noticeNo]').text()
        $('div.main_topline>span[name=noticeNo]').hide()

        $.ajax({
            url: backURL+'/setmainnotice',
            method : 'get',
            data : `teamNo=${teamNo}&noticeNo=${noticeNo}&mainStatus=0`,
            success: (responseJSONObj)=>{
                if(responseJSONObj.status==1){
                    Swal.fire({
                        icon: 'success',
                        text: responseJSONObj.msg
                    })
                    location.href=`${frontURL}/notice.html?teamNo=${teamNo}&loginedId=${loginedId}`
                }else{
                    Swal.fire({
                        icon: 'warning',
                        text: responseJSONObj
                    })
                }
            },
            error:(jqXHR, textStatus)=>{
                
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
            data : `currentPage=${cp}&teamNo=${teamNo}`,
            success: (responseJSONObj)=>{
                console.log(responseJSONObj.list)
                if(responseJSONObj.list.length==0){
                    $('div.nothing').show()
                    $('div.noticelist').hide()
                    $('div.pagegroup').hide()
                }else{
                    const noticeList = responseJSONObj.list
                    $('div.nothing').hide()
                    $('div.noticelist').show()
                    $('div.pagegroup').show()
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
                        let page = `ㅣ<span class="pg${startPage-1}">PREV</span>ㅣ&nbsp;&nbsp;&nbsp;`
                        $divPageGroup.html($divPageGroup.html()+page)
                    }
                    for(let i = startPage; i<=endPage; i++){
                        let page=`<span class="pg${i}">${i}</span>&nbsp;&nbsp;&nbsp;`
                        $divPageGroup.html($divPageGroup.html()+page)
                    }
                    if(endPage!=responseJSONObj.totalPage){
                        let page=`ㅣ<span class="pg${endPage+1}">NEXT</span>ㅣ`
                        $divPageGroup.html($divPageGroup.html()+page)
                    }
                }
            },
            error:(jqXHR, textStatus)=>{
                
            }
        })
    }
    ajaxHandler(1)

    $('div.notice>div.pagegroup').on('click','span',(e)=>{ 
        const pg = $(e.target).attr('class')
        const currentPage = pg.substr(2)
        ajaxHandler(currentPage)
    }) 

    //---- 작성 버튼 클릭했을 때 발생할 이벤트 ----
    $('div.notice>div.write>div.writebutton>button').on('click',(e)=>{
        location.href=`${frontURL}/writenotice.html?teamNo=${teamNo}`
    })
})