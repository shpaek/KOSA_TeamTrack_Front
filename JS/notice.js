const backURL = 'http://localhost:8888/KOSA_Project2'
const frontURL = 'http://localhost:5500/html'

$(()=>{
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
                //원본 product객체 찾기
                const $originTrObj = $('div.notice>div.noticelist>table>thead>tr')
                const $tbodyObj = $('div.notice>div.noticelist>table>tbody')
                $tbodyObj.empty()

                $(noticeList).each((index, p)=>{
                    const $copyTrObj = $originTrObj.clone()
                    $copyTrObj.empty()
                    
                    const $noticeNoTdObj = $('<td>')
                    $noticeNoTdObj.addClass('noticeNo')
                    $noticeNoTdObj.append(p.noticeNo)
                    $copyTrObj.append($noticeNoTdObj)

                    const $noticeTitleTdObj = $('<td>')
                    $noticeTitleTdObj.addClass('noticeTitle')
                    $noticeTitleTdObj.append(p.noticeTitle)
                    $copyTrObj.append($noticeTitleTdObj)
    
                    const $regDateTdObj = $('<td>')
                    $regDateTdObj.addClass('regDate')
                    $regDateTdObj.append(p.regDate)
                    $copyTrObj.append($regDateTdObj)
    
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

    $('div.notice>div.pagegroup').on('click','span',(e)=>{ // ajax호출하지 않고도 존재하는 객체를 가지고 해야 한다. 그럴 때 사용하는 것이 on이다. 나중에 추가될 span태그를 써주면 된다. (미리 할 일 등록)
        const pg = $(e.target).attr('class')
        const currentPage = pg.substr(2)
        ajaxHandler(currentPage)
    }) 
})