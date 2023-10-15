$(()=>{
    const backURL = 'http://localhost:8888/teamtrack'
    const frontURL = 'http://localhost:5500/HTML'

    var menustatus=1


    // ------------------- 참여중/활동종료/승인대기 팀목록 ----------------------------

    function ajaxHandler(cp, menustatus){
        $.ajax({
            url: `${backURL}/myteamlist`,
            method : 'get',
            data : `currentPage=${cp}&menustatus=${menustatus}`,
            success: (responseJSONObj)=>{
                const teamList = responseJSONObj.list
  
                const $originObj = $('div.teamlist>ul>li').first()
                $originObj.siblings().remove() 
                $originObj.show()

                $(teamList).each((index, p)=>{
                    const $copyObj = $originObj.clone()
                    const teamNo = p.teamNo
                    const teamName = p.teamName
                    const status = p.status

                    $copyObj.find("div.team>span[name=teamno]").html(teamNo)

                    if(status==3){
                        $copyObj.find("div.team>img.leader").css('visibility', 'visible')
                    }


                    $.ajax({
                        xhrFields: {
                          responseType: "blob",
                        },
                        url: backURL + "/download",
                        data: "teamNo=" + teamNo + "&opt=profile",
                        success: (responseData) => {
                          if (responseData.size > 0) {
                            const url = URL.createObjectURL(responseData);
                            if(responseData!=null){
                                $copyObj.find("div.team>img.logo").attr("src", url);
                            }else{
                                $copyObj.find("div.team>img.logo").attr('src','../images/'+teamName+'.png')
                            }
                          }
                        },
                        error: (jqxhr) => {},
                      });
                    $copyObj.find("div.team>a[name=teamname]").html(teamName)

                    $('div.teamlist>ul').append($copyObj)
                })
                $originObj.hide()


                const $divPageGroup = $('div.teamlist>div.pagegroup_team')
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
            },
            error:(jqXHR, textStatus)=>{
                alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                console.log(jqXHR)
            }
        })
    }

    //---------------------------- 거절된 팀목록 -------------------------------------
    function ajaxHandler_reject(cp){
        $.ajax({
            url: `${backURL}/rejectedteam`,
            method : 'get',
            data : `currentPage=${cp}`,
            success: (responseJSONObj)=>{
                const teamList = responseJSONObj.list

                if(teamList == null){
                    $('div.rejectlist').hide()
                }else{
                    $('div.rejectlist').show()
                    const $originObj = $('div.rejectlist>ul>li').first()
                    $originObj.siblings().remove() 
                    $originObj.show()

                    $(teamList).each((index, p)=>{
                        const $copyObj = $originObj.clone()
                        const teamNo = p.teamNo
                        const teamName = p.teamName

                        $copyObj.find("div.reject>span[name=reject_teamno]").html(teamNo)

                        $.ajax({
                            xhrFields: {
                              responseType: "blob",
                            },
                            url: backURL + "/download",
                            data: "teamNo=" + teamNo + "&opt=profile",
                            success: (responseData) => {
                              if (responseData.size > 0) {
                                const url = URL.createObjectURL(responseData);
                                if(responseData!=null){
                                    $copyObj.find("div.reject>img.reject_logo").attr("src", url);
                                }else{
                                    $copyObj.find("div.reject>img.reject_logo").attr('src','../images/'+teamName+'.png')
                                }
                              }
                            },
                            error: (jqxhr) => {},
                          });

                        $copyObj.find("div.reject>a[name=reject_teamname]").html(teamName)

                        $('div.rejectlist>ul').append($copyObj)
                    })
                    $originObj.hide()


                    const $divPageGroup = $('div.rejectlist>div.pagegroup_reject')
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
                alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                console.log(jqXHR)
            }
        })
    }

    //---- 팀 조회 메인 ----
    ajaxHandler(1 ,menustatus)


    //---- 참여중 팀 ----
    $('ul.myteamtab>li>div.active').click(()=>{
        $('div.teamlist>h1').hide()
        menustatus=1
        ajaxHandler(1, menustatus)
        $('div.rejectlist').hide()
        $('div.teamlist>ul>li>div>button[name=activity]').show()
        $('div.teamlist>ul>li>div>button[name=withdrawl]').show()
        $('div.teamlist>ul>li>div>button[name=cancel]').hide()
    })

    //---- 활동종료 팀 ----
    $('ul.myteamtab>li>div.end').click(()=>{
        menustatus=2
        ajaxHandler(1, menustatus)
        $('div.rejectlist').hide()
        $('div.teamlist>h1').hide()
        $('div.teamlist>ul>li>div>button[name=activity]').show()
        $('div.teamlist>ul>li>div>button[name=withdrawl]').hide()
        $('div.teamlist>ul>li>div>button[name=cancel]').hide()
    })

    //---- 승인대기 팀 ----
    $('ul.myteamtab>li>div.waiting').click(()=>{
        ajaxHandler_reject(1)
        menustatus=3
        ajaxHandler(1, menustatus)
        $('div.teamlist>h1').show()
        $('div.teamlist>ul>li>div>button[name=activity]').hide()
        $('div.teamlist>ul>li>div>button[name=withdrawl]').hide()
        $('div.teamlist>ul>li>div>button[name=cancel]').show()
    })

    //---- 승인거절 알림 확인 -----
    $(document).on('click', 'div.reject>button[name=ok]', function(e) {
        const teamNo = $(e.target).siblings(':eq(0)').text()
 
        $.ajax({
            url: backURL+'/rejectcheck',
            method : 'get',
            data : `teamNo=${teamNo}`,
            success: (responseJSONObj)=>{
                if(responseJSONObj.status!=1){
                    alert(responseJSONObj.msg)
                }
                ajaxHandler_reject(1)
                ajaxHandler(1, 3)
                $('div.teamlist>h1').show()
                $('div.teamlist>ul>li>div>button[name=activity]').hide()
                $('div.teamlist>ul>li>div>button[name=withdrawl]').hide()
                $('div.teamlist>ul>li>div>button[name=cancel]').show()
            },
            error:(jqXHR)=>{
                alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                console.log(jqXHR)
            }
        })
        return false
    })

    //---- 승인대기 취소 -----
    $(document).on('click', 'div.team>button[name=cancel]', function(e) {
        const teamNo = $(e.target).siblings(':eq(0)').text()
        var result = confirm("대기를 취소하시겠습니까?")
        if(result == true){
            $.ajax({
                url: backURL+'/cancelwaiting',
                method : 'get',
                data : `teamNo=${teamNo}`,
                success: (responseJSONObj)=>{
                    if(responseJSONObj.status==1){
                        alert(responseJSONObj.msg)
                    }else{
                        alert(responseJSONObj.msg)
                    }
                    ajaxHandler_reject(1)
                    ajaxHandler(1, 3)
                    $('div.teamlist>h1').show()
                    $('div.teamlist>ul>li>div>button[name=activity]').hide()
                    $('div.teamlist>ul>li>div>button[name=withdrawl]').hide()
                    $('div.teamlist>ul>li>div>button[name=cancel]').show()
                },
                error:(jqXHR)=>{
                    alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                    console.log(jqXHR)
                }
            })
        }else{
            return false
        }
        return false
    })

    $(document).on('click', 'div.team>button[name=activity]', function(e) {
        const teamNo=$(e.target).siblings(':eq(0)').text()
        location.href=`${frontURL}/myactivity.html?teamNo=${teamNo}`
    })
    
    //---- 페이지 ----
    $('div.rejectlist>div.pagegroup_reject').on('click','span',(e)=>{ 
        const pg = $(e.target).attr('class')
        const currentPage = pg.substr(2)
        ajaxHandler_reject(currentPage)
    }) 

    $('div.teamlist>div.pagegroup_team').on('click','span',(e)=>{ 
        const pg = $(e.target).attr('class')
        const currentPage = pg.substr(2)
        ajaxHandler(currentPage,menustatus)
    }) 
 
})
